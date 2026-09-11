"use client";

import { usePro } from "@/components/pro/pro-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  AudioWaveform,
  BookOpenCheck,
  ClipboardCheck,
  Crown,
  Gauge,
  GraduationCap,
  Lock,
  Music4,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BeginnerGuide } from "./beginner-guide";
import { Checklist } from "./checklist";
import { ErrorGuide } from "./error-guide";
import { FilterCalculator } from "./filter-calculator";
import { GainCalculator } from "./gain-calculator";
import { LockedTool } from "./locked-tool";
import { Presets } from "./presets";
import { ToneGenerator } from "./tone-generator";

const triggerBase =
  "gap-1.5 rounded-full border border-transparent px-4 py-2";

const triggerFree = cn(
  triggerBase,
  "data-[state=active]:border-primary/30 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_2px_16px_-4px_hsl(24_94%_53%/0.6)]",
);

const triggerPro = cn(
  triggerBase,
  "data-[state=active]:border-amber-400/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-[0_2px_18px_-4px_hsl(38_92%_50%/0.65)]",
);

export function ProWorkspace() {
  const { checked, license } = usePro();
  const isPro = Boolean(license);
  const [tab, setTab] = useState("filters");

  return (
    <div className="space-y-6">
      {isPro ? (
        <div className="relative mx-auto flex max-w-2xl items-center justify-center gap-2 overflow-hidden rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-amber-500/10 px-5 py-2.5 text-center text-sm">
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-amber-200/25 to-transparent motion-reduce:animate-none"
          />
          <Crown className="relative h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
          <span className="relative">
            <strong className="font-semibold text-amber-600 dark:text-amber-400">
              Pro активен
            </strong>{" "}
            — все инструменты открыты, без ограничений.
          </span>
        </div>
      ) : (
        checked && (
          <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-dashed border-primary/25 bg-primary/5 px-5 py-2.5 text-center text-sm">
            <Lock className="h-3.5 w-3.5 text-primary" />
            <span>
              Фильтры и гейн — без ключа.{" "}
              <Link
                href="/#buy"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Pro за 100 ₽
              </Link>{" "}
              открывает пресеты, чек-лист, сигналы и справочник.
            </span>
          </div>
        )
      )}

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList
          className={cn(
            "flex h-auto w-full flex-wrap justify-center gap-1 rounded-2xl border p-1.5 shadow-sm backdrop-blur",
            isPro
              ? "border-amber-400/25 bg-gradient-to-r from-amber-500/[0.06] via-orange-500/[0.08] to-amber-500/[0.06]"
              : "bg-card/60",
          )}
        >
          <TabsTrigger value="beginner" className={isPro ? triggerPro : triggerFree}>
            <GraduationCap className="h-3.5 w-3.5" />
            Новичкам
          </TabsTrigger>
          <TabsTrigger value="filters" className={isPro ? triggerPro : triggerFree}>
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Фильтры
          </TabsTrigger>
          <TabsTrigger value="gain" className={isPro ? triggerPro : triggerFree}>
            <Gauge className="h-3.5 w-3.5" />
            Гейн
          </TabsTrigger>
          <TabsTrigger value="presets" className={isPro ? triggerPro : triggerFree}>
            <AudioWaveform className="h-3.5 w-3.5" />
            Пресеты
            {!isPro && <Lock className="h-3 w-3 opacity-50" />}
          </TabsTrigger>
          <TabsTrigger value="checklist" className={isPro ? triggerPro : triggerFree}>
            <ClipboardCheck className="h-3.5 w-3.5" />
            Чек-лист
            {!isPro && <Lock className="h-3 w-3 opacity-50" />}
          </TabsTrigger>
          <TabsTrigger value="tones" className={isPro ? triggerPro : triggerFree}>
            <Music4 className="h-3.5 w-3.5" />
            Сигналы
            {!isPro && <Lock className="h-3 w-3 opacity-50" />}
          </TabsTrigger>
          <TabsTrigger value="errors" className={isPro ? triggerPro : triggerFree}>
            <BookOpenCheck className="h-3.5 w-3.5" />
            Ошибки
            {!isPro && <Lock className="h-3 w-3 opacity-50" />}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="beginner" className="mt-6">
          <BeginnerGuide onOpenTab={setTab} />
        </TabsContent>
        <TabsContent value="filters" className="mt-6">
          <FilterCalculator />
        </TabsContent>
        <TabsContent value="gain" className="mt-6">
          <GainCalculator />
        </TabsContent>
        <TabsContent value="presets" className="mt-6">
          {isPro ? <Presets /> : <LockedTool title="Пресеты SQ / SPL / Free Air" />}
        </TabsContent>
        <TabsContent value="checklist" className="mt-6">
          {isPro ? <Checklist /> : <LockedTool title="Чек-лист стенда" />}
        </TabsContent>
        <TabsContent value="tones" className="mt-6">
          {isPro ? <ToneGenerator /> : <LockedTool title="Генератор тестовых сигналов" />}
        </TabsContent>
        <TabsContent value="errors" className="mt-6">
          {isPro ? <ErrorGuide /> : <LockedTool title="Справочник ошибок" />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
