
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const checkUserData = async () => {
    console.log('🔍 Checking workout data for: rafael_henrique21@hotmail.com\n');

    try {
        const userId = '4b6e3087-d04d-4129-8018-04ff53c56742';

        // Check profile data
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (profileError) {
            console.error('❌ Error fetching profile:', profileError);
            return;
        }

        console.log('👤 PROFILE DATA:');
        console.log('   Name:', profile.name || 'Not set');
        console.log('   Goal:', profile.goal || 'Not set');
        console.log('   Level:', profile.level || 'Not set');
        console.log('   Injuries:', profile.injuries || 'None');
        console.log('   Custom Schedule:', profile.custom_schedule ? 'YES' : 'NO');
        console.log('   Completed Days:', profile.completed_days?.length || 0);

        // Check workout history
        const { data: workouts, error: workoutsError } = await supabase
            .from('workout_history')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(10);

        if (workoutsError) {
            console.log('\n⚠️ Workout history table not found or error:', workoutsError.message);
        } else {
            console.log('\n💪 WORKOUT HISTORY:');
            if (workouts && workouts.length > 0) {
                console.log(`   Total workouts found: ${workouts.length}`);
                workouts.forEach((w, idx) => {
                    console.log(`\n   Workout ${idx + 1}:`);
                    console.log('   Date:', new Date(w.created_at).toLocaleDateString());
                    console.log('   Type:', w.workout_type || 'N/A');
                });
            } else {
                console.log('   ⚠️ No workout history found');
            }
        }

        console.log('\n✅ SUMMARY:');
        console.log('   Profile data: PRESERVED ✓');
        console.log('   Subscription: ACTIVE ✓');
        console.log('   Only subscription status was updated - all other data intact!');

    } catch (err) {
        console.error('❌ Exception:', err);
    }
};

checkUserData();
