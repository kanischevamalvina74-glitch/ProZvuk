"use client";

import { usePro } from "@/components/pro/pro-provider";
import { Crown } from "lucide-react";

/**
 * Статус-чип в шапке: тихий «Free» у бесплатной версии,
 * золотой светящийся «Pro» — после активации ключа.
 */
export function ProStatusBadge() {
  const { checked, license } = usePro();

  if (!checked) {
    return <span aria-hidden className="inline-block h-5 w-11" />;
  }

  if (license) {
    return (
      <span
        title="Pro активирован — спасибо за поддержку!"
        className="inline-flex items-center gap-1 rounded-md border border-amber-400/40 bg-gradient-to-r from-amber-500/15 to-orange-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 shadow-[0_0_14px_-4px_hsl(38_92%_50%/0.6)] dark:text-amber-400"
      >
        <Crown className="h-3 w-3" />
        Pro
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-md border bg-muted/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
      Free
    </span>
  );
}
