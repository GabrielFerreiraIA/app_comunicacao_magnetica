"use client";

import { useEffect, useState } from "react";
import { Check, TimerReset } from "lucide-react";
import { vocalRestTrigger } from "@/lib/content/vocal-care";
import { cancelVocalRest, startVocalRest, useVocalRestTimer } from "@/lib/voice-care-store";

function formatMMSS(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function VocalRestTimer() {
  const { endsAt } = useVocalRestTimer();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!endsAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const remainingMs = endsAt ? endsAt - now : 0;
  const active = !!endsAt && remainingMs > 0;
  const done = !!endsAt && remainingMs <= 0;
  const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));

  return (
    <div className="rounded-[24px] border border-purple-200/25 bg-card/65 backdrop-blur-md p-5 shadow-xs">
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-orchid">
          <TimerReset className="size-4" />
        </span>
        <p className="eyebrow !text-[8.5px] text-secondary-foreground font-bold tracking-widest">
          Repouso Vocal
        </p>
      </div>

      {!endsAt && (
        <>
          <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
            Depois de uma reunião ou palestra longa (mais de {vocalRestTrigger.minutesThreshold} minutos falando), reserve um
            período de silêncio absoluto para a voz se regenerar.
          </p>
          <button
            type="button"
            onClick={() => startVocalRest(vocalRestTrigger.restMinMinutes)}
            className="mt-3 w-full rounded-xl bg-gold-gradient py-2.5 text-xs font-bold tracking-wide text-primary-foreground shadow-sm active:scale-[0.98]"
          >
            Tive uma sessão longa — iniciar {vocalRestTrigger.restMinMinutes} min
          </button>
        </>
      )}

      {active && (
        <div className="mt-3 text-center">
          <p className="font-display text-3xl font-extrabold tabular-nums text-gold-bright">
            {formatMMSS(remainingSeconds)}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">Silêncio absoluto — nem sussurre.</p>
          <button
            type="button"
            onClick={cancelVocalRest}
            className="mt-3 text-[11px] font-semibold text-muted-foreground underline underline-offset-2"
          >
            Cancelar
          </button>
        </div>
      )}

      {done && (
        <div className="mt-3 flex flex-col items-center gap-2 text-center">
          <span className="flex size-9 items-center justify-center rounded-full bg-success/10 text-success">
            <Check className="size-4.5" strokeWidth={2.5} />
          </span>
          <p className="text-[12.5px] font-semibold text-[#1c0d2b]">Repouso concluído. Sua voz agradece.</p>
          <button
            type="button"
            onClick={cancelVocalRest}
            className="rounded-xl border border-purple-200/20 px-4 py-1.5 text-[11px] font-bold text-muted-foreground"
          >
            Concluir
          </button>
        </div>
      )}
    </div>
  );
}
