"use client";

import { useSyncExternalStore } from "react";
import type { ArchetypeQuizScores } from "@/lib/content/archetypes";
import { notifyProgressChanged } from "@/lib/sync/events";

// Store externo do Diagnóstico de Arquétipos (Const 5) — mesmo padrão de checklist-store.ts.
// Persiste as pontuações (0–3 por pilar, 4 pilares por arquétipo) e o passo atual, para retomar
// o quiz de onde parou.

const QUIZ_KEY = "cm:archetypeQuiz:v1";

type QuizState = { scores: ArchetypeQuizScores; step: number };

let state: QuizState = { scores: {}, step: 0 };
let loaded = false;
const listeners = new Set<() => void>();

function load(): QuizState {
  if (typeof window === "undefined") return state;
  if (loaded) return state;
  try {
    const raw = window.localStorage.getItem(QUIZ_KEY);
    state = raw ? (JSON.parse(raw) as QuizState) : { scores: {}, step: 0 };
  } catch {
    state = { scores: {}, step: 0 };
  }
  loaded = true;
  return state;
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(QUIZ_KEY, JSON.stringify(state));
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
  const onStorage = (e: StorageEvent) => {
    if (e.key === QUIZ_KEY) {
      try {
        state = e.newValue ? (JSON.parse(e.newValue) as QuizState) : { scores: {}, step: 0 };
      } catch {
        state = { scores: {}, step: 0 };
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

function getSnapshot(): QuizState {
  return load();
}

function getServerSnapshot(): QuizState {
  return { scores: {}, step: 0 };
}

export function setArchetypeScore(archetypeId: string, pillarIndex: 0 | 1 | 2 | 3, value: number) {
  load();
  const current = state.scores[archetypeId] ?? [0, 0, 0, 0];
  const next = [...current] as [number, number, number, number];
  next[pillarIndex] = value;
  state = { ...state, scores: { ...state.scores, [archetypeId]: next } };
  persist();
  emit();
}

export function setQuizStep(step: number) {
  load();
  state = { ...state, step };
  persist();
  emit();
}

export function resetArchetypeQuiz() {
  load();
  state = { scores: {}, step: 0 };
  persist();
  emit();
}

export function useArchetypeQuiz(): QuizState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function reloadQuiz() {
  loaded = false;
  load();
  emit();
}
