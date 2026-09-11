"use client";

import { TONE_PRESETS, TONE_SAFETY } from "@/lib/tuning";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Play, Square, TriangleAlert, Waves } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SWEEP_SECONDS = 8;
const DEFAULT_LEVEL = 0.12;

type AudioNodes = {
  osc: OscillatorNode;
  gain: GainNode;
};

export function ToneGenerator() {
  const [freq, setFreq] = useState(50);
  const [playing, setPlaying] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNodes | null>(null);
  const timerRef = useRef<number | null>(null);

  function stop() {
    const nodes = nodesRef.current;
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (nodes) {
      const { ctx, osc, gain } = { ctx: ctxRef.current!, ...nodes };
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      osc.stop(now + 0.12);
      nodesRef.current = null;
    }
    setPlaying(false);
    setSweeping(false);
  }

  function start(target: number, sweepTo?: number) {
    if (sweepTo && target <= 0) return;
    stop();
    let ctx = ctxRef.current;
    if (!ctx) {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      ctxRef.current = ctx;
    }
    void ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = "sine";
    osc.frequency.setValueAtTime(target, now);
    if (sweepTo) {
      osc.frequency.exponentialRampToValueAtTime(sweepTo, now + SWEEP_SECONDS);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(DEFAULT_LEVEL, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    nodesRef.current = { osc, gain };
    setPlaying(true);
    setSweeping(Boolean(sweepTo));
    if (sweepTo) {
      timerRef.current = window.setTimeout(stop, SWEEP_SECONDS * 1000 + 150);
    }
  }

  function changeFreq(value: number) {
    const clamped = Math.min(1000, Math.max(20, Math.round(value)));
    setFreq(clamped);
    const nodes = nodesRef.current;
    if (nodes && !sweeping) {
      nodes.osc.frequency.setValueAtTime(clamped, ctxRef.current!.currentTime);
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      const nodes = nodesRef.current;
      if (nodes) {
        try {
          nodes.osc.stop();
        } catch {
          // ignore
        }
      }
      void ctxRef.current?.close().catch(() => undefined);
    };
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {TONE_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => changeFreq(preset)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium tabular-nums transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              freq === preset
                ? "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                : "bg-card"
            )}
          >
            {preset >= 1000 ? `${preset.toLocaleString("ru-RU")} Гц` : `${preset} Гц`}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="space-y-5 pt-6">
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <Label htmlFor="tone-freq">Частота синуса</Label>
              <span className="text-sm tabular-nums text-muted-foreground">
                {freq.toLocaleString("ru-RU")} Гц
              </span>
            </div>
            <Slider
              id="tone-freq"
              min={20}
              max={1000}
              step={5}
              value={[freq]}
              onValueChange={([value]) => changeFreq(value)}
            />
            <Input
              type="number"
              min={20}
              max={1000}
              value={freq}
              onChange={(e) => changeFreq(Number(e.target.value))}
              className="mx-auto w-32 text-center"
              aria-label="Частота, Гц"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {playing ? (
              <Button size="lg" onClick={stop} variant="destructive">
                <Square className="h-5 w-5" />
                Стоп
              </Button>
            ) : (
              <Button size="lg" onClick={() => start(freq)}>
                <Play className="h-5 w-5" />
                Играть {freq} Гц
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              disabled={playing}
              onClick={() => start(20, 120)}
            >
              <Waves className="h-5 w-5" />
              Свип 20 → 120 Гц, 8 с
            </Button>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <ul className="list-disc space-y-1 pl-3">
              {TONE_SAFETY.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
