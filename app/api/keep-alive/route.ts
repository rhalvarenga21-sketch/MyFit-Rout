// =============================================================
// MyFitRout - Supabase Keep-Alive Endpoint
// Previne pausa do Supabase Free Tier por inatividade (7 dias)
// Roda via Vercel Cron (a cada 5 dias) + GitHub Actions (a cada 4 dias)
// =============================================================

import { createClient } from "@supabase/supabase-js";

// Aceita GET (teste manual / GitHub Actions) e POST (Vercel Cron)
export async function GET() {
  return handleKeepAlive();
}

export async function POST() {
  return handleKeepAlive();
}

async function handleKeepAlive() {
  const startTime = Date.now();

  try {
    // Validar variáveis de ambiente
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ KEEP-ALIVE: Variáveis de ambiente faltando", {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
      });

      return new Response(
        JSON.stringify({
          status: "error",
          message: "Missing environment variables",
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Criar cliente Supabase com service role (bypass RLS)
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Ping 1: Query simples no banco (mantém DB ativo)
    const { data, error, count } = await supabase
      .from("user_subscriptions")
      .select("id", { count: "exact" })
      .limit(1);

    if (error) {
      // Se a tabela não existir, tenta outra query genérica
      console.warn("⚠️ KEEP-ALIVE: Tabela user_subscriptions não acessível, tentando auth...");

      const { data: authData, error: authError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1,
      });

      if (authError) {
        throw new Error(`DB error: ${error.message}, Auth error: ${authError.message}`);
      }

      const elapsed = Date.now() - startTime;
      console.log(`✅ KEEP-ALIVE OK (via auth) | ${elapsed}ms | ${new Date().toISOString()}`);

      return new Response(
        JSON.stringify({
          status: "alive",
          supabase: "connected",
          method: "auth",
          users: authData?.users?.length ?? 0,
          timestamp: new Date().toISOString(),
          elapsed_ms: elapsed,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Sucesso via query no banco
    const elapsed = Date.now() - startTime;
    console.log(
      `✅ KEEP-ALIVE OK (via DB) | ${count ?? 0} registros | ${elapsed}ms | ${new Date().toISOString()}`
    );

    return new Response(
      JSON.stringify({
        status: "alive",
        supabase: "connected",
        method: "database",
        rowCount: count ?? 0,
        timestamp: new Date().toISOString(),
        elapsed_ms: elapsed,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: unknown) {
    const elapsed = Date.now() - startTime;
    const message = err instanceof Error ? err.message : "Unknown error";

    console.error(`❌ KEEP-ALIVE FALHOU | ${elapsed}ms | ${message}`);

    return new Response(
      JSON.stringify({
        status: "error",
        supabase: "disconnected",
        error: message,
        timestamp: new Date().toISOString(),
        elapsed_ms: elapsed,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}