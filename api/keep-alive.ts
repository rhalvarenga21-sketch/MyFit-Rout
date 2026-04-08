import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const startTime = Date.now();

  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ KEEP-ALIVE: Variáveis de ambiente faltando");
      return res.status(500).json({
        status: "error",
        message: "Missing environment variables",
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Ping no banco
    const { data, error, count } = await supabase
      .from("user_subscriptions")
      .select("id", { count: "exact" })
      .limit(1);

    if (error) {
      // Fallback: tenta via auth
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1,
      });

      if (authError) {
        throw new Error(`DB: ${error.message}, Auth: ${authError.message}`);
      }

      const elapsed = Date.now() - startTime;
      console.log(`✅ KEEP-ALIVE OK (auth) | ${elapsed}ms | ${new Date().toISOString()}`);

      return res.status(200).json({
        status: "alive",
        supabase: "connected",
        method: "auth",
        timestamp: new Date().toISOString(),
        elapsed_ms: elapsed,
      });
    }

    const elapsed = Date.now() - startTime;
    console.log(`✅ KEEP-ALIVE OK (DB) | ${count ?? 0} rows | ${elapsed}ms | ${new Date().toISOString()}`);

    return res.status(200).json({
      status: "alive",
      supabase: "connected",
      method: "database",
      rowCount: count ?? 0,
      timestamp: new Date().toISOString(),
      elapsed_ms: elapsed,
    });

  } catch (err: unknown) {
    const elapsed = Date.now() - startTime;
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`❌ KEEP-ALIVE FALHOU | ${elapsed}ms | ${message}`);

    return res.status(500).json({
      status: "error",
      supabase: "disconnected",
      error: message,
      timestamp: new Date().toISOString(),
      elapsed_ms: elapsed,
    });
  }
}