
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const checkSubscription = async () => {
    console.log('🔍 Checking subscription for: rafael_henrique21@hotmail.com\n');

    try {
        const userId = '4b6e3087-d04d-4129-8018-04ff53c56742';

        // Check user profile
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (profileError) {
            console.error('❌ Error fetching profile:', profileError);
        } else {
            console.log('👤 PROFILE DATA:');
            console.log('   Name:', profile.name || 'Not set');
            console.log('   Subscription Status:', profile.subscription_status || 'none');
            console.log('   Subscription Tier:', profile.subscription_tier || 'none');
            console.log('   Trial Ends:', profile.trial_ends_at || 'N/A');
            console.log('   Stripe Customer ID:', profile.stripe_customer_id || 'N/A');
        }

        // Check subscriptions table
        const { data: subscriptions, error: subError } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId);

        if (subError) {
            console.error('\n❌ Error fetching subscriptions:', subError);
        } else {
            console.log('\n💳 SUBSCRIPTIONS:');
            if (subscriptions && subscriptions.length > 0) {
                subscriptions.forEach((sub, idx) => {
                    console.log(`\n   Subscription ${idx + 1}:`);
                    console.log('   Status:', sub.status);
                    console.log('   Tier:', sub.tier);
                    console.log('   Started:', sub.created_at);
                    console.log('   Stripe Sub ID:', sub.stripe_subscription_id || 'N/A');
                });
            } else {
                console.log('   ⚠️ No subscriptions found');
            }
        }

    } catch (err) {
        console.error('❌ Exception:', err);
    }
};

checkSubscription();
