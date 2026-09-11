"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  AudioWaveform,
  ClipboardCheck,
  Gauge,
  GraduationCap,
  SlidersHorizontal,
  TriangleAlert,
} from "lucide-react";

export type BeginnerTab = "filters" | "gain" | "tones" | "checklist";

const steps: {
  icon: typeof SlidersHorizontal;
  title: string;
  text: string;
  tab: BeginnerTab;
  action: string;
  pro?: boolean;
}[] = [
  {
    icon: SlidersHorizontal,
    title: "Шаг 1 — посчитайте фильтры",
    text: "Твитеру и СЧ нужен HPF, сабу и мидбасу — LPF. Калькулятор выдаёт частоты и крутизну с пояснением: просто перенесите значения в процессор или усилитель.",
    tab: "filters",
    action: "Открыть фильтры",
  },
  {
    icon: Gauge,
    title: "Шаг 2 — выставьте гейн",
    text: "Без мультиметра гейн — лотерея. Введите мощность усилителя и сопротивление: получите целевое напряжение √(P·R) и пошаговый алгоритм измерения.",
    tab: "gain",
    action: "Рассчитать гейн",
  },
  {
    icon: AudioWaveform,
    title: "Шаг 3 — проверьте сигналами",
    text: "Свип-тон найдёт дребезг и призвуки до того, как их услышат судьи. Прогоняйте после каждой смены настроек — прямо в браузере.",
    tab: "tones",
    action: "Запустить сигналы",
    pro: true,
  },
  {
    icon: ClipboardCheck,
    title: "Шаг 4 — чек-лист перед замером",
    text: "Питание, предохранители, фильтры, гейн: 12 пунктов на 5 минут. Пройдите накануне, чтобы не приехать на замер с сюрпризом.",
    tab: "checklist",
    action: "Открыть чек-лист",
    pro: true,
  },
];

const glossary = [
  {
    term: "HPF (ФВЧ)",
    text: "Срезает низы. Твитеру и СЧ-динамику бас не нужен и вреден — они от него хрипят и горят.",
  },
  {
    term: "LPF (ФНЧ)",
    text: "Срезает верха. Сабу оставляем только бас, обычно до ~80 Гц.",
  },
  {
    term: "Крутизна",
    text: "Насколько резко срез: 12 или 24 дБ/окт. Выше — чище разделение полос.",
  },
  {
    term: "Гейн",
    text: "Входная чувствительность усилителя: при каком сигнале на входе он выдаёт свою мощность.",
  },
  {
    term: "Клиппинг",
    text: "Искажение от перегрузки. Динамики чаще всего убивает именно он, а не «большая громкость».",
  },
  {
    term: "Сабсоник",
    text: "HPF для саба: режет инфраниз, на котором фазоинверторный корпус не удержит диффузор.",
  },
  {
    term: "RMS",
    text: "Номинальная длительная мощность. Считайте только её — «максималки» с коробки это маркетинг.",
  },
  {
    term: "SQ / SPL",
    text: "Две лиги соревнований: качество звука и громкость (звуковое давление). Настройки у них разные.",
  },
];

const safety = [
  "Гейн начинайте с минимума и поднимайте постепенно — перебор первым делом убивает ВЧ.",
  "Хрип, треск, запах — сразу убавьте. Это клиппинг, а не «прогрев».",
  "Гейн выставляйте только по вольтметру, а не «на слух на полной громкости».",
  "Первые поездки после настройки — на средней громкости: прислушивайтесь к твитерам.",
  "Сабу в фазоинверторе всегда ставьте сабсоник — иначе на инфранизе диффузор вылетит из хода.",
];

export function BeginnerGuide({
  onOpenTab,
}: {
  onOpenTab: (tab: BeginnerTab) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Вводный блок */}
      <div className="relative overflow-hidden rounded-xl border bg-card p-6 sm:p-8">
        <div
          aria-hidden
          className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-gradient-to-br from-primary/20 to-primary/5">
            <GraduationCap className="h-5 w-5 text-primary" />
          </span>
          <div className="space-y-1.5">
            <h3 className="text-lg font-semibold">
              Впервые в автозвуке? Вот ваш маршрут
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Настройка системы — это всегда одни и те же четыре шага. Пройдите
              их по порядку: на каждый есть инструмент ниже. Никакой магии «на
              слух» — только цифры.
            </p>
          </div>
        </div>
      </div>

      {/* Четыре шага */}
      <div className="grid gap-3 sm:grid-cols-2">
        {steps.map((step) => (
          <div
            key={step.title}
            className="flex flex-col rounded-xl border bg-card p-5 transition-colors hover:border-primary/30"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
                <step.icon className="h-4 w-4 text-primary" />
              </span>
              <span className="text-sm font-semibold">{step.title}</span>
            </div>
            <p className="mt-2.5 flex-1 text-xs leading-relaxed text-muted-foreground">
              {step.text}
            </p>
            <button
              type="button"
              onClick={() => onOpenTab(step.tab)}
              className="mt-3 inline-flex items-center gap-1 self-start text-sm font-medium text-primary transition-colors hover:underline"
            >
              {step.action}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Мини-словарь */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Мини-словарь: 8 слов, без которых никуда
        </h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {glossary.map((item) => (
            <div key={item.term} className="rounded-xl border bg-card p-4">
              <div className="font-mono text-sm font-bold text-primary">
                {item.term}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Безопасность */}
      <div className="rounded-xl border border-amber-500/40 bg-amber-500/[0.06] p-5">
        <div className="flex items-center gap-2">
          <TriangleAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <h3 className="text-sm font-semibold">
            Пять правил, чтобы ничего не спалить
          </h3>
        </div>
        <ul className="mt-3 space-y-1.5">
          {safety.map((rule) => (
            <li
              key={rule}
              className="flex gap-2 text-xs leading-relaxed text-muted-foreground"
            >
              <span
                aria-hidden
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500"
              />
              {rule}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-dashed border-primary/30 bg-primary/[0.04] p-5">
        <span className="text-sm text-muted-foreground">
          Готовы? Начните с первого шага:
        </span>
        <Button
          size="sm"
          onClick={() => onOpenTab("filters")}
          className="glow-primary rounded-lg font-semibold"
        >
          Посчитать фильтры
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onOpenTab("gain")}
          className="rounded-lg"
        >
          Сразу к гейну
        </Button>
      </div>
    </div>
  );
}
