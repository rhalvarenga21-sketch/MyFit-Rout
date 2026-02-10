
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const confirmUser = async () => {
    console.log('🔧 Confirming email for: rafael_henrique21@hotmail.com\n');

    try {
        const userId = '4b6e3087-d04d-4129-8018-04ff53c56742';

        // Update user to confirm email
        const { data, error } = await supabase.auth.admin.updateUserById(
            userId,
            { email_confirm: true }
        );

        if (error) {
            console.error('❌ Error confirming user:', error);
            return;
        }

        console.log('✅ Email CONFIRMED successfully!');
        console.log('📧 User can now login with:');
        console.log('   Email: rafael_henrique21@hotmail.com');
        console.log('   Password: (your password)');
        console.log('\n🚀 Try logging in now at https://myfitrout.com');

    } catch (err) {
        console.error('❌ Exception:', err);
    }
};

confirmUser();
