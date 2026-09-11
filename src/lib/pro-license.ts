/**
 * Хранение факта активации Pro в браузере (localStorage).
 * Проверка самого ключа происходит на сервере при активации
 * (см. src/lib/license.ts), здесь мы только читаем/пишем результат.
 */

export const LICENSE_STORAGE_KEY = "avtozvuk-pro-license";
export const LICENSE_CHANGED_EVENT = "avtozvuk-pro-changed";

export type StoredLicense = {
  email: string;
  key: string;
  activatedAt: string;
};

export function readStoredLicense(): StoredLicense | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LICENSE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredLicense;
    if (!parsed?.email || !parsed?.key || !parsed?.activatedAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function notifyLicenseChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(LICENSE_CHANGED_EVENT));
  }
}

export function writeStoredLicense(license: StoredLicense) {
  try {
    window.localStorage.setItem(LICENSE_STORAGE_KEY, JSON.stringify(license));
  } catch {
    // localStorage может быть недоступен — статус просто не сохранится
  }
  notifyLicenseChanged();
}

export function clearStoredLicense() {
  try {
    window.localStorage.removeItem(LICENSE_STORAGE_KEY);
  } catch {
    // ignore
  }
  notifyLicenseChanged();
}
