"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Mail, Lock, ArrowRight, LifeBuoy } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { createClient } from "@/lib/supabase/client";
import { siteConfig, whatsappLink, suporteMessage } from "@/lib/config";

type Mode = "login" | "signup";

function LoginInner() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/";

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  async function signIn(em: string, pw: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email: em,
      password: pw,
    });
    if (error) {
      throw new Error(
        "E-mail ou senha incorretos. Confira os dados ou crie seu acesso.",
      );
    }
    // Recarrega para o middleware enxergar a sessão recém-criada.
    window.location.assign(nextPath);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const em = email.trim().toLowerCase();
    const pw = password;

    if (!em || !em.includes("@")) {
      setError("Informe um e-mail válido.");
      return;
    }
    if (pw.length < 6) {
      setError("A senha precisa ter ao menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await signIn(em, pw);
        return;
      }

      // Primeiro acesso: valida a compra e cria a conta já confirmada.
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: em, password: pw }),
      });

      if (res.status === 409) {
        setMode("login");
        setError("Você já tem acesso. Faça login com sua senha.");
        setLoading(false);
        return;
      }
      if (res.status === 403) {
        setError(
          "Não encontramos uma compra com esse e-mail. Use o mesmo e-mail da compra ou fale com o suporte.",
        );
        setLoading(false);
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body?.error || "Não foi possível criar seu acesso. Tente novamente.");
        setLoading(false);
        return;
      }

      // Conta criada -> entra direto.
      await signIn(em, pw);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo deu errado. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-7 py-10">
      {/* Marca */}
      <div className="flex flex-col items-center text-center">
        <span className="flex size-16 items-center justify-center rounded-3xl bg-gold-gradient text-primary-foreground shadow-lg shadow-gold/20">
          <BrandMark size={30} />
        </span>
        <p className="eyebrow mt-5 !text-[9px] tracking-[0.24em] text-[#8954c2] font-extrabold uppercase">
          {siteConfig.author}
        </p>
        <h1 className="mt-1.5 font-display text-[26px] font-extrabold leading-tight text-[#1c0d2b]">
          {siteConfig.name}
        </h1>
        <p className="mt-2 text-[12.5px] text-muted-foreground leading-relaxed">
          {mode === "login"
            ? "Entre com o e-mail da sua compra para continuar sua jornada."
            : "Primeiro acesso? Use o mesmo e-mail da compra e crie sua senha."}
        </p>
      </div>

      {/* Alternador Entrar / Primeiro acesso */}
      <div className="mt-8 grid grid-cols-2 gap-1 rounded-2xl border border-purple-200/40 bg-white/60 p-1 backdrop-blur-md shadow-sm">
        {(["login", "signup"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError(null);
            }}
            className={
              "rounded-xl py-2.5 text-[12.5px] font-bold transition-all " +
              (mode === m
                ? "bg-gold-gradient text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground")
            }
          >
            {m === "login" ? "Entrar" : "Primeiro acesso"}
          </button>
        ))}
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
        <label className="flex items-center gap-3 rounded-2xl border border-purple-200/40 bg-card/80 px-4 py-3.5 shadow-sm focus-within:border-gold/50 transition-colors">
          <Mail className="size-4.5 shrink-0 text-gold-bright" />
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="E-mail da compra"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground/70 outline-none"
            required
          />
        </label>

        <label className="flex items-center gap-3 rounded-2xl border border-purple-200/40 bg-card/80 px-4 py-3.5 shadow-sm focus-within:border-gold/50 transition-colors">
          <Lock className="size-4.5 shrink-0 text-gold-bright" />
          <input
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            placeholder={mode === "login" ? "Sua senha" : "Crie uma senha (mín. 6)"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground/70 outline-none"
            required
            minLength={6}
          />
        </label>

        {error && (
          <p className="rounded-xl border border-destructive/25 bg-destructive/5 px-3.5 py-2.5 text-[12px] font-medium text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-gradient py-3.5 text-[14px] font-extrabold text-primary-foreground shadow-md shadow-gold/20 transition-all active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="size-4.5 animate-spin" />
          ) : (
            <>
              {mode === "login" ? "Entrar" : "Liberar meu acesso"}
              <ArrowRight className="size-4.5" />
            </>
          )}
        </button>
      </form>

      {/* Suporte */}
      <a
        href={whatsappLink(suporteMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center justify-center gap-2 text-[11.5px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <LifeBuoy className="size-4 text-gold-bright" />
        Não consegue acessar? Fale com o suporte
      </a>

      <p className="mt-8 text-center text-[9.5px] font-bold uppercase tracking-wider text-muted-foreground/70">
        {siteConfig.name} · por {siteConfig.author}
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
