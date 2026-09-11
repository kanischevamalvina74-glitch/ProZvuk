"use client";

import { usePro } from "@/components/pro/pro-provider";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import Link from "next/link";

/** В хиро: бесплатным — кнопка покупки, владельцам Pro — золотой статус. */
export function HeroBuyButton({ price }: { price: number }) {
  const { checked, license } = usePro();

  if (checked && license) {
    return (
      <Button
        size="lg"
        asChild
        className="rounded-xl border border-amber-400/40 bg-gradient-to-r from-amber-500/10 to-orange-500/15 font-semibold text-amber-600 shadow-[0_0_28px_-8px_hsl(38_92%_50%/0.6)] hover:from-amber-500/20 hover:to-orange-500/25 dark:text-amber-400"
      >
        <Link href="/pro">
          <Crown className="h-4 w-4" />
          Pro активен — всё открыто
        </Link>
      </Button>
    );
  }

  return (
    <Button size="lg" variant="outline" asChild className="rounded-xl">
      <Link href="/#buy">Купить Pro за {price} ₽</Link>
    </Button>
  );
}
