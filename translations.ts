
import { Language } from './types';

export const translations = {
  [Language.PT]: {
    welcome: "Bem-vindo ao MyFitRout",
    onboardingTitle: "Sua Longevidade, Nossa Prioridade",
    safetyNotes: "Notas de Segurança",
    commonMistakes: "Erros Comuns",
    warmup: "Aquecimento",
    mainBlock: "Bloco Principal",
    cooldown: "Resfriamento",
    aiAssistant: "Vital AI Coach",
    askAi: "Dúvidas técnicas?",
    login: {
      title: "MyFitRout AI",
      subtitle: "Westwood Pro Powered Performance",
      email: "E-mail",
      password: "Senha",
      signIn: "Entrar",
      signUp: "Criar Conta",
      noAccount: "Não tem uma conta?",
      haveAccount: "Já tem uma conta?",
      forgotPass: "Esqueceu a senha?",
      recovery: "Recuperar Senha",
      recoverySubtitle: "Enviaremos um link de acesso para seu e-mail",
      sendLink: "Enviar Link de Recuperação",
      backToLogin: "Voltar para o login",
      syncing: "Sincronizando com a nuvem...",
      successReset: "Link enviado! Verifique sua caixa de entrada."
    },
    onboarding: {
      step1: "Como podemos te chamar?",
      step2: "Suas métricas físicas",
      step3: "Seu nível atual",
      step4: "Qual sua meta principal?",
      step5: "Sua agenda semanal",
      next: "PRÓXIMO",
      finish: "FINALIZAR",
      gender: "Gênero",
      activity: "Nível de Atividade",
      experience: "Experiência",
      male: "Masculino",
      female: "Feminino",
      other: "Outro",
      activityLevels: {
        SEDENTARY: "Sedentário",
        LIGHT: "Levemente Ativo",
        MODERATE: "Moderadamente Ativo",
        HEAVY: "Muito Ativo",
        ATHLETE: "Atleta"
      }
    },
    membership: {
      title: "Plano de Membro",
      status: "Status",
      active: "Ativo",
      inactive: "Inativo",
      buyPass: "Adquirir Passe",
      cancel: "Cancelar Assinatura",
      monthly: "Mensal",
      quarterly: "Trimestral",
      annual: "Anual",
      benefits: "Acesso total, IA ilimitada e Cronograma Personalizado.",
      checkout: "Finalizar Compra",
      testCard: "Cartão de Teste (Simulação)"
    },
    smartStart: {
      assigned: "Treino recomendado pronto!",
      isRest: "Hoje é seu dia de descanso. Deseja treinar mesmo assim?",
      keepRest: "Manter Descanso",
      startAnyway: "Treino Rápido (30-45min)"
    },
    plan: { 
      title: "Planejamento Semanal", 
      rest: "Dia de Descanso", 
      edit: "Editar Dia",
      trainingDays: "Dias de Treino",
      splitStyle: "Estilo de Divisão",
      hint: "Calorias baseadas no Mifflin-St Jeor + Nível de Atividade.",
      modify: "Acessórios"
    },
    splits: {
      ALTERNATING: "Superior / Inferior",
      BRAZIL_4: "Divisão 4-Partes (BR)",
      FULL_BODY_MIX: "Corpo Inteiro Misto"
    },
    metrics: {
      lose: "Déficit Calórico",
      gain: "Superávit Calórico",
      health: "Manutenção",
      strengthen: "Performance",
      label: "Meta Diária",
      tdeeHint: "Gasto calórico total diário (TDEE)."
    },
    catalog: {
      title: "Biblioteca",
      assign: "Agendar",
      selectDay: "Escolher Dia",
      all: "Todos",
      filterByArea: "Foco Muscular",
      searchWorkouts: "Buscar treino...",
      availableCount: "Treinos Disponíveis"
    },
    library: {
      title: "Exercícios",
      search: "Buscar exercício...",
      add: "Adicionar ao Treino"
    },
    profile: {
      title: "Meu Perfil",
      edit: "Editar Dados",
      save: "Salvar Alterações",
      weight: "Peso (kg)",
      height: "Altura (cm)",
      age: "Idade",
      bmr: "Metabolismo Basal",
      tdee: "Gasto Energético",
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
    mon: "Segunda", tue: "Terça", wed: "Quarta", thu: "Quinta", fri: "Sexta", sat: "Sábado", sun: "Domingo",
    tags: {
      BACK: "Costas", CHEST: "Peito", SHOULDERS: "Ombros", BICEPS: "Bíceps", TRICEPS: "Tríceps", LEGS: "Pernas", GLUTES: "Glúteos", CALVES: "Panturrilhas", CORE: "Core", CARDIO: "Cardio"
    },
    categories: {
      FULL_BODY: "Corpo Inteiro", UPPER: "Superior", LOWER: "Inferior", RECOVERY: "Recuperação", CARDIO: "Cardio", CUSTOM: "Personalizado"
    }
  },
  [Language.EN]: {
    welcome: "Welcome to MyFitRout",
    onboardingTitle: "Your Longevity, Our Priority",
    safetyNotes: "Safety Notes",
    commonMistakes: "Common Mistakes",
    warmup: "Warm-up",
    mainBlock: "Main Block",
    cooldown: "Cool-down",
    aiAssistant: "Vital AI Coach",
    askAi: "Technical questions?",
    login: {
      title: "MyFitRout AI",
      subtitle: "Westwood Pro Powered Performance",
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      signUp: "Sign Up",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      forgotPass: "Forgot password?",
      recovery: "Recover Password",
      recoverySubtitle: "We will send an access link to your email",
      sendLink: "Send Recovery Link",
      backToLogin: "Back to login",
      syncing: "Syncing with cloud...",
      successReset: "Link sent! Check your inbox."
    },
    onboarding: {
      step1: "How should we call you?",
      step2: "Your physical metrics",
      step3: "Your current level",
      step4: "What's your main goal?",
      step5: "Your weekly schedule",
      next: "NEXT",
      finish: "FINISH",
      gender: "Gender",
      activity: "Activity Level",
      experience: "Experience",
      male: "Male",
      female: "Female",
      other: "Other",
      activityLevels: {
        SEDENTARY: "Sedentary",
        LIGHT: "Lightly Active",
        MODERATE: "Moderately Active",
        HEAVY: "Very Active",
        ATHLETE: "Athlete"
      }
    },
    membership: {
      title: "Membership Plan",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      buyPass: "Get Pass",
      cancel: "Cancel Subscription",
      monthly: "Monthly",
      quarterly: "Quarterly",
      annual: "Annual",
      benefits: "Full access, unlimited AI, and Custom Schedule.",
      checkout: "Complete Purchase",
      testCard: "Test Card (Simulation)"
    },
    smartStart: {
      assigned: "Recommended workout ready!",
      isRest: "Today is your rest day. Want to train anyway?",
      keepRest: "Keep Resting",
      startAnyway: "Quick Workout (30-45min)"
    },
    plan: { 
      title: "Weekly Schedule", 
      rest: "Rest Day", 
      edit: "Edit Day",
      trainingDays: "Training Days",
      splitStyle: "Split Style",
      hint: "Calories based on Mifflin-St Jeor + Activity multiplier.",
      modify: "Accessories"
    },
    splits: {
      ALTERNATING: "Upper / Lower",
      BRAZIL_4: "4-Part Split (Brazil Style)",
      FULL_BODY_MIX: "Mixed Full Body"
    },
    metrics: {
      lose: "Calorie Deficit",
      gain: "Calorie Surplus",
      health: "Maintenance",
      strengthen: "Performance",
      label: "Daily Target",
      tdeeHint: "Total Daily Energy Expenditure (TDEE)."
    },
    catalog: {
      title: "Library",
      assign: "Assign",
      selectDay: "Select Day",
      all: "All",
      filterByArea: "Muscle Focus",
      searchWorkouts: "Search...",
      availableCount: "Workouts Available"
    },
    library: {
      title: "Exercises",
      search: "Search exercise...",
      add: "Add to Workout"
    },
    profile: {
      title: "My Profile",
      edit: "Edit Data",
      save: "Save Changes",
      weight: "Weight (kg)",
      height: "Height (cm)",
      age: "Age",
      bmr: "BMR",
      tdee: "TDEE",
      goals: {
        LOSE: "Fat Loss",
        GAIN: "Muscle Gain",
        HEALTH: "Longevity",
        STRENGTHEN: "Strength"
      },
      levels: {
        BEGINNER: "Beginner",
        INTERMEDIATE: "Intermediate",
        ADVANCED: "Advanced"
      }
    },
    mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday",
    tags: {
      BACK: "Back", CHEST: "Chest", SHOULDERS: "Shoulders", BICEPS: "Biceps", TRICEPS: "Triceps", LEGS: "Legs", GLUTES: "Glutes", CALVES: "Calves", CORE: "Core", CARDIO: "Cardio"
    },
    categories: {
      FULL_BODY: "Full Body", UPPER: "Upper", LOWER: "Lower", RECOVERY: "Recovery", CARDIO: "Cardio", CUSTOM: "Custom"
    }
  },
  [Language.ES]: {
    welcome: "Bienvenido a MyFitRout",
    onboardingTitle: "Tu Longevidad, Nuestra Prioridad",
    safetyNotes: "Notas de Seguridad",
    commonMistakes: "Errores Comunes",
    warmup: "Calentamiento",
    mainBlock: "Bloque Principal",
    cooldown: "Enfriamiento",
    aiAssistant: "Vital AI Coach",
    askAi: "¿Dudas técnicas?",
    login: {
      title: "MyFitRout AI",
      subtitle: "Westwood Pro Powered Performance",
      email: "Correo",
      password: "Senha",
      signIn: "Entrar",
      signUp: "Crear Conta",
      noAccount: "¿No tienes cuenta?",
      haveAccount: "¿Ya tienes cuenta?",
      forgotPass: "¿Olvidaste tu contraseña?",
      recovery: "Recuperar Contraseña",
      recoverySubtitle: "Enviaremos un enlace de acceso a tu correo",
      sendLink: "Enviar Enlace de Recuperación",
      backToLogin: "Volver al login",
      syncing: "Sincronizando con la nube...",
      successReset: "¡Enlace enviado! Revisa tu bandeja de entrada."
    },
    onboarding: {
      step1: "¿Cómo podemos llamarte?",
      step2: "Tus métricas físicas",
      step3: "Tu nivel actual",
      step4: "¿Cuál es tu meta principal?",
      step5: "Tu agenda semanal",
      next: "SIGUIENTE",
      finish: "FINALIZAR",
      gender: "Género",
      activity: "Nivel de Actividad",
      experience: "Experiencia",
      male: "Masculino",
      female: "Femenino",
      other: "Otro",
      activityLevels: {
        SEDENTARY: "Sedentario",
        LIGHT: "Ligeramente Activo",
        MODERATE: "Moderadamente Activo",
        HEAVY: "Muy Activo",
        ATHLETE: "Atleta"
      }
    },
    membership: {
      title: "Plan de Miembro",
      status: "Estado",
      active: "Activo",
      inactive: "Inactivo",
      buyPass: "Adquirir Pase",
      cancel: "Cancelar Suscripción",
      monthly: "Mensual",
      quarterly: "Trimestral",
      annual: "Anual",
      benefits: "Acceso total, IA ilimitada y Cronograma Personalizado.",
      checkout: "Finalizar Compra",
      testCard: "Tarjeta de Prueba (Simulación)"
    },
    smartStart: {
      assigned: "¡Entrenamiento listo!",
      isRest: "Hoy es tu día de descanso. ¿Quieres entrenar de todos modos?",
      keepRest: "Seguir descansando",
      startAnyway: "Entreno Rápido (30-45min)"
    },
    plan: { 
      title: "Cronograma Semanal", 
      rest: "Día de Descanso", 
      edit: "Editar Día",
      trainingDays: "Días de Entreno",
      splitStyle: "Estilo de División",
      hint: "Calorías basadas en Mifflin-St Jeor + Multiplicador de actividad.",
      modify: "Accesorios"
    },
    splits: {
      ALTERNATING: "Superior / Inferior",
      BRAZIL_4: "División 4-Partes (Estilo BR)",
      FULL_BODY_MIX: "Cuerpo Completo Mixto"
    },
    metrics: {
      lose: "Déficit Calórico",
      gain: "Superávit Calórico",
      health: "Mantenimiento",
      strengthen: "Rendimiento",
      label: "Meta Diaria",
      tdeeHint: "Gasto calórico total diario (TDEE)."
    },
    catalog: {
      title: "Biblioteca",
      assign: "Asignar",
      selectDay: "Seleccionar Día",
      all: "Todos",
      filterByArea: "Enfoque Muscular",
      searchWorkouts: "Buscar...",
      availableCount: "Rutinas Disponibles"
    },
    library: {
      title: "Ejercicios",
      search: "Buscar...",
      add: "Agregar"
    },
    profile: {
      title: "Mi Perfil",
      edit: "Editar Perfil",
      save: "Guardar Cambios",
      weight: "Peso (kg)",
      height: "Altura (cm)",
      age: "Edad",
      bmr: "Basal",
      tdee: "Gasto Total",
      goals: {
        LOSE: "Pérdida de Grasa",
        GAIN: "Ganancia Muscular",
        HEALTH: "Longevidad",
        STRENGTHEN: "Fuerza"
      },
      levels: {
        BEGINNER: "Principiante",
        INTERMEDIATE: "Intermedio",
        ADVANCED: "Avanzado"
      }
    },
    mon: "Lunes", tue: "Martes", wed: "Miércoles", thu: "Jueves", fri: "Viernes", sat: "Sábado", sun: "Domingo",
    tags: {
      BACK: "Espalda", CHEST: "Pecho", SHOULDERS: "Hombros", BICEPS: "Bíceps", TRICEPS: "Tríceps", LEGS: "Piernas", GLUTES: "Glúteos", CALVES: "Pantorrillas", CORE: "Core", CARDIO: "Cardio"
    },
    categories: {
      FULL_BODY: "Cuerpo Completo", UPPER: "Superior", LOWER: "Inferior", RECOVERY: "Recuperación", CARDIO: "Cardio", CUSTOM: "Personalizado"
    }
  }
};
