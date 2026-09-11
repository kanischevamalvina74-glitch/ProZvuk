"use client";

import { AccessBadge } from "@/components/pro/access-badge";
import { GAIN_PROCEDURE, GAIN_WARNING } from "@/lib/tuning";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";

function formatVolts(value: number): string {
  return value.toLocaleString("ru-RU", { maximumFractionDigits: 1 });
}

export function GainCalculator() {
  const [power, setPower] = useState("150");
  const [ohms, setOhms] = useState("2");

  const powerNum = Number.parseFloat(power.replace(",", "."));
  const ohmsNum = Number.parseFloat(ohms);
  const valid = Number.isFinite(powerNum) && powerNum > 0 && ohmsNum > 0;
  const volts = valid ? Math.sqrt(powerNum * ohmsNum) : null;
  const safeVolts = volts !== null ? volts * Math.SQRT1_2 : null;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <div className="space-y-2">
          <Label htmlFor="gain-power">Мощность канала, Вт (RMS)</Label>
          <Input
            id="gain-power"
            type="number"
            min={1}
            inputMode="numeric"
            value={power}
            onChange={(e) => setPower(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Сопротивление, Ом</Label>
          <Select value={ohms} onValueChange={setOhms}>
            <SelectTrigger>
              <SelectValue placeholder="Ом" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Ом</SelectItem>
              <SelectItem value="2">2 Ом</SelectItem>
              <SelectItem value="4">4 Ом</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 pb-1">
          <AccessBadge />
        </div>
      </div>

      {volts !== null ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border bg-card p-5">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Впритык
            </div>
            <div className="mt-1 font-mono text-4xl font-bold tabular-nums">
              {formatVolts(volts)}
              <span className="ml-1 text-lg font-medium text-muted-foreground">В</span>
            </div>
            <div className="mt-1.5 font-mono text-[11px] text-muted-foreground">
              U = √(P × R) = √({formatVolts(powerNum)} × {formatVolts(ohmsNum)})
            </div>
          </div>
          <div className="rounded-xl border border-primary/40 bg-primary/5 p-5">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
              <span>С запасом −3 дБ</span>
              <span className="rounded-md bg-primary/15 px-1.5 py-0.5 font-semibold normal-case text-primary">
                рекомендую
              </span>
            </div>
            <div className="mt-1 font-mono text-4xl font-bold tabular-nums text-gradient">
              {formatVolts(safeVolts ?? 0)}
              <span className="ml-1 text-lg font-medium opacity-70">В</span>
            </div>
            <div className="mt-1.5 text-[11px] text-muted-foreground">
              Запас на долгие замеры и просадку питания
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Введи мощность канала — покажу целевое напряжение.
        </p>
      )}

      <div className="rounded-xl border bg-card p-4 sm:p-6">
        <h3 className="mb-3 text-lg font-semibold">
          Пошаговый алгоритм настройки гейна
        </h3>
        <ol className="space-y-2">
          {GAIN_PROCEDURE.map((step, index) => (
            <li key={step} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {index + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <span>{GAIN_WARNING}</span>
        </div>
      </div>

      <div className="text-center">
        <Button asChild variant="outline">
          <a href="/pro" aria-label="К генератору тестовых сигналов">
            Нужен синус — он в Pro-инструментах
          </a>
        </Button>
      </div>
    </div>
  );
}
