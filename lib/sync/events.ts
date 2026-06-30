"use client";

// Evento disparado sempre que o progresso muda no dispositivo (qualquer store).
// O SyncProvider escuta e envia (com debounce) o snapshot para o Supabase.
export const PROGRESS_CHANGED_EVENT = "cm:progress-changed";

export function notifyProgressChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PROGRESS_CHANGED_EVENT));
}
