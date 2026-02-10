
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // Configurar CORS para permitir que a landing page chame esta API
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email, plan, price, currency } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ error: 'Server Config Error' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Salvar o Lead
    const { error } = await supabase.from('checkout_logs').insert({
        externals: email,
        plan,
        price,
        currency,
        status: 'lead_captured',
        created_at: new Date().toISOString()
    });

    if (error) {
        console.error('Lead Capture Error:', error);
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, message: 'Lead secured' });
}
