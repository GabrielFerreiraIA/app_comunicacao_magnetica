"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { PROGRESS_CHANGED_EVENT } from "@/lib/sync/events";
import {
  collectSnapshot,
  applySnapshot,
  mergeSnapshots,
  type Snapshot,
} from "@/lib/sync/snapshot";

type SyncContextValue = {
  email: string | null;
  ready: boolean;
  signOut: () => Promise<void>;
};

const SyncContext = createContext<SyncContextValue>({
  email: null,
  ready: false,
  signOut: async () => {},
});

export function useSync() {
  return useContext(SyncContext);
}

const DEBOUNCE_MS = 1200;

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const supabaseRef = useRef(createClient());
  const userIdRef = useRef<string | null>(null);
  const syncedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const supabase = supabaseRef.current;
    let mounted = true;

    async function pushToCloud(snapshot: Snapshot) {
      const uid = userIdRef.current;
      if (!uid) return;
      await supabase.from("user_progress").upsert(
        { user_id: uid, data: snapshot, updated_at: new Date().toISOString() },
        { onConflict: "user_id" },
      );
    }

    async function initialSync(uid: string) {
      userIdRef.current = uid;
      syncedRef.current = false;
      try {
        const { data } = await supabase
          .from("user_progress")
          .select("data")
          .eq("user_id", uid)
          .maybeSingle();
        const cloud = (data?.data as Snapshot) ?? {};
        const local = collectSnapshot();
        const merged = mergeSnapshots(local, cloud);
        applySnapshot(merged);
        await pushToCloud(merged);
      } catch {
        // offline / falha de rede — segue com o que há localmente; sincroniza depois.
      } finally {
        syncedRef.current = true;
      }
    }

    function flush() {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (!syncedRef.current || !userIdRef.current) return;
      void pushToCloud(collectSnapshot());
    }

    function onProgressChanged() {
      if (!syncedRef.current || !userIdRef.current) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        void pushToCloud(collectSnapshot());
      }, DEBOUNCE_MS);
    }

    function onVisibility() {
      if (document.visibilityState === "hidden") flush();
    }

    // Sessão atual (rápido, lido do cookie/local pelo @supabase/ssr).
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const user = data.session?.user;
      if (user) {
        setEmail(user.email ?? null);
        void initialSync(user.id);
      }
      setReady(true);
    });

    const { data: authSub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === "SIGNED_OUT") {
        syncedRef.current = false;
        userIdRef.current = null;
        setEmail(null);
        return;
      }
      const user = session?.user;
      if (user && userIdRef.current !== user.id) {
        setEmail(user.email ?? null);
        void initialSync(user.id);
      }
    });

    window.addEventListener(PROGRESS_CHANGED_EVENT, onProgressChanged);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);

    return () => {
      mounted = false;
      authSub.subscription.unsubscribe();
      window.removeEventListener(PROGRESS_CHANGED_EVENT, onProgressChanged);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function signOut() {
    await supabaseRef.current.auth.signOut();
    window.location.assign("/login");
  }

  return (
    <SyncContext.Provider value={{ email, ready, signOut }}>
      {children}
    </SyncContext.Provider>
  );
}
