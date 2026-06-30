"use client";

import { useSyncExternalStore } from "react";
import { hydrationGoalGlasses } from "@/lib/content/vocal-care";
import { notifyProgressChanged } from "@/lib/sync/events";

// Stores externos para os widgets do Pilar Voz: hidratação diária (reseta à meia-noite)
// e temporizador de repouso vocal. Mesmo padrão de checklist-store.ts (localStorage + sync entre abas).

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// --- Hidratação ---

const HYDRATION_KEY = "cm:hydration:v1";

type HydrationState = { date: string; count: number };

let hydrationState: HydrationState = { date: "", count: 0 };
let hydrationLoaded = false;
const hydrationListeners = new Set<() => void>();

function loadHydration(): HydrationState {
  if (typeof window === "undefined") return hydrationState;
  if (hydrationLoaded) return hydrationState;
  try {
    const raw = window.localStorage.getItem(HYDRATION_KEY);
    const parsed = raw ? (JSON.parse(raw) as HydrationState) : null;
    hydrationState = parsed && parsed.date === todayStr() ? parsed : { date: todayStr(), count: 0 };
  } catch {
    hydrationState = { date: todayStr(), count: 0 };
  }
  hydrationLoaded = true;
  return hydrationState;
}

function persistHydration() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(HYDRATION_KEY, JSON.stringify(hydrationState));
  } catch {
    /* quota/private mode — ignora */
  }
  notifyProgressChanged();
}

function emitHydration() {
  for (const l of hydrationListeners) l();
}

function subscribeHydration(listener: () => void): () => void {
  if (!hydrationLoaded) loadHydration();
  hydrationListeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === HYDRATION_KEY) {
      try {
        hydrationState = e.newValue ? (JSON.parse(e.newValue) as HydrationState) : { date: todayStr(), count: 0 };
      } catch {
        hydrationState = { date: todayStr(), count: 0 };
      }
      emitHydration();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    hydrationListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getHydrationSnapshot(): HydrationState {
  return loadHydration();
}

function getHydrationServerSnapshot(): HydrationState {
  return { date: "", count: 0 };
}

export function addGlass(delta: number) {
  loadHydration();
  const today = todayStr();
  const base = hydrationState.date === today ? hydrationState.count : 0;
  const next = Math.max(0, Math.min(hydrationGoalGlasses + 4, base + delta));
  hydrationState = { date: today, count: next };
  persistHydration();
  emitHydration();
}

export function useHydration(): HydrationState {
  return useSyncExternalStore(subscribeHydration, getHydrationSnapshot, getHydrationServerSnapshot);
}

export function reloadHydration() {
  hydrationLoaded = false;
  loadHydration();
  emitHydration();
}

// --- Temporizador de repouso vocal ---

const REST_TIMER_KEY = "cm:vocalRestTimer:v1";

type RestTimerState = { endsAt: number | null };

let restState: RestTimerState = { endsAt: null };
let restLoaded = false;
const restListeners = new Set<() => void>();

function loadRest(): RestTimerState {
  if (typeof window === "undefined") return restState;
  if (restLoaded) return restState;
  try {
    const raw = window.localStorage.getItem(REST_TIMER_KEY);
    restState = raw ? (JSON.parse(raw) as RestTimerState) : { endsAt: null };
  } catch {
    restState = { endsAt: null };
  }
  restLoaded = true;
  return restState;
}

function persistRest() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(REST_TIMER_KEY, JSON.stringify(restState));
  } catch {
    /* quota/private mode — ignora */
  }
  notifyProgressChanged();
}

function emitRest() {
  for (const l of restListeners) l();
}

function subscribeRest(listener: () => void): () => void {
  if (!restLoaded) loadRest();
  restListeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === REST_TIMER_KEY) {
      try {
        restState = e.newValue ? (JSON.parse(e.newValue) as RestTimerState) : { endsAt: null };
      } catch {
        restState = { endsAt: null };
      }
      emitRest();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    restListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getRestSnapshot(): RestTimerState {
  return loadRest();
}

function getRestServerSnapshot(): RestTimerState {
  return { endsAt: null };
}

export function startVocalRest(minutes: number) {
  loadRest();
  restState = { endsAt: Date.now() + minutes * 60_000 };
  persistRest();
  emitRest();
}

export function cancelVocalRest() {
  loadRest();
  restState = { endsAt: null };
  persistRest();
  emitRest();
}

export function useVocalRestTimer(): RestTimerState {
  return useSyncExternalStore(subscribeRest, getRestSnapshot, getRestServerSnapshot);
}

export function reloadRest() {
  restLoaded = false;
  loadRest();
  emitRest();
}
