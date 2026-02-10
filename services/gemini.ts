import { Language, UserProfile } from "../types";

console.log("🤖 Rafa Fit - Your Smart AI Coach");

// Simula delay de API para parecer real
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

// ============================================
// GENERAL AI COACH
// ============================================

export const getAIFeedback = async (
  query: string,
  profile: UserProfile,
  language: Language
) => {
  await simulateDelay();

  const queryLower = query.toLowerCase();
  const isPT = language === Language.PT;
  const isES = language === Language.ES;

  // Detecção de palavras-chave expandida
  const keywords = {
    // CATEGORIAS PRINCIPAIS
    treino: ['treino', 'workout', 'exercício', 'exercise', 'musculação', 'malhar', 'treinar', 'fazer', 'entrenar', 'hacer', 'protocolo', 'rotina', 'série', 'repetição'],
    dieta: ['dieta', 'diet', 'alimentação', 'nutrition', 'comida', 'comer', 'alimento', 'refeição', 'frango', 'ovo', 'carbo', 'proteína', 'gordura', 'kcal', 'caloria', 'preparar', 'cozinhar', 'marmita', 'receita', 'preparo', 'refeição', 'comida', 'jantar', 'almoço', 'café', 'nutrient', 'vitamina', 'macronutriente', 'jejum', 'fasting', 'keto', 'cetogênica', 'vegano', 'vegan', 'paleo'],

    // ANATOMIA / GRUPOS
    peito: ['peito', 'chest', 'peitoral', 'supino', 'flexão', 'pushup'],
    costas: ['costas', 'back', 'dorsal', 'remada', 'puxada', 'barra fixa', 'pulldown', 'lat', 'trapézio'],
    pernas: ['perna', 'leg', 'coxa', 'glúteo', 'agachamento', 'squat', 'panturrilha', 'stiff', 'afundo', 'quadríceps', 'isquio', 'posterior'],
    braço: ['braço', 'arm', 'bíceps', 'tríceps', 'antebraço', 'rosca', 'bicep', 'tricep'],
    ombro: ['ombro', 'shoulder', 'deltoide', 'elevação', 'desenvolvimento', 'manguito'],
    abdomen: ['abdomen', 'abs', 'barriga', 'core', 'abdominal', 'prancha', 'obliquo', 'infra', 'supra'],

    // SAÚDE E BEM-ESTAR
    saude: ['saúde', 'health', 'vitalidade', 'coração', 'heart', 'pulmão', 'colesterol', 'pressão', 'sangue', 'blood', 'hormônio', 'testo', 'cortisol', 'insulina', 'glicemia'],
    bem_estar: ['bem-estar', 'wellness', 'mente', 'stress', 'estresse', 'meditação', 'foco', 'sono', 'sleep', 'descanso', 'sauna', 'gelo', 'ice bath', 'respiração'],
    dor: ['dor', 'pain', 'lesão', 'injury', 'machucado', 'fisgada', 'sensível', 'desconforto', 'articulação', 'inflamação'],

    // ESTILOS E AMBIENTE
    casa: ['casa', 'home', 'apartamento', 'quarto', 'bodyweight', 'peso do corpo', 'sem equipamento', 'elástico', 'band', 'toalha', 'cadeira'],
    estilo: ['crossfit', 'yoga', 'pilates', 'calistenia', 'calisthenics', 'powerlifting', 'hiit', 'tabata', 'funcional', 'functional', 'corrida', 'running'],
    equipamento: ['haltere', 'dumbbell', 'kettlebell', 'barra', 'barbell', 'máquina', 'machine', 'polia', 'pulley', 'cabo', 'smith', 'elástico', 'trx'],

    // NÍVEIS E OBJETIVOS
    iniciante: ['iniciante', 'beginner', 'começar', 'inicio', 'primeira vez', 'zero', 'sedentário'],
    avançado: ['avançado', 'advanced', 'experiente', 'profissional', 'atleta', 'bodybuilder', 'competir'],
    hipertrofia: ['hipertrofia', 'massa', 'muscular', 'ganho', 'crescer', 'volume', 'ficar grande', 'anabolismo'],
    peso: ['peso', 'weight', 'emagrecer', 'perder', 'ganhar', 'balança', 'gordo', 'magro', 'definição', 'secar', 'cutting', 'bulking'],

    // EXTRAS
    cardio: ['cardio', 'aeróbico', 'correr', 'run', 'caminhar', 'bicicleta', 'esteira', 'escada', 'pular corda'],
    alongamento: ['alongamento', 'stretch', 'flexibilidade', 'mobilidade', 'soltar', 'yoga'],
    suplemento: ['suplemento', 'supplement', 'whey', 'creatina', 'pré-treino', 'bcaa', 'glutamina', 'vitamina', 'multivit'],
    descanso: ['descanso', 'rest', 'recuperação', 'recovery', 'dormir', 'sono', 'off', 'day off'],
    motivacao: ['motivação', 'motivation', 'desanimar', 'força', 'querendo parar', 'difícil', 'foco', 'disciplina', 'ânimo']
  };

  // TREINO DE PEITO
  if (keywords.treino.some(k => queryLower.includes(k)) && keywords.peito.some(k => queryLower.includes(k))) {
    if (isES) {
      return `¡Excelente elección, ${profile.name}! 💪 Para entrenamiento de pecho, recomiendo:\n\n✅ **Press de banca** - 3x10 (enfoque en la técnica)\n✅ **Flexiones** - 3x hasta el fallo\n✅ **Aperturas con mancuernas** - 3x12\n✅ **Press inclinado** - 3x10\n\n💡 **Consejo Vital**: Mantén los hombros retraídos durante todo el movimiento para proteger las articulaciones. ¡Calidad > Cantidad!\n\n🔥 **Próximo nivel**: Varía el ángulo del banco para trabajar diferentes porciones del pectoral.`;
    }
    return isPT
      ? `Ótima escolha, ${profile.name}! 💪 Para treino de peito, recomendo:\n\n✅ **Supino reto** - 3x10 (foco na técnica)\n✅ **Flexões** - 3x até a falha\n✅ **Crucifixo com halteres** - 3x12\n✅ **Supino inclinado** - 3x10\n\n💡 **Dica Vital**: Mantenha os ombros retraídos durante todo o movimento para proteger as articulações. Qualidade > Quantidade!\n\n🔥 **Próximo nível**: Varie o ângulo do banco para trabalhar diferentes porções do peitoral.`
      : `Great choice, ${profile.name}! 💪 For chest workout, I recommend:\n\n✅ **Bench Press** - 3x10 (focus on technique)\n✅ **Push-ups** - 3x to failure\n✅ **Dumbbell Flyes** - 3x12\n✅ **Incline Bench Press** - 3x10\n\n💡 **Vital Tip**: Keep shoulders retracted throughout the movement to protect joints. Quality > Quantity!\n\n🔥 **Next level**: Vary bench angle to work different chest portions.`;
  }

  // TREINO DE COSTAS
  if (keywords.treino.some(k => queryLower.includes(k)) && keywords.costas.some(k => queryLower.includes(k))) {
    if (isES) {
      return `¡Excelente! ¡Espalda fuerte = postura saludable! 🦾\n\n✅ **Remo con barra** - 4x10\n✅ **Jalón frontal** - 3x12\n✅ **Remo unilateral** - 3x10 cada lado\n✅ **Peso muerto** - 3x8 (¡cuidado con la técnica!)\n\n💡 **Consejo Vital**: Siempre tira con los codos, no con las manos. ¡Siente el músculo trabajando!\n\n⚠️ **Atención**: Mantén la columna neutral en el peso muerto.`;
    }
    return isPT
      ? `Excelente! Costas forte = postura saudável! 🦾\n\n✅ **Remada curvada** - 4x10\n✅ **Puxada frontal** - 3x12\n✅ **Remada unilateral** - 3x10 cada lado\n✅ **Levantamento terra** - 3x8 (cuidado com a técnica!)\n\n💡 **Dica Vital**: Sempre puxe com os cotovelos, não com as mãos. Sinta o músculo trabalhando!\n\n⚠️ **Atenção**: Mantenha a coluna neutra no levantamento terra.`
      : `Excellent! Strong back = healthy posture! 🦾\n\n✅ **Bent-over Row** - 4x10\n✅ **Lat Pulldown** - 3x12\n✅ **Single-arm Row** - 3x10 each side\n✅ **Deadlift** - 3x8 (careful with technique!)\n\n💡 **Vital Tip**: Always pull with elbows, not hands. Feel the muscle working!\n\n⚠️ **Attention**: Keep spine neutral in deadlifts.`;
  }

  // TREINO DE PERNAS
  if (keywords.treino.some(k => queryLower.includes(k)) && keywords.pernas.some(k => queryLower.includes(k))) {
    if (isES) {
      return `¡Día de piernas! 🦵 ¡El día más importante de la semana!\n\n✅ **Sentadilla libre** - 4x10\n✅ **Prensa de piernas** - 3x12\n✅ **Zancadas** - 3x10 cada pierna\n✅ **Peso muerto rumano** - 3x12 (isquiotibiales)\n✅ **Elevación de pantorrillas** - 4x15\n\n💡 **Consejo Vital**: Rodillas siempre alineadas con los pies. ¡Baja controlado, sube explosivo!\n\n🔥 **Motivación**: ¡Piernas fuertes = base sólida para todos los demás ejercicios!`;
    }
    return isPT
      ? `Leg day! 🦵 O dia mais importante da semana!\n\n✅ **Agachamento livre** - 4x10\n✅ **Leg Press** - 3x12\n✅ **Afundo** - 3x10 cada perna\n✅ **Stiff** - 3x12 (posterior de coxa)\n✅ **Panturrilha** - 4x15\n\n💡 **Dica Vital**: Joelhos sempre alinhados com os pés. Desça controlado, suba explosivo!\n\n🔥 **Motivação**: Pernas fortes = base sólida para todos os outros exercícios!`
      : `Leg day! 🦵 The most important day of the week!\n\n✅ **Free Squat** - 4x10\n✅ **Leg Press** - 3x12\n✅ **Lunges** - 3x10 each leg\n✅ **Stiff-leg Deadlift** - 3x12 (hamstrings)\n✅ **Calf Raises** - 4x15\n\n💡 **Vital Tip**: Knees always aligned with feet. Go down controlled, up explosive!\n\n🔥 **Motivation**: Strong legs = solid foundation for all other exercises!`;
  }

  // TREINO DE BRAÇOS
  if (keywords.treino.some(k => queryLower.includes(k)) && keywords.braço.some(k => queryLower.includes(k))) {
    if (isES) {
      return `¡Brazos de respeto! 💪\n\n**BÍCEPS:**\n✅ Curl con barra - 3x12\n✅ Curl martillo - 3x10\n✅ Curl concentrado - 3x12\n\n**TRÍCEPS:**\n✅ Extensiones - 3x12\n✅ Fondos - 3x hasta el fallo\n✅ Extensión con cuerda - 3x15\n\n💡 **Consejo Vital**: ¡Codos fijos! Movimiento aislado = máxima activación muscular.`;
    }
    return isPT
      ? `Braços de respeito! 💪\n\n**BÍCEPS:**\n✅ Rosca direta - 3x12\n✅ Rosca martelo - 3x10\n✅ Rosca concentrada - 3x12\n\n**TRÍCEPS:**\n✅ Tríceps testa - 3x12\n✅ Mergulho - 3x até a falha\n✅ Tríceps corda - 3x15\n\n💡 **Dica Vital**: Cotovelos fixos! Movimento isolado = máxima ativação muscular.`
      : `Respect-worthy arms! 💪\n\n**BICEPS:**\n✅ Barbell Curl - 3x12\n✅ Hammer Curl - 3x10\n✅ Concentration Curl - 3x12\n\n**TRICEPS:**\n✅ Skull Crushers - 3x12\n✅ Dips - 3x to failure\n✅ Rope Pushdown - 3x15\n\n💡 **Vital Tip**: Fixed elbows! Isolated movement = maximum muscle activation.`;
  }

  // TREINO DE OMBROS
  if (keywords.ombro.some(k => queryLower.includes(k))) {
    if (isES) {
      return `¡Hombros de acero! 🛡️ Es fundamental para la estética y la postura.\n\n✅ **Press Militar** - 3x10\n✅ **Elevaciones Laterales** - 4x15 (foco en el deltoide lateral)\n✅ **Elevaciones Frontales** - 3x12\n✅ **Facepulls** - 3x15 (esencial para la salud del hombro)\n\n💡 **Consejo Vital**: No uses cargas excesivas que comprometan la forma. ¡El hombro es una articulação compleja y sensible!\n\n⚠️ **Atención**: Si sientes dolor agudo, detente y enfócate en el manguito rotador.`;
    }
    return isPT
      ? `Ombros de aço! 🛡️ Fundamental para estética e postura.\n\n✅ **Desenvolvimento com halteres** - 3x10\n✅ **Elevação Lateral** - 4x15 (foco no deltoide lateral)\n✅ **Elevação Frontal** - 3x12\n✅ **Facepull** - 3x15 (essencial para saúde do ombro)\n\n💡 **Dica Vital**: Não use cargas excessivas que comprometam a forma. O ombro é uma articulação complexa e sensível!\n\n⚠️ **Atenção**: Se sentir dor aguda, pare e foque no manguito rotador.`
      : `Shoulder day! 🛡️ Key for aesthetics and posture.\n\n✅ **Dumbbell Press** - 3x10\n✅ **Lateral Raises** - 4x15 (focus on lateral deltoid)\n✅ **Front Raises** - 3x12\n✅ **Facepulls** - 3x15 (essential for shoulder health)\n\n💡 **Vital Tip**: Don't use excessive loads that compromise form. The shoulder is a complex and sensitive joint!\n\n⚠️ **Attention**: If you feel sharp pain, stop and focus on rotator cuff work.`;
  }

  // DIETA/NUTRIÇÃO
  if (keywords.dieta.some(k => queryLower.includes(k))) {
    const calorias = Math.round(profile.weight * 33);
    const proteina = Math.round(profile.weight * 2);

    if (isES) {
      return `¡Perfecto! ¡Nutrición = 70% de los resultados! 🥗\n\nBasado en tu perfil (${profile.weight}kg, objetivo: ${profile.goal}):\n\n🎯 **Meta Calórica**: ~${calorias}kcal/día\n🥩 **Proteína**: ${proteina}g/día (¡esencial!)\n🍚 **Carbohidratos**: ${Math.round(profile.weight * 3)}g/día\n🥑 **Grasas saludables**: ${Math.round(profile.weight * 0.8)}g/día\n💧 **Agua**: ${Math.round(profile.weight * 35)}ml/día\n\n📋 **Comidas sugeridas**:\n- Desayuno: Huevos + avena + frutas\n- Almuerzo: Pollo/pescado + arroz + vegetales\n- Merienda: Yogur + nueces\n- Cena: Proteína magra + ensalada\n\n💡 **Regla de oro**: ¡Come cada 3 horas!`;
    }

    return isPT
      ? `Perfeito! Nutrição = 70% dos resultados! 🥗\n\nCom base no seu perfil (${profile.weight}kg, objetivo: ${profile.goal}):\n\n🎯 **Meta Calórica**: ~${calorias}kcal/dia\n🥩 **Proteína**: ${proteina}g/dia (essencial!)\n🍚 **Carbohidratos**: ${Math.round(profile.weight * 3)}g/dia\n🥑 **Gorduras boas**: ${Math.round(profile.weight * 0.8)}g/dia\n💧 **Água**: ${Math.round(profile.weight * 35)}ml/dia\n\n📋 **Refeições sugeridas**:\n- Café: Ovos + aveia + frutas\n- Almoço: Frango/peixe + arroz + vegetais\n- Lanche: Iogurte + castanhas\n- Jantar: Proteína magra + salada\n\n💡 **Regra de ouro**: Coma de 3 em 3 horas!`
      : `Perfect! Nutrition = 70% of results! 🥗\n\nBased on your profile (${profile.weight}kg, goal: ${profile.goal}):\n\n🎯 **Calorie Target**: ~${calorias}kcal/day\n🥩 **Protein**: ${proteina}g/day (essential!)\n🍚 **Carbs**: ${Math.round(profile.weight * 3)}g/day\n🥑 **Healthy Fats**: ${Math.round(profile.weight * 0.8)}g/day\n💧 **Water**: ${Math.round(profile.weight * 35)}ml/day\n\n📋 **Suggested meals**:\n- Breakfast: Eggs + oats + fruits\n- Lunch: Chicken/fish + rice + veggies\n- Snack: Yogurt + nuts\n- Dinner: Lean protein + salad\n\n💡 **Golden rule**: Eat every 3 hours!`;
  }

  // DOR/LESÃO
  if (keywords.dor.some(k => queryLower.includes(k))) {
    if (isES) {
      return `⚠️ ¡Atención, ${profile.name}! ¡El dolor no es normal!\n\n🔍 **Evalúa**:\n- ¿Dolor agudo o crónico?\n- ¿Empeora con movimiento específico?\n- ¿Hinchazón o enrojecimiento?\n\n✅ **Acciones inmediatas**:\n1. **DETÉN** el ejercicio que causa dolor\n2. Aplica **hielo** (15-20min, 3x al día)\n3. **Reposo** del área afectada\n4. Consulta un **fisioterapeuta** si persiste por 3+ días\n\n💡 **Prevención**:\n- Siempre calienta 5-10min antes\n- Estira después del entrenamiento\n- ¡Técnica > Carga siempre!\n- Respeta los días de descanso\n\n🚨 **Cuándo ver un médico**: Dolor intenso, hinchazón significativa, o limitación de movimiento.`;
    }
    return isPT
      ? `⚠️ Atenção, ${profile.name}! Dor não é normal!\n\n🔍 **Avalie**:\n- Dor aguda ou crônica?\n- Piora com movimento específico?\n- Inchaço ou vermelhidão?\n\n✅ **Ações imediatas**:\n1. **PARE** o exercício que causa dor\n2. Aplique **gelo** (15-20min, 3x ao dia)\n3. **Repouso** da área afetada\n4. Consulte um **fisioterapeuta** se persistir por 3+ dias\n\n💡 **Prevenção**:\n- Sempre aqueça 5-10min antes\n- Alongue após o treino\n- Técnica > Carga sempre!\n- Respeite os dias de descanso\n\n🚨 **Quando procurar médico**: Dor intensa, inchaço significativo, ou limitação de movimento.`
      : `⚠️ Attention, ${profile.name}! Pain is not normal!\n\n🔍 **Assess**:\n- Acute or chronic pain?\n- Worsens with specific movement?\n- Swelling or redness?\n\n✅ **Immediate actions**:\n1. **STOP** the exercise causing pain\n2. Apply **ice** (15-20min, 3x daily)\n3. **Rest** the affected area\n4. Consult a **physiotherapist** if it persists 3+ days\n\n💡 **Prevention**:\n- Always warm up 5-10min before\n- Stretch after workout\n- Technique > Load always!\n- Respect rest days\n\n🚨 **When to see a doctor**: Severe pain, significant swelling, or movement limitation.`;
  }

  // CARDIO
  if (keywords.cardio.some(k => queryLower.includes(k))) {
    if (isES) {
      return `¡Cardio = salud cardiovascular! ❤️\n\n🏃 **Opciones eficientes**:\n- **HIIT** (20min): 30s sprint + 30s descanso\n- **Trote ligero** (30-40min): Zona 2 de frecuencia cardíaca\n- **Caminata inclinada** (40min): Bajo impacto, excelente para principiantes\n- **Saltar la cuerda** (15min): Quema rápida de calorías\n\n💡 **Consejo Vital**: Haz cardio en días separados del entrenamiento de piernas, o después del entrenamiento de fuerza (¡nunca antes!).\n\n🎯 **Frecuencia ideal**: 2-3x por semana para hipertrofia, 4-5x para pérdida de peso.`;
    }
    return isPT
      ? `Cardio = saúde cardiovascular! ❤️\n\n🏃 **Opções eficientes**:\n- **HIIT** (20min): 30s sprint + 30s descanso\n- **Corrida leve** (30-40min): Zona 2 de frequência cardíaca\n- **Caminhada inclinada** (40min): Baixo impacto, ótimo para iniciantes\n- **Pular corda** (15min): Queima rápida de calorias\n\n💡 **Dica Vital**: Faça cardio em dias separados do treino de pernas, ou após o treino de força (nunca antes!).\n\n🎯 **Frequência ideal**: 2-3x por semana para hipertrofia, 4-5x para perda de peso.`
      : `Cardio = cardiovascular health! ❤️\n\n🏃 **Efficient options**:\n- **HIIT** (20min): 30s sprint + 30s rest\n- **Light jogging** (30-40min): Zone 2 heart rate\n- **Incline walking** (40min): Low impact, great for beginners\n- **Jump rope** (15min): Fast calorie burn\n\n💡 **Vital Tip**: Do cardio on separate days from leg training, or after strength training (never before!).\n\n🎯 **Ideal frequency**: 2-3x per week for hypertrophy, 4-5x for weight loss.`;
  }

  // SUPLEMENTOS
  if (keywords.suplemento.some(k => queryLower.includes(k))) {
    if (isES) {
      return `Suplementos: ¡complementos, no sustitutos! 💊\n\n✅ **Esenciales** (científicamente comprobados):\n1. **Proteína Whey** - Post-entrenamiento (30g)\n2. **Creatina** - 5g/día (cualquier hora)\n3. **Multivitamínico** - 1x al día\n4. **Omega 3** - 2-3g/día\n\n⚠️ **Opcional** (si la dieta no lo proporciona):\n- Vitamina D\n- Magnesio\n- Cafeína pre-entrenamiento\n\n💡 **Consejo Vital**: ¡Los suplementos solo funcionan con dieta y entrenamiento al día! Prioriza comida real primero.\n\n🚫 **Evita**: Quemadores de grasa sin orientación, "fórmulas milagrosas", exceso de cafeína.`;
    }
    return isPT
      ? `Suplementos: complementos, não substitutos! 💊\n\n✅ **Essenciais** (comprovados cientificamente):\n1. **Whey Protein** - Pós-treino (30g)\n2. **Creatina** - 5g/dia (qualquer horário)\n3. **Multivitamínico** - 1x ao dia\n4. **Ômega 3** - 2-3g/dia\n\n⚠️ **Opcional** (se dieta não suprir):\n- Vitamina D\n- Magnésio\n- Cafeína pré-treino\n\n💡 **Dica Vital**: Suplemento só funciona com dieta e treino em dia! Priorize comida de verdade primeiro.\n\n🚫 **Evite**: Termogênicos sem orientação, "fórmulas milagrosas", excesso de cafeína.`
      : `Supplements: complements, not substitutes! 💊\n\n✅ **Essentials** (scientifically proven):\n1. **Whey Protein** - Post-workout (30g)\n2. **Creatine** - 5g/day (any time)\n3. **Multivitamin** - 1x daily\n4. **Omega 3** - 2-3g/day\n\n⚠️ **Optional** (if diet doesn't provide):\n- Vitamin D\n- Magnesium\n- Pre-workout caffeine\n\n💡 **Vital Tip**: Supplements only work with diet and training on point! Prioritize real food first.\n\n🚫 **Avoid**: Fat burners without guidance, "miracle formulas", excess caffeine.`;
  }

  // MOTIVAÇÃO
  if (keywords.motivacao.some(k => queryLower.includes(k))) {
    if (isES) {
      return `${profile.name}, ¡eres más fuerte de lo que piensas! 💪🔥\n\n✨ **Recuerda**:\n- Cada entrenamiento es una inversión en ti\n- Progresso > Perfección\n- La consistencia vence al talento\n- ¡Ya comenzaste, eso es el 50% del camino!\n\n🎯 **Consejos para mantener la motivación**:\n1. Toma fotos de progreso (1x por mes)\n2. Celebra pequeñas victorias\n3. Encuentra un compañero de entrenamiento\n4. Varía los ejercicios\n5. Recuerda tu "por qué"\n\n💡 **Frase del día**: "El dolor que sientes hoy será la fuerza que sentirás mañana."\n\n🚀 ¡Tú puedes! ¡Estoy aquí para apoyarte!`;
    }
    return isPT
      ? `${profile.name}, você é mais forte do que pensa! 💪🔥\n\n✨ **Lembre-se**:\n- Cada treino é um investimento em você\n- Progresso > Perfeição\n- Consistência vence talento\n- Você já começou, isso é 50% do caminho!\n\n🎯 **Dicas para manter a motivação**:\n1. Tire fotos de progresso (1x por mês)\n2. Celebre pequenas vitórias\n3. Encontre um parceiro de treino\n4. Varie os exercícios\n5. Lembre-se do seu "porquê"\n\n💡 **Frase do dia**: "A dor que você sente hoje será a força que você sentirá amanhã."\n\n🚀 Você consegue! Estou aqui para te apoiar!`
      : `${profile.name}, you're stronger than you think! 💪🔥\n\n✨ **Remember**:\n- Every workout is an investment in yourself\n- Progress > Perfection\n- Consistency beats talent\n- You've already started, that's 50% of the way!\n\n🎯 **Tips to stay motivated**:\n1. Take progress photos (1x per month)\n2. Celebrate small wins\n3. Find a workout partner\n4. Vary exercises\n5. Remember your "why"\n\n💡 **Quote of the day**: "The pain you feel today will be the strength you feel tomorrow."\n\n🚀 You got this! I'm here to support you!`;
  }

  // SAÚDE / VITALIDADE
  if (keywords.saude.some(k => queryLower.includes(k))) {
    if (isES) {
      return `¡Salud y Longevidad! ❤️ Es el pilar de MyFitRout.\n\n📈 **Marcadores Importantes**:\n- **Presión Arterial**: Idealmente 12/8\n- **Frecuencia en Reposo**: 60-80 bpm\n- **Colesterol/Glucosa**: Mantén tus exámenes al día\n\n💡 **Consejo Vital**: El entrenamiento de fuerza es el mejor "remedio" contra el envejecimiento. Mejora la densidad ósea y la sensibilidad a la insulina.\n\n🍏 **Hábito PRO**: ¡Prioriza alimentos anti-inflamatorios y evita el azúcar procesado!`;
    }
    return isPT
      ? `Saúde e Longevidade! ❤️ É o pilar da MyFitRout.\n\n📈 **Marcadores Importantes**:\n- **Pressão Arterial**: Idealmente 12/8\n- **Frequência em Repouso**: 60-80 bpm\n- **Colesterol/Glicose**: Mantenha seus exames em dia\n\n💡 **Dica Vital**: O treino de força é o melhor "remédio" contra o envelhecimento. Melhora a densidade óssea e a sensibilidade à insulina.\n\n🍏 **Hábito PRO**: Priorize alimentos anti-inflamatórios e evite açúcar processado!`
      : `Health and Longevity! ❤️ It's the core of MyFitRout.\n\n📈 **Important Markers**:\n- **Blood Pressure**: Ideally 12/8\n- **Resting Heart Rate**: 60-80 bpm\n- **Cholesterol/Glucose**: Keep your tests up to date\n\n💡 **Vital Tip**: Strength training is the best "medicine" against aging. It improves bone density and insulin sensitivity.\n\n🍏 **PRO Habit**: Prioritize anti-inflammatory foods and avoid processed sugar!`;
  }

  // TREINO EM CASA
  if (keywords.casa.some(k => queryLower.includes(k))) {
    if (isES) {
      return `¡Entrenar en casa es libertad! 🏠💪\n\n🚀 **Circuito Bodyweight**:\n1. **Sentadillas**: 3x15\n2. **Flexiones**: 3x máximo\n3. **Zancadas**: 3x12 por pierna\n4. **Plancha**: 3x45 segundos\n\n💡 **Consejo Vital**: Usa el tiempo bajo tensión. Baja muy lento (4 segundos) para que el ejercicio sea más difícil sin necesitar pesos.\n\n📦 **Equipamiento**: ¡Una mochila con libros o botellas de agua pueden ser tus pesas!`;
    }
    return isPT
      ? `Treinar em casa é liberdade! 🏠💪\n\n🚀 **Circuito Bodyweight**:\n1. **Agachamento**: 3x15\n2. **Flexão de braço**: 3x máximo\n3. **Afundo**: 3x12 cada perna\n4. **Prancha**: 3x45 segundos\n\n💡 **Dica Vital**: Use o tempo sob tensão. Desça bem devagar (4 segundos) para tornar o exercício difícil sem precisar de pesos.\n\n📦 **Equipamento**: Uma mochila com livros ou garrafas de água podem ser seus halteres!`
      : `Training at home is freedom! 🏠💪\n\n🚀 **Bodyweight Circuit**:\n1. **Squats**: 3x15\n2. **Pushups**: 3x max\n3. **Lunges**: 3x12 each leg\n4. **Plank**: 3x45 seconds\n\n💡 **Vital Tip**: Use time under tension. Go down very slowly (4 seconds) to make the exercise harder without needing weights.\n\n📦 **Equipment**: A backpack with books or water bottles can be your weights!`;
  }

  // Resposta genérica inteligente
  if (isES) {
    return `¡Hola, ${profile.name}! 👋\n\nEstoy aquí para ayudarte con:\n\n💪 **Entrenamientos personalizados**\n   • Pecho, espalda, piernas, brazos, hombros\n   • Principiante, intermedio o avanzado\n\n🥗 **Orientación nutricional**\n   • Dieta para hipertrofia o pérdida de peso\n   • Suplementación\n\n🧘 **Recuperación y bienestar**\n   • Estiramiento, descanso\n   • Prevención de lesiones\n\n📊 **Análisis de progreso**\n   • Motivación y consejos\n\n💬 **Pregúntame sobre**: entrenamiento de pecho, dieta, cardio, suplementos, dolor, motivación...\n\n¿Qué te gustaría saber hoy?`;
  }
  return isPT
    ? `Olá, ${profile.name}! 👋\n\nEstou aqui para te ajudar com:\n\n💪 **Treinos personalizados**\n   • Peito, costas, pernas, braços, ombros\n   • Iniciante, intermediário ou avançado\n\n🥗 **Orientação nutricional**\n   • Dieta para hipertrofia ou emagrecimento\n   • Suplementação\n\n🧘 **Recuperação e bem-estar**\n   • Alongamento, descanso\n   • Prevenção de lesões\n\n📊 **Análise de progresso**\n   • Motivação e dicas\n\n💬 **Pergunte-me sobre**: treino de peito, dieta, cardio, suplementos, dor, motivação...\n\nO que você gostaria de saber hoje?`
    : `Hello, ${profile.name}! 👋\n\nI'm here to help you with:\n\n💪 **Personalized workouts**\n   • Chest, back, legs, arms, shoulders\n   • Beginner, intermediate or advanced\n\n🥗 **Nutrition guidance**\n   • Diet for hypertrophy or weight loss\n   • Supplementation\n\n🧘 **Recovery and wellness**\n   • Stretching, rest\n   • Injury prevention\n\n📊 **Progress analysis**\n   • Motivation and tips\n\n💬 **Ask me about**: chest workout, diet, cardio, supplements, pain, motivation...\n\nWhat would you like to know today?`;
};

// ============================================
// WORKOUT SUGGESTIONS
// ============================================

export const getWorkoutSuggestion = async (
  profile: UserProfile,
  workoutHistory: any[],
  language: Language
): Promise<string> => {
  await simulateDelay();

  const isPT = language === Language.PT;
  const isES = language === Language.ES;
  const daysSinceLastWorkout = workoutHistory.length > 0
    ? Math.floor((Date.now() - new Date(workoutHistory[0].completed_at).getTime()) / (1000 * 60 * 60 * 24))
    : 7;

  if (daysSinceLastWorkout > 3) {
    if (isES) {
      return `¡Hora de volver a entrenar! 💪 Recomiendo comenzar con un **entrenamiento Full Body ligero** para reactivar el cuerpo. Foco en movimientos compuestos y técnica.`;
    }
    return isPT
      ? `Hora de voltar aos treinos! 💪 Recomendo começar com um **treino Full Body leve** para reativar o corpo. Foco em movimentos compostos e técnica.`
      : `Time to get back to training! 💪 I recommend starting with a **light Full Body workout** to reactivate your body. Focus on compound movements and technique.`;
  }

  if (isES) {
    const suggestions = [
      "¡Entrenamiento de **Upper Body** hoy! Enfócate en pecho, espalda y hombros. 3-4 ejercicios por grupo muscular.",
      "¡Día de **Piernas y Glúteos**! Sentadilla, zancadas y peso muerto son esenciales. ¡No te saltes el día de pierna! 🦵",
      "**Full Body Recovery**: Entrenamiento ligero con foco en movilidad y estiramiento. ¡Tu cuerpo te lo agradecerá!",
      "Entrenamiento de **Fuerza**: Cargas más altas, menos repeticiones (4-6 reps). Descansa bien entre series."
    ];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }

  const suggestions = isPT
    ? [
      "Treino de **Upper Body** hoje! Foque em peito, costas e ombros. 3-4 exercícios por grupo muscular.",
      "Dia de **Pernas e Glúteos**! Agachamento, afundo e stiff são essenciais. Não pule o leg day! 🦵",
      "**Full Body Recovery**: Treino leve com foco em mobilidade e alongamento. Seu corpo agradece!",
      "Treino de **Força**: Cargas mais altas, menos repetições (4-6 reps). Descanse bem entre séries."
    ]
    : [
      "**Upper Body** workout today! Focus on chest, back, and shoulders. 3-4 exercises per muscle group.",
      "**Legs and Glutes** day! Squats, lunges, and stiff-leg deadlifts are essential. Don't skip leg day! 🦵",
      "**Full Body Recovery**: Light workout focusing on mobility and stretching. Your body will thank you!",
      "**Strength Training**: Higher loads, fewer reps (4-6 reps). Rest well between sets."
    ];

  return suggestions[Math.floor(Math.random() * suggestions.length)];
};

// ============================================
// FORM TIPS & SAFETY
// ============================================

export const getExerciseFormTips = async (
  exerciseName: string,
  userLevel: string,
  language: Language
): Promise<string> => {
  await simulateDelay();

  const isPT = language === Language.PT;
  const isES = language === Language.ES;

  if (isES) {
    return `📋 **Consejos para ${exerciseName}**:\n\n✅ Mantén la columna neutral\n✅ Controla el movimiento (2s bajada, 1s subida)\n✅ Respira: exhala en el esfuerzo, inhala en la relajación\n\n⚠️ Evita: Movimientos bruscos y compensaciones con otros músculos.`;
  }

  return isPT
    ? `📋 **Dicas para ${exerciseName}**:\n\n✅ Mantenha a coluna neutra\n✅ Controle o movimento (2s descida, 1s subida)\n✅ Respire: expire no esforço, inspire no relaxamento\n\n⚠️ Evite: Movimentos bruscos e compensações com outros músculos.`
    : `📋 **Tips for ${exerciseName}**:\n\n✅ Keep spine neutral\n✅ Control the movement (2s down, 1s up)\n✅ Breathe: exhale on effort, inhale on relaxation\n\n⚠️ Avoid: Jerky movements and compensations with other muscles.`;
};

// ============================================
// RECOVERY ADVICE
// ============================================

export const getRecoveryAdvice = async (
  profile: UserProfile,
  workoutIntensity: 'light' | 'moderate' | 'intense',
  language: Language
): Promise<string> => {
  await simulateDelay();

  const isPT = language === Language.PT;
  const isES = language === Language.ES;

  if (workoutIntensity === 'intense') {
    if (isES) {
      return `🔥 ¡Entrenamiento intenso! La recuperación es esencial:\n\n😴 **Sueño**: 7-9h por noche\n🥩 **Proteína**: ${Math.round(profile.weight * 2)}g hoy\n💧 **Hidratación**: ${Math.round(profile.weight * 40)}ml\n🧘 **Estiramiento**: 10-15min antes de dormir\n\n💡 Considera un día de descanso activo mañana.`;
    }
    return isPT
      ? `🔥 Treino intenso! Recuperação é essencial:\n\n😴 **Sono**: 7-9h por noite\n🥩 **Proteína**: ${Math.round(profile.weight * 2)}g hoje\n💧 **Hidratação**: ${Math.round(profile.weight * 40)}ml\n🧘 **Alongamento**: 10-15min antes de dormir\n\n💡 Considere um dia de descanso ativo amanhã.`
      : `🔥 Intense workout! Recovery is essential:\n\n😴 **Sleep**: 7-9h per night\n🥩 **Protein**: ${Math.round(profile.weight * 2)}g today\n💧 **Hydration**: ${Math.round(profile.weight * 40)}ml\n🧘 **Stretching**: 10-15min before bed\n\n💡 Consider an active rest day tomorrow.`;
  }

  if (isES) {
    return `✅ Buena recuperación:\n\n💧 Hidrátate bien\n🥗 Comida balanceada en hasta 2h\n🧘 Estiramiento ligero (5-10min)\n\n¡Tu cuerpo se está adaptando! 💪`;
  }

  return isPT
    ? `✅ Boa recuperação:\n\n💧 Hidrate-se bem\n🥗 Refeição balanceada em até 2h\n🧘 Alongamento leve (5-10min)\n\nSeu corpo está se adaptando! 💪`
    : `✅ Good recovery:\n\n💧 Hydrate well\n🥗 Balanced meal within 2h\n🧘 Light stretching (5-10min)\n\nYour body is adapting! 💪`;
};

// ============================================
// NUTRITION SUGGESTIONS
// ============================================

export const getNutritionAdvice = async (
  profile: UserProfile,
  goalContext: 'pre-workout' | 'post-workout' | 'daily',
  language: Language
): Promise<string> => {
  await simulateDelay();

  const isPT = language === Language.PT;
  const isES = language === Language.ES;

  if (goalContext === 'pre-workout') {
    if (isES) {
      return `⚡ **Pre-entrenamiento** (30-60min antes):\n\n🍌 Banana + avena\n🍞 Pan integral + mantequilla de maní\n☕ Café (opcional, para energía)\n\n💡 ¡Evita alimentos pesados!`;
    }
    return isPT
      ? `⚡ **Pré-treino** (30-60min antes):\n\n🍌 Banana + aveia\n🍞 Pão integral + pasta de amendoim\n☕ Café (opcional, para energia)\n\n💡 Evite alimentos pesados!`
      : `⚡ **Pre-workout** (30-60min before):\n\n🍌 Banana + oats\n🍞 Whole grain bread + peanut butter\n☕ Coffee (optional, for energy)\n\n💡 Avoid heavy foods!`;
  }

  if (goalContext === 'post-workout') {
    if (isES) {
      return `🥩 **Post-entrenamiento** (hasta 2h después):\n\n🍗 Pollo/pescado + batata\n🥚 Huevos + arroz integral\n🥤 Batido de proteína + fruta\n\n💡 Ventana anabólica: ¡proteína + carbohidrato!`;
    }
    return isPT
      ? `🥩 **Pós-treino** (até 2h depois):\n\n🍗 Frango/peixe + batata doce\n🥚 Ovos + arroz integral\n🥤 Shake de proteína + fruta\n\n💡 Janela anabólica: proteína + carboidrato!`
      : `🥩 **Post-workout** (within 2h):\n\n🍗 Chicken/fish + sweet potato\n🥚 Eggs + brown rice\n🥤 Protein shake + fruit\n\n💡 Anabolic window: protein + carbs!`;
  }

  if (isES) {
    const calorias = Math.round(profile.weight * 33);
    return `📊 **Nutrición Diaria**:\n\n🎯 ${calorias}kcal/día\n🥩 ${Math.round(profile.weight * 2)}g proteína\n🍚 ${Math.round(profile.weight * 3)}g carbohidratos\n🥑 ${Math.round(profile.weight * 0.8)}g grasas\n\n💡 ¡Distribuye en 4-5 comidas!`;
  }

  const calorias = Math.round(profile.weight * 33);
  return isPT
    ? `📊 **Nutrição Diária**:\n\n🎯 ${calorias}kcal/dia\n🥩 ${Math.round(profile.weight * 2)}g proteína\n🍚 ${Math.round(profile.weight * 3)}g carboidratos\n🥑 ${Math.round(profile.weight * 0.8)}g gorduras\n\n💡 Distribua em 4-5 refeições!`
    : `📊 **Daily Nutrition**:\n\n🎯 ${calorias}kcal/day\n🥩 ${Math.round(profile.weight * 2)}g protein\n🍚 ${Math.round(profile.weight * 3)}g carbs\n🥑 ${Math.round(profile.weight * 0.8)}g fats\n\n💡 Distribute across 4-5 meals!`;
};

// ============================================
// PROGRESS ANALYSIS
// ============================================

export const analyzeProgress = async (
  profile: UserProfile,
  stats: {
    totalWorkouts: number;
    currentStreak: number;
    totalWeightLifted: number;
  },
  language: Language
): Promise<string> => {
  await simulateDelay();

  const isPT = language === Language.PT;
  const isES = language === Language.ES;

  if (stats.currentStreak >= 7) {
    if (isES) {
      return `🔥 **¡INCREÍBLE!** ¡${stats.currentStreak} días de constancia!\n\n📈 ${stats.totalWorkouts} entrenamientos completados\n💪 ${stats.totalWeightLifted}kg levantados\n\n✨ ¡Estás en el camino correcto! Sigue así y los resultados vendrán. Próximo paso: aumentar la intensidad gradualmente.`;
    }
    return isPT
      ? `🔥 **INCRÍVEL!** ${stats.currentStreak} dias de consistência!\n\n📈 ${stats.totalWorkouts} treinos completos\n💪 ${stats.totalWeightLifted}kg levantados\n\n✨ Você está no caminho certo! Continue assim e os resultados virão. Próximo passo: aumentar a intensidade gradualmente.`
      : `🔥 **AMAZING!** ${stats.currentStreak} days of consistency!\n\n📈 ${stats.totalWorkouts} workouts completed\n💪 ${stats.totalWeightLifted}kg lifted\n\n✨ You're on the right track! Keep it up and results will come. Next step: gradually increase intensity.`;
  }

  if (isES) {
    return `💪 ¡Progreso sólido!\n\n📊 ${stats.totalWorkouts} entrenamientos realizados\n🎯 Racha actual: ${stats.currentStreak} días\n\n🚀 **Próximos pasos**:\n1. Mantén la constancia\n2. Aumenta cargas progresivamente\n3. Registra tus entrenamientos\n\n¡Estás evolucionando! 💯`;
  }

  return isPT
    ? `💪 Progresso sólido!\n\n📊 ${stats.totalWorkouts} treinos realizados\n🎯 Sequência atual: ${stats.currentStreak} dias\n\n🚀 **Próximos passos**:\n1. Mantenha a consistência\n2. Aumente cargas progressivamente\n3. Registre seus treinos\n\nVocê está evoluindo! 💯`
    : `💪 Solid progress!\n\n📊 ${stats.totalWorkouts} workouts completed\n🎯 Current streak: ${stats.currentStreak} days\n\n🚀 **Next steps**:\n1. Maintain consistency\n2. Progressively increase loads\n3. Log your workouts\n\nYou're evolving! 💯`;
};
