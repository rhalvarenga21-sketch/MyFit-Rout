import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const investigateWorkoutLogs = async () => {
    console.log('🔍 INVESTIGATING WORKOUT LOGS FOR: rafael_henrique21@hotmail.com\n');

    try {
        const userId = '4b6e3087-d04d-4129-8018-04ff53c56742';

        // Check workout_logs table
        console.log('📊 Checking workout_logs table...');
        const { data: logs, error: logsError } = await supabase
            .from('workout_logs')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (logsError) {
            console.log('❌ Error:', logsError.message);
        } else {
            console.log(`✅ Found ${logs?.length || 0} workout logs`);
            if (logs && logs.length > 0) {
                console.log('\n📋 WORKOUT LOGS:');
                logs.forEach((log, idx) => {
                    console.log(`\n   ${idx + 1}. ${log.workout_name || 'Unnamed'}`);
                    console.log(`      Date: ${new Date(log.created_at).toLocaleDateString()}`);
                    console.log(`      Duration: ${log.duration_minutes || 0} min`);
                    console.log(`      Sets: ${log.total_sets || 0}`);
                    console.log(`      Reps: ${log.total_reps || 0}`);
                    console.log(`      Weight: ${log.total_weight_lifted || 0} kg`);
                });
            } else {
                console.log('⚠️ NO WORKOUT LOGS FOUND IN DATABASE');
            }
        }

        // Check workout_history table (if exists)
        console.log('\n📊 Checking workout_history table...');
        const { data: history, error: historyError } = await supabase
            .from('workout_history')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (historyError) {
            console.log('❌ Error:', historyError.message);
        } else {
            console.log(`✅ Found ${history?.length || 0} workout history entries`);
            if (history && history.length > 0) {
                console.log('\n📋 WORKOUT HISTORY:');
                history.forEach((h, idx) => {
                    console.log(`\n   ${idx + 1}. ${h.workout_name || 'Unnamed'}`);
                    console.log(`      Date: ${new Date(h.created_at).toLocaleDateString()}`);
                    console.log(`      Type: ${h.workout_type || 'N/A'}`);
                });
            }
        }

        // Check profile completed_days
        console.log('\n📊 Checking profile completed_days...');
        const { data: profile } = await supabase
            .from('profiles')
            .select('completed_days')
            .eq('id', userId)
            .single();

        console.log(`✅ Completed days in profile: ${profile?.completed_days?.length || 0}`);
        if (profile?.completed_days && profile.completed_days.length > 0) {
            console.log('   Days:', profile.completed_days);
        }

        console.log('\n🔍 ANALYSIS:');
        console.log('   - workout_logs: Used for detailed workout tracking');
        console.log('   - workout_history: New table for complete session data');
        console.log('   - completed_days: Array of dates in profile');
        console.log('\n⚠️ ISSUE: Your 10+ workouts may have been stored in localStorage only!');
        console.log('   They were NEVER synced to the cloud because the sync was broken.');

    } catch (err) {
        console.error('❌ Exception:', err);
    }
};

investigateWorkoutLogs();
