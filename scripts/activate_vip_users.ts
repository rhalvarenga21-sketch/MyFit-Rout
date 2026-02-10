
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

const VIP_USERS = [
    'adrianospartano@outlook.com',
    'joaokh67@gmail.com',
    'mellolaura923@gmail.com',
    'rafael_henrique21@hotmail.com',
    'brunaferreirac@hotmail.com'
];

const activateVIPUsers = async () => {
    console.log('🌟 ACTIVATING VIP USERS (FREE PRO ACCESS)\n');
    console.log('Total VIP users:', VIP_USERS.length);
    console.log('─'.repeat(60));

    try {
        // Get all users
        const { data, error } = await supabase.auth.admin.listUsers();

        if (error) {
            console.error('❌ Error fetching users:', error);
            return;
        }

        let activated = 0;
        let alreadyActive = 0;
        let notFound = 0;

        for (const email of VIP_USERS) {
            console.log(`\n📧 Processing: ${email}`);

            const user = data.users.find(u => u.email === email);

            if (!user) {
                console.log('   ❌ User NOT FOUND in database');
                notFound++;
                continue;
            }

            console.log(`   ✅ Found user ID: ${user.id}`);

            // Confirm email if needed
            if (!user.email_confirmed_at) {
                console.log('   🔧 Confirming email...');
                await supabase.auth.admin.updateUserById(user.id, { email_confirm: true });
                console.log('   ✅ Email confirmed');
            }

            // Check current subscription status
            const { data: profile } = await supabase
                .from('profiles')
                .select('subscription, subscription_status, subscription_active')
                .eq('id', user.id)
                .single();

            if (profile?.subscription_active) {
                console.log('   ℹ️  Already has PRO active - skipping');
                alreadyActive++;
                continue;
            }

            // Activate PRO
            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    subscription: 'pro',
                    subscription_status: 'active',
                    subscription_active: true,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (updateError) {
                console.error('   ❌ Error activating PRO:', updateError);
                continue;
            }

            console.log('   ✅ PRO ACTIVATED!');
            activated++;
        }

        console.log('\n' + '═'.repeat(60));
        console.log('📊 SUMMARY:');
        console.log(`   ✅ Newly activated: ${activated}`);
        console.log(`   ℹ️  Already active: ${alreadyActive}`);
        console.log(`   ❌ Not found: ${notFound}`);
        console.log(`   📋 Total processed: ${VIP_USERS.length}`);
        console.log('═'.repeat(60));
        console.log('\n🎉 All VIP users have FREE PRO access!');

    } catch (err) {
        console.error('❌ Exception:', err);
    }
};

activateVIPUsers();
