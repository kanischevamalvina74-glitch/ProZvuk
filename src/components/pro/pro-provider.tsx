"use client";

import {
  LICENSE_CHANGED_EVENT,
  clearStoredLicense,
  readStoredLicense,
  writeStoredLicense,
  type StoredLicense,
} from "@/lib/pro-license";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ProContextValue = {
  /** Прочитали ли localStorage (защита от гидратационного мигания) */
  checked: boolean;
  license: StoredLicense | null;
  setLicense: (license: StoredLicense | null) => void;
};

const ProContext = createContext<ProContextValue | null>(null);

export function ProProvider({ children }: { children: React.ReactNode }) {
  const [license, setLicenseState] = useState<StoredLicense | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setLicenseState(readStoredLicense());
    setChecked(true);
    const onChange = () => setLicenseState(readStoredLicense());
    window.addEventListener(LICENSE_CHANGED_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(LICENSE_CHANGED_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const setLicense = useCallback((next: StoredLicense | null) => {
    if (next) writeStoredLicense(next);
    else clearStoredLicense();
    setLicenseState(next);
  }, []);

  return (
    <ProContext.Provider value={{ checked, license, setLicense }}>
      {children}
    </ProContext.Provider>
  );
}

export function usePro(): ProContextValue {
  const ctx = useContext(ProContext);
  if (!ctx) {
    throw new Error("usePro должен вызываться внутри ProProvider");
  }
  return ctx;
}
