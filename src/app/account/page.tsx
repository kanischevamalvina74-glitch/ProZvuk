import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { ActivateForm } from "./activate-form";

export const metadata: Metadata = {
  title: "Личный кабинет — Автозвук",
  description: "Активация Pro-ключа Автозвук",
};

export default function AccountPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Личный кабинет</h1>
            <p className="text-muted-foreground">
              Здесь активируется Pro-ключ, который бот присылает после оплаты.
            </p>
          </div>
          <div className="flex justify-center">
            <ActivateForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
