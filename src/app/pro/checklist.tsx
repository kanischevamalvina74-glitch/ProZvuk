"use client";

import { CHECKLIST_ITEMS } from "@/lib/tuning";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Printer, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "avtozvuk-checklist-v1";

export function Checklist() {
  const [done, setDone] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(new Set(JSON.parse(raw) as number[]));
    } catch {
      // ignore
    }
  }, []);

  function toggle(index: number) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  }

  function reset() {
    setDone(new Set());
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  const percent = Math.round((done.size / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex flex-1 items-center gap-3">
          <Progress value={percent} className="flex-1" />
          <span className="text-sm tabular-nums text-muted-foreground">
            {done.size} из {CHECKLIST_ITEMS.length}
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4" />
            Печать
          </Button>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            Сброс
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="space-y-2 pt-6">
          {CHECKLIST_ITEMS.map((item, index) => {
            const id = `checklist-item-${index}`;
            return (
              <div
                key={id}
                className={
                  "flex items-center gap-3 rounded-lg border p-3 transition-opacity " +
                  (done.has(index) ? "opacity-55" : "")
                }
              >
                <Checkbox
                  id={id}
                  checked={done.has(index)}
                  onCheckedChange={() => toggle(index)}
                />
                <Label
                  htmlFor={id}
                  className="flex-1 cursor-pointer text-sm font-normal leading-snug"
                >
                  {item}
                </Label>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground print:hidden">
        Отметки сохраняются в браузере. Распечатай и возьми с собой на стенд —
        при печати интерфейс сайта скроется, останется только список.
      </p>
    </div>
  );
}
