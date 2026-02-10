
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

const checkAndActivateBruna = async () => {
    console.log('🔍 Checking for user: brunaferreirac@hotmail.com\n');

    try {
        // Get user by email using admin API
        const { data, error } = await supabase.auth.admin.listUsers();

        if (error) {
            console.error('❌ Error fetching users:', error);
            return;
        }

        const brunaUser = data.users.find(u => u.email === 'brunaferreirac@hotmail.com');

        if (!brunaUser) {
            console.log('❌ User NOT FOUND in database');
            console.log('💡 This email does not have an account yet.');
            return;
        }

        console.log('✅ User FOUND!');
        console.log('📧 Email:', brunaUser.email);
        console.log('🆔 User ID:', brunaUser.id);
        console.log('📅 Created:', new Date(brunaUser.created_at).toLocaleString());
        console.log('✉️ Email Confirmed:', brunaUser.email_confirmed_at ? 'YES' : 'NO');

        // Confirm email if not confirmed
        if (!brunaUser.email_confirmed_at) {
            console.log('\n🔧 Confirming email...');
            const { error: confirmError } = await supabase.auth.admin.updateUserById(
                brunaUser.id,
                { email_confirm: true }
            );
            if (confirmError) {
                console.error('❌ Error confirming email:', confirmError);
            } else {
                console.log('✅ Email confirmed!');
            }
        }

        // Activate PRO plan
        console.log('\n🚀 Activating PRO plan...');
        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                subscription: 'pro',
                subscription_status: 'active',
                subscription_active: true,
                updated_at: new Date().toISOString()
            })
            .eq('id', brunaUser.id);

        if (updateError) {
            console.error('❌ Error activating PRO:', updateError);
            return;
        }

        console.log('✅ PRO PLAN ACTIVATED!');
        console.log('🎯 User ID:', brunaUser.id);
        console.log('📧 Email:', brunaUser.email);
        console.log('\n✨ Ready to send update email!');

        return brunaUser.id;

    } catch (err) {
        console.error('❌ Exception:', err);
    }
};

checkAndActivateBruna();
