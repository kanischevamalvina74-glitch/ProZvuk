import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AudioWaveform,
  BookOpenCheck,
  Bot,
  CheckCircle2,
  CircleDashed,
  ClipboardCheck,
  Gauge,
  KeyRound,
  MessageCircle,
  Music4,
  SlidersHorizontal,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AdminIssueForm } from "./admin-issue-form";

export const metadata: Metadata = {
  title: "Админка — Автозвук",
  robots: { index: false, follow: false },
};

const PRICE = 100;
const ADMIN_TG = "t.me/belka_s_adk46";
const BOT_TG = "t.me/avt0zvuk_pro_bot";

const tools = [
  {
    icon: SlidersHorizontal,
    title: "Калькулятор фильтров",
    pro: false,
  },
  { icon: Gauge, title: "Гейн по вольтметру", pro: false },
  { icon: AudioWaveform, title: "Пресеты SQ / SPL / Free Air", pro: true },
  { icon: ClipboardCheck, title: "Чек-лист стенда", pro: true },
  { icon: Music4, title: "Генератор сигналов", pro: true },
  { icon: BookOpenCheck, title: "Справочник ошибок", pro: true },
];

const funnel = [
  {
    step: "1",
    title: "Оплата",
    text: `Покупатель переводит ${PRICE} ₽ и пишет админу ${ADMIN_TG}: сумму и свой email.`,
  },
  {
    step: "2",
    title: "Выдача ключа",
    text: "Вы в боте @avt0zvuk_pro_bot: /issue email → бот возвращает детерминированный ключ AVZ-… (или генерируйте здесь, ниже).",
  },
  {
    step: "3",
    title: "Активация",
    text: "Покупатель вводит email + ключ на /account. Проверка на сервере, статус живёт в его браузере.",
  },
  {
    step: "4",
    title: "Доступ навсегда",
    text: "Ключ подходит только к этому email и работает бессрочно. Повторная продажа — новый email.",
  },
];

function StatusChip({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm">
      <span className="font-mono text-xs">{label}</span>
      {ok ? (
        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          свой
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <CircleDashed className="h-4 w-4" />
          по умолчанию
        </span>
      )}
    </div>
  );
}

export default function AdminPage() {
  const hasCustomAdminPassword = Boolean(process.env.ADMIN_PASSWORD);
  const hasCustomLicenseSecret = Boolean(process.env.LICENSE_SECRET);

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Админ-панель
              </h1>
              <Badge variant="outline" className="border-destructive/40 text-destructive">
                секретно
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Вся модель продукта на одном экране: что продаёте, как идут деньги
              и ключи. Страница не индексируется и нигде не ссылается.
            </p>
          </div>

          {/* Модель монетизации */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2">
                <span>Модель монетизации</span>
                <span className="font-mono text-2xl font-bold text-gradient">
                  {PRICE} ₽
                </span>
              </CardTitle>
              <CardDescription>
                Разовый платёж за ключ, привязанный к email. Без подписок и БД:
                активация хранится у покупателя в браузере, сервер только
                проверяет подпись ключа.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 sm:grid-cols-2">
                {tools.map((tool) => (
                  <div
                    key={tool.title}
                    className="flex items-center justify-between gap-2 rounded-lg border p-3"
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <tool.icon className="h-4 w-4 text-primary" />
                      {tool.title}
                    </span>
                    {tool.pro ? (
                      <Badge className="border-0 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                        Pro
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      >
                        бесплатно
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Воронка */}
          <Card>
            <CardHeader>
              <CardTitle>Путь покупки</CardTitle>
              <CardDescription>
                От перевода денег до вечного доступа — четыре шага.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {funnel.map((item) => (
                <div key={item.step} className="rounded-xl border p-4">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/15 font-mono text-xs font-bold text-primary">
                      {item.step}
                    </span>
                    <span className="text-sm font-semibold">{item.title}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Статус окружения */}
          <Card>
            <CardHeader>
              <CardTitle>Статус окружения</CardTitle>
              <CardDescription>
                Значения секретов не показываются — только источник.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2">
              <StatusChip
                ok={hasCustomAdminPassword}
                label="ADMIN_PASSWORD (пароль админки)"
              />
              <StatusChip
                ok={hasCustomLicenseSecret}
                label="LICENSE_SECRET (подпись ключей)"
              />
              <div className="rounded-lg border p-3 text-sm sm:col-span-2">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-primary" />
                  <span className="font-medium">
                    Бот выдачи ключей{" "}
                    <a
                      href={`https://${BOT_TG}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      @avt0zvuk_pro_bot
                    </a>
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Windows-exe:{" "}
                  <a
                    href="/avtozvuk-bot.zip"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    скачать архив
                  </a>
                  . В .env бота: BOT_TOKEN, ADMIN_IDS=284199866 и тот же
                  LICENSE_SECRET, что на сайте — иначе ключи не совпадут.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Выдача ключа */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-primary" />
                Выдача ключа без бота
              </CardTitle>
              <CardDescription>
                Тот же алгоритм, что в боте: ключ зависит только от email и
                секрета. Удобно, если покупатель пришёл, пока бот выключен.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminIssueForm usingDefaultPassword={!hasCustomAdminPassword && !hasCustomLicenseSecret} />
            </CardContent>
          </Card>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>
              Вопросы от покупателей принимает{" "}
              <a
                href={`https://${ADMIN_TG}`}
                className="text-primary underline-offset-4 hover:underline"
              >
                {ADMIN_TG}
              </a>
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <MessageCircle className="h-3.5 w-3.5" />
                На витрину
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
