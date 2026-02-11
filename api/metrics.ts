
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // Security Check - Only env var allowed
    const apiKey = req.headers['x-api-key'] || req.query.key;
    if (!process.env.METRICS_API_KEY || apiKey !== process.env.METRICS_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // Em produção idealmente usar Service Role para ver tudo

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ error: 'Missing DB config' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Get Checkout Attempts (Last 24h)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: leadEvents, error: leadError } = await supabase
        .from('checkout_logs')
        .select('*')
        .gte('created_at', oneDayAgo);

    if (leadError) {
        return res.status(500).json({ error: leadError.message, hint: "Table checkout_logs might be missing" });
    }

    // 2. Aggregate Data
    const stats = {
        period: 'Last 24 Hours',
        generated_at: new Date().toISOString(),
        funnel: {
            checkout_clicks: leadEvents.length,
            unique_users: new Set(leadEvents.map(e => e.user_id)).size,
        },
        leads: leadEvents.map(e => ({
            user_id: e.user_id,
            plan: e.plan,
            currency: e.currency,
            time: e.created_at
        }))
    };

    // 3. (Optional) Check conversions
    // To do this we would need to check 'profiles' table for these users 
    // and see if subscription_active is true.
    // const { data: profiles } = await supabase.from('profiles').select('id, subscription_active, email').in('id', stats.leads.map(l => l.user_id));

    // For now return the leads for the Clawbot to process
    return res.status(200).json(stats);
}
