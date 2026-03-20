import { Language, PresetWorkout, WorkoutCategory, BodyAreaTag, ExperienceLevel } from '../types';

// ============================================================
// MyFitRout — PRESET WORKOUTS (Reestruturado)
// 
// Divisões: Full Body, Upper/Lower, Push/Pull/Legs, Bro Split, HIIT/Functional
// Regras:
//   ✅ 100% dos exercícios com vídeo (videoUrl não vazio)
//   ✅ HOME = apenas Bodyweight/Dumbbell/Band/Rope
//   ✅ GYM = pode usar Machine/Cable/Barbell
//   ✅ Warmup + Cooldown em todos os presets
//   ✅ Mínimo 6 exercícios por preset
//   ✅ IDs correspondem ao EXERCISE_LIBRARY em data/exercises.ts
// ============================================================

export const PRESET_WORKOUTS: PresetWorkout[] = [

  // ============================================================
  // 🏋️ FULL BODY (2 presets — HOME, Beginner)
  // ============================================================

  {
    id: "fb-home-1",
    title: { [Language.PT]: "Corpo Inteiro – Base de Saúde", [Language.EN]: "Full Body – Health Foundations", [Language.ES]: "Cuerpo Completo – Base de Salud" },
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.CORE],
    duration: 55,
    description: { [Language.PT]: "Padrões de movimento fundamentais e estabilidade articular.", [Language.EN]: "Fundamental movement patterns and joint stability.", [Language.ES]: "Patrones de movimiento y estabilidad articular." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'HOME',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)", "Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "Sentadilla — Peso corporal",
      "chest_chest_push_up_incline_hands_elevated_bodyweight_home_gym_beginner",
      "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner",
      "arms_triceps_dips_bench_dips_bodyweight_home_gym_beginner"
    ],
    accessoryIds: [
      "core_core_plank_forearm_bodyweight_home_gym_beginner",
      "core_abs_crunch_basic_bodyweight_home_beginner"
    ],
    cooldownIds: ["core_obliques_side_plank_standard_bodyweight_home_gym_beginner"]
  },

  {
    id: "fb-home-2",
    title: { [Language.PT]: "Corpo Inteiro – Longevidade", [Language.EN]: "Full Body – Longevity", [Language.ES]: "Cuerpo Completo – Longevidad" },
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.SHOULDERS, BodyAreaTag.CORE],
    duration: 60,
    description: { [Language.PT]: "Ritmo controlado para saúde metabólica e longevidade.", [Language.EN]: "Controlled tempo for metabolic health and longevity.", [Language.ES]: "Ritmo controlado para salud metabólica y longevidad." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal", "Puente de glúteos — En el suelo (bilateral)"],
    mainBlockIds: [
      "Zancada — Walking",
      "chest_chest_push_up_wide_bodyweight_home_gym_beginner",
      "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner",
      "shoulders_delts_overhead_press_seated_dumbbells_dumbbell_gym_beginner",
      "Hip thrust (empuje de cadera) — Mancuerna"
    ],
    accessoryIds: [
      "core_core_plank_forearm_bodyweight_home_gym_beginner"
    ],
    cooldownIds: ["core_lower_back_back_extension_bodyweight_bodyweight_machine_gym_home_beginner"]
  },

  // ============================================================
  // 🔀 UPPER / LOWER (4 presets — 2 GYM + 2 HOME)
  // ============================================================

  {
    id: "ul-gym-upper",
    title: { [Language.PT]: "Superior Completo (Academia)", [Language.EN]: "Upper Body (Gym)", [Language.ES]: "Superior Completo (Gimnasio)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.SHOULDERS, BodyAreaTag.BICEPS, BodyAreaTag.TRICEPS],
    duration: 60,
    description: { [Language.PT]: "Empurre e puxe equilibrado na academia.", [Language.EN]: "Balanced push and pull at the gym.", [Language.ES]: "Empuje y tirón equilibrado en el gimnasio." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["chest_chest_push_up_incline_hands_elevated_bodyweight_home_gym_beginner"],
    mainBlockIds: [
      "chest_chest_bench_press_flat_barbell_gym_intermediate",
      "back_lats_lat_pulldown_wide_grip_machine_cable_gym_beginner",
      "shoulders_delts_overhead_press_barbell_standing_barbell_gym_intermediate",
      "back_mid_back_seated_cable_row_wide_grip_cable_gym_intermediate"
    ],
    accessoryIds: [
      "arms_biceps_ez_bar_curl_ez_bar_barbell_gym_beginner",
      "arms_triceps_triceps_pushdown_rope_cable_gym_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "ul-gym-lower",
    title: { [Language.PT]: "Inferior Completo (Academia)", [Language.EN]: "Lower Body (Gym)", [Language.ES]: "Inferior Completo (Gimnasio)" },
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES, BodyAreaTag.CALVES],
    duration: 60,
    description: { [Language.PT]: "Foco completo em pernas, glúteos e panturrilhas.", [Language.EN]: "Complete focus on legs, glutes and calves.", [Language.ES]: "Foco completo en piernas, glúteos y pantorrillas." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)", "Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "Prensa de piernas — Postura estándar",
      "Extensión de piernas — Bilateral",
      "Curl femoral sentado — Bilateral",
      "Hip thrust (empuje de cadera) — Barra"
    ],
    accessoryIds: [
      "Abducción de cadera — Máquina",
      "Elevación de gemelos sentado — Máquina"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "ul-home-upper",
    title: { [Language.PT]: "Superior Completo (Casa)", [Language.EN]: "Upper Body (Home)", [Language.ES]: "Superior Completo (Casa)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST, BodyAreaTag.BACK, BodyAreaTag.SHOULDERS, BodyAreaTag.BICEPS, BodyAreaTag.TRICEPS],
    duration: 55,
    description: { [Language.PT]: "Empurre e puxe com halteres e peso corporal.", [Language.EN]: "Push and pull with dumbbells and bodyweight.", [Language.ES]: "Empuje y tirón con mancuernas y peso corporal." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "chest_chest_push_up_decline_feet_elevated_bodyweight_home_gym_intermediate",
      "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner",
      "shoulders_delts_arnold_press_seated_dumbbell_gym_intermediate",
      "chest_chest_chest_fly_flat_bench_dumbbell_home_gym_beginner"
    ],
    accessoryIds: [
      "arms_biceps_hammer_curl_neutral_grip_dumbbell_home_gym_beginner",
      "arms_triceps_overhead_triceps_extension_dumbbell_dumbbell_home_gym_beginner"
    ],
    cooldownIds: ["core_obliques_side_plank_standard_bodyweight_home_gym_beginner"]
  },

  {
    id: "ul-home-lower",
    title: { [Language.PT]: "Inferior Completo (Casa)", [Language.EN]: "Lower Body (Home)", [Language.ES]: "Inferior Completo (Casa)" },
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES, BodyAreaTag.CALVES],
    duration: 55,
    description: { [Language.PT]: "Pernas e glúteos com halteres e peso corporal.", [Language.EN]: "Legs and glutes with dumbbells and bodyweight.", [Language.ES]: "Piernas y glúteos con mancuernas y peso corporal." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)", "Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "Sentadilla — Peso corporal",
      "Zancada búlgara — Mancuernas",
      "Hip thrust (empuje de cadera) — Mancuerna",
      "Zancada inversa — Peso corporal"
    ],
    accessoryIds: [
      "Elevación de gemelos de pie — Mancuernas",
      "core_abs_crunch_basic_bodyweight_home_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  // ============================================================
  // 💪 PUSH / PULL / LEGS (6 presets — 3 GYM + 3 HOME)
  // ============================================================

  {
    id: "ppl-gym-push",
    title: { [Language.PT]: "Push (Academia)", [Language.EN]: "Push Day (Gym)", [Language.ES]: "Empuje (Gimnasio)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST, BodyAreaTag.SHOULDERS, BodyAreaTag.TRICEPS],
    duration: 55,
    description: { [Language.PT]: "Peito, ombros e tríceps na academia.", [Language.EN]: "Chest, shoulders and triceps at the gym.", [Language.ES]: "Pecho, hombros y tríceps en el gimnasio." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["chest_chest_push_up_incline_hands_elevated_bodyweight_home_gym_beginner"],
    mainBlockIds: [
      "chest_chest_bench_press_flat_barbell_gym_intermediate",
      "chest_upper_chest_incline_press_dumbbells_dumbbell_gym_beginner",
      "shoulders_delts_overhead_press_barbell_standing_barbell_gym_intermediate",
      "chest_chest_cable_fly_high_to_low_cable_gym_intermediate"
    ],
    accessoryIds: [
      "shoulders_side_delts_lateral_raise_cable_cable_gym_intermediate",
      "arms_triceps_triceps_pushdown_rope_cable_gym_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "ppl-gym-pull",
    title: { [Language.PT]: "Pull (Academia)", [Language.EN]: "Pull Day (Gym)", [Language.ES]: "Tirón (Gimnasio)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BACK, BodyAreaTag.BICEPS],
    duration: 55,
    description: { [Language.PT]: "Costas e bíceps na academia.", [Language.EN]: "Back and biceps at the gym.", [Language.ES]: "Espalda y bíceps en el gimnasio." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["back_lats_assisted_pull_up_machine_band_machine_band_gym_intermediate"],
    mainBlockIds: [
      "back_lats_lat_pulldown_wide_grip_machine_cable_gym_beginner",
      "back_mid_back_seated_cable_row_wide_grip_cable_gym_intermediate",
      "back_upper_back_bent_over_row_barbell_barbell_gym_intermediate",
      "back_upper_back_reverse_pec_deck_machine_machine_gym_beginner"
    ],
    accessoryIds: [
      "arms_biceps_barbell_curl_straight_bar_barbell_gym_intermediate",
      "arms_biceps_incline_curl_bench_dumbbell_gym_intermediate"
    ],
    cooldownIds: ["core_obliques_side_plank_standard_bodyweight_home_gym_beginner"]
  },

  {
    id: "ppl-gym-legs",
    title: { [Language.PT]: "Legs (Academia)", [Language.EN]: "Leg Day (Gym)", [Language.ES]: "Piernas (Gimnasio)" },
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES, BodyAreaTag.CALVES],
    duration: 60,
    description: { [Language.PT]: "Pernas completo na academia com máquinas e barra.", [Language.EN]: "Complete leg day at the gym.", [Language.ES]: "Piernas completo en el gimnasio." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)", "Sentadilla — Peso corporal"],
    mainBlockIds: [
      "Prensa de piernas — Postura estándar",
      "Extensión de piernas — Bilateral",
      "Curl femoral tumbado — Bilateral",
      "Hip thrust (empuje de cadera) — Barra"
    ],
    accessoryIds: [
      "Aducción de cadera — Máquina",
      "Elevación de gemelos en Smith — De pie"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "ppl-home-push",
    title: { [Language.PT]: "Push (Casa)", [Language.EN]: "Push Day (Home)", [Language.ES]: "Empuje (Casa)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST, BodyAreaTag.SHOULDERS, BodyAreaTag.TRICEPS],
    duration: 50,
    description: { [Language.PT]: "Peito, ombros e tríceps em casa.", [Language.EN]: "Chest, shoulders and triceps at home.", [Language.ES]: "Pecho, hombros y tríceps en casa." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "chest_chest_push_up_wide_bodyweight_home_gym_beginner",
      "chest_chest_push_up_decline_feet_elevated_bodyweight_home_gym_intermediate",
      "shoulders_delts_overhead_press_seated_dumbbells_dumbbell_gym_beginner",
      "chest_chest_chest_fly_flat_bench_dumbbell_home_gym_beginner"
    ],
    accessoryIds: [
      "shoulders_delts_arnold_press_seated_dumbbell_gym_intermediate",
      "arms_triceps_overhead_triceps_extension_dumbbell_dumbbell_home_gym_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "ppl-home-pull",
    title: { [Language.PT]: "Pull (Casa)", [Language.EN]: "Pull Day (Home)", [Language.ES]: "Tirón (Casa)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BACK, BodyAreaTag.BICEPS],
    duration: 50,
    description: { [Language.PT]: "Costas e bíceps em casa com halteres.", [Language.EN]: "Back and biceps at home with dumbbells.", [Language.ES]: "Espalda y bíceps en casa con mancuernas." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner",
      "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner",
      "arms_biceps_dumbbell_curl_standing_dumbbell_home_gym_beginner",
      "arms_biceps_hammer_curl_neutral_grip_dumbbell_home_gym_beginner"
    ],
    accessoryIds: [
      "arms_biceps_concentration_curl_seated_dumbbell_home_gym_beginner",
      "arms_triceps_dips_bench_dips_bodyweight_home_gym_beginner"
    ],
    cooldownIds: ["core_lower_back_back_extension_bodyweight_bodyweight_machine_gym_home_beginner"]
  },

  {
    id: "ppl-home-legs",
    title: { [Language.PT]: "Legs (Casa)", [Language.EN]: "Leg Day (Home)", [Language.ES]: "Piernas (Casa)" },
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES, BodyAreaTag.CALVES],
    duration: 55,
    description: { [Language.PT]: "Pernas completo em casa.", [Language.EN]: "Complete leg day at home.", [Language.ES]: "Piernas completo en casa." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)", "Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "Sentadilla — Peso corporal",
      "Zancada búlgara — Mancuernas",
      "Zancada — Walking",
      "Hip thrust (empuje de cadera) — Mancuerna"
    ],
    accessoryIds: [
      "Zancada inversa — Peso corporal",
      "Elevación de gemelos a una pierna — Step"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  // ============================================================
  // 🎯 BRO SPLIT — CHEST (6 presets: 3 níveis × 2 ambientes)
  // ============================================================

  {
    id: "bs-beg-gym-chest",
    title: { [Language.PT]: "Peito (Iniciante)", [Language.EN]: "Chest (Beginner)", [Language.ES]: "Pecho (Principiante)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST],
    duration: 45,
    description: { [Language.PT]: "Construa uma base sólida de peito na academia.", [Language.EN]: "Build a solid chest foundation at the gym.", [Language.ES]: "Construye una base sólida de pecho." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'GYM',
    warmupIds: ["chest_chest_push_up_incline_hands_elevated_bodyweight_home_gym_beginner"],
    mainBlockIds: [
      "chest_upper_chest_incline_press_dumbbells_dumbbell_gym_beginner",
      "chest_chest_chest_fly_flat_bench_dumbbell_home_gym_beginner",
      "chest_chest_pec_deck_machine_machine_gym_beginner",
      "chest_chest_push_up_wide_bodyweight_home_gym_beginner"
    ],
    accessoryIds: ["arms_triceps_triceps_pushdown_rope_cable_gym_beginner"],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-beg-home-chest",
    title: { [Language.PT]: "Peito (Iniciante)", [Language.EN]: "Chest (Beginner)", [Language.ES]: "Pecho (Principiante)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST],
    duration: 45,
    description: { [Language.PT]: "Construa peito forte em casa.", [Language.EN]: "Build a strong chest at home.", [Language.ES]: "Construye pecho fuerte en casa." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "chest_chest_push_up_incline_hands_elevated_bodyweight_home_gym_beginner",
      "chest_chest_push_up_wide_bodyweight_home_gym_beginner",
      "chest_chest_chest_fly_flat_bench_dumbbell_home_gym_beginner",
      "chest_chest_band_chest_press_standing_band_home_beginner"
    ],
    accessoryIds: ["arms_triceps_dips_bench_dips_bodyweight_home_gym_beginner"],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-int-gym-chest",
    title: { [Language.PT]: "Peito (Intermediário)", [Language.EN]: "Chest (Intermediate)", [Language.ES]: "Pecho (Intermedio)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST],
    duration: 60,
    description: { [Language.PT]: "Peito com cargas progressivas.", [Language.EN]: "Chest with progressive loads.", [Language.ES]: "Pecho con cargas progresivas." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["chest_chest_push_up_incline_hands_elevated_bodyweight_home_gym_beginner"],
    mainBlockIds: [
      "chest_chest_bench_press_flat_barbell_gym_intermediate",
      "chest_upper_chest_incline_bench_press_30_45_degrees_barbell_gym_intermediate",
      "chest_chest_cable_fly_high_to_low_cable_gym_intermediate",
      "chest_upper_chest_incline_fly_incline_bench_dumbbell_gym_intermediate"
    ],
    accessoryIds: [
      "chest_chest_cable_fly_low_to_high_cable_gym_intermediate",
      "arms_triceps_triceps_pushdown_straight_bar_cable_gym_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-int-home-chest",
    title: { [Language.PT]: "Peito (Intermediário)", [Language.EN]: "Chest (Intermediate)", [Language.ES]: "Pecho (Intermedio)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST],
    duration: 55,
    description: { [Language.PT]: "Desafie o peito em casa com variações.", [Language.EN]: "Challenge your chest at home with variations.", [Language.ES]: "Desafía el pecho en casa con variaciones." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "chest_chest_push_up_decline_feet_elevated_bodyweight_home_gym_intermediate",
      "chest_chest_push_up_wide_bodyweight_home_gym_beginner",
      "chest_chest_chest_fly_flat_bench_dumbbell_home_gym_beginner",
      "chest_chest_band_chest_press_standing_band_home_beginner"
    ],
    accessoryIds: [
      "arms_triceps_overhead_triceps_extension_dumbbell_dumbbell_home_gym_beginner",
      "arms_triceps_dips_bench_dips_bodyweight_home_gym_beginner"
    ],
    cooldownIds: ["core_obliques_side_plank_standard_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-adv-gym-chest",
    title: { [Language.PT]: "Peito (Avançado)", [Language.EN]: "Chest (Advanced)", [Language.ES]: "Pecho (Avanzado)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST],
    duration: 65,
    description: { [Language.PT]: "Peito intenso com técnicas avançadas.", [Language.EN]: "Intense chest with advanced techniques.", [Language.ES]: "Pecho intenso con técnicas avanzadas." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'GYM',
    warmupIds: ["chest_chest_push_up_wide_bodyweight_home_gym_beginner"],
    mainBlockIds: [
      "chest_chest_bench_press_paused_reps_barbell_gym_advanced",
      "chest_upper_chest_incline_bench_press_30_45_degrees_barbell_gym_intermediate",
      "chest_lower_chest_decline_bench_press_barbell_barbell_gym_advanced",
      "chest_chest_cable_crossover_standard_cable_gym_intermediate",
      "chest_chest_dips_chest_lean_bodyweight_gym_advanced"
    ],
    accessoryIds: [
      "arms_triceps_overhead_cable_extension_rope_cable_gym_intermediate"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-adv-home-chest",
    title: { [Language.PT]: "Peito (Avançado)", [Language.EN]: "Chest (Advanced)", [Language.ES]: "Pecho (Avanzado)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST],
    duration: 55,
    description: { [Language.PT]: "Peito avançado em casa — alto volume.", [Language.EN]: "Advanced chest at home — high volume.", [Language.ES]: "Pecho avanzado en casa — alto volumen." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "chest_chest_push_up_decline_feet_elevated_bodyweight_home_gym_intermediate",
      "chest_chest_push_up_wide_bodyweight_home_gym_beginner",
      "chest_chest_dips_chest_lean_bodyweight_gym_advanced",
      "chest_chest_chest_fly_flat_bench_dumbbell_home_gym_beginner",
      "chest_chest_band_chest_press_standing_band_home_beginner"
    ],
    accessoryIds: [
      "arms_triceps_dips_bench_dips_bodyweight_home_gym_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  // ============================================================
  // 🎯 BRO SPLIT — BACK (6 presets)
  // ============================================================

  {
    id: "bs-beg-gym-back",
    title: { [Language.PT]: "Costas (Iniciante)", [Language.EN]: "Back (Beginner)", [Language.ES]: "Espalda (Principiante)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BACK],
    duration: 45,
    description: { [Language.PT]: "Base de costas com máquinas guiadas.", [Language.EN]: "Back foundation with guided machines.", [Language.ES]: "Base de espalda con máquinas guiadas." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'GYM',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "back_lats_lat_pulldown_wide_grip_machine_cable_gym_beginner",
      "back_upper_back_reverse_pec_deck_machine_machine_gym_beginner",
      "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner",
      "back_lats_assisted_pull_up_machine_band_machine_band_gym_intermediate"
    ],
    accessoryIds: ["arms_biceps_ez_bar_curl_ez_bar_barbell_gym_beginner"],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-beg-home-back",
    title: { [Language.PT]: "Costas (Iniciante)", [Language.EN]: "Back (Beginner)", [Language.ES]: "Espalda (Principiante)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BACK],
    duration: 45,
    description: { [Language.PT]: "Costas em casa com halteres e peso corporal.", [Language.EN]: "Back at home with dumbbells and bodyweight.", [Language.ES]: "Espalda en casa con mancuernas." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner",
      "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner",
      "arms_biceps_dumbbell_curl_standing_dumbbell_home_gym_beginner",
      "arms_biceps_hammer_curl_neutral_grip_dumbbell_home_gym_beginner"
    ],
    accessoryIds: ["core_lower_back_back_extension_bodyweight_bodyweight_machine_gym_home_beginner"],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-int-gym-back",
    title: { [Language.PT]: "Costas (Intermediário)", [Language.EN]: "Back (Intermediate)", [Language.ES]: "Espalda (Intermedio)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BACK],
    duration: 60,
    description: { [Language.PT]: "Costas com volume e intensidade.", [Language.EN]: "Back with volume and intensity.", [Language.ES]: "Espalda con volumen e intensidad." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["back_lats_assisted_pull_up_machine_band_machine_band_gym_intermediate"],
    mainBlockIds: [
      "back_lats_lat_pulldown_wide_grip_machine_cable_gym_beginner",
      "back_mid_back_seated_cable_row_wide_grip_cable_gym_intermediate",
      "back_upper_back_bent_over_row_barbell_barbell_gym_intermediate",
      "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner"
    ],
    accessoryIds: [
      "back_lats_lat_pulldown_single_arm_cable_gym_intermediate",
      "arms_biceps_barbell_curl_straight_bar_barbell_gym_intermediate"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-int-home-back",
    title: { [Language.PT]: "Costas (Intermediário)", [Language.EN]: "Back (Intermediate)", [Language.ES]: "Espalda (Intermedio)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BACK],
    duration: 50,
    description: { [Language.PT]: "Costas intermediário em casa.", [Language.EN]: "Intermediate back at home.", [Language.ES]: "Espalda intermedio en casa." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner",
      "back_lats_chin_up_underhand_bodyweight_gym_advanced",
      "arms_biceps_dumbbell_curl_standing_dumbbell_home_gym_beginner",
      "arms_biceps_hammer_curl_neutral_grip_dumbbell_home_gym_beginner"
    ],
    accessoryIds: [
      "arms_biceps_concentration_curl_seated_dumbbell_home_gym_beginner",
      "core_lower_back_back_extension_bodyweight_bodyweight_machine_gym_home_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-adv-gym-back",
    title: { [Language.PT]: "Costas (Avançado)", [Language.EN]: "Back (Advanced)", [Language.ES]: "Espalda (Avanzado)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BACK],
    duration: 65,
    description: { [Language.PT]: "Costas pesado com barra e cabos.", [Language.EN]: "Heavy back with barbell and cables.", [Language.ES]: "Espalda pesado con barra y cables." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'GYM',
    warmupIds: ["back_lats_assisted_pull_up_machine_band_machine_band_gym_intermediate"],
    mainBlockIds: [
      "back_upper_back_pendlay_row_from_floor_barbell_gym_advanced",
      "back_lats_lat_pulldown_wide_grip_machine_cable_gym_beginner",
      "back_mid_back_seated_cable_row_wide_grip_cable_gym_intermediate",
      "back_upper_back_bent_over_row_barbell_barbell_gym_intermediate",
      "back_lats_lat_pulldown_single_arm_cable_gym_intermediate"
    ],
    accessoryIds: [
      "arms_biceps_incline_curl_bench_dumbbell_gym_intermediate"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-adv-home-back",
    title: { [Language.PT]: "Costas (Avançado)", [Language.EN]: "Back (Advanced)", [Language.ES]: "Espalda (Avanzado)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BACK],
    duration: 55,
    description: { [Language.PT]: "Costas avançado em casa — alto volume.", [Language.EN]: "Advanced back at home — high volume.", [Language.ES]: "Espalda avanzado en casa." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "back_lats_chin_up_underhand_bodyweight_gym_advanced",
      "back_lats_pull_up_neutral_grip",
      "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner",
      "arms_biceps_dumbbell_curl_standing_dumbbell_home_gym_beginner"
    ],
    accessoryIds: [
      "arms_biceps_hammer_curl_neutral_grip_dumbbell_home_gym_beginner",
      "core_lower_back_back_extension_bodyweight_bodyweight_machine_gym_home_beginner"
    ],
    cooldownIds: ["core_obliques_side_plank_standard_bodyweight_home_gym_beginner"]
  },

  // ============================================================
  // 🎯 BRO SPLIT — LEGS (6 presets)
  // ============================================================

  {
    id: "bs-beg-gym-legs",
    title: { [Language.PT]: "Pernas (Iniciante)", [Language.EN]: "Legs (Beginner)", [Language.ES]: "Piernas (Principiante)" },
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES],
    duration: 45,
    description: { [Language.PT]: "Base de pernas na academia.", [Language.EN]: "Leg foundations at the gym.", [Language.ES]: "Base de piernas en el gimnasio." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'GYM',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)", "Sentadilla — Peso corporal"],
    mainBlockIds: [
      "Prensa de piernas — Postura estándar",
      "Extensión de piernas — Bilateral",
      "Curl femoral sentado — Bilateral",
      "Abducción de cadera — Máquina"
    ],
    accessoryIds: ["Elevación de gemelos sentado — Máquina"],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-beg-home-legs",
    title: { [Language.PT]: "Pernas (Iniciante)", [Language.EN]: "Legs (Beginner)", [Language.ES]: "Piernas (Principiante)" },
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES],
    duration: 45,
    description: { [Language.PT]: "Pernas em casa com peso corporal.", [Language.EN]: "Legs at home with bodyweight.", [Language.ES]: "Piernas en casa con peso corporal." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'HOME',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)", "Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "Sentadilla — Peso corporal",
      "Zancada — Walking",
      "Zancada inversa — Peso corporal",
      "Hip thrust (empuje de cadera) — Mancuerna"
    ],
    accessoryIds: ["Elevación de gemelos de pie — Mancuernas"],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-int-gym-legs",
    title: { [Language.PT]: "Pernas (Intermediário)", [Language.EN]: "Legs (Intermediate)", [Language.ES]: "Piernas (Intermedio)" },
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES, BodyAreaTag.CALVES],
    duration: 60,
    description: { [Language.PT]: "Pernas com volume e intensidade na academia.", [Language.EN]: "Legs with volume and intensity.", [Language.ES]: "Piernas con volumen e intensidad." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)", "Sentadilla — Peso corporal"],
    mainBlockIds: [
      "Sentadilla hack — Máquina",
      "Extensión de piernas — Unilateral",
      "Curl femoral tumbado — Bilateral",
      "Hip thrust (empuje de cadera) — Barra",
      "Prensa de piernas — Alto y amplio (énfasis glúteo)"
    ],
    accessoryIds: [
      "Aducción en polea — De pie",
      "Elevación de gemelos en Smith — De pie"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-int-home-legs",
    title: { [Language.PT]: "Pernas (Intermediário)", [Language.EN]: "Legs (Intermediate)", [Language.ES]: "Piernas (Intermedio)" },
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES, BodyAreaTag.CALVES],
    duration: 55,
    description: { [Language.PT]: "Pernas intermediário em casa.", [Language.EN]: "Intermediate legs at home.", [Language.ES]: "Piernas intermedio en casa." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)", "Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "Zancada búlgara — Mancuernas",
      "Sentadilla — Peso corporal",
      "Hip thrust (empuje de cadera) — Mancuerna",
      "Zancada búlgara — Peso corporal"
    ],
    accessoryIds: [
      "Zancada inversa — Peso corporal",
      "Elevación de gemelos a una pierna — Step"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-adv-gym-legs",
    title: { [Language.PT]: "Pernas (Avançado)", [Language.EN]: "Legs (Advanced)", [Language.ES]: "Piernas (Avanzado)" },
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES, BodyAreaTag.CALVES],
    duration: 70,
    description: { [Language.PT]: "Pernas pesado — barra livre e máquinas.", [Language.EN]: "Heavy legs — free bar and machines.", [Language.ES]: "Piernas pesado — barra libre y máquinas." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'GYM',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)", "Sentadilla — Peso corporal"],
    mainBlockIds: [
      "Sentadilla trasera — Barra alta",
      "Sentadilla frontal — Agarre clean / brazos cruzados",
      "Extensión de piernas — Bilateral",
      "Curl femoral — Unilateral",
      "Hip thrust (empuje de cadera) — Barra"
    ],
    accessoryIds: [
      "Abducción en polea — De pie",
      "Elevación de gemelos en Smith — De pie"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-adv-home-legs",
    title: { [Language.PT]: "Pernas (Avançado)", [Language.EN]: "Legs (Advanced)", [Language.ES]: "Piernas (Avanzado)" },
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES, BodyAreaTag.CALVES],
    duration: 60,
    description: { [Language.PT]: "Pernas avançado em casa — alto volume.", [Language.EN]: "Advanced legs at home — high volume.", [Language.ES]: "Piernas avanzado en casa." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'HOME',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)", "Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "Zancada búlgara — Mancuernas",
      "Sentadilla — Peso corporal",
      "Hip thrust (empuje de cadera) — Mancuerna",
      "Zancada — Walking",
      "Zancada búlgara — Peso corporal"
    ],
    accessoryIds: [
      "Elevación de gemelos a una pierna — Step"
    ],
    cooldownIds: ["core_obliques_side_plank_standard_bodyweight_home_gym_beginner"]
  },

  // ============================================================
  // 🎯 BRO SPLIT — SHOULDERS (6 presets)
  // ============================================================

  {
    id: "bs-beg-gym-shoulders",
    title: { [Language.PT]: "Ombros (Iniciante)", [Language.EN]: "Shoulders (Beginner)", [Language.ES]: "Hombros (Principiante)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.SHOULDERS],
    duration: 45,
    description: { [Language.PT]: "Base de ombros na academia.", [Language.EN]: "Shoulder foundations at the gym.", [Language.ES]: "Base de hombros en el gimnasio." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'GYM',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "shoulders_delts_overhead_press_seated_dumbbells_dumbbell_gym_beginner",
      "shoulders_side_delts_lateral_raise_cable_cable_gym_intermediate",
      "back_upper_back_reverse_pec_deck_machine_machine_gym_beginner",
      "chest_chest_push_up_incline_hands_elevated_bodyweight_home_gym_beginner"
    ],
    accessoryIds: ["core_abs_crunch_basic_bodyweight_home_beginner"],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-beg-home-shoulders",
    title: { [Language.PT]: "Ombros (Iniciante)", [Language.EN]: "Shoulders (Beginner)", [Language.ES]: "Hombros (Principiante)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.SHOULDERS],
    duration: 45,
    description: { [Language.PT]: "Ombros em casa com halteres.", [Language.EN]: "Shoulders at home with dumbbells.", [Language.ES]: "Hombros en casa con mancuernas." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "shoulders_delts_overhead_press_seated_dumbbells_dumbbell_gym_beginner",
      "shoulders_delts_arnold_press_seated_dumbbell_gym_intermediate",
      "chest_chest_push_up_incline_hands_elevated_bodyweight_home_gym_beginner",
      "arms_triceps_dips_bench_dips_bodyweight_home_gym_beginner"
    ],
    accessoryIds: ["core_abs_crunch_basic_bodyweight_home_beginner"],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-int-gym-shoulders",
    title: { [Language.PT]: "Ombros (Intermediário)", [Language.EN]: "Shoulders (Intermediate)", [Language.ES]: "Hombros (Intermedio)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.SHOULDERS],
    duration: 55,
    description: { [Language.PT]: "Ombros com volume progressivo.", [Language.EN]: "Shoulders with progressive volume.", [Language.ES]: "Hombros con volumen progresivo." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["chest_chest_push_up_incline_hands_elevated_bodyweight_home_gym_beginner"],
    mainBlockIds: [
      "shoulders_delts_overhead_press_barbell_standing_barbell_gym_intermediate",
      "shoulders_delts_arnold_press_seated_dumbbell_gym_intermediate",
      "shoulders_side_delts_lateral_raise_cable_cable_gym_intermediate",
      "back_upper_back_reverse_pec_deck_machine_machine_gym_beginner"
    ],
    accessoryIds: [
      "core_core_cable_crunch_kneeling_cable_gym_intermediate",
      "core_abs_crunch_basic_bodyweight_home_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-int-home-shoulders",
    title: { [Language.PT]: "Ombros (Intermediário)", [Language.EN]: "Shoulders (Intermediate)", [Language.ES]: "Hombros (Intermedio)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.SHOULDERS],
    duration: 50,
    description: { [Language.PT]: "Ombros intermediário em casa.", [Language.EN]: "Intermediate shoulders at home.", [Language.ES]: "Hombros intermedio en casa." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "shoulders_delts_overhead_press_seated_dumbbells_dumbbell_gym_beginner",
      "shoulders_delts_arnold_press_seated_dumbbell_gym_intermediate",
      "chest_chest_push_up_decline_feet_elevated_bodyweight_home_gym_intermediate",
      "arms_triceps_overhead_triceps_extension_dumbbell_dumbbell_home_gym_beginner"
    ],
    accessoryIds: [
      "core_abs_crunch_basic_bodyweight_home_beginner",
      "core_obliques_side_plank_standard_bodyweight_home_gym_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-adv-gym-shoulders",
    title: { [Language.PT]: "Ombros (Avançado)", [Language.EN]: "Shoulders (Advanced)", [Language.ES]: "Hombros (Avanzado)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.SHOULDERS],
    duration: 60,
    description: { [Language.PT]: "Ombros intenso com barra e cabos.", [Language.EN]: "Intense shoulders with barbell and cables.", [Language.ES]: "Hombros intenso con barra y cables." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'GYM',
    warmupIds: ["chest_chest_push_up_incline_hands_elevated_bodyweight_home_gym_beginner"],
    mainBlockIds: [
      "shoulders_delts_overhead_press_barbell_standing_barbell_gym_intermediate",
      "shoulders_delts_arnold_press_seated_dumbbell_gym_intermediate",
      "shoulders_side_delts_lateral_raise_cable_cable_gym_intermediate",
      "back_upper_back_reverse_pec_deck_machine_machine_gym_beginner",
      "back_upper_back_bent_over_row_barbell_barbell_gym_intermediate"
    ],
    accessoryIds: [
      "core_core_cable_crunch_kneeling_cable_gym_intermediate"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-adv-home-shoulders",
    title: { [Language.PT]: "Ombros (Avançado)", [Language.EN]: "Shoulders (Advanced)", [Language.ES]: "Hombros (Avanzado)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.SHOULDERS],
    duration: 55,
    description: { [Language.PT]: "Ombros avançado em casa — alto volume.", [Language.EN]: "Advanced shoulders at home.", [Language.ES]: "Hombros avanzado en casa." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "shoulders_delts_overhead_press_seated_dumbbells_dumbbell_gym_beginner",
      "shoulders_delts_arnold_press_seated_dumbbell_gym_intermediate",
      "chest_chest_push_up_decline_feet_elevated_bodyweight_home_gym_intermediate",
      "chest_chest_dips_chest_lean_bodyweight_gym_advanced",
      "arms_triceps_overhead_triceps_extension_dumbbell_dumbbell_home_gym_beginner"
    ],
    accessoryIds: [
      "core_abs_crunch_basic_bodyweight_home_beginner"
    ],
    cooldownIds: ["core_obliques_side_plank_standard_bodyweight_home_gym_beginner"]
  },

  // ============================================================
  // 🎯 BRO SPLIT — ARMS (6 presets)
  // ============================================================

  {
    id: "bs-beg-gym-arms",
    title: { [Language.PT]: "Braços (Iniciante)", [Language.EN]: "Arms (Beginner)", [Language.ES]: "Brazos (Principiante)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BICEPS, BodyAreaTag.TRICEPS],
    duration: 45,
    description: { [Language.PT]: "Bíceps e tríceps na academia.", [Language.EN]: "Biceps and triceps at the gym.", [Language.ES]: "Bíceps y tríceps en el gimnasio." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'GYM',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "arms_biceps_ez_bar_curl_ez_bar_barbell_gym_beginner",
      "arms_triceps_triceps_pushdown_rope_cable_gym_beginner",
      "arms_biceps_dumbbell_curl_standing_dumbbell_home_gym_beginner",
      "arms_triceps_triceps_pushdown_straight_bar_cable_gym_beginner"
    ],
    accessoryIds: [
      "arms_biceps_concentration_curl_seated_dumbbell_home_gym_beginner",
      "arms_forearms_wrist_curl_seated_dumbbell_barbell_home_gym_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-beg-home-arms",
    title: { [Language.PT]: "Braços (Iniciante)", [Language.EN]: "Arms (Beginner)", [Language.ES]: "Brazos (Principiante)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BICEPS, BodyAreaTag.TRICEPS],
    duration: 45,
    description: { [Language.PT]: "Braços em casa com halteres.", [Language.EN]: "Arms at home with dumbbells.", [Language.ES]: "Brazos en casa con mancuernas." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "arms_biceps_dumbbell_curl_standing_dumbbell_home_gym_beginner",
      "arms_triceps_overhead_triceps_extension_dumbbell_dumbbell_home_gym_beginner",
      "arms_biceps_hammer_curl_neutral_grip_dumbbell_home_gym_beginner",
      "arms_triceps_dips_bench_dips_bodyweight_home_gym_beginner"
    ],
    accessoryIds: [
      "arms_biceps_concentration_curl_seated_dumbbell_home_gym_beginner",
      "arms_forearms_wrist_curl_seated_dumbbell_barbell_home_gym_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-int-gym-arms",
    title: { [Language.PT]: "Braços (Intermediário)", [Language.EN]: "Arms (Intermediate)", [Language.ES]: "Brazos (Intermedio)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BICEPS, BodyAreaTag.TRICEPS],
    duration: 55,
    description: { [Language.PT]: "Braços com cargas progressivas.", [Language.EN]: "Arms with progressive loads.", [Language.ES]: "Brazos con cargas progresivas." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "arms_biceps_barbell_curl_straight_bar_barbell_gym_intermediate",
      "arms_triceps_overhead_cable_extension_rope_cable_gym_intermediate",
      "arms_biceps_incline_curl_bench_dumbbell_gym_intermediate",
      "arms_triceps_triceps_pushdown_rope_cable_gym_beginner"
    ],
    accessoryIds: [
      "arms_biceps_hammer_curl_neutral_grip_dumbbell_home_gym_beginner",
      "arms_forearms_reverse_wrist_curl_seated_dumbbell_barbell_home_gym_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-int-home-arms",
    title: { [Language.PT]: "Braços (Intermediário)", [Language.EN]: "Arms (Intermediate)", [Language.ES]: "Brazos (Intermedio)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BICEPS, BodyAreaTag.TRICEPS],
    duration: 50,
    description: { [Language.PT]: "Braços intermediário em casa.", [Language.EN]: "Intermediate arms at home.", [Language.ES]: "Brazos intermedio en casa." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "arms_biceps_dumbbell_curl_seated_dumbbell_home_gym_beginner",
      "arms_triceps_overhead_triceps_extension_dumbbell_dumbbell_home_gym_beginner",
      "arms_biceps_hammer_curl_neutral_grip_dumbbell_home_gym_beginner",
      "arms_triceps_dips_bench_dips_bodyweight_home_gym_beginner"
    ],
    accessoryIds: [
      "arms_biceps_concentration_curl_seated_dumbbell_home_gym_beginner",
      "arms_forearms_wrist_curl_seated_dumbbell_barbell_home_gym_beginner"
    ],
    cooldownIds: ["core_obliques_side_plank_standard_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-adv-gym-arms",
    title: { [Language.PT]: "Braços (Avançado)", [Language.EN]: "Arms (Advanced)", [Language.ES]: "Brazos (Avanzado)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BICEPS, BodyAreaTag.TRICEPS],
    duration: 60,
    description: { [Language.PT]: "Braços intenso com supersets.", [Language.EN]: "Intense arms with supersets.", [Language.ES]: "Brazos intenso con supersets." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'GYM',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "arms_biceps_barbell_curl_straight_bar_barbell_gym_intermediate",
      "arms_triceps_close_grip_bench_press_barbell_barbell_gym_advanced",
      "arms_biceps_incline_curl_bench_dumbbell_gym_intermediate",
      "arms_triceps_overhead_cable_extension_rope_cable_gym_intermediate",
      "arms_biceps_ez_bar_curl_ez_bar_barbell_gym_beginner"
    ],
    accessoryIds: [
      "arms_triceps_triceps_pushdown_straight_bar_cable_gym_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-adv-home-arms",
    title: { [Language.PT]: "Braços (Avançado)", [Language.EN]: "Arms (Advanced)", [Language.ES]: "Brazos (Avanzado)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BICEPS, BodyAreaTag.TRICEPS],
    duration: 55,
    description: { [Language.PT]: "Braços avançado em casa — alto volume.", [Language.EN]: "Advanced arms at home — high volume.", [Language.ES]: "Brazos avanzado en casa." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "arms_biceps_dumbbell_curl_standing_dumbbell_home_gym_beginner",
      "arms_triceps_overhead_triceps_extension_dumbbell_dumbbell_home_gym_beginner",
      "arms_biceps_hammer_curl_neutral_grip_dumbbell_home_gym_beginner",
      "arms_triceps_dips_bench_dips_bodyweight_home_gym_beginner",
      "arms_biceps_concentration_curl_seated_dumbbell_home_gym_beginner"
    ],
    accessoryIds: [
      "arms_forearms_reverse_wrist_curl_seated_dumbbell_barbell_home_gym_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  // ============================================================
  // 🎯 BRO SPLIT — CORE (6 presets)
  // ============================================================

  {
    id: "bs-beg-gym-core",
    title: { [Language.PT]: "Core e Abs (Iniciante)", [Language.EN]: "Core & Abs (Beginner)", [Language.ES]: "Core y Abs (Principiante)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CORE],
    duration: 40,
    description: { [Language.PT]: "Estabilidade e força do core na academia.", [Language.EN]: "Core stability and strength at the gym.", [Language.ES]: "Estabilidad y fuerza del core." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'GYM',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "core_core_plank_forearm_bodyweight_home_gym_beginner",
      "core_abs_crunch_basic_bodyweight_home_beginner",
      "core_obliques_side_plank_standard_bodyweight_home_gym_beginner",
      "core_lower_back_back_extension_bodyweight_bodyweight_machine_gym_home_beginner"
    ],
    accessoryIds: [
      "core_core_cable_crunch_kneeling_cable_gym_intermediate"
    ],
    cooldownIds: ["Puente de glúteos — En el suelo (bilateral)"]
  },

  {
    id: "bs-beg-home-core",
    title: { [Language.PT]: "Core e Abs (Iniciante)", [Language.EN]: "Core & Abs (Beginner)", [Language.ES]: "Core y Abs (Principiante)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CORE],
    duration: 35,
    description: { [Language.PT]: "Core em casa no chão.", [Language.EN]: "Core at home on the floor.", [Language.ES]: "Core en casa en el suelo." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "core_core_plank_forearm_bodyweight_home_gym_beginner",
      "core_abs_crunch_basic_bodyweight_home_beginner",
      "core_obliques_side_plank_standard_bodyweight_home_gym_beginner",
      "core_lower_back_back_extension_bodyweight_bodyweight_machine_gym_home_beginner"
    ],
    accessoryIds: [
      "Puente de glúteos — En el suelo (bilateral)"
    ],
    cooldownIds: ["Sentadilla — Peso corporal"]
  },

  {
    id: "bs-int-gym-core",
    title: { [Language.PT]: "Core e Abs (Intermediário)", [Language.EN]: "Core & Abs (Intermediate)", [Language.ES]: "Core y Abs (Intermedio)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CORE],
    duration: 50,
    description: { [Language.PT]: "Core com cabos e peso corporal.", [Language.EN]: "Core with cables and bodyweight.", [Language.ES]: "Core con cables y peso corporal." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "core_core_cable_crunch_kneeling_cable_gym_intermediate",
      "core_core_plank_forearm_bodyweight_home_gym_beginner",
      "core_obliques_side_plank_standard_bodyweight_home_gym_beginner",
      "core_abs_crunch_basic_bodyweight_home_beginner",
      "core_lower_back_back_extension_bodyweight_bodyweight_machine_gym_home_beginner"
    ],
    accessoryIds: [
      "Puente de glúteos — En el suelo (bilateral)"
    ],
    cooldownIds: ["Sentadilla — Peso corporal"]
  },

  {
    id: "bs-int-home-core",
    title: { [Language.PT]: "Core e Abs (Intermediário)", [Language.EN]: "Core & Abs (Intermediate)", [Language.ES]: "Core y Abs (Intermedio)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CORE],
    duration: 45,
    description: { [Language.PT]: "Core intermediário em casa.", [Language.EN]: "Intermediate core at home.", [Language.ES]: "Core intermedio en casa." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "core_core_plank_forearm_bodyweight_home_gym_beginner",
      "core_abs_crunch_basic_bodyweight_home_beginner",
      "core_obliques_side_plank_standard_bodyweight_home_gym_beginner",
      "core_lower_back_back_extension_bodyweight_bodyweight_machine_gym_home_beginner"
    ],
    accessoryIds: [
      "Puente de glúteos — En el suelo (bilateral)",
      "Sentadilla — Peso corporal"
    ],
    cooldownIds: ["Jumping Jacks — Peso corporal"]
  },

  {
    id: "bs-adv-gym-core",
    title: { [Language.PT]: "Core e Abs (Avançado)", [Language.EN]: "Core & Abs (Advanced)", [Language.ES]: "Core y Abs (Avanzado)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CORE],
    duration: 55,
    description: { [Language.PT]: "Core intenso com roda e cabos.", [Language.EN]: "Intense core with wheel and cables.", [Language.ES]: "Core intenso con rueda y cables." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'GYM',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "core_core_ab_wheel_rollout_kneeling_wheel_gym_home_advanced",
      "core_core_cable_crunch_kneeling_cable_gym_intermediate",
      "core_core_plank_forearm_bodyweight_home_gym_beginner",
      "core_obliques_side_plank_standard_bodyweight_home_gym_beginner",
      "core_abs_crunch_basic_bodyweight_home_beginner"
    ],
    accessoryIds: [
      "core_lower_back_back_extension_bodyweight_bodyweight_machine_gym_home_beginner"
    ],
    cooldownIds: ["Puente de glúteos — En el suelo (bilateral)"]
  },

  {
    id: "bs-adv-home-core",
    title: { [Language.PT]: "Core e Abs (Avançado)", [Language.EN]: "Core & Abs (Advanced)", [Language.ES]: "Core y Abs (Avanzado)" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CORE],
    duration: 50,
    description: { [Language.PT]: "Core avançado em casa — alto volume.", [Language.EN]: "Advanced core at home — high volume.", [Language.ES]: "Core avanzado en casa." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "core_core_ab_wheel_rollout_kneeling_wheel_gym_home_advanced",
      "core_core_plank_forearm_bodyweight_home_gym_beginner",
      "core_obliques_side_plank_standard_bodyweight_home_gym_beginner",
      "core_abs_crunch_basic_bodyweight_home_beginner",
      "core_lower_back_back_extension_bodyweight_bodyweight_machine_gym_home_beginner"
    ],
    accessoryIds: [
      "Puente de glúteos — En el suelo (bilateral)"
    ],
    cooldownIds: ["Sentadilla — Peso corporal"]
  },

  // ============================================================
  // 🎯 BRO SPLIT — CARDIO (6 presets)
  // ============================================================

  {
    id: "bs-beg-gym-cardio",
    title: { [Language.PT]: "Cardio (Iniciante)", [Language.EN]: "Cardio (Beginner)", [Language.ES]: "Cardio (Principiante)" },
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.CARDIO],
    duration: 35,
    description: { [Language.PT]: "Cardio leve na academia.", [Language.EN]: "Light cardio at the gym.", [Language.ES]: "Cardio ligero en el gimnasio." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'GYM',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "Cinta de correr — Ritmo Constante",
      "Elíptica — Estándar",
      "Bicicleta Estática — Spinning",
      "Rodillas Arriba — Peso corporal"
    ],
    accessoryIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"],
    cooldownIds: ["Sentadilla — Peso corporal"]
  },

  {
    id: "bs-beg-home-cardio",
    title: { [Language.PT]: "Cardio (Iniciante)", [Language.EN]: "Cardio (Beginner)", [Language.ES]: "Cardio (Principiante)" },
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.CARDIO],
    duration: 30,
    description: { [Language.PT]: "Cardio em casa sem equipamento.", [Language.EN]: "Cardio at home with no equipment.", [Language.ES]: "Cardio en casa sin equipamiento." },
    difficulty: ExperienceLevel.BEGINNER,
    environment: 'HOME',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)"],
    mainBlockIds: [
      "Jumping Jacks — Peso corporal",
      "Rodillas Arriba — Peso corporal",
      "Saltar la cuerda — Básico",
      "Sentadilla — Peso corporal"
    ],
    accessoryIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"],
    cooldownIds: ["core_obliques_side_plank_standard_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-int-gym-cardio",
    title: { [Language.PT]: "Cardio (Intermediário)", [Language.EN]: "Cardio (Intermediate)", [Language.ES]: "Cardio (Intermedio)" },
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.CARDIO],
    duration: 45,
    description: { [Language.PT]: "Cardio intervalado na academia.", [Language.EN]: "Interval cardio at the gym.", [Language.ES]: "Cardio intervalado en el gimnasio." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "Remo (Máquina) — Intervalos",
      "Escaladora — Estándar",
      "Cinta de correr — Ritmo Constante",
      "Bicicleta Estática — Spinning",
      "Elíptica — Estándar"
    ],
    accessoryIds: ["core_abs_crunch_basic_bodyweight_home_beginner"],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-int-home-cardio",
    title: { [Language.PT]: "Cardio (Intermediário)", [Language.EN]: "Cardio (Intermediate)", [Language.ES]: "Cardio (Intermedio)" },
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.CARDIO],
    duration: 40,
    description: { [Language.PT]: "Cardio intermediário em casa.", [Language.EN]: "Intermediate cardio at home.", [Language.ES]: "Cardio intermedio en casa." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)"],
    mainBlockIds: [
      "Jumping Jacks — Peso corporal",
      "Saltar la cuerda — Básico",
      "Rodillas Arriba — Peso corporal",
      "Burpees — Estándar",
      "Sentadilla — Peso corporal"
    ],
    accessoryIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"],
    cooldownIds: ["core_obliques_side_plank_standard_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-adv-gym-cardio",
    title: { [Language.PT]: "Cardio (Avançado)", [Language.EN]: "Cardio (Advanced)", [Language.ES]: "Cardio (Avanzado)" },
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.CARDIO],
    duration: 50,
    description: { [Language.PT]: "Cardio intenso na academia.", [Language.EN]: "Intense cardio at the gym.", [Language.ES]: "Cardio intenso en el gimnasio." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'GYM',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "Remo (Máquina) — Intervalos",
      "Escaladora — Estándar",
      "Burpees — Estándar",
      "Cinta de correr — Ritmo Constante",
      "Bicicleta Estática — Spinning"
    ],
    accessoryIds: [
      "core_abs_crunch_basic_bodyweight_home_beginner"
    ],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "bs-adv-home-cardio",
    title: { [Language.PT]: "Cardio (Avançado)", [Language.EN]: "Cardio (Advanced)", [Language.ES]: "Cardio (Avanzado)" },
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.CARDIO],
    duration: 40,
    description: { [Language.PT]: "Cardio avançado em casa — alta intensidade.", [Language.EN]: "Advanced cardio at home — high intensity.", [Language.ES]: "Cardio avanzado en casa — alta intensidad." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'HOME',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)"],
    mainBlockIds: [
      "Burpees — Estándar",
      "Jumping Jacks — Peso corporal",
      "Saltar la cuerda — Básico",
      "Rodillas Arriba — Peso corporal",
      "Sentadilla — Peso corporal"
    ],
    accessoryIds: [
      "core_core_plank_forearm_bodyweight_home_gym_beginner"
    ],
    cooldownIds: ["core_obliques_side_plank_standard_bodyweight_home_gym_beginner"]
  },

  // ============================================================
  // ⚡ HIIT / FUNCTIONAL (4 presets — 2 GYM + 2 HOME)
  // ============================================================

  {
    id: "hiit-gym-1",
    title: { [Language.PT]: "HIIT (Academia)", [Language.EN]: "HIIT (Gym)", [Language.ES]: "HIIT (Gimnasio)" },
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.CARDIO, BodyAreaTag.LEGS, BodyAreaTag.CORE],
    duration: 35,
    description: { [Language.PT]: "Alta intensidade com máquinas e peso corporal.", [Language.EN]: "High intensity with machines and bodyweight.", [Language.ES]: "Alta intensidad con máquinas y peso corporal." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["Jumping Jacks — Peso corporal"],
    mainBlockIds: [
      "Remo (Máquina) — Intervalos",
      "Burpees — Estándar",
      "Sentadilla — Peso corporal",
      "Rodillas Arriba — Peso corporal",
      "Escaladora — Estándar",
      "core_abs_crunch_basic_bodyweight_home_beginner"
    ],
    accessoryIds: [],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },

  {
    id: "hiit-gym-2",
    title: { [Language.PT]: "HIIT Avançado (Academia)", [Language.EN]: "HIIT Advanced (Gym)", [Language.ES]: "HIIT Avanzado (Gimnasio)" },
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.CARDIO, BodyAreaTag.LEGS, BodyAreaTag.CHEST, BodyAreaTag.CORE],
    duration: 40,
    description: { [Language.PT]: "HIIT avançado com circuito completo.", [Language.EN]: "Advanced HIIT with full circuit.", [Language.ES]: "HIIT avanzado con circuito completo." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'GYM',
    warmupIds: ["Jumping Jacks — Peso corporal", "Sentadilla — Peso corporal"],
    mainBlockIds: [
      "Burpees — Estándar",
      "Remo (Máquina) — Intervalos",
      "chest_chest_push_up_wide_bodyweight_home_gym_beginner",
      "Escaladora — Estándar",
      "Zancada — Walking",
      "core_abs_crunch_basic_bodyweight_home_beginner"
    ],
    accessoryIds: [],
    cooldownIds: ["core_obliques_side_plank_standard_bodyweight_home_gym_beginner"]
  },

  {
    id: "hiit-home-1",
    title: { [Language.PT]: "HIIT (Casa)", [Language.EN]: "HIIT (Home)", [Language.ES]: "HIIT (Casa)" },
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.CARDIO, BodyAreaTag.LEGS, BodyAreaTag.CORE],
    duration: 30,
    description: { [Language.PT]: "Alta intensidade sem equipamento.", [Language.EN]: "High intensity with no equipment.", [Language.ES]: "Alta intensidad sin equipamiento." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'HOME',
    warmupIds: ["Puente de glúteos — En el suelo (bilateral)"],
    mainBlockIds: [
      "Jumping Jacks — Peso corporal",
      "Burpees — Estándar",
      "Sentadilla — Peso corporal",
      "Rodillas Arriba — Peso corporal",
      "Zancada — Walking",
      "core_core_plank_forearm_bodyweight_home_gym_beginner"
    ],
    accessoryIds: [],
    cooldownIds: ["core_obliques_side_plank_standard_bodyweight_home_gym_beginner"]
  },

  {
    id: "hiit-home-2",
    title: { [Language.PT]: "HIIT Avançado (Casa)", [Language.EN]: "HIIT Advanced (Home)", [Language.ES]: "HIIT Avanzado (Casa)" },
    primaryCategory: WorkoutCategory.FULL_BODY,
    tags: [BodyAreaTag.CARDIO, BodyAreaTag.LEGS, BodyAreaTag.CHEST, BodyAreaTag.CORE],
    duration: 35,
    description: { [Language.PT]: "HIIT avançado em casa — circuito intenso.", [Language.EN]: "Advanced HIIT at home — intense circuit.", [Language.ES]: "HIIT avanzado en casa — circuito intenso." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'HOME',
    warmupIds: ["Jumping Jacks — Peso corporal", "Puente de glúteos — En el suelo (bilateral)"],
    mainBlockIds: [
      "Burpees — Estándar",
      "Saltar la cuerda — Básico",
      "chest_chest_push_up_decline_feet_elevated_bodyweight_home_gym_intermediate",
      "Zancada búlgara — Peso corporal",
      "Rodillas Arriba — Peso corporal",
      "core_abs_crunch_basic_bodyweight_home_beginner"
    ],
    accessoryIds: [],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  }
];
