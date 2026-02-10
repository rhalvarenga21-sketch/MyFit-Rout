
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Using service role key to access auth admin API
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const checkUser = async () => {
    console.log('🔍 Checking for user: rafael_henrique21@hotmail.com\n');

    try {
        // Get user by email using admin API
        const { data, error } = await supabase.auth.admin.listUsers();

        if (error) {
            console.error('❌ Error fetching users:', error);
            return;
        }

        const targetUser = data.users.find(u => u.email === 'rafael_henrique21@hotmail.com');

        if (targetUser) {
            console.log('✅ User FOUND!');
            console.log('📧 Email:', targetUser.email);
            console.log('🆔 User ID:', targetUser.id);
            console.log('📅 Created:', new Date(targetUser.created_at).toLocaleString());
            console.log('✉️ Email Confirmed:', targetUser.email_confirmed_at ? 'YES' : 'NO');
            console.log('🔐 Last Sign In:', targetUser.last_sign_in_at ? new Date(targetUser.last_sign_in_at).toLocaleString() : 'Never');
        } else {
            console.log('❌ User NOT FOUND in database');
            console.log('💡 This email does not have an account yet.');
            console.log('📝 User needs to SIGN UP first.');
        }

        console.log(`\n📊 Total users in database: ${data.users.length}`);

    } catch (err) {
        console.error('❌ Exception:', err);
    }
};

checkUser();
