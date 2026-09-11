#!/usr/bin/env node
// Автозвук-бот выдачи Pro-ключей.
// Ноль зависимостей: работает на чистом Node.js 18+ (или Bun).
//
// Конфиг — файл .env рядом со скриптом (или переменные окружения):
//   BOT_TOKEN=токен_от_BotFather
//   ADMIN_IDS=284199866
//   LICENSE_SECRET=опционально, общий секрет ключей с сайтом
//   SITE_URL=опционально, адрес сайта для ссылок в ответах

import { createHmac } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import https from "node:https";

// ---------- конфиг ----------

function loadDotEnv() {
  const candidates = [
    join(dirname(fileURLToPath(import.meta.url)), ".env"),
    join(process.cwd(), ".env"),
  ];
  for (const path of candidates) {
    if (!existsSync(path)) continue;
    const raw = readFileSync(path, "utf8").replace(/^\uFEFF/, "");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  }
}

loadDotEnv();

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const ADMIN_IDS = (process.env.ADMIN_IDS || "")
  .split(",")
  .map((s) => Number.parseInt(s.trim(), 10))
  .filter((n) => Number.isFinite(n) && n > 0);
const SITE_URL = (process.env.SITE_URL || "").replace(/\/+$/, "");
// Секрет должен совпадать с секретом сайта (см. src/lib/license.ts).
const LICENSE_SECRET = process.env.LICENSE_SECRET || "avtozvuk-pro-secret-v1";

if (!BOT_TOKEN) {
  console.error(
    "Нет токена. Создайте рядом с ботом файл .env со строкой:\n  BOT_TOKEN=токен_от_BotFather\n(файл без расширения .txt!)"
  );
  process.exit(1);
}
if (ADMIN_IDS.length === 0) {
  console.error(
    "Нет ID администратора. Добавьте в .env строку:\n  ADMIN_IDS=ваш_telegram_id\nСвой ID можно узнать, отправив боту команду /whoami."
  );
  process.exit(1);
}

// ---------- лицензионные ключи (логика совпадает с сайтом) ----------

export function generateKey(email) {
  const normalized = String(email).trim().toLowerCase();
  const signature = createHmac("sha256", LICENSE_SECRET)
    .update("avtozvuk-pro|" + normalized)
    .digest("hex")
    .slice(0, 20)
    .toUpperCase();
  return "AVZ-" + (signature.match(/.{5}/g) || []).join("-");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ---------- Telegram Bot API ----------

function callApi(method, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body ?? {});
    const req = https.request(
      {
        hostname: "api.telegram.org",
        path: `/bot${BOT_TOKEN}/${method}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
        timeout: 35000,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.ok) resolve(parsed.result);
            else reject(new Error(`Telegram: ${parsed.error_code} ${parsed.description}`));
          } catch {
            reject(new Error(`Telegram: неожиданный ответ: ${data.slice(0, 200)}`));
          }
        });
      }
    );
    req.on("timeout", () => req.destroy(new Error("Таймаут запроса к Telegram")));
    req.on("error", reject);
    req.end(payload);
  });
}

async function sendMessage(chatId, text) {
  try {
    await callApi("sendMessage", {
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    });
  } catch (error) {
    console.error("Не удалось отправить сообщение:", error.message);
  }
}

// ---------- тексты ----------

function accountLink() {
  return SITE_URL ? `${SITE_URL}/account` : "раздел «Личный кабинет» на сайте";
}

const HELP_TEXT = [
  "🔊 Бот выдачи Pro-ключей «Автозвук».",
  "",
  "Как получить Pro:",
  "1. Оплатите 100 ₽ (реквизиты на сайте).",
  "2. Сообщите админу свой email и отметку об оплате.",
  "3. Админ выдаст ключ — он придёт вам сюда.",
  `4. Активируйте ключ на сайте: ${accountLink()}.`,
  "",
  "Команды:",
  "/whoami — показать ваш Telegram ID",
  "/help — эта справка",
].join("\n");

// ---------- обработка команд ----------

function isBotCommand(text, name) {
  const first = text.trim().split(/\s+/)[0].toLowerCase();
  return first === name || first.startsWith(name + "@");
}

async function handleMessage(message) {
  const from = message.from;
  const text = (message.text || "").trim();
  if (!from || !text || !text.startsWith("/")) return;

  if (isBotCommand(text, "/start") || isBotCommand(text, "/help")) {
    await sendMessage(message.chat.id, HELP_TEXT);
    return;
  }

  if (isBotCommand(text, "/whoami")) {
    await sendMessage(
      message.chat.id,
      `Ваш Telegram ID: ${from.id}\nПередайте его админу, если вас нужно добавить в список администраторов.`
    );
    return;
  }

  if (isBotCommand(text, "/issue")) {
    if (!ADMIN_IDS.includes(from.id)) {
      await sendMessage(
        message.chat.id,
        "Команда доступна только администратору. Ваш ID: " + from.id
      );
      return;
    }
    const email = text.split(/\s+/)[1];
    if (!email || !EMAIL_RE.test(email)) {
      await sendMessage(
        message.chat.id,
        "Укажите email покупателя: /issue email@покупателя.ru"
      );
      return;
    }
    const key = generateKey(email);
    const lines = [
      `Ключ Pro для ${email.toLowerCase()}:`,
      "",
      key,
      "",
      "Перешлите этот ключ покупателю.",
      `Активация: ${accountLink()}`,
    ];
    await sendMessage(message.chat.id, lines.join("\n"));
    console.log(`Выдан ключ для ${email.toLowerCase()}`);
    return;
  }

  await sendMessage(message.chat.id, "Неизвестная команда. Отправьте /help");
}

// ---------- цикл long polling ----------

async function main() {
  const me = await callApi("getMe", {});
  console.log("Бот запущен: @" + me.username);
  console.log(`Ссылка на бота: https://t.me/${me.username}`);
  console.log(`Администраторы: ${ADMIN_IDS.join(", ")}`);
  if (!process.env.LICENSE_SECRET) {
    console.log(
      "Внимание: используется встроенный секрет ключей. Задайте LICENSE_SECRET в .env (тот же, что на сайте), чтобы ключи были уникальны для вас."
    );
  }
  console.log("Для остановки нажмите Ctrl+C. Окно можно свернуть, но не закрывайте.");

  let offset = 0;
  for (;;) {
    try {
      const updates = await callApi("getUpdates", {
        offset,
        timeout: 25,
        allowed_updates: ["message"],
      });
      for (const update of updates) {
        offset = update.update_id + 1;
        try {
          await handleMessage(update.message);
        } catch (error) {
          console.error("Ошибка обработки сообщения:", error.message);
        }
      }
    } catch (error) {
      console.error("Ошибка связи с Telegram, повтор через 5 с:", error.message);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

// Запускаем цикл опроса только при прямом запуске файла (node bot/index.mjs
// или собранный exe), а не при импорте как модуля.
const isDirectRun =
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  main().catch((error) => {
    console.error("Бот остановлен:", error.message);
    if (error.message.includes("401")) {
      console.error("Похоже, BOT_TOKEN неверный. Проверьте файл .env.");
    }
    process.exit(1);
  });
}
