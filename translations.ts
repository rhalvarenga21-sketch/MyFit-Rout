
import { Language } from './types';

export const translations = {
  [Language.PT]: {
    welcome: "Bem-vindo ao My Fit Rout",
    onboardingTitle: "Sua Longevidade, Nossa Prioridade",
    safetyNotes: "Notas de Segurança",
    commonMistakes: "Erros Comuns",
    presets: "Workouts",
    warmup: "Aquecimento",
    mainBlock: "Bloco Principal",
    cooldown: "Resfriamento",
    noRush: "Treine sem pressa.",
    longevity: "Longevidade",
    aiAssistant: "Vital AI Coach",
    askAi: "Dúvidas técnicas?",
    plan: { 
      title: "Planejamento", 
      subtitle: "Rotina Semanal", 
      rest: "Descanso", 
      edit: "Editar Dia",
      modify: "Modificar Exercícios",
      add: "Adicionar Exercício",
      save: "Salvar Plano",
      trainingDays: "Dias de Treino",
      splitStyle: "Estilo de Divisão",
      hint: "Cálculo baseado no seu TDEE e objetivo (Mifflin-St Jeor)."
    },
    splits: {
      ALTERNATING: "Alternado (Superior/Inferior)",
      FULL_BODY_MIX: "Misto (Corpo Inteiro)",
      STRENGTH_PUSH_PULL: "Força (Empurra/Puxa)"
    },
    metrics: {
      lose: "Déficit Calórico (Queima)",
      gain: "Superávit Calórico (Massa)",
      health: "Manutenção de Saúde",
      strengthen: "Performance & Força",
      label: "Kcal Recomendadas",
      bmrHint: "Taxa Metabólica Basal",
      tdeeHint: "Gasto Calórico Diário Total"
    },
    catalog: {
      title: "Catálogo",
      assign: "Agendar",
      selectDay: "Selecionar Dia",
      assignSuccess: "Treino agendado para",
      all: "Todos",
      filterByArea: "Filtro por Área",
      searchWorkouts: "Buscar treinos...",
      duration: "Duração",
      startNow: "Iniciar"
    },
    categories: {
      FULL_BODY: "Corpo Inteiro",
      UPPER: "Membros Superiores",
      LOWER: "Membros Inferiores",
      RECOVERY: "Recuperação",
      CARDIO: "Cardio",
      CUSTOM: "Personalizado"
    },
    tags: {
      BACK: "Costas",
      CHEST: "Peito",
      SHOULDERS: "Ombros",
      BICEPS: "Bíceps",
      TRICEPS: "Tríceps",
      LEGS: "Pernas",
      GLUTES: "Glúteos",
      CALVES: "Panturrilha",
      CORE: "Core",
      CARDIO: "Cardio"
    },
    profile: {
      title: "Meu Perfil",
      edit: "Editar Perfil",
      save: "Salvar Alterações",
      metrics: "Métricas Atuais",
      age: "Idade",
      gender: "Gênero",
      weight: "Peso",
      height: "Altura",
      activity: "Atividade",
      level: "Nível",
      goal: "Objetivo",
      water: "Meta de Água",
      bmr: "Metabolismo",
      tdee: "Gasto Total",
      targetKcal: "Meta Diária",
      daysActive: "Dias Ativos",
      streak: "Sequência",
      male: "Masculino", female: "Feminino",
      goals: {
        LOSE: "Emagrecimento",
        GAIN: "Hipertrofia",
        HEALTH: "Longevidade",
        STRENGTHEN: "Força"
      },
      levels: {
        BEGINNER: "Iniciante",
        INTERMEDIATE: "Intermediário",
        ADVANCED: "Avançado"
      }
    },
    mon: "Segunda", tue: "Terça", wed: "Quarta", thu: "Quinta", fri: "Sexta", sat: "Sábado", sun: "Domingo"
  },
  [Language.EN]: {
    welcome: "Welcome to My Fit Rout",
    onboardingTitle: "Your Longevity, Our Priority",
    safetyNotes: "Safety Notes",
    commonMistakes: "Common Mistakes",
    presets: "Workouts",
    warmup: "Warm-up",
    mainBlock: "Main Block",
    cooldown: "Cool-down",
    noRush: "No rush training.",
    longevity: "Longevity",
    aiAssistant: "Vital AI Coach",
    askAi: "Technical questions?",
    plan: { 
      title: "Planning", 
      subtitle: "Weekly Routine", 
      rest: "Rest Day", 
      edit: "Edit Day",
      modify: "Modify Exercises",
      add: "Add Exercise",
      save: "Save Plan",
      trainingDays: "Training Days",
      splitStyle: "Split Style",
      hint: "Calculation based on TDEE and goal (Mifflin-St Jeor)."
    },
    splits: {
      ALTERNATING: "Alternating (Upper/Lower)",
      FULL_BODY_MIX: "Mixed (Full Body)",
      STRENGTH_PUSH_PULL: "Strength (Push/Pull)"
    },
    metrics: {
      lose: "Calorie Deficit (Fat Loss)",
      gain: "Calorie Surplus (Mass)",
      health: "Maintenance",
      strengthen: "Strength & Performance",
      label: "Recommended Kcal",
      bmrHint: "Basal Metabolic Rate",
      tdeeHint: "Total Daily Energy Expenditure"
    },
    catalog: {
      title: "Catalog",
      assign: "Assign",
      selectDay: "Select Day",
      assignSuccess: "Workout assigned to",
      all: "All",
      filterByArea: "Focus Area",
      searchWorkouts: "Search workouts...",
      duration: "Duration",
      startNow: "Start"
    },
    categories: {
      FULL_BODY: "Full Body",
      UPPER: "Upper Body",
      LOWER: "Lower Body",
      RECOVERY: "Recovery",
      CARDIO: "Cardio",
      CUSTOM: "Custom"
    },
    tags: {
      BACK: "Back",
      CHEST: "Chest",
      SHOULDERS: "Shoulders",
      BICEPS: "Biceps",
      TRICEPS: "Triceps",
      LEGS: "Legs",
      GLUTES: "Glutes",
      CALVES: "Calves",
      CORE: "Core",
      CARDIO: "Cardio"
    },
    profile: {
      title: "My Profile",
      edit: "Edit Profile",
      save: "Save Changes",
      metrics: "Current Metrics",
      age: "Age",
      gender: "Gender",
      weight: "Weight",
      height: "Height",
      activity: "Activity",
      level: "Level",
      goal: "Goal",
      water: "Water Goal",
      bmr: "BMR",
      tdee: "TDEE",
      targetKcal: "Daily Goal",
      daysActive: "Active Days",
      streak: "Streak",
      male: "Male", female: "Female",
      goals: {
        LOSE: "Fat Loss",
        GAIN: "Muscle Gain",
        HEALTH: "Health & Longevity",
        STRENGTHEN: "Strength Focus"
      },
      levels: {
        BEGINNER: "Beginner",
        INTERMEDIATE: "Intermediate",
        ADVANCED: "Advanced"
      }
    },
    mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday"
  },
  [Language.ES]: {
    welcome: "Bienvenido a My Fit Rout",
    onboardingTitle: "Tu Longevidad, Nuestra Prioridad",
    safetyNotes: "Notas de Seguridad",
    commonMistakes: "Errores Comunes",
    presets: "Workouts",
    warmup: "Calentamiento",
    mainBlock: "Bloque Principal",
    cooldown: "Enfriamiento",
    noRush: "Entrena sin prisa.",
    longevity: "Longevidad",
    aiAssistant: "Vital AI Coach",
    askAi: "¿Dudas técnicas?",
    plan: { 
      title: "Planificación", 
      subtitle: "Rutina Semanal", 
      rest: "Descanso", 
      edit: "Editar Día",
      modify: "Modificar Ejercicios",
      add: "Añadir Ejercicio",
      save: "Guardar Plan",
      trainingDays: "Días de Entreno",
      splitStyle: "Estilo de División",
      hint: "Cálculo basado en TDEE y meta (Mifflin-St Jeor)."
    },
    splits: {
      ALTERNATING: "Alternado (Superior/Inferior)",
      FULL_BODY_MIX: "Mixto (Cuerpo Completo)",
      STRENGTH_PUSH_PULL: "Fuerza (Empuja/Tira)"
    },
    metrics: {
      lose: "Déficit Calórico (Quema)",
      gain: "Superávit Calórico (Masa)",
      health: "Mantenimiento",
      strengthen: "Performance & Fuerza",
      label: "Kcal Recomendadas",
      bmrHint: "Tasa Metabólica Basal",
      tdeeHint: "Gasto Calórico Diario Total"
    },
    catalog: {
      title: "Catálogo",
      assign: "Asignar",
      selectDay: "Seleccionar Día",
      assignSuccess: "Entrenamiento asignado a",
      all: "Todos",
      filterByArea: "Área Muscular",
      searchWorkouts: "Buscar treinos...",
      duration: "Duración",
      startNow: "Iniciar"
    },
    categories: {
      FULL_BODY: "Cuerpo Completo",
      UPPER: "Tren Superior",
      LOWER: "Tren Inferior",
      RECOVERY: "Recuperación",
      CARDIO: "Cardio",
      CUSTOM: "Personalizado"
    },
    tags: {
      BACK: "Espalda",
      CHEST: "Pecho",
      SHOULDERS: "Hombros",
      BICEPS: "Bíceps",
      TRICEPS: "Tríceps",
      LEGS: "Piernas",
      GLUTES: "Glúteos",
      CALVES: "Pantorrilla",
      CORE: "Core",
      CARDIO: "Cardio"
    },
    profile: {
      title: "Mi Perfil",
      edit: "Editar Perfil",
      save: "Guardar Cambios",
      metrics: "Métricas",
      age: "Edad",
      gender: "Género",
      weight: "Peso",
      height: "Altura",
      activity: "Atividad",
      level: "Nivel",
      goal: "Objetivo",
      water: "Meta de Agua",
      bmr: "Basal",
      tdee: "Gasto Total",
      targetKcal: "Meta Diaria",
      daysActive: "Días Activos",
      streak: "Racha",
      male: "Masc", female: "Fem",
      goals: {
        LOSE: "Pérdida de Grasa",
        GAIN: "Ganancia Muscular",
        HEALTH: "Salud & Longevidad",
        STRENGTHEN: "Enfoque en Fuerza"
      },
      levels: {
        BEGINNER: "Principiante",
        INTERMEDIATE: "Intermedio",
        ADVANCED: "Avanzado"
      }
    },
    mon: "Lunes", tue: "Martes", wed: "Miércoles", thu: "Jueves", fri: "Viernes", sat: "Sábado", sun: "Domingo"
  }
};
