"use client";

import { SYSTEM_PRESETS } from "@/lib/tuning";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";

export function Presets() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {SYSTEM_PRESETS.map((preset) => (
        <Card key={preset.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">{preset.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{preset.tagline}</p>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-4">
            <dl className="flex-1 space-y-3">
              {preset.params.map((param) => (
                <div key={param.label} className="border-b pb-3 last:border-0 last:pb-0">
                  <dt className="text-xs text-muted-foreground">{param.label}</dt>
                  <dd className="mt-0.5 font-semibold">{param.value}</dd>
                  {param.note && (
                    <dd className="mt-0.5 text-xs text-muted-foreground">{param.note}</dd>
                  )}
                </div>
              ))}
            </dl>
            <div className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs">
              <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
              <span>{preset.important}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
