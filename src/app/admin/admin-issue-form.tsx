"use client";

import {
  activatePro,
  adminIssueKey,
  type AdminIssueState,
} from "@/app/actions";
import { usePro } from "@/components/pro/pro-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BadgeCheck,
  Copy,
  KeyRound,
  Loader2,
  Lock,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";

const initialState: AdminIssueState = {
  status: "idle",
  message: "",
  email: "",
  key: "",
};

export function AdminIssueForm({
  usingDefaultPassword,
}: {
  usingDefaultPassword: boolean;
}) {
  const [state, formAction, isPending] = useActionState(
    adminIssueKey,
    initialState,
  );
  const { setLicense } = usePro();
  const [copied, setCopied] = useState(false);
  const [activating, setActivating] = useState(false);
  const [activated, setActivated] = useState(false);
  const lastKeyRef = useRef<{ email: string; key: string } | null>(null);

  useEffect(() => {
    if (state.status === "success") {
      lastKeyRef.current = { email: state.email, key: state.key };
      setActivated(false);
    }
  }, [state]);

  async function copyKey() {
    if (!state.key) return;
    try {
      await navigator.clipboard.writeText(state.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  async function activateHere() {
    const saved = lastKeyRef.current;
    if (!saved) return;
    setActivating(true);
    try {
      const fd = new FormData();
      fd.set("email", saved.email);
      fd.set("key", saved.key);
      const result = await activatePro(
        { status: "idle", message: "", email: "" },
        fd,
      );
      if (result.status === "success") {
        setLicense({
          email: saved.email,
          key: saved.key,
          activatedAt: new Date().toISOString(),
        });
        setActivated(true);
      }
    } finally {
      setActivating(false);
    }
  }

  return (
    <div className="space-y-4">
      {usingDefaultPassword && (
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <span>
            Работает встроенный пароль по умолчанию. Для боевого режима задайте{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              ADMIN_PASSWORD
            </code>{" "}
            (и одинаковый{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              LICENSE_SECRET
            </code>{" "}
            на сайте и в боте) в переменных окружения.
          </span>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="admin-password">Пароль администратора</Label>
            <Input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email покупателя</Label>
            <Input
              id="admin-email"
              name="email"
              type="email"
              placeholder="buyer@example.ru"
              autoComplete="off"
              required
            />
          </div>
        </div>

        {state.status === "error" && (
          <p className="text-sm text-destructive">{state.message}</p>
        )}

        <Button type="submit" disabled={isPending} className="glow-primary font-semibold">
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
          Сгенерировать ключ
        </Button>
      </form>

      {state.status === "success" && state.key && (
        <div className="space-y-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <BadgeCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            {state.message}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <code className="rounded-md bg-background px-2.5 py-1.5 font-mono text-sm font-bold tracking-wide">
              {state.key}
            </code>
            <Button variant="outline" size="sm" onClick={copyKey}>
              <Copy className="h-3.5 w-3.5" />
              {copied ? "Скопировано" : "Копировать"}
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {activated ? (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400">
                <BadgeCheck className="h-4 w-4" />
                Pro активен в этом браузере — вся модель открыта
              </span>
            ) : (
              <Button size="sm" onClick={activateHere} disabled={activating}>
                {activating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <Lock className="h-3.5 w-3.5" />
                Включить Pro здесь
              </Button>
            )}
            <Button size="sm" variant="outline" asChild>
              <Link href="/pro">Открыть Pro-раздел</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Покупателю такой ключ выдаёт бот{" "}
            <a
              href="https://t.me/avt0zvuk_pro_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              @avt0zvuk_pro_bot
            </a>{" "}
            по команде{" "}
            <code className="font-mono">/issue {state.email}</code> — результат
            идентичный (одна и та же формула и секрет).
          </p>
        </div>
      )}
    </div>
  );
}
