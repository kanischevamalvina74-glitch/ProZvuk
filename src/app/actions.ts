"use server";

import {
  generateKey,
  isValidEmail,
  normalizeEmail,
  verifyKey,
} from "@/lib/license";
import { createHash, timingSafeEqual } from "node:crypto";

export type ActivateState = {
  status: "idle" | "success" | "error";
  message: string;
  email: string;
};

export async function activatePro(
  _prevState: ActivateState,
  formData: FormData
): Promise<ActivateState> {
  const email = String(formData.get("email") ?? "");
  const key = String(formData.get("key") ?? "");

  const result = verifyKey(email, key);
  if (!result.ok) {
    return { status: "error", message: result.error, email: email.trim().toLowerCase() };
  }

  return {
    status: "success",
    message: "Pro активирован. Спасибо за покупку!",
    email: email.trim().toLowerCase(),
  };
}

/*
 * Админская выдача ключа (страница /admin).
 * Пароль берётся из окружения и никогда не уходит на клиент —
 * сравнение timing-safe через sha256-хеши.
 */
const ADMIN_FALLBACK_PASSWORD = "avtozvuk-admin-v1";

function adminPassword(): string {
  return (
    process.env.ADMIN_PASSWORD ||
    process.env.LICENSE_SECRET ||
    ADMIN_FALLBACK_PASSWORD
  );
}

export type AdminIssueState = {
  status: "idle" | "success" | "error";
  message: string;
  email: string;
  key: string;
};

export async function adminIssueKey(
  _prevState: AdminIssueState,
  formData: FormData
): Promise<AdminIssueState> {
  const password = String(formData.get("password") ?? "");
  const email = String(formData.get("email") ?? "");

  const expected = createHash("sha256").update(adminPassword()).digest();
  const received = createHash("sha256").update(password).digest();
  if (!timingSafeEqual(expected, received)) {
    return {
      status: "error",
      message: "Неверный пароль администратора.",
      email: "",
      key: "",
    };
  }

  if (!isValidEmail(email)) {
    return {
      status: "error",
      message: "Введите корректный email покупателя.",
      email: "",
      key: "",
    };
  }

  return {
    status: "success",
    message: "Ключ сгенерирован — отправьте его покупателю.",
    email: normalizeEmail(email),
    key: generateKey(email),
  };
}
