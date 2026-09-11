"use client";

import { activatePro, type ActivateState } from "@/app/actions";
import { usePro } from "@/components/pro/pro-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, BadgeCheck, Copy, Loader2, ShieldCheck } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";

const initialState: ActivateState = { status: "idle", message: "", email: "" };

export function ActivateForm() {
  const [state, formAction, isPending] = useActionState(activatePro, initialState);
  const { checked, license, setLicense } = usePro();
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [copied, setCopied] = useState(false);
  const savedRef = useRef(false);

  useEffect(() => {
    if (state.status === "success" && !savedRef.current) {
      savedRef.current = true;
      setLicense({
        email: state.email,
        key: key.trim().toUpperCase().replace(/\s+/g, ""),
        activatedAt: new Date().toISOString(),
      });
    }
  }, [state, key, setLicense]);

  function deactivate() {
    savedRef.current = false;
    setLicense(null);
    setEmail("");
    setKey("");
  }

  async function copyKey() {
    if (!license) return;
    try {
      await navigator.clipboard.writeText(license.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  if (!checked) return null;

  if (license) {
    const activatedAt = new Date(license.activatedAt).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <Card className="w-full max-w-md border-amber-500/30 bg-gradient-to-b from-amber-500/[0.07] to-transparent shadow-[0_0_48px_-14px_hsl(38_92%_50%/0.4)]">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              Pro активирован
            </CardTitle>
            <Badge className="border-0 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
              навсегда
            </Badge>
          </div>
          <CardDescription>Спасибо за поддержку!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{license.email}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Активирован</span>
              <span className="font-medium">{activatedAt}</span>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-2">
            <code className="rounded-md bg-muted px-2 py-1 font-mono text-xs">
              {license.key}
            </code>
            <Button variant="ghost" size="sm" onClick={copyKey}>
              <Copy className="h-3.5 w-3.5" />
              {copied ? "Скопировано" : "Копировать"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Активация привязана к этому браузеру. Ключ можно ввести повторно на
            другом устройстве.
          </p>
          <Button variant="outline" className="w-full" onClick={deactivate}>
            Отключить Pro
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Активация Pro-ключа</CardTitle>
        <CardDescription>
          Введите email, который вы сообщали при оплате, и ключ из Telegram.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.ru"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="key">Ключ</Label>
            <Input
              id="key"
              name="key"
              placeholder="AVZ-XXXXX-XXXXX-XXXXX-XXXXX"
              className="font-mono uppercase"
              autoComplete="off"
              spellCheck={false}
              required
              value={key}
              onChange={(e) => setKey(e.target.value.toUpperCase())}
            />
          </div>

          {state.status === "error" && (
            <p className="flex items-start gap-2 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {state.message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Активировать Pro
          </Button>

          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Проверка ключа происходит на сервере: ключ привязан к вашему email.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
