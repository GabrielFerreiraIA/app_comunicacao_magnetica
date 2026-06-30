"use client";

import { reloadChecklist } from "@/lib/checklist-store";
import { reloadHydration, reloadRest } from "@/lib/voice-care-store";
import { reloadQuiz } from "@/lib/archetype-quiz-store";

// Chaves de localStorage que representam o progresso do usuário.
export const CHECKLIST_KEY = "cm:checklist:v1";
export const STREAK_KEY = "cm:streak:v1";
export const HYDRATION_KEY = "cm:hydration:v1";
export const REST_KEY = "cm:vocalRestTimer:v1";
export const QUIZ_KEY = "cm:archetypeQuiz:v1";

export const SYNC_KEYS = [
  CHECKLIST_KEY,
  STREAK_KEY,
  HYDRATION_KEY,
  REST_KEY,
  QUIZ_KEY,
] as const;

export type Snapshot = Record<string, unknown>;

function readKey(key: string): unknown {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

// Lê todo o progresso do dispositivo num único objeto.
export function collectSnapshot(): Snapshot {
  const out: Snapshot = {};
  for (const key of SYNC_KEYS) {
    const value = readKey(key);
    if (value !== undefined) out[key] = value;
  }
  return out;
}

// Grava o snapshot no localStorage e recarrega os stores (atualiza a UI).
// NÃO dispara evento de "mudou" (os reloads só emitem para os componentes).
export function applySnapshot(snap: Snapshot) {
  if (typeof window === "undefined") return;
  for (const key of SYNC_KEYS) {
    try {
      if (snap[key] === undefined || snap[key] === null) continue;
      window.localStorage.setItem(key, JSON.stringify(snap[key]));
    } catch {
      /* ignora */
    }
  }
  reloadChecklist();
  reloadHydration();
  reloadRest();
  reloadQuiz();
}

// ---- Merge monotônico (nunca perde progresso) ----------------------------
// Usado UMA vez, no primeiro login do dispositivo, para unir o que já existe
// localmente com o que veio da nuvem.

function asObject(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}

function mergeBoolMap(a: unknown, b: unknown): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  for (const src of [asObject(a), asObject(b)]) {
    if (!src) continue;
    for (const [k, val] of Object.entries(src)) {
      if (val) out[k] = true;
    }
  }
  return out;
}

function mergeStreak(a: unknown, b: unknown): unknown {
  const oa = asObject(a);
  const ob = asObject(b);
  if (!oa) return b;
  if (!ob) return a;
  const ca = Number(oa.count ?? 0);
  const cb = Number(ob.count ?? 0);
  if (ca !== cb) return ca > cb ? a : b;
  // mesmo count: pega a data mais recente
  return String(oa.lastDate ?? "") >= String(ob.lastDate ?? "") ? a : b;
}

function mergeHydration(a: unknown, b: unknown): unknown {
  const oa = asObject(a);
  const ob = asObject(b);
  if (!oa) return b;
  if (!ob) return a;
  const da = String(oa.date ?? "");
  const db = String(ob.date ?? "");
  if (da === db) {
    return Number(oa.count ?? 0) >= Number(ob.count ?? 0) ? a : b;
  }
  return da > db ? a : b; // data mais recente vence
}

function mergeRest(a: unknown, b: unknown): unknown {
  const oa = asObject(a);
  const ob = asObject(b);
  const ea = oa && typeof oa.endsAt === "number" ? oa.endsAt : 0;
  const eb = ob && typeof ob.endsAt === "number" ? ob.endsAt : 0;
  return ea >= eb ? a : b; // o timer com término mais à frente vence
}

function mergeQuiz(a: unknown, b: unknown): unknown {
  const oa = asObject(a);
  const ob = asObject(b);
  if (!oa) return b;
  if (!ob) return a;
  const scoresA = asObject(oa.scores) ?? {};
  const scoresB = asObject(ob.scores) ?? {};
  const scores: Record<string, unknown> = { ...scoresB, ...scoresA };
  // une as chaves; em conflito mantém A (local) — ambos são respostas válidas
  for (const k of Object.keys(scoresB)) {
    if (!(k in scoresA)) scores[k] = scoresB[k];
  }
  const step = Math.max(Number(oa.step ?? 0), Number(ob.step ?? 0));
  return { scores, step };
}

export function mergeSnapshots(local: Snapshot, cloud: Snapshot): Snapshot {
  return {
    [CHECKLIST_KEY]: mergeBoolMap(local[CHECKLIST_KEY], cloud[CHECKLIST_KEY]),
    [STREAK_KEY]: mergeStreak(local[STREAK_KEY], cloud[STREAK_KEY]),
    [HYDRATION_KEY]: mergeHydration(local[HYDRATION_KEY], cloud[HYDRATION_KEY]),
    [REST_KEY]: mergeRest(local[REST_KEY], cloud[REST_KEY]),
    [QUIZ_KEY]: mergeQuiz(local[QUIZ_KEY], cloud[QUIZ_KEY]),
  };
}
