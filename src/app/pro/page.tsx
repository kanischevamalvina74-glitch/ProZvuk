import { ProWorkspace } from "./pro-workspace";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pro-инструменты — Автозвук",
  description:
    "Калькулятор фильтров, настройка гейна по вольтметру, пресеты SQ/SPL, чек-лист стенда и генератор тестовых сигналов для автозвука.",
};

export default function ProPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="relative flex-1 px-4 pb-16 pt-12 sm:px-6">
        <div
          aria-hidden
          className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-64"
        />
        <div className="relative mx-auto max-w-5xl space-y-8">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              <span className="text-gradient">Инструменты</span> настройки
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Фильтры, гейн, пресеты, чек-лист и тестовые сигналы — всё, что
              нужно выставить до замера. Не крутите ручки наугад.
            </p>
          </div>

          <ProWorkspace />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
