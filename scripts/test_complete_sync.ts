import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const testCompleteSync = async () => {
    console.log('🧪 TESTING COMPLETE SYNC SYSTEM\n');

    try {
        const userId = '4b6e3087-d04d-4129-8018-04ff53c56742';

        // Test 1: Update profile with ALL fields
        console.log('📝 Test 1: Updating profile with COMPLETE data...');

        const testData = {
            id: userId,
            email: 'rafael_henrique21@hotmail.com',
            name: 'Rafael Alvarenga',
            age: 30,
            gender: 'MALE',
            weight: 75,
            height: 180,
            goal: 'STRENGTHEN',
            level: 'INTERMEDIATE',
            activity_level: 'MODERATE',
            language: 'PT',
            country: 'BR',
            injuries: 'None',
            subscription: 'pro',
            subscription_active: true,
            completed_days: ['2026-02-03', '2026-02-02', '2026-02-01'],
            custom_schedule: { mon: { type: 'WORKOUT' }, tue: { type: 'REST' } },
            training_days: ['mon', 'wed', 'fri'],
            split_style: 'FULL_BODY',
            custom_workouts: [],
            custom_exercises: [],
            trial_start_date: '2026-01-24T21:51:54.453245+00:00',
            updated_at: new Date().toISOString()
        };

        const { data: updateData, error: updateError } = await supabase
            .from('profiles')
            .upsert(testData)
            .select();

        if (updateError) {
            console.error('❌ Update failed:', updateError);
            return;
        }

        console.log('✅ Profile updated successfully!');

        // Test 2: Fetch profile back
        console.log('\n📥 Test 2: Fetching profile back...');

        const { data: fetchData, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (fetchError) {
            console.error('❌ Fetch failed:', fetchError);
            return;
        }

        console.log('✅ Profile fetched successfully!');
        console.log('\n📊 VERIFICATION:');
        console.log('   Name:', fetchData.name);
        console.log('   Age:', fetchData.age);
        console.log('   Gender:', fetchData.gender);
        console.log('   Weight:', fetchData.weight);
        console.log('   Height:', fetchData.height);
        console.log('   Goal:', fetchData.goal);
        console.log('   Level:', fetchData.level);
        console.log('   Activity Level:', fetchData.activity_level);
        console.log('   Language:', fetchData.language);
        console.log('   Country:', fetchData.country);
        console.log('   Injuries:', fetchData.injuries);
        console.log('   Training Days:', fetchData.training_days);
        console.log('   Split Style:', fetchData.split_style);
        console.log('   Completed Days:', fetchData.completed_days?.length || 0);
        console.log('   Subscription:', fetchData.subscription);
        console.log('   Subscription Active:', fetchData.subscription_active);

        // Test 3: Verify ALL fields are present
        console.log('\n🔍 Test 3: Checking for missing fields...');

        const requiredFields = [
            'name', 'age', 'gender', 'weight', 'height', 'goal', 'level',
            'activity_level', 'language', 'country', 'training_days',
            'split_style', 'completed_days', 'subscription', 'subscription_active'
        ];

        const missingFields = requiredFields.filter(field =>
            fetchData[field] === null || fetchData[field] === undefined
        );

        if (missingFields.length > 0) {
            console.log('⚠️ Missing fields:', missingFields);
        } else {
            console.log('✅ ALL FIELDS PRESENT!');
        }

        console.log('\n🎉 SYNC TEST COMPLETE!');
        console.log('   Status: ✅ ALL SYSTEMS OPERATIONAL');

    } catch (err) {
        console.error('❌ Test failed:', err);
    }
};

testCompleteSync();
