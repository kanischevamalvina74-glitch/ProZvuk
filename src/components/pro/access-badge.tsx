"use client";

import { usePro } from "@/components/pro/pro-provider";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

/**
 * Бейдж доступа внутри инструментов: в бесплатной версии — тихий серый,
 * с активным Pro — золотой чип с короной.
 */
export function AccessBadge({ freeLabel = "бесплатно" }: { freeLabel?: string }) {
  const { checked, license } = usePro();

  if (checked && license) {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-amber-400/40 bg-gradient-to-r from-amber-500/15 to-orange-500/15 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
        <Crown className="h-3 w-3" />
        Pro
      </span>
    );
  }

  return <Badge variant="secondary">{freeLabel}</Badge>;
}
