import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const getFullUserData = async () => {
    console.log('🔍 FULL DATA CHECK for: rafael_henrique21@hotmail.com\n');

    try {
        const userId = '4b6e3087-d04d-4129-8018-04ff53c56742';

        // Get COMPLETE profile data
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (profileError) {
            console.error('❌ Error:', profileError);
            return;
        }

        console.log('📊 COMPLETE PROFILE DATA:');
        console.log('=====================================');
        console.log(JSON.stringify(profile, null, 2));
        console.log('=====================================\n');

        console.log('📋 SUMMARY:');
        console.log('   Name:', profile.name);
        console.log('   Email:', profile.email);
        console.log('   Age:', profile.age);
        console.log('   Weight:', profile.weight);
        console.log('   Height:', profile.height);
        console.log('   Goal:', profile.goal);
        console.log('   Level:', profile.level);
        console.log('   Activity Level:', profile.activity_level);
        console.log('   Injuries:', profile.injuries);
        console.log('   Training Days:', profile.training_days);
        console.log('   Custom Schedule:', profile.custom_schedule ? 'YES' : 'NO');
        console.log('   Completed Days:', profile.completed_days?.length || 0);
        console.log('   Subscription:', profile.subscription);
        console.log('   Subscription Active:', profile.subscription_active);
        console.log('   Created At:', profile.created_at);
        console.log('   Updated At:', profile.updated_at);

    } catch (err) {
        console.error('❌ Exception:', err);
    }
};

getFullUserData();
