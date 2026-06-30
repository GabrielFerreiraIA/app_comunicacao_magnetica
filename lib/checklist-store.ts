"use client";

import { useSyncExternalStore } from "react";
import { notifyProgressChanged } from "@/lib/sync/events";

// Store externo simples para o estado dos checklists.
// Persiste em localStorage e mantém Home (progresso) e telas dos pilares em sincronia.

const STORAGE_KEY = "cm:checklist:v1";

type State = Record<string, boolean>;

let state: State = {};
let loaded = false;
const listeners = new Set<() => void>();

function load(): State {
  if (typeof window === "undefined") return {};
  if (loaded) return state;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    state = raw ? (JSON.parse(raw) as State) : {};
  } catch {
    state = {};
  }
  loaded = true;
  return state;
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota/private mode — ignora */
  }
  notifyProgressChanged();
}

function emit() {
  for (const l of listeners) l();
}

function subscribe(listener: () => void): () => void {
  if (!loaded) load();
  listeners.add(listener);
  // Sincroniza entre abas
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      try {
        state = e.newValue ? (JSON.parse(e.newValue) as State) : {};
      } catch {
        state = {};
      }
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): State {
  return load();
}

function getServerSnapshot(): State {
  return {};
}

const STREAK_KEY = "cm:streak:v1";

export type Streak = {
  count: number;
  lastDate: string; // formato YYYY-MM-DD
};

function getLocalDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDaysDiff(dateStr1: string, dateStr2: string): number {
  const d1 = new Date(dateStr1 + "T00:00:00");
  const d2 = new Date(dateStr2 + "T00:00:00");
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getStreak(): Streak {
  if (typeof window === "undefined") return { count: 0, lastDate: "" };
  try {
    const raw = window.localStorage.getItem(STREAK_KEY);
    if (raw) {
      const data = JSON.parse(raw) as Streak;
      const todayStr = getLocalDateString();
      const lastStr = data.lastDate;
      if (lastStr && lastStr !== todayStr) {
        const diffDays = getDaysDiff(lastStr, todayStr);
        if (diffDays > 1) {
          // Passou mais de um dia, quebra o streak
          return { count: 0, lastDate: lastStr };
        }
      }
      return data;
    }
  } catch {
    // ignora
  }
  return { count: 0, lastDate: "" };
}

export function checkStreakOnComplete(newValue: boolean) {
  if (!newValue || typeof window === "undefined") return;
  try {
    const streak = getStreak();
    const today = getLocalDateString();
    
    if (streak.lastDate === today) {
      // Já praticou hoje
      return;
    }
    
    let newCount = 1;
    if (streak.lastDate) {
      const diff = getDaysDiff(streak.lastDate, today);
      if (diff === 1) {
        // Praticou ontem, incrementa streak
        newCount = streak.count + 1;
      }
    }
    
    const newStreak: Streak = { count: newCount, lastDate: today };
    window.localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));
    notifyProgressChanged();
  } catch {
    // ignora
  }
}

export function toggleItem(id: string) {
  load();
  const newVal = !state[id];
  state = { ...state, [id]: newVal };
  persist();
  checkStreakOnComplete(newVal);
  emit();
}

export function setItem(id: string, value: boolean) {
  load();
  state = { ...state, [id]: value };
  persist();
  checkStreakOnComplete(value);
  emit();
}

export function resetProgress() {
  load();
  state = {};
  persist();
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STREAK_KEY);
    } catch {
      // ignora
    }
  }
  emit();
}

export function useChecklistState(): State {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Recarrega o estado a partir do localStorage (após o SyncProvider baixar da nuvem)
// e notifica os componentes. Não dispara evento de "mudou" (evita eco de volta à nuvem).
export function reloadChecklist() {
  loaded = false;
  load();
  emit();
}

// Conta quantos ids da lista estão marcados.
export function countChecked(checked: State, ids: string[]): number {
  return ids.reduce((acc, id) => acc + (checked[id] ? 1 : 0), 0);
}
