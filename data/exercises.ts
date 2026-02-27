
import { Language, ExperienceLevel, Exercise } from '../types';

export const EXERCISE_LIBRARY: Exercise[] = [

  {
    id: "Extensión de piernas — Bilateral",
    name: {
      [Language.PT]: "Cadeira extensora (Bilateral)",
      [Language.EN]: "Leg Extension (Bilateral)",
      [Language.ES]: "Extensión de piernas (Bilateral)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Control tempo; pause at top"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "A1Cah1KDAlo",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Extensión de piernas — Unilateral",
    name: {
      [Language.PT]: "Cadeira extensora (Unilateral)",
      [Language.EN]: "Leg Extension (Unilateral)",
      [Language.ES]: "Extensión de piernas (Unilateral)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Focus on squeezing quad"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "F6CuNJywUPM",
    equipment: "Machine",
    difficulty: ExperienceLevel.INTERMEDIATE
  },



  {
    id: "Sentadilla — Peso corporal",
    name: {
      [Language.PT]: "Agachamento (Peso do corpo)",
      [Language.EN]: "Squat (Bodyweight)",
      [Language.ES]: "Sentadilla (Peso corporal)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Knees track toes; brace core"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "JWFljl14kSc",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },



  {
    id: "Sentadilla trasera — Barra alta",
    name: {
      [Language.PT]: "Agachamento com barra (costas) (Barra alta)",
      [Language.EN]: "Back Squat (High bar)",
      [Language.ES]: "Sentadilla trasera (Barra alta)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Depth + neutral spine"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "fYvifUC5Nac",
    equipment: "Barbell",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "Sentadilla trasera — Barra baja",
    name: {
      [Language.PT]: "Agachamento com barra (costas) (Barra baixa)",
      [Language.EN]: "Back Squat (Low bar)",
      [Language.ES]: "Sentadilla trasera (Barra baja)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Hip hinge emphasis"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Barbell",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "Sentadilla frontal — Agarre clean / brazos cruzados",
    name: {
      [Language.PT]: "Agachamento frontal (Pegada clean / braços cruzados)",
      [Language.EN]: "Front Squat (Clean grip / cross-arm)",
      [Language.ES]: "Sentadilla frontal (Agarre clean / brazos cruzados)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Upright torso"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Barbell",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "Sentadilla hack — Máquina",
    name: {
      [Language.PT]: "Agachamento no hack (Máquina)",
      [Language.EN]: "Hack Squat (Machine)",
      [Language.ES]: "Sentadilla hack (Máquina)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Feet position changes bias"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "5Ix3fjf4w9o",
    equipment: "Machine",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Prensa de piernas — Postura estándar",
    name: {
      [Language.PT]: "Leg press (Base padrão)",
      [Language.EN]: "Leg Press (Standard stance)",
      [Language.ES]: "Prensa de piernas (Postura estándar)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Don’t lock knees"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "NcmQ-wVlQdc",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Prensa de piernas — Alto y amplio (énfasis glúteo)",
    name: {
      [Language.PT]: "Leg press (Alto e aberto (ênfase glúteo))",
      [Language.EN]: "Leg Press (High & wide (glute bias))",
      [Language.ES]: "Prensa de piernas (Alto y amplio (énfasis glúteo))"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["More hip involvement"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "9H3uQkhP2PE",
    equipment: "Machine",
    difficulty: ExperienceLevel.INTERMEDIATE
  },



  {
    id: "Zancada estática — Peso corporal",
    name: {
      [Language.PT]: "Afundo (split squat) (Peso do corpo)",
      [Language.EN]: "Split Squat (Bodyweight)",
      [Language.ES]: "Zancada estática (Peso corporal)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Shorter stride for quads"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Zancada búlgara — Peso corporal",
    name: {
      [Language.PT]: "Afundo búlgaro (Peso do corpo)",
      [Language.EN]: "Bulgarian Split Squat (Bodyweight)",
      [Language.ES]: "Zancada búlgara (Peso corporal)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Keep front foot planted"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "X-cv9R25xXc",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Zancada búlgara — Mancuernas",
    name: {
      [Language.PT]: "Afundo búlgaro (Halteres)",
      [Language.EN]: "Bulgarian Split Squat (Dumbbells)",
      [Language.ES]: "Zancada búlgara (Mancuernas)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Slow eccentric"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "LT_nelifZ_k",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Zancada — Walking",
    name: {
      [Language.PT]: "Afundo (Walking)",
      [Language.EN]: "Lunge (Walking)",
      [Language.ES]: "Zancada (Walking)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Tall posture"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "gINMjZAUSRE",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Zancada inversa — Peso corporal",
    name: {
      [Language.PT]: "Afundo reverso (Peso do corpo)",
      [Language.EN]: "Reverse Lunge (Bodyweight)",
      [Language.ES]: "Zancada inversa (Peso corporal)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Often knee-friendly"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "SW_R1y9K_Ns",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Subida al banco (step-up) — Box/bench",
    name: {
      [Language.PT]: "Subida no banco (step-up) (Box/bench)",
      [Language.EN]: "Step-Up (Box/bench)",
      [Language.ES]: "Subida al banco (step-up) (Box/bench)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Drive through heel"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight/Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Sissy squat — Supported",
    name: {
      [Language.PT]: "Sissy squat (Apoiado)",
      [Language.EN]: "Sissy Squat (Supported)",
      [Language.ES]: "Sissy squat (Con apoyo)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Great quad finisher"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "Curl femoral sentado — Bilateral",
    name: {
      [Language.PT]: "Cadeira flexora (sentado) (Bilateral)",
      [Language.EN]: "Seated Leg Curl (Bilateral)",
      [Language.ES]: "Curl femoral sentado (Bilateral)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Full range"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "W5T_LubhXHU",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Curl femoral tumbado — Bilateral",
    name: {
      [Language.PT]: "Mesa flexora (Bilateral)",
      [Language.EN]: "Lying Leg Curl (Bilateral)",
      [Language.ES]: "Curl femoral tumbado (Bilateral)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Hips pressed down"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "K28eNyvdxQM",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Curl femoral — Unilateral",
    name: {
      [Language.PT]: "Flexora (Unilateral)",
      [Language.EN]: "Leg Curl (Unilateral)",
      [Language.ES]: "Curl femoral (Unilateral)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Control eccentric"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "hnMFbolM3GY",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Curl nórdico — Asistido",
    name: {
      [Language.PT]: "Nórdico (curl nórdico) (Assistido)",
      [Language.EN]: "Nordic Curl (Assisted)",
      [Language.ES]: "Curl nórdico (Asistido)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Eccentric focus"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "Peso muerto rumano — Barra",
    name: {
      [Language.PT]: "Levantamento terra romeno (Barra)",
      [Language.EN]: "Romanian Deadlift (Barbell)",
      [Language.ES]: "Peso muerto rumano (Barra)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Hinge; soft knees"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "lp3Nkr05TC8",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Peso muerto rumano — Mancuernas",
    name: {
      [Language.PT]: "Levantamento terra romeno (Halteres)",
      [Language.EN]: "Romanian Deadlift (Dumbbells)",
      [Language.ES]: "Peso muerto rumano (Mancuernas)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Keep DBs close"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Peso muerto piernas rígidas — Barra",
    name: {
      [Language.PT]: "Stiff (Barra)",
      [Language.EN]: "Stiff Leg Deadlift (Barbell)",
      [Language.ES]: "Peso muerto piernas rígidas (Barra)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["More hamstring stretch"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Barbell",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "Good morning — Barra",
    name: {
      [Language.PT]: "Good morning (Barra)",
      [Language.EN]: "Good Morning (Barbell)",
      [Language.ES]: "Good morning (Barra)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Light load; braced core"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Barbell",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "Peso muerto rumano a una pierna — Mancuerna",
    name: {
      [Language.PT]: "RDL unilateral (Halter)",
      [Language.EN]: "Single-Leg RDL (Dumbbell)",
      [Language.ES]: "Peso muerto rumano a una pierna (Mancuerna)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Hips square"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Curl femoral con deslizamiento — Towel/slider",
    name: {
      [Language.PT]: "Flexão de posterior com deslize (Towel/slider)",
      [Language.EN]: "Hamstring Slide Curl (Towel/slider)",
      [Language.ES]: "Curl femoral con deslizamiento (Towel/slider)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Bridge + curl"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Hip thrust (empuje de cadera) — Barra",
    name: {
      [Language.PT]: "Hip thrust (elevação pélvica) (Barra)",
      [Language.EN]: "Hip Thrust (Barbell)",
      [Language.ES]: "Hip thrust (empuje de cadera) (Barra)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Chin tucked; ribs down"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "SY1eYXrCPzg",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Hip thrust (empuje de cadera) — Máquina",
    name: {
      [Language.PT]: "Hip thrust (elevação pélvica) (Máquina)",
      [Language.EN]: "Hip Thrust (Machine)",
      [Language.ES]: "Hip thrust (empuje de cadera) (Máquina)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Adjust pad position"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Hip thrust (empuje de cadera) — Mancuerna",
    name: {
      [Language.PT]: "Hip thrust (elevação pélvica) (Halter)",
      [Language.EN]: "Hip Thrust (Dumbbell)",
      [Language.ES]: "Hip thrust (empuje de cadera) (Mancuerna)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Use bench/couch"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "eLsXLoV3jLM",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Puente de glúteos — En el suelo (bilateral)",
    name: {
      [Language.PT]: "Ponte de glúteo (No chão (bilateral))",
      [Language.EN]: "Glute Bridge (Floor (bilateral))",
      [Language.ES]: "Puente de glúteos (En el suelo (bilateral))"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Squeeze at top"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "1nEL_H0lnNc",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Puente de glúteos — A una pierna",
    name: {
      [Language.PT]: "Ponte de glúteo (Unilateral)",
      [Language.EN]: "Glute Bridge (Single-leg)",
      [Language.ES]: "Puente de glúteos (A una pierna)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Keep pelvis level"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Patada de glúteo en polea — Tobillera",
    name: {
      [Language.PT]: "Coice no cabo (Tornozeleira)",
      [Language.EN]: "Cable Kickback (Ankle strap)",
      [Language.ES]: "Patada de glúteo en polea (Tobillera)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Small lean forward"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "8wN0YCs_rUc",
    equipment: "Cable",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Patada de glúteo — A cuatro apoyos (patada)",
    name: {
      [Language.PT]: "Coice de glúteo (4 apoios (coice))",
      [Language.EN]: "Kickback (4-point (donkey kick))",
      [Language.ES]: "Patada de glúteo (A cuatro apoyos (patada))"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Avoid lumbar swing"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight/Band",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Abducción de cadera (glúteo medio) — Acostado de lado",
    name: {
      [Language.PT]: "Abdução de quadril (glúteo médio) (Deitado de lado)",
      [Language.EN]: "Glute Med Abduction (Side-lying)",
      [Language.ES]: "Abducción de cadera (glúteo medio) (Acostado de lado)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Toe slightly down"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight/Band",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Caminata lateral con banda — Banda mini",
    name: {
      [Language.PT]: "Caminhada lateral com elástico (Mini band)",
      [Language.EN]: "Banded Lateral Walk (Mini band)",
      [Language.ES]: "Caminata lateral con banda (Banda mini)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Stay low; tension"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Band",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Pull-through en polea — Cuerda",
    name: {
      [Language.PT]: "Pull-through no cabo (Corda)",
      [Language.EN]: "Cable Pull-Through (Rope)",
      [Language.ES]: "Pull-through en polea (Cuerda)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Hinge; squeeze glutes"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Cable",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Aducción de cadera — Máquina",
    name: {
      [Language.PT]: "Adutora (Máquina)",
      [Language.EN]: "Hip Adduction (Machine)",
      [Language.ES]: "Aducción de cadera (Máquina)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Control range"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "RPqRSZ7bvxM",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Aducción en polea — De pie",
    name: {
      [Language.PT]: "Adutora no cabo (Em pé)",
      [Language.EN]: "Cable Adduction (Standing)",
      [Language.ES]: "Aducción en polea (De pie)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Hold support"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "BS4jPGOqZ8M",
    equipment: "Cable",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Plancha Copenhagen — Knee supported",
    name: {
      [Language.PT]: "Prancha Copenhagen (Apoio de joelho)",
      [Language.EN]: "Copenhagen Plank (Knee supported)",
      [Language.ES]: "Plancha Copenhagen (Apoyo de rodilla)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Great adductor strength"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "Abducción de cadera — Máquina",
    name: {
      [Language.PT]: "Abdutora (Máquina)",
      [Language.EN]: "Hip Abduction (Machine)",
      [Language.ES]: "Abducción de cadera (Máquina)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Don’t rock torso"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "fWFmbyZUf9Y",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Abducción en polea — De pie",
    name: {
      [Language.PT]: "Abdutora no cabo (Em pé)",
      [Language.EN]: "Cable Abduction (Standing)",
      [Language.ES]: "Abducción en polea (De pie)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Slow and controlled"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "hQOfjxHnRvg",
    equipment: "Cable",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Clamshell — Banda mini",
    name: {
      [Language.PT]: "Conchinha (clamshell) (Mini band)",
      [Language.EN]: "Clamshell (Mini band)",
      [Language.ES]: "Clamshell (Banda mini)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Keep hips stacked"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Band",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Elevación de gemelos de pie — Peso corporal",
    name: {
      [Language.PT]: "Elevação de panturrilha em pé (Peso do corpo)",
      [Language.EN]: "Standing Calf Raise (Bodyweight)",
      [Language.ES]: "Elevación de gemelos de pie (Peso corporal)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Full stretch bottom"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Elevación de gemelos de pie — Mancuernas",
    name: {
      [Language.PT]: "Elevação de panturrilha em pé (Halteres)",
      [Language.EN]: "Standing Calf Raise (Dumbbells)",
      [Language.ES]: "Elevación de gemelos de pie (Mancuernas)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Pause at top"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "QNWzxdQSD8g",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Elevación de gemelos en Smith — De pie",
    name: {
      [Language.PT]: "Panturrilha no Smith (Em pé)",
      [Language.EN]: "Smith Calf Raise (Standing)",
      [Language.ES]: "Elevación de gemelos en Smith (De pie)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Stable setup"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "IuyHpM4I4eY",
    equipment: "Machine",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Elevación de gemelos sentado — Máquina",
    name: {
      [Language.PT]: "Panturrilha sentado (Máquina)",
      [Language.EN]: "Seated Calf Raise (Machine)",
      [Language.ES]: "Elevación de gemelos sentado (Máquina)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Targets soleus"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "1NBoneuGtQo",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Elevación de gemelos a una pierna — Step",
    name: {
      [Language.PT]: "Panturrilha unilateral (Step)",
      [Language.EN]: "Leg Calf Raise (Step)",
      [Language.ES]: "Elevación de gemelos a una pierna (Step)"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10-12",
    executionTips: ["Balance support ok"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "FURGALhnSks",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.INTERMEDIATE
  },


  {
    id: "chest_chest_push_up_incline_hands_elevated_bodyweight_home_gym_beginner",
    name: {
      [Language.PT]: "Flexão Inclinada (Mãos Elevadas)",
      [Language.EN]: "Push-Up (Incline (hands elevated))",
      [Language.ES]: "Flexiones inclinadas (Manos elevadas)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Flexão de braço"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "aL5S7EiX3Ao",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "chest_chest_push_up_decline_feet_elevated_bodyweight_home_gym_intermediate",
    name: {
      [Language.PT]: "Flexão Declinada (Pés Elevados)",
      [Language.EN]: "Push-Up (Decline (feet elevated))",
      [Language.ES]: "Flexiones declinadas (Pies elevados)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Flexão de braço"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "chest_chest_push_up_wide_bodyweight_home_gym_beginner",
    name: {
      [Language.PT]: "Flexão Aberta",
      [Language.EN]: "Push-Up (Wide)",
      [Language.ES]: "Flexiones abiertas (Wide)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Flexão de braço"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "A3g6GD7w87w",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },


  {
    id: "chest_chest_bench_press_flat_barbell_gym_intermediate",
    name: {
      [Language.PT]: "Supino Reto (Barra)",
      [Language.EN]: "Bench Press (Flat)",
      [Language.ES]: "Press de banca (Plano)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Supino reto"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "MTS2g0Im_Js",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "chest_chest_bench_press_paused_reps_barbell_gym_advanced",
    name: {
      [Language.PT]: "Supino Reto (Pausa)",
      [Language.EN]: "Bench Press (Paused reps)",
      [Language.ES]: "Press de banca (Repeticiones con pausa)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Supino reto"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "XEn6jEdf30M",
    equipment: "Barbell",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "chest_chest_bench_press_close_grip_barbell_gym_advanced",
    name: {
      [Language.PT]: "Supino Fechado (Pegada Fechada)",
      [Language.EN]: "Bench Press (Close grip)",
      [Language.ES]: "Press de banca (Agarre cerrado)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Supino reto"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "f7IVPwvq5_o",
    equipment: "Barbell",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "chest_upper_chest_incline_bench_press_30_45_degrees_barbell_gym_intermediate",
    name: {
      [Language.PT]: "Supino Inclinado (Barra)",
      [Language.EN]: "Incline Bench Press (30–45 degrees)",
      [Language.ES]: "Press inclinado (30–45 grados)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Supino inclinado"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "XOGNcjXmafQ",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "chest_upper_chest_incline_press_dumbbells_dumbbell_gym_beginner",
    name: {
      [Language.PT]: "Supino Inclinado (Halteres)",
      [Language.EN]: "Incline Press (Dumbbells)",
      [Language.ES]: "Press inclinado (Mancuernas)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Supino inclinado"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "JOVGGEwfhIk",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "chest_lower_chest_decline_bench_press_barbell_barbell_gym_advanced",
    name: {
      [Language.PT]: "Supino Declinado (Barra)",
      [Language.EN]: "Decline Bench Press (Barbell)",
      [Language.ES]: "Press declinado (Barra)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Supino declinado"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "BEx_YCR1Hhs",
    equipment: "Barbell",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "chest_chest_chest_fly_flat_bench_dumbbell_home_gym_beginner",
    name: {
      [Language.PT]: "Crucifixo (Banco Reto)",
      [Language.EN]: "Chest Fly (Flat bench)",
      [Language.ES]: "Aperturas (fly) (Banco plano)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Crucifixo"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "gYh3r3x4tis",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "chest_upper_chest_incline_fly_incline_bench_dumbbell_gym_intermediate",
    name: {
      [Language.PT]: "Crucifixo Inclinado (Halteres)",
      [Language.EN]: "Incline Fly (Incline bench)",
      [Language.ES]: "Aperturas inclinadas (Banco inclinado)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Crucifixo inclinado"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "5myBHdzU_E0",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "chest_chest_cable_fly_high_to_low_cable_gym_intermediate",
    name: {
      [Language.PT]: "Crucifixo no Cabo (Alto para Baixo)",
      [Language.EN]: "Cable Fly (High-to-low)",
      [Language.ES]: "Aperturas en polea (Alto a bajo)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Crucifixo no cabo"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "_XB8ifX-aDI",
    equipment: "Cable",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "chest_chest_cable_fly_low_to_high_cable_gym_intermediate",
    name: {
      [Language.PT]: "Crucifixo no Cabo (Baixo para Alto)",
      [Language.EN]: "Cable Fly (Low-to-high)",
      [Language.ES]: "Aperturas en polea (Bajo a alto)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Crucifixo no cabo"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "vW2dwK9BOMw",
    equipment: "Cable",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "chest_chest_cable_crossover_standard_cable_gym_intermediate",
    name: {
      [Language.PT]: "Crossover (Padrão)",
      [Language.EN]: "Cable Crossover (Standard)",
      [Language.ES]: "Cruce de poleas (Estándar)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Crossover no cabo"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "CTgac4QY9DQ",
    equipment: "Cable",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "chest_chest_pec_deck_machine_machine_gym_beginner",
    name: {
      [Language.PT]: "Voador / Pec Deck (Máquina)",
      [Language.EN]: "Pec Deck (Machine)",
      [Language.ES]: "Pec deck (mariposa) (Máquina)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Peck deck (voador)"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "lSV3-8mlUnc",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "chest_chest_dips_chest_lean_bodyweight_gym_advanced",
    name: {
      [Language.PT]: "Mergulho na Paralela (Foco Peito)",
      [Language.EN]: "Dips (Chest lean)",
      [Language.ES]: "Fondos (dips) (Inclinación al frente)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Paralelas (dips)"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "f4YYJfRHGD0",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "chest_chest_dips_assisted_machine_band_gym_intermediate",
    name: {
      [Language.PT]: "Mergulho Assistido (Máquina)",
      [Language.EN]: "Dips (Assisted)",
      [Language.ES]: "Fondos (dips) (Asistido)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Paralelas (dips)"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "kDZMwIuKPgE",
    equipment: "Machine/Band",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "chest_chest_band_chest_press_standing_band_home_beginner",
    name: {
      [Language.PT]: "Supino com elástico (Em pé)",
      [Language.EN]: "Band Chest Press (Standing)",
      [Language.ES]: "Press con banda (De pie)"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Supino/press com elástico"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "T0UJ0W-_yIE",
    equipment: "Band",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "chest_chest_push_up_tempo_3s_down_bodyweight_home_gym_intermediate",
    name: {
      [Language.PT]: "Flexão de braço (Tempo 3s down)",
      [Language.EN]: "Push-Up (Tempo (3s down))",
      [Language.ES]: "Flexiones (Tempo (3s down))"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-12",
    executionTips: ["Flexão de braço"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "back_lats_lat_pulldown_wide_grip_machine_cable_gym_beginner",
    name: {
      [Language.PT]: "Puxada na frente (Pegada aberta)",
      [Language.EN]: "Lat Pulldown (Wide grip)",
      [Language.ES]: "Jalón al pecho (Agarre ancho)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Puxada na frente (pulldown)"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "kF5HN1aky2E",
    equipment: "Machine/Cable",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "back_lats_lat_pulldown_neutral_grip_machine_cable_gym_beginner",
    name: {
      [Language.PT]: "Puxada na frente (Pegada neutra)",
      [Language.EN]: "Lat Pulldown (Neutral grip)",
      [Language.ES]: "Jalón al pecho (Agarre neutro)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Puxada na frente (pulldown)"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Machine/Cable",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "back_lats_lat_pulldown_single_arm_cable_gym_intermediate",
    name: {
      [Language.PT]: "Puxada na frente (Unilateral)",
      [Language.EN]: "Lat Pulldown (Single-arm)",
      [Language.ES]: "Jalón al pecho (Unilateral)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Puxada na frente (pulldown)"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "5uaUBHB9wYs",
    equipment: "Cable",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "back_lats_pull_up_bodyweight_bodyweight_gym_advanced",
    name: {
      [Language.PT]: "Barra fixa (Peso do corpo)",
      [Language.EN]: "Pull-Up (Bodyweight)",
      [Language.ES]: "Dominadas (Peso corporal)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Barra fixa"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "back_lats_chin_up_underhand_bodyweight_gym_advanced",
    name: {
      [Language.PT]: "Barra fixa supinada (Chin-Up)",
      [Language.EN]: "Chin-Up (Underhand)",
      [Language.ES]: "Dominadas supinas (Underhand)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Barra fixa supinada"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "lHDt-JfFW24",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "back_lats_assisted_pull_up_machine_band_machine_band_gym_intermediate",
    name: {
      [Language.PT]: "Barra fixa assistida (Máquina/Elástico)",
      [Language.EN]: "Assisted Pull-Up (Machine/Band)",
      [Language.ES]: "Dominadas asistidas (Machine/Band)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Barra fixa assistida"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "OZluAKUqxNI",
    equipment: "Machine/Band",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "back_mid_back_seated_cable_row_neutral_grip_cable_gym_beginner",
    name: {
      [Language.PT]: "Remada baixa (Pegada neutra)",
      [Language.EN]: "Seated Cable Row (Neutral grip)",
      [Language.ES]: "Remo sentado en polea (Agarre neutro)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Remada baixa no cabo"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Cable",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "back_mid_back_seated_cable_row_wide_grip_cable_gym_intermediate",
    name: {
      [Language.PT]: "Remada baixa (Pegada aberta)",
      [Language.EN]: "Seated Cable Row (Wide grip)",
      [Language.ES]: "Remo sentado en polea (Agarre ancho)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Remada baixa no cabo"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "m1RoKeMcjJk",
    equipment: "Cable",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "back_upper_back_face_pull_rope_to_forehead_cable_gym_beginner",
    name: {
      [Language.PT]: "Face Pull (Corda na testa)",
      [Language.EN]: "Face Pull (Rope to forehead)",
      [Language.ES]: "Face pull (Rope to forehead)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Face pull"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Cable",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "back_upper_back_reverse_pec_deck_machine_machine_gym_beginner",
    name: {
      [Language.PT]: "Crucifixo inverso (Máquina)",
      [Language.EN]: "Reverse Pec Deck (Machine)",
      [Language.ES]: "Pec deck inverso (Máquina)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Crucifixo inverso (voador)"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "GyPzpu3u9eI",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "back_upper_back_bent_over_row_barbell_barbell_gym_intermediate",
    name: {
      [Language.PT]: "Remada curvada (Barra)",
      [Language.EN]: "Bent Over Row (Barbell)",
      [Language.ES]: "Remo inclinado (Barra)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Remada curvada"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "gFdXxifdC6I",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "back_upper_back_pendlay_row_from_floor_barbell_gym_advanced",
    name: {
      [Language.PT]: "Remada Pendlay",
      [Language.EN]: "Pendlay Row (From floor)",
      [Language.ES]: "Remo Pendlay"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Remada Pendlay"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "TD00shuX6hA",
    equipment: "Barbell",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "back_upper_back_one_arm_row_bench_supported_dumbbell_home_gym_beginner",
    name: {
      [Language.PT]: "Remada unilateral (Banco)",
      [Language.EN]: "One-Arm Row (Bench supported)",
      [Language.ES]: "Remo a una mano (Apoyado en banco)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Remada unilateral"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "Bb3SMb-ki-4",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "back_upper_back_chest_supported_row_incline_bench_dumbbell_gym_beginner",
    name: {
      [Language.PT]: "Remada apoiada (Banco inclinado)",
      [Language.EN]: "Chest-Supported Row (Incline bench)",
      [Language.ES]: "Remo con pecho apoyado (Banco inclinado)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Remada apoiada no banco"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "back_upper_back_t_bar_row_landmine_barbell_gym_intermediate",
    name: {
      [Language.PT]: "Remada Cavalinho / T (Landmine)",
      [Language.EN]: "T-Bar Row (Landmine)",
      [Language.ES]: "Remo T (Landmine)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Remada T"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "back_lats_straight_arm_pulldown_cable_cable_gym_intermediate",
    name: {
      [Language.PT]: "Pulldown frente (Cabo)",
      [Language.EN]: "Straight-Arm Pulldown (Cable)",
      [Language.ES]: "Jalón con brazos rectos (Cable)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Pulldown com braço estendido"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Cable",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "back_back_deadlift_conventional_barbell_gym_advanced",
    name: {
      [Language.PT]: "Levantamento terra (Convencional)",
      [Language.EN]: "Deadlift (Conventional)",
      [Language.ES]: "Peso muerto (Convencional)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Levantamento terra"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Barbell",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "back_back_deadlift_trap_bar_trap_bar_gym_intermediate",
    name: {
      [Language.PT]: "Levantamento terra (Barra Hexagonal)",
      [Language.EN]: "Deadlift (Trap bar)",
      [Language.ES]: "Peso muerto (Barra hexagonal)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Levantamento terra"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Trap bar",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "back_lower_back_back_extension_45_degree_hyper_machine_gym_beginner",
    name: {
      [Language.PT]: "Extensão Lombar (Banco 45)",
      [Language.EN]: "Back Extension (45 degree hyper)",
      [Language.ES]: "Extensión lumbar (Banco 45 grados)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Extensão lombar"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "back_lower_back_superman_hold_floor_bodyweight_home_beginner",
    name: {
      [Language.PT]: "Superman (Chão)",
      [Language.EN]: "Superman Hold (Floor)",
      [Language.ES]: "Superman (Suelo)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Superman"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "back_back_resistance_band_row_standing_seated_band_home_beginner",
    name: {
      [Language.PT]: "Remada com Elástico",
      [Language.EN]: "Resistance Band Row (Standing/seated)",
      [Language.ES]: "Remo con banda"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10-12",
    executionTips: ["Remada com elástico"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Band",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "shoulders_delts_overhead_press_barbell_standing_barbell_gym_intermediate",
    name: {
      [Language.PT]: "Desenvolvimento Militar (Barra em Pé)",
      [Language.EN]: "Overhead Press (Barbell standing)",
      [Language.ES]: "Press militar (Barra de pie)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Desenvolvimento"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "0-UNSkfq-Vw",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "shoulders_delts_overhead_press_seated_dumbbells_dumbbell_gym_beginner",
    name: {
      [Language.PT]: "Desenvolvimento (Halteres Sentado)",
      [Language.EN]: "Overhead Press (Seated dumbbells)",
      [Language.ES]: "Press militar (Sentado con mancuernas)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Desenvolvimento"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "Fhrvcqy4hKA",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "shoulders_delts_arnold_press_seated_dumbbell_gym_intermediate",
    name: {
      [Language.PT]: "Desenvolvimento Arnold",
      [Language.EN]: "Arnold Press (Seated)",
      [Language.ES]: "Press Arnold (Sentado)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Desenvolvimento Arnold"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "166waxYDZhg",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "shoulders_side_delts_lateral_raise_dumbbells_dumbbell_home_gym_beginner",
    name: {
      [Language.PT]: "Elevação Lateral (Halteres)",
      [Language.EN]: "Lateral Raise (Dumbbells)",
      [Language.ES]: "Elevaciones laterales (Mancuernas)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Elevação lateral"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "shoulders_side_delts_lateral_raise_cable_cable_gym_intermediate",
    name: {
      [Language.PT]: "Elevação Lateral (Cabo)",
      [Language.EN]: "Lateral Raise (Cable)",
      [Language.ES]: "Elevaciones laterales (Cable)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Elevação lateral"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "xNM9hqpQl34",
    equipment: "Cable",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "shoulders_side_delts_lateral_raise_leaning_dumbbell_gym_intermediate",
    name: {
      [Language.PT]: "Elevação Lateral (Inclinado/Leaning)",
      [Language.EN]: "Lateral Raise (Leaning)",
      [Language.ES]: "Elevaciones laterales (Inclinado)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Elevação lateral"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "shoulders_front_delts_front_raise_dumbbells_dumbbell_home_gym_beginner",
    name: {
      [Language.PT]: "Elevação Frontal (Halteres)",
      [Language.EN]: "Front Raise (Dumbbells)",
      [Language.ES]: "Elevaciones frontales (Mancuernas)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Elevação frontal"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "shoulders_rear_delts_rear_delt_fly_bent_over_db_dumbbell_home_gym_beginner",
    name: {
      [Language.PT]: "Crucifixo Inverso (Halteres)",
      [Language.EN]: "Rear Delt Fly (Bent-over DB)",
      [Language.ES]: "Pájaros (deltoide posterior) (Mancuernas)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Elevação posterior (deltoide posterior)"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "shoulders_rear_delts_rear_delt_fly_cable_cable_gym_intermediate",
    name: {
      [Language.PT]: "Crucifixo Inverso (Cabo)",
      [Language.EN]: "Rear Delt Fly (Cable)",
      [Language.ES]: "Pájaros (deltoide posterior) (Cable)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Elevação posterior (deltoide posterior)"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Cable",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "shoulders_delts_upright_row_ez_bar_barbell_gym_intermediate",
    name: {
      [Language.PT]: "Remada Alta (Barra EZ)",
      [Language.EN]: "Upright Row (EZ bar)",
      [Language.ES]: "Remo al mentón (Barra EZ)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Remada alta"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "shoulders_delts_machine_shoulder_press_machine_machine_gym_beginner",
    name: {
      [Language.PT]: "Desenvolvimento (Máquina)",
      [Language.EN]: "Machine Shoulder Press (Machine)",
      [Language.ES]: "Press de hombros en máquina (Máquina)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Desenvolvimento na máquina"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "shoulders_delts_pike_push_up_bodyweight_bodyweight_home_intermediate",
    name: {
      [Language.PT]: "Flexão Pike",
      [Language.EN]: "Pike Push-Up (Bodyweight)",
      [Language.ES]: "Flexiones pike (Peso corporal)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Flexão pike"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "shoulders_rotator_cuff_external_rotation_cable_band_band_cable_home_gym_beginner",
    name: {
      [Language.PT]: "Rotação Externa (Cabo/Elástico)",
      [Language.EN]: "External Rotation (Cable/band)",
      [Language.ES]: "Rotación externa (Cable/band)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Rotação externa"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Band/Cable",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "shoulders_upper_traps_shrug_dumbbells_dumbbell_home_gym_beginner",
    name: {
      [Language.PT]: "Encolhimento (Halteres)",
      [Language.EN]: "Shrug (Dumbbells)",
      [Language.ES]: "Encogimientos (Mancuernas)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Encolhimento"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "shoulders_upper_traps_farmer_carry_dumbbells_dumbbell_home_gym_intermediate",
    name: {
      [Language.PT]: "Caminhada do Fazendeiro (Halteres)",
      [Language.EN]: "Farmer Carry (Dumbbells)",
      [Language.ES]: "Paseo del granjero (Mancuernas)"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10-12",
    executionTips: ["Caminhada do fazendeiro"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "arms_biceps_dumbbell_curl_standing_dumbbell_home_gym_beginner",
    name: {
      [Language.PT]: "Rosca Direta (Halteres em Pé)",
      [Language.EN]: "Dumbbell Curl (Standing)",
      [Language.ES]: "Curl con mancuernas (De pie)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Rosca com halteres"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "eD4zGApOcvc",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "arms_biceps_dumbbell_curl_seated_dumbbell_home_gym_beginner",
    name: {
      [Language.PT]: "Rosca Direta (Halteres Sentado)",
      [Language.EN]: "Dumbbell Curl (Seated)",
      [Language.ES]: "Curl con mancuernas (Sentado)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Rosca com halteres"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "mlMir1t758o",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "arms_biceps_hammer_curl_neutral_grip_dumbbell_home_gym_beginner",
    name: {
      [Language.PT]: "Rosca Martelo (Halteres)",
      [Language.EN]: "Hammer Curl (Neutral grip)",
      [Language.ES]: "Curl martillo (Agarre neutro)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Rosca martelo"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "jadLjlrgugY",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "arms_biceps_incline_curl_bench_dumbbell_gym_intermediate",
    name: {
      [Language.PT]: "Rosca Inclinada (Banco)",
      [Language.EN]: "Incline Curl (Bench)",
      [Language.ES]: "Curl inclinado (Banco)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Rosca inclinada"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "7dGvfAjiqM4",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "arms_biceps_concentration_curl_seated_dumbbell_home_gym_beginner",
    name: {
      [Language.PT]: "Rosca Concentrada",
      [Language.EN]: "Concentration Curl (Seated)",
      [Language.ES]: "Curl concentrado (Sentado)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Rosca concentrada"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "T6eMMhrEwe0",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "arms_biceps_barbell_curl_straight_bar_barbell_gym_intermediate",
    name: {
      [Language.PT]: "Rosca Direta (Barra Reta)",
      [Language.EN]: "Barbell Curl (Straight bar)",
      [Language.ES]: "Curl con barra (Straight bar)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Rosca direta"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "TtIJUCHLSVM",
    equipment: "Barbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "arms_biceps_ez_bar_curl_ez_bar_barbell_gym_beginner",
    name: {
      [Language.PT]: "Rosca na Barra EZ",
      [Language.EN]: "EZ-Bar Curl (EZ bar)",
      [Language.ES]: "Curl con barra EZ"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Rosca na barra EZ"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "Mgby60-Zj2k",
    equipment: "Barbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "arms_biceps_chin_up_underhand_bodyweight_gym_advanced",
    name: {
      [Language.PT]: "Barra Fixa Supinada (Chin-Up)",
      [Language.EN]: "Chin-Up (Underhand)",
      [Language.ES]: "Dominadas supinas (Underhand)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Barra fixa supinada"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "lHDt-JfFW24",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.ADVANCED
  },


  {
    id: "arms_triceps_triceps_pushdown_rope_cable_gym_beginner",
    name: {
      [Language.PT]: "Tríceps Corda (Polia)",
      [Language.EN]: "Triceps Pushdown (Rope)",
      [Language.ES]: "Jalón de tríceps (Cuerda)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Tríceps na polia"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "uaXw3hFKfuw",
    equipment: "Cable",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "arms_triceps_triceps_pushdown_straight_bar_cable_gym_beginner",
    name: {
      [Language.PT]: "Tríceps Barra Reta (Polia)",
      [Language.EN]: "Triceps Pushdown (Straight bar)",
      [Language.ES]: "Jalón de tríceps (Barra recta)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Tríceps na polia"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "6yn3SIVAN8Q",
    equipment: "Cable",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "arms_triceps_overhead_triceps_extension_dumbbell_dumbbell_home_gym_beginner",
    name: {
      [Language.PT]: "Tríceps Francês (Halter)",
      [Language.EN]: "Overhead Triceps Extension (Dumbbell)",
      [Language.ES]: "Extensión de tríceps sobre la cabeza (Mancuerna)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Tríceps acima da cabeça"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "xl8e7FtyaKg",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "arms_triceps_overhead_cable_extension_rope_cable_gym_intermediate",
    name: {
      [Language.PT]: "Tríceps Testa (Cabo/Corda)",
      [Language.EN]: "Overhead Cable Extension (Rope)",
      [Language.ES]: "Extensión sobre la cabeza en polea (Cuerda)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Tríceps acima da cabeça no cabo"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "7Ubzh8qmYIc",
    equipment: "Cable",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "arms_triceps_close_grip_bench_press_barbell_barbell_gym_advanced",
    name: {
      [Language.PT]: "Supino Fechado (Tríceps)",
      [Language.EN]: "Close-Grip Bench Press (Barbell)",
      [Language.ES]: "Press de banca agarre cerrado (Barra)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Supino fechado"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "f7IVPwvq5_o",
    equipment: "Barbell",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "arms_triceps_dips_bench_dips_bodyweight_home_gym_beginner",
    name: {
      [Language.PT]: "Mergulho no Banco",
      [Language.EN]: "Dips (Bench dips)",
      [Language.ES]: "Fondos (Banco)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Paralelas (dips)"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "X8rEuPt66gA",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },



  {
    id: "arms_forearms_wrist_curl_seated_dumbbell_barbell_home_gym_beginner",
    name: {
      [Language.PT]: "Rosca de Punho (Sentado)",
      [Language.EN]: "Wrist Curl (Seated)",
      [Language.ES]: "Curl de muñeca (Sentado)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Rosca de punho"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "xVRGEOFv0x8",
    equipment: "Dumbbell/Barbell",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "arms_forearms_reverse_wrist_curl_seated_dumbbell_barbell_home_gym_beginner",
    name: {
      [Language.PT]: "Extensão de Punho (Sentado)",
      [Language.EN]: "Reverse Wrist Curl (Seated)",
      [Language.ES]: "Extensión de muñeca (Sentado)"
    },
    muscleGroup: "Arms",
    sets: 3,
    reps: "10-12",
    executionTips: ["Extensão de punho"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "sfPqTZtuP7w",
    equipment: "Dumbbell/Barbell",
    difficulty: ExperienceLevel.BEGINNER
  },


  {
    id: "core_core_plank_forearm_bodyweight_home_gym_beginner",
    name: {
      [Language.PT]: "Prancha (Antebraço)",
      [Language.EN]: "Plank (Forearm)",
      [Language.ES]: "Plancha (Antebrazo)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Prancha"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "xlIOtzLqkZI",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "core_core_plank_high_plank_bodyweight_home_gym_beginner",
    name: {
      [Language.PT]: "Prancha Alta",
      [Language.EN]: "Plank (High plank)",
      [Language.ES]: "Plancha (Plancha alta)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Prancha"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "core_abs_crunch_basic_bodyweight_home_beginner",
    name: {
      [Language.PT]: "Abdominal Curto / Crunch",
      [Language.EN]: "Crunch (Basic)",
      [Language.ES]: "Crunch (Básico)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Abdominal (crunch)"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "4eE2mHdh2wM",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "core_abs_reverse_crunch_floor_bodyweight_home_beginner",
    name: {
      [Language.PT]: "Abdominal Infra / Inverso",
      [Language.EN]: "Reverse Crunch (Floor)",
      [Language.ES]: "Crunch inverso (Suelo)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Abdominal reverso"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "core_abs_hanging_leg_raise_straight_legs_bar_gym_advanced",
    name: {
      [Language.PT]: "Elevação de Pernas (Barra)",
      [Language.EN]: "Hanging Leg Raise (Straight legs)",
      [Language.ES]: "Elevación de piernas colgado"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Elevação de pernas na barra"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bar",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "core_abs_knee_raise_captain_chair_bar_machine_bar_gym_intermediate",
    name: {
      [Language.PT]: "Elevação de Joelhos (Paralela/Barra)",
      [Language.EN]: "Knee Raise (Captain chair / bar)",
      [Language.ES]: "Elevación de rodillas"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Elevação de joelhos"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Machine/Bar",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "core_abs_bicycle_crunch_alternating_bodyweight_home_beginner",
    name: {
      [Language.PT]: "Abdominal Bicicleta",
      [Language.EN]: "Bicycle Crunch (Alternating)",
      [Language.ES]: "Bicicleta (Alternado)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Abdominal bicicleta"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "core_obliques_russian_twist_bodyweight_bodyweight_home_beginner",
    name: {
      [Language.PT]: "Giro Russo / Russian Twist",
      [Language.EN]: "Russian Twist (Bodyweight)",
      [Language.ES]: "Giro ruso (Peso corporal)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Torção russa"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "core_obliques_russian_twist_medicine_ball_med_ball_home_gym_intermediate",
    name: {
      [Language.PT]: "Giro Russo (Bola Medicinal)",
      [Language.EN]: "Russian Twist (Medicine ball)",
      [Language.ES]: "Giro ruso (Balón medicinal)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Torção russa"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Med ball",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "core_obliques_side_plank_standard_bodyweight_home_gym_beginner",
    name: {
      [Language.PT]: "Prancha Lateral",
      [Language.EN]: "Side Plank (Standard)",
      [Language.ES]: "Plancha lateral (Estándar)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Prancha lateral"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "F71DPqSITeQ",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "core_obliques_side_plank_with_hip_dips_bodyweight_home_gym_intermediate",
    name: {
      [Language.PT]: "Prancha Lateral com Movimento",
      [Language.EN]: "Side Plank (With hip dips)",
      [Language.ES]: "Plancha lateral (Con bajadas de cadera)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Prancha lateral"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "core_core_stability_dead_bug_basic_bodyweight_home_beginner",
    name: {
      [Language.PT]: "Dead Bug",
      [Language.EN]: "Dead Bug (Basic)",
      [Language.ES]: "Dead bug (Básico)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Dead bug"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "core_core_stability_bird_dog_basic_bodyweight_home_beginner",
    name: {
      [Language.PT]: "Perdigueiro / Bird Dog",
      [Language.EN]: "Bird Dog (Basic)",
      [Language.ES]: "Bird dog (Básico)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Bird dog"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "core_core_mountain_climbers_standard_bodyweight_home_gym_beginner",
    name: {
      [Language.PT]: "Escalador / Mountain Climber",
      [Language.EN]: "Mountain Climbers (Standard)",
      [Language.ES]: "Escaladores (Estándar)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Escalador"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "core_core_ab_wheel_rollout_kneeling_wheel_gym_home_advanced",
    name: {
      [Language.PT]: "Roda Abdominal (Ajoelhado)",
      [Language.EN]: "Ab Wheel Rollout (Kneeling)",
      [Language.ES]: "Rueda abdominal (De rodillas)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Ab wheel (roda abdominal)"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "W6BVMBVJwEc",
    equipment: "Wheel",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "core_core_cable_crunch_kneeling_cable_gym_intermediate",
    name: {
      [Language.PT]: "Abdominal no Cabo (Ajoelhado)",
      [Language.EN]: "Cable Crunch (Kneeling)",
      [Language.ES]: "Crunch en polea (De rodillas)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Abdominal no cabo"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "JNjKjWfVR-s",
    equipment: "Cable",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "core_core_pallof_press_standing_cable_band_gym_home_intermediate",
    name: {
      [Language.PT]: "Pallof Press (Em Pé)",
      [Language.EN]: "Pallof Press (Standing)",
      [Language.ES]: "Pallof press (De pie)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Pallof press"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Cable/Band",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "core_lower_back_back_extension_bodyweight_bodyweight_machine_gym_home_beginner",
    name: {
      [Language.PT]: "Extensão Lombar (No Chão)",
      [Language.EN]: "Back Extension (Bodyweight)",
      [Language.ES]: "Extensión lumbar (Peso corporal)"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10-12",
    executionTips: ["Extensão lombar"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "ogfsu7V--H0",
    equipment: "Bodyweight/Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Cinta de correr — Ritmo Constante",
    name: {
      [Language.PT]: "Esteira (Corrida) (Ritmo Constante)",
      [Language.EN]: "Treadmill Run (Steady State)",
      [Language.ES]: "Cinta de correr (Ritmo Constante)"
    },
    muscleGroup: "Cardio",
    sets: 3,
    reps: "10-12",
    executionTips: ["Keep posture upright"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "tk7F2zDizx8",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Elíptica — Estándar",
    name: {
      [Language.PT]: "Elíptico (Padrão)",
      [Language.EN]: "Elliptical (Steady State)",
      [Language.ES]: "Elíptica (Estándar)"
    },
    muscleGroup: "Cardio",
    sets: 3,
    reps: "10-12",
    executionTips: ["Use handles"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Remo (Máquina) — Intervalos",
    name: {
      [Language.PT]: "Remo (Máquina) (Intervalado)",
      [Language.EN]: "Rowing Machine (Intervals)",
      [Language.ES]: "Remo (Máquina) (Intervalos)"
    },
    muscleGroup: "Cardio",
    sets: 3,
    reps: "10-12",
    executionTips: ["Drive with legs"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Machine",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Escaladora — Estándar",
    name: {
      [Language.PT]: "Simulador de Escada (Padrão)",
      [Language.EN]: "Stair Climber (Steady State)",
      [Language.ES]: "Escaladora (Estándar)"
    },
    muscleGroup: "Cardio",
    sets: 3,
    reps: "10-12",
    executionTips: ["Don't lean on handles"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "QbdBHYvs-q4",
    equipment: "Machine",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Bicicleta Estática — Spinning",
    name: {
      [Language.PT]: "Bicicleta Ergométrica (Spinning)",
      [Language.EN]: "Stationary Bike (Spinning)",
      [Language.ES]: "Bicicleta Estática (Spinning)"
    },
    muscleGroup: "Cardio",
    sets: 3,
    reps: "10-12",
    executionTips: ["Adjust seat height"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Machine",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Jumping Jacks — Peso corporal",
    name: {
      [Language.PT]: "Polichinelos (Peso do corpo)",
      [Language.EN]: "Jumping Jacks (Bodyweight)",
      [Language.ES]: "Jumping Jacks (Peso corporal)"
    },
    muscleGroup: "Cardio",
    sets: 3,
    reps: "10-12",
    executionTips: ["Land softly"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "c6zY1kQEKik",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Burpees — Estándar",
    name: {
      [Language.PT]: "Burpees (Padrão)",
      [Language.EN]: "Burpees (Standard)",
      [Language.ES]: "Burpees (Estándar)"
    },
    muscleGroup: "Cardio",
    sets: 3,
    reps: "10-12",
    executionTips: ["Full extension at top"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "2UwhXXX9uiE",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.ADVANCED
  },

  {
    id: "Rodillas Arriba — Peso corporal",
    name: {
      [Language.PT]: "Corrida Estacionária (High Knees) (Peso do corpo)",
      [Language.EN]: "High Knees (Bodyweight)",
      [Language.ES]: "Rodillas Arriba (Peso corporal)"
    },
    muscleGroup: "Cardio",
    sets: 3,
    reps: "10-12",
    executionTips: ["Knees to hip level"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "Saltar la cuerda — Básico",
    name: {
      [Language.PT]: "Pular Corda (Básico)",
      [Language.EN]: "Jump Rope (Basic Bounce)",
      [Language.ES]: "Saltar la cuerda (Básico)"
    },
    muscleGroup: "Cardio",
    sets: 3,
    reps: "10-12",
    executionTips: ["Stay on toes"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "75MiOI2qjcw",
    equipment: "Rope",
    difficulty: ExperienceLevel.INTERMEDIATE
  },

  {
    id: "Sombra de Boxeo — Libre",
    name: {
      [Language.PT]: "Sombra de Boxe (Livre)",
      [Language.EN]: "Shadow Boxing (Freestyle)",
      [Language.ES]: "Sombra de Boxeo (Libre)"
    },
    muscleGroup: "Cardio",
    sets: 3,
    reps: "10-12",
    executionTips: ["Keep guard up"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "back_lats_pull_up_neutral_grip",
    name: {
      [Language.PT]: "Barra Fixa (Pegada Neutra)",
      [Language.EN]: "Pull Up (Neutral Grip)",
      [Language.ES]: "Dominadas (Agarre Neutro)"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "8-10",
    executionTips: ["Keep core tight", "Pull chest to bar"],
    commonMistakes: [],
    safetyNotes: "Maintain good form",
    videoUrl: "AprDVVDb_O8",
    equipment: "Bodyweight",
    difficulty: ExperienceLevel.ADVANCED
  },


  // === EXERCISES FROM PRESETS (Auto-added) ===
  {
    id: "preset_w1_cat_cow",
    name: {
      [Language.PT]: "Gato-Vaca",
      [Language.EN]: "Cat-Cow",
      [Language.ES]: "Gato-Vaca"
    },
    muscleGroup: "Spine",
    sets: 1,
    reps: "10",
    executionTips: ["Breathe in as you arch", "Breathe out as you round"],
    commonMistakes: ["Moving too fast"],
    safetyNotes: "Move within pain-free range",
    videoUrl: "",
    equipment: "Mat",
    difficulty: ExperienceLevel.BEGINNER
  },
  {
    id: "preset_w2_glute_bridge",
    name: {
      [Language.PT]: "Ponte de Glúteo",
      [Language.EN]: "Glute Bridge",
      [Language.ES]: "Puente de Glúteo"
    },
    muscleGroup: "Glutes",
    sets: 1,
    reps: "15",
    executionTips: ["Drive through heels", "Squeeze glutes at top"],
    commonMistakes: ["Arching lower back"],
    safetyNotes: "Keep core engaged",
    videoUrl: "",
    equipment: "Mat",
    difficulty: ExperienceLevel.BEGINNER
  },
  {
    id: "preset_w3_shoulder_cars",
    name: {
      [Language.PT]: "CARs de Ombro",
      [Language.EN]: "Shoulder CARs",
      [Language.ES]: "CARs de Hombro"
    },
    muscleGroup: "Shoulders",
    sets: 1,
    reps: "5/side",
    executionTips: ["Full circular motion", "Keep body still"],
    commonMistakes: ["Rotating the torso"],
    safetyNotes: "Avoid sharp pain",
    videoUrl: "",
    equipment: "None",
    difficulty: ExperienceLevel.BEGINNER
  },
  {
    id: "preset_m1_goblet_squat",
    name: {
      [Language.PT]: "Agachamento Goblet",
      [Language.EN]: "Goblet Squat",
      [Language.ES]: "Sentadilla Goblet"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "12",
    executionTips: ["Keep chest up", "Elbows to knees"],
    commonMistakes: ["Heels lifting off floor"],
    safetyNotes: "Maintain flat back",
    videoUrl: "",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.BEGINNER
  },
  {
    id: "preset_m2_push_ups",
    name: {
      [Language.PT]: "Flexão de Braço",
      [Language.EN]: "Push Ups",
      [Language.ES]: "Flexiones"
    },
    muscleGroup: "Chest",
    sets: 3,
    reps: "10-15",
    executionTips: ["Body in straight line", "Elbows at 45 degrees"],
    commonMistakes: ["Saggie hips"],
    safetyNotes: "Perform on knees if needed",
    videoUrl: "",
    equipment: "None",
    difficulty: ExperienceLevel.BEGINNER
  },
  {
    id: "preset_m3_bent_over_row",
    name: {
      [Language.PT]: "Remada Curvada",
      [Language.EN]: "Bent Over Row",
      [Language.ES]: "Remo Inclinado"
    },
    muscleGroup: "Back",
    sets: 3,
    reps: "10",
    executionTips: ["Hinge at hips", "Pull to hip bone"],
    commonMistakes: ["Rounding the back"],
    safetyNotes: "Brace core tight",
    videoUrl: "",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },
  {
    id: "preset_m4_overhead_press",
    name: {
      [Language.PT]: "Press Militar",
      [Language.EN]: "Overhead Press",
      [Language.ES]: "Press Militar"
    },
    muscleGroup: "Shoulders",
    sets: 3,
    reps: "10",
    executionTips: ["Stack wrists over elbows", "No rib flare"],
    commonMistakes: ["Arching the back"],
    safetyNotes: "Avoid if shoulder pain exists",
    videoUrl: "",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },
  {
    id: "preset_m5_deadbug",
    name: {
      [Language.PT]: "Deadbug",
      [Language.EN]: "Deadbug",
      [Language.ES]: "Deadbug"
    },
    muscleGroup: "Core",
    sets: 3,
    reps: "10/side",
    executionTips: ["Low back against floor", "Opposite arm/leg move"],
    commonMistakes: ["Losing back contact"],
    safetyNotes: "Slow and controlled",
    videoUrl: "",
    equipment: "None",
    difficulty: ExperienceLevel.BEGINNER
  },
  {
    id: "preset_m6_dumbbell_deadlift",
    name: {
      [Language.PT]: "Levantamento Terra com Halter",
      [Language.EN]: "Dumbbell Deadlift",
      [Language.ES]: "Peso Muerto con Mancuernas"
    },
    muscleGroup: "Hamstrings",
    sets: 3,
    reps: "10",
    executionTips: ["Hinge at hips", "Keep weights close"],
    commonMistakes: ["Bending the knees first"],
    safetyNotes: "Shoulders above hips",
    videoUrl: "",
    equipment: "Dumbbell",
    difficulty: ExperienceLevel.INTERMEDIATE
  },
  {
    id: "preset_m7_lunges",
    name: {
      [Language.PT]: "Avanço",
      [Language.EN]: "Lunges",
      [Language.ES]: "Zancadas"
    },
    muscleGroup: "Legs",
    sets: 3,
    reps: "10/side",
    executionTips: ["90 degree angles", "Tall torso"],
    commonMistakes: ["Knee caving in"],
    safetyNotes: "Hold for balance if needed",
    videoUrl: "",
    equipment: "None",
    difficulty: ExperienceLevel.BEGINNER
  },

  {
    id: "preset_c1_child_s_pose",
    name: {
      [Language.PT]: "Postura da Criança",
      [Language.EN]: "Child's Pose",
      [Language.ES]: "Postura del Niño"
    },
    muscleGroup: "Back",
    sets: 1,
    reps: "60s",
    executionTips: ["Sit on heels", "Reach forward"],
    commonMistakes: ["Holding breath"],
    safetyNotes: "Relax into it",
    videoUrl: "",
    equipment: "Mat",
    difficulty: ExperienceLevel.BEGINNER
  },
];