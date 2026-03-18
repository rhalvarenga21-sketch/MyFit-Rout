const fs = require('fs');

console.log('CORRIGINDO IDs...\n');

let content = fs.readFileSync('data/workouts.ts', 'utf8');
let count = 0;

const fixes = [
  [/"[^"]*Burpees[^"]*"/g, '"cardio_cardio_burpees_standard_bodyweight_home_gym_intermediate"'],
  [/"[^"]*Remo.*quina[^"]*"/g, '"cardio_cardio_rowing_machine_intervals_machine_gym_beginner"'],
  [/"[^"]*Bicicleta[^"]*"/g, '"cardio_cardio_stationary_bike_spinning_machine_gym_beginner"'],
  [/"[^"]*Sombra de Boxeo[^"]*"/g, '"cardio_cardio_shadow_boxing_freestyle_bodyweight_home_beginner"'],
  [/"[^"]*Saltar la cuerda[^"]*"/g, '"cardio_cardio_jump_rope_basic_bodyweight_home_gym_beginner"'],
  [/"[^"]*Jumping Jacks[^"]*"/g, '"cardio_cardio_jumping_jacks_bodyweight_bodyweight_home_beginner"'],
  [/"[^"]*Cinta de correr[^"]*"/g, '"cardio_cardio_treadmill_steady_pace_machine_gym_beginner"'],
  [/"[^"]*ptica[^"]*"/g, '"cardio_cardio_elliptical_standard_machine_gym_beginner"'],
  [/"[^"]*Escaladora[^"]*"/g, '"cardio_cardio_stair_climber_standard_machine_gym_intermediate"'],
  [/"[^"]*Curl femoral sentado[^"]*"/g, '"legs_hamstrings_leg_curl_seated_bilateral_machine_gym_beginner"'],
  [/"[^"]*Peso muerto rumano[^"]*"/g, '"back_back_deadlift_conventional_barbell_gym_advanced"'],
  [/"[^"]*gemelos a una pierna[^"]*"/g, '"legs_calves_calf_raise_single_leg_step_bodyweight_home_gym_intermediate"'],
  [/"[^"]*Sentadilla frontal[^"]*"/g, '"legs_quads_front_squat_clean_grip_cross_arms_barbell_gym_intermediate"'],
  [/"[^"]*Curl femoral con deslizamiento[^"]*"/g, '"legs_hamstrings_hamstring_slide_curl_towel_slider_bodyweight_home_intermediate"'],
  [/"[^"]*Patada de[^"]*"/g, '"legs_glutes_kickback_4_point_donkey_kick_bodyweight_cable_home_gym_beginner"'],
  [/"[^"]*Bajo y estrecho[^"]*"/g, '"legs_quads_leg_press_low_narrow_quad_focus_machine_gym_beginner"'],
  [/"[^"]*piernas r.*gidas[^"]*"/g, '"legs_hamstrings_stiff_leg_deadlift_barbell_barbell_gym_intermediate"'],
  [/"[^"]*Zancada inversa[^"]*"/g, '"legs_quads_split_squat_reverse_lunge_bodyweight_home_beginner"'],
  [/"[^"]*n en polea[^"]*De pie[^"]*"/g, '"legs_adductors_cable_adduction_standing_cable_gym_intermediate"'],
  [/"[^"]*Caminata lateral[^"]*"/g, '"legs_glutes_banded_lateral_walk_mini_band_band_home_gym_beginner"'],
  [/"[^"]*Zancada.*Walking[^"]*"/g, '"legs_quads_walking_lunge_bodyweight_dumbbell_home_gym_beginner"'],
  [/"[^"]*medio.*Acostado[^"]*"/g, '"legs_glutes_glute_med_abduction_side_lying_bodyweight_home_beginner"'],
  [/"[^"]*Clamshell[^"]*"/g, '"legs_glutes_clamshell_mini_band_band_home_beginner"'],
  [/"[^"]*Copenhagen[^"]*"/g, '"legs_adductors_copenhagen_plank_knee_supported_bodyweight_home_advanced"'],
  [/"[^"]*Alto y amplio[^"]*"/g, '"legs_glutes_leg_press_high_wide_glute_focus_machine_gym_beginner"'],
  [/"[^"]*n en polea[^"]*pie[^"]*"/g, '"legs_glutes_cable_abduction_standing_cable_gym_intermediate"'],
  [/"[^"]*Curl femoral.*Unilateral[^"]*"/g, '"legs_hamstrings_leg_curl_lying_unilateral_machine_gym_intermediate"'],
  [/"[^"]*Subida al banco[^"]*"/g, '"legs_quads_step_up_box_bench_bodyweight_dumbbell_home_gym_beginner"'],
  [/"[^"]*Good morning[^"]*"/g, '"legs_hamstrings_good_morning_barbell_barbell_gym_intermediate"']
];

fixes.forEach(([regex, replacement]) => {
  const matches = content.match(regex);
  if (matches) {
    content = content.replace(regex, replacement);
    count += matches.length;
    console.log('OK: ' + matches[0] + ' -> ' + replacement);
  }
});

fs.writeFileSync('data/workouts.ts', content, 'utf8');
console.log('\nTOTAL: ' + count + ' corrigidos!');