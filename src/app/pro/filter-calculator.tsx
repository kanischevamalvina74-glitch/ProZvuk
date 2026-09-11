"use client";

import { AccessBadge } from "@/components/pro/access-badge";
import {
  SPEAKER_TYPES,
  type SpeakerTypeInfo,
} from "@/lib/tuning";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-semibold leading-snug">{value}</div>
    </div>
  );
}

function SelectedSpeaker({ speaker }: { speaker: SpeakerTypeInfo }) {
  return (
    <div className="space-y-4 rounded-xl border bg-card p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{speaker.name}</h3>
          <p className="text-sm text-muted-foreground">{speaker.example}</p>
        </div>
        <AccessBadge freeLabel="стартовые значения" />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatBlock label="HPF (срез снизу)" value={speaker.hpf} />
        <StatBlock label="LPF (срез сверху)" value={speaker.lpf ?? "не режется"} />
        <StatBlock label="Крутизна" value={speaker.slope} />
      </div>

      <div>
        <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Почему так
        </div>
        <p className="text-sm leading-relaxed">{speaker.why}</p>
      </div>

      {speaker.warning && (
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <span>{speaker.warning}</span>
        </div>
      )}
    </div>
  );
}

export function FilterCalculator() {
  const [selectedId, setSelectedId] = useState(SPEAKER_TYPES[0].id);
  const selected =
    SPEAKER_TYPES.find((s) => s.id === selectedId) ?? SPEAKER_TYPES[0];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {SPEAKER_TYPES.map((speaker) => (
          <button
            key={speaker.id}
            type="button"
            onClick={() => setSelectedId(speaker.id)}
            aria-pressed={speaker.id === selectedId}
            className={cn(
              "rounded-lg border p-3 text-left text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              speaker.id === selectedId
                ? "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                : "bg-card"
            )}
          >
            {speaker.name}
          </button>
        ))}
      </div>

      <SelectedSpeaker speaker={selected} />

      <p className="text-xs text-muted-foreground">
        Значения стартовые: сверяйся с паспортом динамика и правилами своей
        лиги. Крутизна фильтра выше — защита надёжнее, но стык полос подбирать
        сложнее.
      </p>
    </div>
  );
}
