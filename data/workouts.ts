
import { Language, PresetWorkout, WorkoutCategory, BodyAreaTag, ExperienceLevel } from '../types';

export const PRESET_WORKOUTS: PresetWorkout[] = [
  {
    id: "p-peito-triceps",
    title: { [Language.PT]: "Peito e Tríceps", [Language.EN]: "Chest and Triceps", [Language.ES]: "Pecho y Tríceps" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.CHEST, BodyAreaTag.TRICEPS],
    duration: 60,
    description: { [Language.PT]: "Treino focado em empurrar, desenvolvendo o peitoral e braços.", [Language.EN]: "Push focused workout for chest and arms.", [Language.ES]: "Enfoque en pecho y tríceps." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["chest_chest_push_up_diamond_close_grip_bodyweight_home_gym_intermediate"],
    mainBlockIds: ["chest_chest_push_up_standard_bodyweight_home_gym_beginner", "chest_chest_push_up_incline_hands_elevated_bodyweight_home_gym_beginner", "chest_chest_push_up_decline_feet_elevated_bodyweight_home_gym_intermediate", "chest_chest_push_up_wide_bodyweight_home_gym_beginner"],
    accessoryIds: ["arms_biceps_incline_curl_bench_dumbbell_gym_intermediate", "arms_biceps_concentration_curl_seated_dumbbell_home_gym_beginner"],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },
  {
    id: "p-costas-biceps",
    title: { [Language.PT]: "Costas e Bíceps", [Language.EN]: "Back and Biceps", [Language.ES]: "Espalda y Bíceps" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.BACK, BodyAreaTag.BICEPS],
    duration: 60,
    description: { [Language.PT]: "Foco em tração e dorsais largas.", [Language.EN]: "Lat focus and pull strength.", [Language.ES]: "Espalda y bíceps." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["back_lats_chin_up_underhand_bodyweight_gym_advanced"],
    mainBlockIds: ["back_lats_lat_pulldown_wide_grip_machine_cable_gym_beginner", "back_lats_lat_pulldown_neutral_grip_machine_cable_gym_beginner", "back_lats_lat_pulldown_single_arm_cable_gym_intermediate", "back_lats_pull_up_bodyweight_bodyweight_gym_advanced"],
    accessoryIds: ["arms_biceps_dumbbell_curl_standing_dumbbell_home_gym_beginner", "arms_biceps_dumbbell_curl_seated_dumbbell_home_gym_beginner"],
    cooldownIds: ["core_core_plank_high_plank_bodyweight_home_gym_beginner"]
  },
  {
    id: "p-pernas-completo",
    title: { [Language.PT]: "Pernas (Completo)", [Language.EN]: "Leg Day (Full)", [Language.ES]: "Piernas (Completo)" },
    primaryCategory: WorkoutCategory.LOWER,
    tags: [BodyAreaTag.LEGS, BodyAreaTag.GLUTES],
    duration: 75,
    description: { [Language.PT]: "Treino exaustivo para membros inferiores.", [Language.EN]: "Total lower body fatigue.", [Language.ES]: "Entrenamiento completo de piernas." },
    difficulty: ExperienceLevel.ADVANCED,
    environment: 'GYM',
    warmupIds: ["Sentadilla trasera — Barra baja"],
    mainBlockIds: ["Extensión de piernas — Bilateral", "Extensión de piernas — Unilateral", "Extensión de piernas — Isométrico (arriba)", "Sentadilla — Peso corporal", "Sentadilla — Goblet"],
    accessoryIds: ["Sentadilla trasera — Barra alta"],
    cooldownIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner"]
  },
  {
    id: "p-ombros-abs",
    title: { [Language.PT]: "Ombros e Abdômen", [Language.EN]: "Shoulders and Core", [Language.ES]: "Hombros y Core" },
    primaryCategory: WorkoutCategory.UPPER,
    tags: [BodyAreaTag.SHOULDERS, BodyAreaTag.CORE],
    duration: 60,
    description: { [Language.PT]: "Desenvolvimento de ombros e estabilidade do core.", [Language.EN]: "Shoulder width and core stability.", [Language.ES]: "Hombros y abdominales." },
    difficulty: ExperienceLevel.INTERMEDIATE,
    environment: 'GYM',
    warmupIds: ["shoulders_delts_overhead_press_barbell_standing_barbell_gym_intermediate"],
    mainBlockIds: ["shoulders_delts_overhead_press_seated_dumbbells_dumbbell_gym_beginner", "shoulders_delts_arnold_press_seated_dumbbell_gym_intermediate", "shoulders_side_delts_lateral_raise_dumbbells_dumbbell_home_gym_beginner"],
    accessoryIds: ["core_core_plank_forearm_bodyweight_home_gym_beginner", "core_core_plank_high_plank_bodyweight_home_gym_beginner", "core_abs_crunch_basic_bodyweight_home_beginner"],
    cooldownIds: ["core_abs_reverse_crunch_floor_bodyweight_home_beginner"]
  },
  {
    "id": "p-beginner-gym-chest",
    "title": {
      "PT": "Peito (Iniciante)",
      "EN": "Chest (Beginner)",
      "ES": "Pecho (Principiante)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CHEST
    ],
    "duration": 45,
    "description": {
      "PT": "Treino de Peito para nível Iniciante.",
      "EN": "Chest workout for Beginner level.",
      "ES": "Entrenamiento de Pecho para nivel Principiante."
    },
    "difficulty": ExperienceLevel.BEGINNER,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "chest_chest_dips_chest_lean_bodyweight_gym_advanced",
      "chest_chest_push_up_incline_hands_elevated_bodyweight_home_gym_beginner",
      "chest_chest_pec_deck_machine_machine_gym_beginner",
      "chest_chest_bench_press_close_grip_barbell_gym_advanced"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-beginner-home-chest",
    "title": {
      "PT": "Peito (Iniciante)",
      "EN": "Chest (Beginner)",
      "ES": "Pecho (Principiante)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CHEST
    ],
    "duration": 45,
    "description": {
      "PT": "Treino de Peito para nível Iniciante.",
      "EN": "Chest workout for Beginner level.",
      "ES": "Entrenamiento de Pecho para nivel Principiante."
    },
    "difficulty": ExperienceLevel.BEGINNER,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "chest_chest_pec_deck_machine_machine_gym_beginner",
      "chest_chest_bench_press_paused_reps_barbell_gym_advanced",
      "chest_chest_dips_chest_lean_bodyweight_gym_advanced",
      "chest_chest_chest_fly_flat_bench_dumbbell_home_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-beginner-gym-back",
    "title": {
      "PT": "Costas (Iniciante)",
      "EN": "Back (Beginner)",
      "ES": "Espalda (Principiante)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.BACK
    ],
    "duration": 45,
    "description": {
      "PT": "Treino de Costas para nível Iniciante.",
      "EN": "Back workout for Beginner level.",
      "ES": "Entrenamiento de Espalda para nivel Principiante."
    },
    "difficulty": ExperienceLevel.BEGINNER,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "back_upper_back_reverse_pec_deck_machine_machine_gym_beginner",
      "back_lats_lat_pulldown_single_arm_cable_gym_intermediate",
      "back_lower_back_back_extension_45_degree_hyper_machine_gym_beginner",
      "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-beginner-home-back",
    "title": {
      "PT": "Costas (Iniciante)",
      "EN": "Back (Beginner)",
      "ES": "Espalda (Principiante)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.BACK
    ],
    "duration": 45,
    "description": {
      "PT": "Treino de Costas para nível Iniciante.",
      "EN": "Back workout for Beginner level.",
      "ES": "Entrenamiento de Espalda para nivel Principiante."
    },
    "difficulty": ExperienceLevel.BEGINNER,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "back_back_resistance_band_row_standing_seated_band_home_beginner",
      "back_lats_lat_pulldown_wide_grip_machine_cable_gym_beginner",
      "back_lats_lat_pulldown_single_arm_cable_gym_intermediate",
      "back_upper_back_t_bar_row_landmine_barbell_gym_intermediate"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-beginner-gym-legs",
    "title": {
      "PT": "Pernas (Iniciante)",
      "EN": "Legs (Beginner)",
      "ES": "Piernas (Principiante)"
    },
    "primaryCategory": WorkoutCategory.LOWER,
    "tags": [
      BodyAreaTag.LEGS
    ],
    "duration": 45,
    "description": {
      "PT": "Treino de Pernas para nível Iniciante.",
      "EN": "Legs workout for Beginner level.",
      "ES": "Entrenamiento de Piernas para nivel Principiante."
    },
    "difficulty": ExperienceLevel.BEGINNER,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "Curl femoral sentado — Bilateral",
      "Peso muerto rumano — Barra",
      "Elevación de gemelos a una pierna — Step",
      "Sentadilla frontal — Agarre clean / brazos cruzados"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-beginner-home-legs",
    "title": {
      "PT": "Pernas (Iniciante)",
      "EN": "Legs (Beginner)",
      "ES": "Piernas (Principiante)"
    },
    "primaryCategory": WorkoutCategory.LOWER,
    "tags": [
      BodyAreaTag.LEGS
    ],
    "duration": 45,
    "description": {
      "PT": "Treino de Pernas para nível Iniciante.",
      "EN": "Legs workout for Beginner level.",
      "ES": "Entrenamiento de Piernas para nivel Principiante."
    },
    "difficulty": ExperienceLevel.BEGINNER,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "Curl femoral con deslizamiento — Towel/slider",
      "Patada de glúteo en polea — Tobillera",
      "Prensa de piernas — Bajo y estrecho (énfasis cuádriceps)",
      "Peso muerto piernas rígidas — Barra"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-beginner-gym-shoulders",
    "title": {
      "PT": "Ombros (Iniciante)",
      "EN": "Shoulders (Beginner)",
      "ES": "Hombros (Principiante)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.SHOULDERS
    ],
    "duration": 45,
    "description": {
      "PT": "Treino de Ombros para nível Iniciante.",
      "EN": "Shoulders workout for Beginner level.",
      "ES": "Entrenamiento de Hombros para nivel Principiante."
    },
    "difficulty": ExperienceLevel.BEGINNER,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "shoulders_front_delts_front_raise_dumbbells_dumbbell_home_gym_beginner",
      "shoulders_rear_delts_rear_delt_fly_cable_cable_gym_intermediate",
      "shoulders_delts_pike_push_up_bodyweight_bodyweight_home_intermediate",
      "shoulders_delts_overhead_press_seated_dumbbells_dumbbell_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-beginner-home-shoulders",
    "title": {
      "PT": "Ombros (Iniciante)",
      "EN": "Shoulders (Beginner)",
      "ES": "Hombros (Principiante)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.SHOULDERS
    ],
    "duration": 45,
    "description": {
      "PT": "Treino de Ombros para nível Iniciante.",
      "EN": "Shoulders workout for Beginner level.",
      "ES": "Entrenamiento de Hombros para nivel Principiante."
    },
    "difficulty": ExperienceLevel.BEGINNER,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "shoulders_side_delts_lateral_raise_dumbbells_dumbbell_home_gym_beginner",
      "shoulders_rotator_cuff_external_rotation_cable_band_band_cable_home_gym_beginner",
      "shoulders_side_delts_lateral_raise_cable_cable_gym_intermediate",
      "shoulders_side_delts_lateral_raise_leaning_dumbbell_gym_intermediate"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-beginner-gym-arms",
    "title": {
      "PT": "Braços (Iniciante)",
      "EN": "Arms (Beginner)",
      "ES": "Brazos (Principiante)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.ARMS
    ],
    "duration": 45,
    "description": {
      "PT": "Treino de Braços para nível Iniciante.",
      "EN": "Arms workout for Beginner level.",
      "ES": "Entrenamiento de Brazos para nivel Principiante."
    },
    "difficulty": ExperienceLevel.BEGINNER,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "arms_biceps_dumbbell_curl_standing_dumbbell_home_gym_beginner",
      "arms_biceps_chin_up_underhand_bodyweight_gym_advanced",
      "arms_triceps_triceps_pushdown_rope_cable_gym_beginner",
      "arms_biceps_ez_bar_curl_ez_bar_barbell_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-beginner-home-arms",
    "title": {
      "PT": "Braços (Iniciante)",
      "EN": "Arms (Beginner)",
      "ES": "Brazos (Principiante)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.ARMS
    ],
    "duration": 45,
    "description": {
      "PT": "Treino de Braços para nível Iniciante.",
      "EN": "Arms workout for Beginner level.",
      "ES": "Entrenamiento de Brazos para nivel Principiante."
    },
    "difficulty": ExperienceLevel.BEGINNER,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "arms_biceps_hammer_curl_neutral_grip_dumbbell_home_gym_beginner",
      "arms_triceps_dips_bench_dips_bodyweight_home_gym_beginner",
      "arms_biceps_barbell_curl_straight_bar_barbell_gym_intermediate",
      "arms_forearms_wrist_curl_seated_dumbbell_barbell_home_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-beginner-gym-core",
    "title": {
      "PT": "Core e Abs (Iniciante)",
      "EN": "Core & Abs (Beginner)",
      "ES": "Core y Abs (Principiante)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CORE
    ],
    "duration": 45,
    "description": {
      "PT": "Treino de Core e Abs para nível Iniciante.",
      "EN": "Core & Abs workout for Beginner level.",
      "ES": "Entrenamiento de Core y Abs para nivel Principiante."
    },
    "difficulty": ExperienceLevel.BEGINNER,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "core_core_ab_wheel_rollout_kneeling_wheel_gym_home_advanced",
      "core_abs_knee_raise_captain_chair_bar_machine_bar_gym_intermediate",
      "core_core_pallof_press_standing_cable_band_gym_home_intermediate",
      "core_core_stability_bird_dog_basic_bodyweight_home_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-beginner-home-core",
    "title": {
      "PT": "Core e Abs (Iniciante)",
      "EN": "Core & Abs (Beginner)",
      "ES": "Core y Abs (Principiante)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CORE
    ],
    "duration": 45,
    "description": {
      "PT": "Treino de Core e Abs para nível Iniciante.",
      "EN": "Core & Abs workout for Beginner level.",
      "ES": "Entrenamiento de Core y Abs para nivel Principiante."
    },
    "difficulty": ExperienceLevel.BEGINNER,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "core_abs_hanging_leg_raise_straight_legs_bar_gym_advanced",
      "core_core_pallof_press_standing_cable_band_gym_home_intermediate",
      "core_core_plank_high_plank_bodyweight_home_gym_beginner",
      "core_obliques_side_plank_standard_bodyweight_home_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-beginner-gym-cardio",
    "title": {
      "PT": "Cardio (Iniciante)",
      "EN": "Cardio (Beginner)",
      "ES": "Cardio (Principiante)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CARDIO
    ],
    "duration": 45,
    "description": {
      "PT": "Treino de Cardio para nível Iniciante.",
      "EN": "Cardio workout for Beginner level.",
      "ES": "Entrenamiento de Cardio para nivel Principiante."
    },
    "difficulty": ExperienceLevel.BEGINNER,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "Remo (Máquina) — Intervalos",
      "Burpees — Estándar",
      "Bicicleta Estática — Spinning",
      "Sombra de Boxeo — Libre"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-beginner-home-cardio",
    "title": {
      "PT": "Cardio (Iniciante)",
      "EN": "Cardio (Beginner)",
      "ES": "Cardio (Principiante)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CARDIO
    ],
    "duration": 45,
    "description": {
      "PT": "Treino de Cardio para nível Iniciante.",
      "EN": "Cardio workout for Beginner level.",
      "ES": "Entrenamiento de Cardio para nivel Principiante."
    },
    "difficulty": ExperienceLevel.BEGINNER,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "Burpees — Estándar",
      "Saltar la cuerda — Básico",
      "Jumping Jacks — Peso corporal",
      "Cinta de correr — Ritmo Constante"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-intermediate-gym-chest",
    "title": {
      "PT": "Peito (Intermediário)",
      "EN": "Chest (Intermediate)",
      "ES": "Pecho (Intermedio)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CHEST
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Peito para nível Intermediário.",
      "EN": "Chest workout for Intermediate level.",
      "ES": "Entrenamiento de Pecho para nivel Intermedio."
    },
    "difficulty": ExperienceLevel.INTERMEDIATE,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "chest_chest_dips_chest_lean_bodyweight_gym_advanced",
      "chest_chest_cable_fly_high_to_low_cable_gym_intermediate",
      "chest_chest_bench_press_flat_barbell_gym_intermediate",
      "chest_chest_cable_fly_low_to_high_cable_gym_intermediate"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-intermediate-home-chest",
    "title": {
      "PT": "Peito (Intermediário)",
      "EN": "Chest (Intermediate)",
      "ES": "Pecho (Intermedio)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CHEST
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Peito para nível Intermediário.",
      "EN": "Chest workout for Intermediate level.",
      "ES": "Entrenamiento de Pecho para nivel Intermedio."
    },
    "difficulty": ExperienceLevel.INTERMEDIATE,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "chest_upper_chest_incline_bench_press_30_45_degrees_barbell_gym_intermediate",
      "chest_chest_bench_press_flat_barbell_gym_intermediate",
      "chest_chest_dips_assisted_machine_band_gym_intermediate",
      "chest_chest_cable_fly_high_to_low_cable_gym_intermediate"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-intermediate-gym-back",
    "title": {
      "PT": "Costas (Intermediário)",
      "EN": "Back (Intermediate)",
      "ES": "Espalda (Intermedio)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.BACK
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Costas para nível Intermediário.",
      "EN": "Back workout for Intermediate level.",
      "ES": "Entrenamiento de Espalda para nivel Intermedio."
    },
    "difficulty": ExperienceLevel.INTERMEDIATE,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "back_upper_back_t_bar_row_landmine_barbell_gym_intermediate",
      "back_upper_back_face_pull_rope_to_forehead_cable_gym_beginner",
      "back_lats_lat_pulldown_neutral_grip_machine_cable_gym_beginner",
      "back_upper_back_reverse_pec_deck_machine_machine_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-intermediate-home-back",
    "title": {
      "PT": "Costas (Intermediário)",
      "EN": "Back (Intermediate)",
      "ES": "Espalda (Intermedio)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.BACK
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Costas para nível Intermediário.",
      "EN": "Back workout for Intermediate level.",
      "ES": "Entrenamiento de Espalda para nivel Intermedio."
    },
    "difficulty": ExperienceLevel.INTERMEDIATE,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "back_lats_straight_arm_pulldown_cable_cable_gym_intermediate",
      "back_lats_lat_pulldown_single_arm_cable_gym_intermediate",
      "back_mid_back_seated_cable_row_wide_grip_cable_gym_intermediate",
      "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-intermediate-gym-legs",
    "title": {
      "PT": "Pernas (Intermediário)",
      "EN": "Legs (Intermediate)",
      "ES": "Piernas (Intermedio)"
    },
    "primaryCategory": WorkoutCategory.LOWER,
    "tags": [
      BodyAreaTag.LEGS
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Pernas para nível Intermediário.",
      "EN": "Legs workout for Intermediate level.",
      "ES": "Entrenamiento de Piernas para nivel Intermedio."
    },
    "difficulty": ExperienceLevel.INTERMEDIATE,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "Caminata lateral con banda — Banda mini",
      "Abducción de cadera (glúteo medio) — Acostado de lado",
      "Clamshell — Banda mini",
      "Elevación de gemelos a una pierna — Step"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-intermediate-home-legs",
    "title": {
      "PT": "Pernas (Intermediário)",
      "EN": "Legs (Intermediate)",
      "ES": "Piernas (Intermedio)"
    },
    "primaryCategory": WorkoutCategory.LOWER,
    "tags": [
      BodyAreaTag.LEGS
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Pernas para nível Intermediário.",
      "EN": "Legs workout for Intermediate level.",
      "ES": "Entrenamiento de Piernas para nivel Intermedio."
    },
    "difficulty": ExperienceLevel.INTERMEDIATE,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "Zancada inversa — Peso corporal",
      "Aducción en polea — De pie",
      "Caminata lateral con banda — Banda mini",
      "Zancada — Walking"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-intermediate-gym-shoulders",
    "title": {
      "PT": "Ombros (Intermediário)",
      "EN": "Shoulders (Intermediate)",
      "ES": "Hombros (Intermedio)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.SHOULDERS
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Ombros para nível Intermediário.",
      "EN": "Shoulders workout for Intermediate level.",
      "ES": "Entrenamiento de Hombros para nivel Intermedio."
    },
    "difficulty": ExperienceLevel.INTERMEDIATE,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "shoulders_delts_overhead_press_barbell_standing_barbell_gym_intermediate",
      "shoulders_rear_delts_rear_delt_fly_cable_cable_gym_intermediate",
      "shoulders_side_delts_lateral_raise_dumbbells_dumbbell_home_gym_beginner",
      "shoulders_delts_arnold_press_seated_dumbbell_gym_intermediate"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-intermediate-home-shoulders",
    "title": {
      "PT": "Ombros (Intermediário)",
      "EN": "Shoulders (Intermediate)",
      "ES": "Hombros (Intermedio)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.SHOULDERS
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Ombros para nível Intermediário.",
      "EN": "Shoulders workout for Intermediate level.",
      "ES": "Entrenamiento de Hombros para nivel Intermedio."
    },
    "difficulty": ExperienceLevel.INTERMEDIATE,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "shoulders_delts_upright_row_ez_bar_barbell_gym_intermediate",
      "shoulders_side_delts_lateral_raise_leaning_dumbbell_gym_intermediate",
      "shoulders_rear_delts_rear_delt_fly_bent_over_db_dumbbell_home_gym_beginner",
      "shoulders_rotator_cuff_external_rotation_cable_band_band_cable_home_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-intermediate-gym-arms",
    "title": {
      "PT": "Braços (Intermediário)",
      "EN": "Arms (Intermediate)",
      "ES": "Brazos (Intermedio)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.ARMS
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Braços para nível Intermediário.",
      "EN": "Arms workout for Intermediate level.",
      "ES": "Entrenamiento de Brazos para nivel Intermedio."
    },
    "difficulty": ExperienceLevel.INTERMEDIATE,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "arms_triceps_diamond_push_up_bodyweight_bodyweight_home_intermediate",
      "arms_grip_farmer_carry_dumbbells_dumbbell_home_gym_intermediate",
      "arms_triceps_overhead_triceps_extension_dumbbell_dumbbell_home_gym_beginner",
      "arms_biceps_concentration_curl_seated_dumbbell_home_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-intermediate-home-arms",
    "title": {
      "PT": "Braços (Intermediário)",
      "EN": "Arms (Intermediate)",
      "ES": "Brazos (Intermedio)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.ARMS
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Braços para nível Intermediário.",
      "EN": "Arms workout for Intermediate level.",
      "ES": "Entrenamiento de Brazos para nivel Intermedio."
    },
    "difficulty": ExperienceLevel.INTERMEDIATE,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "arms_triceps_skull_crushers_ez_bar_barbell_gym_intermediate",
      "arms_triceps_dips_bench_dips_bodyweight_home_gym_beginner",
      "arms_biceps_ez_bar_curl_ez_bar_barbell_gym_beginner",
      "arms_triceps_overhead_triceps_extension_dumbbell_dumbbell_home_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-intermediate-gym-core",
    "title": {
      "PT": "Core e Abs (Intermediário)",
      "EN": "Core & Abs (Intermediate)",
      "ES": "Core y Abs (Intermedio)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CORE
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Core e Abs para nível Intermediário.",
      "EN": "Core & Abs workout for Intermediate level.",
      "ES": "Entrenamiento de Core y Abs para nivel Intermedio."
    },
    "difficulty": ExperienceLevel.INTERMEDIATE,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "core_lower_back_back_extension_bodyweight_bodyweight_machine_gym_home_beginner",
      "core_core_stability_bird_dog_basic_bodyweight_home_beginner",
      "core_core_stability_dead_bug_basic_bodyweight_home_beginner",
      "core_obliques_russian_twist_bodyweight_bodyweight_home_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-intermediate-home-core",
    "title": {
      "PT": "Core e Abs (Intermediário)",
      "EN": "Core & Abs (Intermediate)",
      "ES": "Core y Abs (Intermedio)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CORE
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Core e Abs para nível Intermediário.",
      "EN": "Core & Abs workout for Intermediate level.",
      "ES": "Entrenamiento de Core y Abs para nivel Intermedio."
    },
    "difficulty": ExperienceLevel.INTERMEDIATE,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "core_abs_crunch_basic_bodyweight_home_beginner",
      "core_obliques_russian_twist_bodyweight_bodyweight_home_beginner",
      "core_abs_hanging_leg_raise_straight_legs_bar_gym_advanced",
      "core_core_plank_forearm_bodyweight_home_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-intermediate-gym-cardio",
    "title": {
      "PT": "Cardio (Intermediário)",
      "EN": "Cardio (Intermediate)",
      "ES": "Cardio (Intermedio)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CARDIO
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Cardio para nível Intermediário.",
      "EN": "Cardio workout for Intermediate level.",
      "ES": "Entrenamiento de Cardio para nivel Intermedio."
    },
    "difficulty": ExperienceLevel.INTERMEDIATE,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "Elíptica — Estándar",
      "Cinta de correr — Ritmo Constante",
      "Sombra de Boxeo — Libre",
      "Remo (Máquina) — Intervalos"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-intermediate-home-cardio",
    "title": {
      "PT": "Cardio (Intermediário)",
      "EN": "Cardio (Intermediate)",
      "ES": "Cardio (Intermedio)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CARDIO
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Cardio para nível Intermediário.",
      "EN": "Cardio workout for Intermediate level.",
      "ES": "Entrenamiento de Cardio para nivel Intermedio."
    },
    "difficulty": ExperienceLevel.INTERMEDIATE,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "Remo (Máquina) — Intervalos",
      "Escaladora — Estándar",
      "Cinta de correr — Ritmo Constante",
      "Burpees — Estándar"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-advanced-gym-chest",
    "title": {
      "PT": "Peito (Avançado)",
      "EN": "Chest (Advanced)",
      "ES": "Pecho (Avanzado)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CHEST
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Peito para nível Avançado.",
      "EN": "Chest workout for Advanced level.",
      "ES": "Entrenamiento de Pecho para nivel Avanzado."
    },
    "difficulty": ExperienceLevel.ADVANCED,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "chest_chest_bench_press_close_grip_barbell_gym_advanced",
      "chest_chest_push_up_decline_feet_elevated_bodyweight_home_gym_intermediate",
      "chest_chest_push_up_tempo_3s_down_bodyweight_home_gym_intermediate",
      "chest_chest_push_up_wide_bodyweight_home_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-advanced-home-chest",
    "title": {
      "PT": "Peito (Avançado)",
      "EN": "Chest (Advanced)",
      "ES": "Pecho (Avanzado)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CHEST
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Peito para nível Avançado.",
      "EN": "Chest workout for Advanced level.",
      "ES": "Entrenamiento de Pecho para nivel Avanzado."
    },
    "difficulty": ExperienceLevel.ADVANCED,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "chest_upper_chest_incline_bench_press_30_45_degrees_barbell_gym_intermediate",
      "chest_chest_band_chest_press_standing_band_home_beginner",
      "chest_chest_bench_press_flat_barbell_gym_intermediate",
      "chest_chest_push_up_tempo_3s_down_bodyweight_home_gym_intermediate"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-advanced-gym-back",
    "title": {
      "PT": "Costas (Avançado)",
      "EN": "Back (Advanced)",
      "ES": "Espalda (Avanzado)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.BACK
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Costas para nível Avançado.",
      "EN": "Back workout for Advanced level.",
      "ES": "Entrenamiento de Espalda para nivel Avanzado."
    },
    "difficulty": ExperienceLevel.ADVANCED,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "back_lower_back_back_extension_45_degree_hyper_machine_gym_beginner",
      "back_lats_pull_up_bodyweight_bodyweight_gym_advanced",
      "back_lats_lat_pulldown_wide_grip_machine_cable_gym_beginner",
      "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-advanced-home-back",
    "title": {
      "PT": "Costas (Avançado)",
      "EN": "Back (Advanced)",
      "ES": "Espalda (Avanzado)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.BACK
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Costas para nível Avançado.",
      "EN": "Back workout for Advanced level.",
      "ES": "Entrenamiento de Espalda para nivel Avanzado."
    },
    "difficulty": ExperienceLevel.ADVANCED,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "back_upper_back_face_pull_rope_to_forehead_cable_gym_beginner",
      "back_upper_back_chest_supported_row_incline_bench_dumbbell_gym_beginner",
      "back_lats_lat_pulldown_single_arm_cable_gym_intermediate",
      "back_lats_assisted_pull_up_machine_band_machine_band_gym_intermediate"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-advanced-gym-legs",
    "title": {
      "PT": "Pernas (Avançado)",
      "EN": "Legs (Advanced)",
      "ES": "Piernas (Avanzado)"
    },
    "primaryCategory": WorkoutCategory.LOWER,
    "tags": [
      BodyAreaTag.LEGS
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Pernas para nível Avançado.",
      "EN": "Legs workout for Advanced level.",
      "ES": "Entrenamiento de Piernas para nivel Avanzado."
    },
    "difficulty": ExperienceLevel.ADVANCED,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "Plancha Copenhagen — Knee supported",
      "Prensa de piernas — Alto y amplio (énfasis glúteo)",
      "Abducción en polea — De pie",
      "Peso muerto piernas rígidas — Barra"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-advanced-home-legs",
    "title": {
      "PT": "Pernas (Avançado)",
      "EN": "Legs (Advanced)",
      "ES": "Piernas (Avanzado)"
    },
    "primaryCategory": WorkoutCategory.LOWER,
    "tags": [
      BodyAreaTag.LEGS
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Pernas para nível Avançado.",
      "EN": "Legs workout for Advanced level.",
      "ES": "Entrenamiento de Piernas para nivel Avanzado."
    },
    "difficulty": ExperienceLevel.ADVANCED,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "Curl femoral — Unilateral",
      "Subida al banco (step-up) — Box/bench",
      "Curl femoral sentado — Bilateral",
      "Good morning — Barra"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-advanced-gym-shoulders",
    "title": {
      "PT": "Ombros (Avançado)",
      "EN": "Shoulders (Advanced)",
      "ES": "Hombros (Avanzado)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.SHOULDERS
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Ombros para nível Avançado.",
      "EN": "Shoulders workout for Advanced level.",
      "ES": "Entrenamiento de Hombros para nivel Avanzado."
    },
    "difficulty": ExperienceLevel.ADVANCED,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "shoulders_delts_pike_push_up_bodyweight_bodyweight_home_intermediate",
      "shoulders_delts_upright_row_ez_bar_barbell_gym_intermediate",
      "shoulders_rear_delts_rear_delt_fly_cable_cable_gym_intermediate",
      "shoulders_upper_traps_farmer_carry_dumbbells_dumbbell_home_gym_intermediate"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-advanced-home-shoulders",
    "title": {
      "PT": "Ombros (Avançado)",
      "EN": "Shoulders (Advanced)",
      "ES": "Hombros (Avanzado)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.SHOULDERS
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Ombros para nível Avançado.",
      "EN": "Shoulders workout for Advanced level.",
      "ES": "Entrenamiento de Hombros para nivel Avanzado."
    },
    "difficulty": ExperienceLevel.ADVANCED,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "shoulders_side_delts_lateral_raise_leaning_dumbbell_gym_intermediate",
      "shoulders_delts_upright_row_ez_bar_barbell_gym_intermediate",
      "shoulders_delts_overhead_press_barbell_standing_barbell_gym_intermediate",
      "shoulders_upper_traps_shrug_dumbbells_dumbbell_home_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-advanced-gym-arms",
    "title": {
      "PT": "Braços (Avançado)",
      "EN": "Arms (Advanced)",
      "ES": "Brazos (Avanzado)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.ARMS
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Braços para nível Avançado.",
      "EN": "Arms workout for Advanced level.",
      "ES": "Entrenamiento de Brazos para nivel Avanzado."
    },
    "difficulty": ExperienceLevel.ADVANCED,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "arms_triceps_overhead_triceps_extension_dumbbell_dumbbell_home_gym_beginner",
      "arms_biceps_ez_bar_curl_ez_bar_barbell_gym_beginner",
      "arms_triceps_overhead_cable_extension_rope_cable_gym_intermediate",
      "arms_biceps_dumbbell_curl_seated_dumbbell_home_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-advanced-home-arms",
    "title": {
      "PT": "Braços (Avançado)",
      "EN": "Arms (Advanced)",
      "ES": "Brazos (Avanzado)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.ARMS
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Braços para nível Avançado.",
      "EN": "Arms workout for Advanced level.",
      "ES": "Entrenamiento de Brazos para nivel Avanzado."
    },
    "difficulty": ExperienceLevel.ADVANCED,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "arms_biceps_chin_up_underhand_bodyweight_gym_advanced",
      "arms_triceps_skull_crushers_ez_bar_barbell_gym_intermediate",
      "arms_triceps_diamond_push_up_bodyweight_bodyweight_home_intermediate",
      "arms_triceps_triceps_pushdown_rope_cable_gym_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-advanced-gym-core",
    "title": {
      "PT": "Core e Abs (Avançado)",
      "EN": "Core & Abs (Advanced)",
      "ES": "Core y Abs (Avanzado)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CORE
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Core e Abs para nível Avançado.",
      "EN": "Core & Abs workout for Advanced level.",
      "ES": "Entrenamiento de Core y Abs para nivel Avanzado."
    },
    "difficulty": ExperienceLevel.ADVANCED,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "core_obliques_side_plank_standard_bodyweight_home_gym_beginner",
      "core_abs_reverse_crunch_floor_bodyweight_home_beginner",
      "core_abs_knee_raise_captain_chair_bar_machine_bar_gym_intermediate",
      "core_abs_hanging_leg_raise_straight_legs_bar_gym_advanced"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-advanced-home-core",
    "title": {
      "PT": "Core e Abs (Avançado)",
      "EN": "Core & Abs (Advanced)",
      "ES": "Core y Abs (Avanzado)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CORE
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Core e Abs para nível Avançado.",
      "EN": "Core & Abs workout for Advanced level.",
      "ES": "Entrenamiento de Core y Abs para nivel Avanzado."
    },
    "difficulty": ExperienceLevel.ADVANCED,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "core_core_cable_crunch_kneeling_cable_gym_intermediate",
      "core_abs_reverse_crunch_floor_bodyweight_home_beginner",
      "core_abs_bicycle_crunch_alternating_bodyweight_home_beginner",
      "core_core_stability_dead_bug_basic_bodyweight_home_beginner"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-advanced-gym-cardio",
    "title": {
      "PT": "Cardio (Avançado)",
      "EN": "Cardio (Advanced)",
      "ES": "Cardio (Avanzado)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CARDIO
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Cardio para nível Avançado.",
      "EN": "Cardio workout for Advanced level.",
      "ES": "Entrenamiento de Cardio para nivel Avanzado."
    },
    "difficulty": ExperienceLevel.ADVANCED,
    "environment": "GYM",
    "warmupIds": [],
    "mainBlockIds": [
      "Saltar la cuerda — Básico",
      "Escaladora — Estándar",
      "Jumping Jacks — Peso corporal",
      "Cinta de correr — Ritmo Constante"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  },
  {
    "id": "p-advanced-home-cardio",
    "title": {
      "PT": "Cardio (Avançado)",
      "EN": "Cardio (Advanced)",
      "ES": "Cardio (Avanzado)"
    },
    "primaryCategory": WorkoutCategory.UPPER,
    "tags": [
      BodyAreaTag.CARDIO
    ],
    "duration": 60,
    "description": {
      "PT": "Treino de Cardio para nível Avançado.",
      "EN": "Cardio workout for Advanced level.",
      "ES": "Entrenamiento de Cardio para nivel Avanzado."
    },
    "difficulty": ExperienceLevel.ADVANCED,
    "environment": "HOME",
    "warmupIds": [],
    "mainBlockIds": [
      "Burpees — Estándar",
      "Jumping Jacks — Peso corporal",
      "Remo (Máquina) — Intervalos",
      "Sombra de Boxeo — Libre"
    ],
    "accessoryIds": [],
    "cooldownIds": []
  }
];
