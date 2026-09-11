"use client";

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import Link from "next/link";

export function LockedTool({ title }: { title: string }) {
  return (
    <div className="relative mx-auto max-w-lg overflow-hidden rounded-xl border border-dashed border-primary/30 bg-primary/[0.04] p-8 text-center">
      <div
        aria-hidden
        className="absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div className="relative flex flex-col items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 shadow-[0_6px_24px_-6px_hsl(24_94%_53%/0.6)]">
          <Lock className="h-5 w-5 text-white" />
        </span>
        <div className="space-y-1.5">
          <h3 className="font-semibold">Доступно с Pro</h3>
          <p className="text-sm text-muted-foreground">
            «{title}» открывается после активации ключа за 100 ₽ — разово и
            навсегда.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button asChild className="glow-primary rounded-lg font-semibold">
            <Link href="/#buy">Купить за 100 ₽</Link>
          </Button>
          <Button variant="outline" asChild className="rounded-lg">
            <Link href="/account">Активировать ключ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
