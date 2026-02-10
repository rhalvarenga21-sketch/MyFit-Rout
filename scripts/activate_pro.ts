
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const activatePRO = async () => {
    console.log('🚀 Activating PRO plan (CORRECT FIELDS) for: rafael_henrique21@hotmail.com\n');

    try {
        const userId = '4b6e3087-d04d-4129-8018-04ff53c56742';

        // Update profile with CORRECT field names
        const { data, error } = await supabase
            .from('profiles')
            .update({
                subscription: 'pro',
                subscription_status: 'active',
                subscription_active: true,  // THIS IS THE KEY FIELD!
                updated_at: new Date().toISOString()
            })
            .eq('id', userId)
            .select();

        if (error) {
            console.error('❌ Error activating PRO:', error);
            return;
        }

        console.log('✅ PRO PLAN ACTIVATED (ALL FIELDS SET)!');
        console.log('📧 User: rafael_henrique21@hotmail.com');
        console.log('🎯 Subscription: PRO');
        console.log('✨ Status: ACTIVE');
        console.log('🔓 subscription_active: TRUE');
        console.log('\n🚀 NOW do logout/login at myfitrout.com!');

    } catch (err) {
        console.error('❌ Exception:', err);
    }
};

activatePRO();
