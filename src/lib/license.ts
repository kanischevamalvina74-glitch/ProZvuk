import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Генерация и проверка лицензионных ключей Pro.
 *
 * Ключ детерминированный: это HMAC-SHA256 от email, поэтому одному email
 * всегда соответствует один и тот же ключ. Секрет должен совпадать с
 * секретом бота (переменная окружения LICENSE_SECRET или встроенный дефолт).
 *
 * Эта же логика продублирована в bot/index.mjs — меняйте синхронно.
 */

const DEFAULT_SECRET = "avtozvuk-pro-secret-v1";
const KEY_PREFIX = "AVZ";

function getSecret(): string {
  return process.env.LICENSE_SECRET || DEFAULT_SECRET;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalizeEmail(email));
}

export function generateKey(email: string): string {
  const signature = createHmac("sha256", getSecret())
    .update("avtozvuk-pro|" + normalizeEmail(email))
    .digest("hex")
    .slice(0, 20)
    .toUpperCase();
  return KEY_PREFIX + "-" + (signature.match(/.{5}/g) ?? []).join("-");
}

function normalizeKey(key: string): string {
  return key.replace(/\s+/g, "").toUpperCase();
}

function isValidKeyFormat(key: string): boolean {
  return /^AVZ(-[A-F0-9]{5}){4}$/.test(key);
}

export type VerifyResult = { ok: true } | { ok: false; error: string };

export function verifyKey(email: string, key: string): VerifyResult {
  const normalizedEmail = normalizeEmail(email);
  const normalizedKey = normalizeKey(key);

  if (!isValidEmail(normalizedEmail)) {
    return { ok: false, error: "Введите корректный email." };
  }
  if (!isValidKeyFormat(normalizedKey)) {
    return {
      ok: false,
      error:
        "Ключ выглядит неверно. Правильный формат: AVZ-XXXXX-XXXXX-XXXXX-XXXXX.",
    };
  }

  const expected = Buffer.from(generateKey(normalizedEmail));
  const received = Buffer.from(normalizedKey);

  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return {
      ok: false,
      error:
        "Ключ не подходит к этому email. Проверьте, что email совпадает с тем, который вы сообщали при оплате.",
    };
  }

  return { ok: true };
}
