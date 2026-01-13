
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dumbbell, User, Settings, Calendar, MessageSquare, Info, CheckCircle2, ChevronRight,
  Globe, Flame, Activity, Award, Scale, Ruler, Target, Trophy, Clock, RotateCcw,
  Zap, Coffee, Star, Users, Play, CreditCard, ShieldCheck, ChevronLeft, Send, Save, X,
  LayoutList, Plus, Trash2, AlertTriangle, BookOpen, Check, Timer, Moon, Sun
} from 'lucide-react';
import { 
  Language, ExperienceLevel, UserProfile, WorkoutDay, WorkoutFocus, FitnessGoal, 
  WorkoutPreference, MembershipType, Exercise, DayPlan, Theme 
} from './types';
import { translations } from './translations';
import { getAIFeedback } from './services/gemini';

const DAYS_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

// Significantly Expanded Localized Exercise Catalog
const EXERCISE_CATALOG: Record<string, any[]> = {
  CHEST: [
    {
      [Language.PT]: { id: "ch1", name: "Supino Reto", description: "Foco na porção média do peitoral.", executionTips: ["Controle a descida", "Escápulas retraídas"] },
      [Language.EN]: { id: "ch1", name: "Flat Bench Press", description: "Focus on the middle pectoral region.", executionTips: ["Control the descent", "Retract scapula"] },
      [Language.ES]: { id: "ch1", name: "Press de Banca Plano", description: "Foco en la porción media del pectoral.", executionTips: ["Controla el descenso", "Escápulas retraídas"] },
      common: { videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg", muscleGroup: "CHEST", sets: 4, reps: "10", tags: ["STRENGTH"] }
    },
    {
      [Language.PT]: { id: "ch2", name: "Supino Inclinado", description: "Foco na porção superior (clavicular).", executionTips: ["Cotovelos a 45 graus", "Barra no peito superior"] },
      [Language.EN]: { id: "ch2", name: "Incline Bench Press", description: "Focus on upper (clavicular) portion.", executionTips: ["Elbows at 45 degrees", "Bar to upper chest"] },
      [Language.ES]: { id: "ch2", name: "Press Inclinado", description: "Foco en la porción superior (clavicular).", executionTips: ["Codos a 45 grados", "Barra al pecho superior"] },
      common: { videoUrl: "https://www.youtube.com/embed/8iPEnn-ltC8", muscleGroup: "CHEST", sets: 3, reps: "12", tags: ["UPPER"] }
    },
    {
      [Language.PT]: { id: "ch3", name: "Dips (Paralelas)", description: "Foco na porção inferior do peitoral.", executionTips: ["Tronco inclinado para frente", "Amplitude total"] },
      [Language.EN]: { id: "ch3", name: "Chest Dips", description: "Focus on lower pectoral portion.", executionTips: ["Leaning torso forward", "Full range of motion"] },
      [Language.ES]: { id: "ch3", name: "Fondos de Pecho", description: "Foco en la porción inferior del pectoral.", executionTips: ["Tronco inclinado hacia adelante", "Amplitud total"] },
      common: { videoUrl: "https://www.youtube.com/embed/2z8JmcrW-As", muscleGroup: "CHEST", sets: 3, reps: "10", tags: ["LOWER"] }
    },
    {
      [Language.PT]: { id: "ch4", name: "Crucifixo Reto", description: "Isolamento e alongamento das fibras radiais.", executionTips: ["Leve flexão nos cotovelos", "Sinta o alongamento"] },
      [Language.EN]: { id: "ch4", name: "Chest Flyes", description: "Isolation and stretching of fibers.", executionTips: ["Slight elbow bend", "Feel the stretch"] },
      [Language.ES]: { id: "ch4", name: "Aperturas de Pecho", description: "Aislamiento y estiramiento de fibras.", executionTips: ["Ligera flexión de codos", "Siente el estiramiento"] },
      common: { videoUrl: "https://www.youtube.com/embed/eozdVDA78K0", muscleGroup: "CHEST", sets: 3, reps: "15", tags: ["ISOLATION"] }
    },
    {
      [Language.PT]: { id: "ch5", name: "Crossover Polia Alta", description: "Foco no miolo e porção inferior.", executionTips: ["Cruze as mãos no final", "Contração máxima"] },
      [Language.EN]: { id: "ch5", name: "High Cable Crossover", description: "Focus on inner and lower chest.", executionTips: ["Cross hands at bottom", "Maximum contraction"] },
      [Language.ES]: { id: "ch5", name: "Crossover Polea Alta", description: "Foco en la parte interna e inferior.", executionTips: ["Cruza las manos al final", "Contracción máxima"] },
      common: { videoUrl: "https://www.youtube.com/embed/taI4XduLpTk", muscleGroup: "CHEST", sets: 3, reps: "15", tags: ["DEFINITION"] }
    },
    {
      [Language.PT]: { id: "ch6", name: "Flexão de Braços", description: "Trabalho funcional e estabilidade.", executionTips: ["Core ativado", "Corpo em linha reta"] },
      [Language.EN]: { id: "ch6", name: "Push Ups", description: "Functional work and stability.", executionTips: ["Engaged core", "Straight body line"] },
      [Language.ES]: { id: "ch6", name: "Flexiones de Brazo", description: "Trabajo funcional y estabilidad.", executionTips: ["Core activado", "Cuerpo en línea recta"] },
      common: { videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4", muscleGroup: "CHEST", sets: 3, reps: "MAX", tags: ["BODYWEIGHT"] }
    }
  ],
  BACK: [
    {
      [Language.PT]: { id: "bk1", name: "Puxada Alta", description: "Foco na largura das costas (Latissimus).", executionTips: ["Puxe com os cotovelos", "Não balance o corpo"] },
      [Language.EN]: { id: "bk1", name: "Lat Pulldown", description: "Focus on back width (Lats).", executionTips: ["Pull with elbows", "Avoid rocking"] },
      [Language.ES]: { id: "bk1", name: "Jalón al Pecho", description: "Foco en la anchura de la espalda.", executionTips: ["Tira con los codos", "No balancees el cuerpo"] },
      common: { videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc", muscleGroup: "BACK", sets: 4, reps: "12", tags: ["WIDTH"] }
    },
    {
      [Language.PT]: { id: "bk2", name: "Remada Curvada", description: "Foco na espessura total das costas.", executionTips: ["Costas paralelas ao chão", "Puxe em direção ao umbigo"] },
      [Language.EN]: { id: "bk2", name: "Bent Over Row", description: "Focus on total back thickness.", executionTips: ["Back parallel to floor", "Pull to navel"] },
      [Language.ES]: { id: "bk2", name: "Remo inclinado", description: "Foco en el grosor total de la espalda.", executionTips: ["Espalda paralela al suelo", "Tira hacia el ombligo"] },
      common: { videoUrl: "https://www.youtube.com/embed/6KA-L6uXQp4", muscleGroup: "BACK", sets: 4, reps: "10", tags: ["THICKNESS"] }
    },
    {
      [Language.PT]: { id: "bk3", name: "Remada Baixa", description: "Foco no miolo das costas e trapézio médio.", executionTips: ["Peito estufado", "Escápulas fechadas no final"] },
      [Language.EN]: { id: "bk3", name: "Seated Row", description: "Focus on mid-back and rhomboids.", executionTips: ["Chest out", "Squeeze shoulder blades"] },
      [Language.ES]: { id: "bk3", name: "Remo Sentado", description: "Foco en la parte media de la espalda.", executionTips: ["Pecho fuera", "Cierra escápulas al final"] },
      common: { videoUrl: "https://www.youtube.com/embed/GZbfZ033f74", muscleGroup: "BACK", sets: 3, reps: "12", tags: ["MIDBACK"] }
    },
    {
      [Language.PT]: { id: "bk4", name: "Pull Down", description: "Isolamento de grande dorsal.", executionTips: ["Braços quase retos", "Puxe até a coxa"] },
      [Language.EN]: { id: "bk4", name: "Straight Arm Pulldown", description: "Isolation of latissimus dorsi.", executionTips: ["Arms nearly straight", "Pull to thighs"] },
      [Language.ES]: { id: "bk4", name: "Pull Down con Brazos Rectos", description: "Aislamiento de dorsal ancho.", executionTips: ["Brazos casi rectos", "Tira hasta el muslo"] },
      common: { videoUrl: "https://www.youtube.com/embed/6KA-L6uXQp4", muscleGroup: "BACK", sets: 3, reps: "15", tags: ["ISOLATION"] }
    },
    {
      [Language.PT]: { id: "bk5", name: "Extensão Lombar", description: "Foco na musculatura eretora da espinha.", executionTips: ["Movimento controlado", "Não hiperextenda demais"] },
      [Language.EN]: { id: "bk5", name: "Back Extension", description: "Focus on erector spinae.", executionTips: ["Controlled motion", "Don't overextend"] },
      [Language.ES]: { id: "bk5", name: "Extensión Lumbar", description: "Foco en la musculatura erectora.", executionTips: ["Movimiento controlado", "No hiperextiendas"] },
      common: { videoUrl: "https://www.youtube.com/embed/ph3pddpKzzw", muscleGroup: "BACK", sets: 3, reps: "15", tags: ["LOWERBACK"] }
    },
    {
      [Language.PT]: { id: "bk6", name: "Barra Fixa", description: "Exercício fundamental de força e largura.", executionTips: ["Amplitude total", "Queixo acima da barra"] },
      [Language.EN]: { id: "bk6", name: "Pull Ups", description: "Fundamental strength and width exercise.", executionTips: ["Full range", "Chin over bar"] },
      [Language.ES]: { id: "bk6", name: "Dominadas", description: "Ejercicio fundamental de fuerza.", executionTips: ["Amplitud total", "Barbilla sobre la barra"] },
      common: { videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g", muscleGroup: "BACK", sets: 3, reps: "MAX", tags: ["STRENGTH"] }
    }
  ],
  LEGS: [
    {
      [Language.PT]: { id: "lg1", name: "Agachamento Livre", description: "Foco em quadríceps e glúteos.", executionTips: ["Calcanhares no chão", "Joelhos para fora"] },
      [Language.EN]: { id: "lg1", name: "Barbell Squat", description: "Focus on quads and glutes.", executionTips: ["Heels on floor", "Knees out"] },
      [Language.ES]: { id: "lg1", name: "Sentadilla Libre", description: "Foco en cuádriceps y glúteos.", executionTips: ["Talones en suelo", "Rodillas hacia fuera"] },
      common: { videoUrl: "https://www.youtube.com/embed/m0GcZ24pK6k", muscleGroup: "LEGS", sets: 4, reps: "10", tags: ["COMPOUND"] }
    },
    {
      [Language.PT]: { id: "lg2", name: "Leg Press 45", description: "Foco em quadríceps e força bruta.", executionTips: ["Pés na largura dos ombros", "Não trave os joelhos"] },
      [Language.EN]: { id: "lg2", name: "Leg Press 45", description: "Focus on quads and raw strength.", executionTips: ["Shoulder width feet", "Don't lock knees"] },
      [Language.ES]: { id: "lg2", name: "Prensa 45", description: "Foco en cuádriceps y fuerza.", executionTips: ["Pies ancho hombros", "No bloquees rodillas"] },
      common: { videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ", muscleGroup: "LEGS", sets: 4, reps: "12", tags: ["STRENGTH"] }
    },
    {
      [Language.PT]: { id: "lg3", name: "Cadeira Extensora", description: "Isolamento de quadríceps.", executionTips: ["Ponta do pé para cima", "Contração no topo"] },
      [Language.EN]: { id: "lg3", name: "Leg Extension", description: "Quad isolation.", executionTips: ["Toes up", "Contract at top"] },
      [Language.ES]: { id: "lg3", name: "Extensión de Cuádriceps", description: "Aislamiento de cuádriceps.", executionTips: ["Puntas arriba", "Contracción arriba"] },
      common: { videoUrl: "https://www.youtube.com/embed/YyvSfVjKUH0", muscleGroup: "LEGS", sets: 3, reps: "15", tags: ["ISOLATION"] }
    },
    {
      [Language.PT]: { id: "lg4", name: "Mesa Flexora", description: "Isolamento de posteriores (isquiotibiais).", executionTips: ["Mantenha o quadril colado no banco"] },
      [Language.EN]: { id: "lg4", name: "Lying Leg Curl", description: "Hamstring isolation.", executionTips: ["Keep hips glued to bench"] },
      [Language.ES]: { id: "lg4", name: "Curl de Piernas Tumbado", description: "Aislamiento de isquios.", executionTips: ["Cadera pegada al banco"] },
      common: { videoUrl: "https://www.youtube.com/embed/1Tq3QdIUuHs", muscleGroup: "LEGS", sets: 3, reps: "12", tags: ["HAMSTRINGS"] }
    },
    {
      [Language.PT]: { id: "lg5", name: "Afundo com Halteres", description: "Trabalho unilateral de perna e glúteo.", executionTips: ["Passo longo", "Tronco vertical"] },
      [Language.EN]: { id: "lg5", name: "Dumbbell Lunges", description: "Unilateral leg and glute work.", executionTips: ["Wide step", "Vertical torso"] },
      [Language.ES]: { id: "lg5", name: "Zancadas con Mancuernas", description: "Trabajo unilateral de pierna.", executionTips: ["Paso largo", "Tronco vertical"] },
      common: { videoUrl: "https://www.youtube.com/embed/wrwwXE_6VVg", muscleGroup: "LEGS", sets: 3, reps: "12 cada", tags: ["UNILATERAL"] }
    },
    {
      [Language.PT]: { id: "lg6", name: "Elevação de Panturrilha", description: "Trabalho de gastrocnêmio.", executionTips: ["Amplitude total", "Pausa no topo e embaixo"] },
      [Language.EN]: { id: "lg6", name: "Calf Raises", description: "Gastrocnemius work.", executionTips: ["Full range", "Pause at top/bottom"] },
      [Language.ES]: { id: "lg6", name: "Elevación de Gemelos", description: "Trabajo de gastrocnemio.", executionTips: ["Amplitud total", "Pausa arriba/abajo"] },
      common: { videoUrl: "https://www.youtube.com/embed/vst2f3R624s", muscleGroup: "LEGS", sets: 4, reps: "20", tags: ["CALVES"] }
    }
  ],
  SHOULDERS: [
    {
      [Language.PT]: { id: "sh1", name: "Desenvolvimento Militar", description: "Foco no deltoide anterior e médio.", executionTips: ["Core firme", "Barra sobe em linha reta"] },
      [Language.EN]: { id: "sh1", name: "Military Press", description: "Focus on anterior and lateral delts.", executionTips: ["Tight core", "Straight bar path"] },
      [Language.ES]: { id: "sh1", name: "Press Militar", description: "Foco en deltoide anterior y medio.", executionTips: ["Core firme", "Trayecto de barra recto"] },
      common: { videoUrl: "https://www.youtube.com/embed/B-aVuyhvLHU", muscleGroup: "SHOULDERS", sets: 4, reps: "10", tags: ["STRENGTH"] }
    },
    {
      [Language.PT]: { id: "sh2", name: "Elevação Lateral", description: "Foco no deltoide médio (largura).", executionTips: ["Cotovelos levemente flexionados", "Suba até a altura dos ombros"] },
      [Language.EN]: { id: "sh2", name: "Lateral Raise", description: "Focus on lateral delts (width).", executionTips: ["Slight elbow bend", "Up to shoulder height"] },
      [Language.ES]: { id: "sh2", name: "Elevación Lateral", description: "Foco en deltoide medio (anchura).", executionTips: ["Codos flexionados", "Sube hasta el hombro"] },
      common: { videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo", muscleGroup: "SHOULDERS", sets: 3, reps: "15", tags: ["WIDTH"] }
    },
    {
      [Language.PT]: { id: "sh3", name: "Elevação Frontal", description: "Isolamento de deltoide anterior.", executionTips: ["Sem balançar", "Controle a descida"] },
      [Language.EN]: { id: "sh3", name: "Front Raise", description: "Anterior delt isolation.", executionTips: ["No swinging", "Control descent"] },
      [Language.ES]: { id: "sh3", name: "Elevación Frontal", description: "Aislamiento de deltoide anterior.", executionTips: ["Sin balanceo", "Controla el descenso"] },
      common: { videoUrl: "https://www.youtube.com/embed/hRJ6EB_1-pA", muscleGroup: "SHOULDERS", sets: 3, reps: "12", tags: ["ANTERIOR"] }
    },
    {
      [Language.PT]: { id: "sh4", name: "Crucifixo Inverso", description: "Foco no deltoide posterior.", executionTips: ["Tronco inclinado", "Puxe com as costas do ombro"] },
      [Language.EN]: { id: "sh4", name: "Reverse Flyes", description: "Focus on posterior delts.", executionTips: ["Bent torso", "Pull with rear delts"] },
      [Language.ES]: { id: "sh4", name: "Pájaros", description: "Foco en deltoide posterior.", executionTips: ["Tronco inclinado", "Tira con deltoide trasero"] },
      common: { videoUrl: "https://www.youtube.com/embed/H530fW3KWfk", muscleGroup: "SHOULDERS", sets: 3, reps: "15", tags: ["POSTERIOR"] }
    },
    {
      [Language.PT]: { id: "sh5", name: "Arnold Press", description: "Trabalho completo de deltoides.", executionTips: ["Gire os halteres durante a subida"] },
      [Language.EN]: { id: "sh5", name: "Arnold Press", description: "Complete delt rotation work.", executionTips: ["Rotate dumbbells as you press"] },
      [Language.ES]: { id: "sh5", name: "Press Arnold", description: "Trabajo completo de deltoides.", executionTips: ["Gira las mancuernas al subir"] },
      common: { videoUrl: "https://www.youtube.com/embed/6Z15_WdxSwQ", muscleGroup: "SHOULDERS", sets: 3, reps: "12", tags: ["ROTATION"] }
    },
    {
      [Language.PT]: { id: "sh6", name: "Encolhimento", description: "Trabalho de trapézio superior.", executionTips: ["Eleve os ombros ao máximo", "Pausa no topo"] },
      [Language.EN]: { id: "sh6", name: "Shrugs", description: "Upper traps work.", executionTips: ["Raise shoulders fully", "Pause at top"] },
      [Language.ES]: { id: "sh6", name: "Encogimientos", description: "Trabajo de trapecio.", executionTips: ["Sube los hombros al máximo", "Pausa arriba"] },
      common: { videoUrl: "https://www.youtube.com/embed/g6qbq4i1cl8", muscleGroup: "SHOULDERS", sets: 3, reps: "15", tags: ["TRAPS"] }
    }
  ],
  ARMS: [
    {
      [Language.PT]: { id: "ar1", name: "Rosca Direta", description: "Foco no bíceps braquial (massa).", executionTips: ["Cotovelos fixos ao lado do corpo", "Sem balanço"] },
      [Language.EN]: { id: "ar1", name: "Barbell Curls", description: "Focus on biceps brachii (mass).", executionTips: ["Elbows fixed at sides", "No swinging"] },
      [Language.ES]: { id: "ar1", name: "Curl de Bíceps", description: "Foco en bíceps braquial (masa).", executionTips: ["Codos fijos al lado", "Sin balanceo"] },
      common: { videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo", muscleGroup: "ARMS", sets: 3, reps: "12", tags: ["BICEPS"] }
    },
    {
      [Language.PT]: { id: "ar2", name: "Rosca Martelo", description: "Trabalha o braquiorradial e espessura do braço.", executionTips: ["Pegada neutra (como um martelo)"] },
      [Language.EN]: { id: "ar2", name: "Hammer Curls", description: "Works brachioradialis and arm thickness.", executionTips: ["Neutral grip (like a hammer)"] },
      [Language.ES]: { id: "ar2", name: "Curl Martillo", description: "Trabaja braquiorradial y grosor.", executionTips: ["Agarre neutro (martillo)"] },
      common: { videoUrl: "https://www.youtube.com/embed/zC3nLlEvin4", muscleGroup: "ARMS", sets: 3, reps: "12", tags: ["BICEPS"] }
    },
    {
      [Language.PT]: { id: "ar3", name: "Rosca Concentrada", description: "Isolamento total de bíceps.", executionTips: ["Cotovelo apoiado na coxa", "Contração máxima"] },
      [Language.EN]: { id: "ar3", name: "Concentration Curl", description: "Total bicep isolation.", executionTips: ["Elbow supported on thigh", "Max contraction"] },
      [Language.ES]: { id: "ar3", name: "Curl Concentrado", description: "Aislamiento total de bíceps.", executionTips: ["Codo apoyado en muslo", "Contracción máxima"] },
      common: { videoUrl: "https://www.youtube.com/embed/0AUGkch3tzc", muscleGroup: "ARMS", sets: 3, reps: "12", tags: ["BICEPS"] }
    },
    {
      [Language.PT]: { id: "ar4", name: "Tríceps Pulley Corda", description: "Foco na porção lateral do tríceps.", executionTips: ["Abra a corda no final do movimento"] },
      [Language.EN]: { id: "ar4", name: "Tricep Pushdown Rope", description: "Focus on lateral tricep head.", executionTips: ["Open rope at the bottom"] },
      [Language.ES]: { id: "ar4", name: "Tríceps Polea Cuerda", description: "Foco en la cabeza lateral.", executionTips: ["Abre la cuerda al final"] },
      common: { videoUrl: "https://www.youtube.com/embed/6Fzep104f0s", muscleGroup: "ARMS", sets: 3, reps: "15", tags: ["TRICEPS"] }
    },
    {
      [Language.PT]: { id: "ar5", name: "Tríceps Testa", description: "Trabalho de massa e potência do tríceps.", executionTips: ["Cotovelos fechados", "Desça a barra até a testa"] },
      [Language.EN]: { id: "ar5", name: "Skull Crushers", description: "Mass and power work for triceps.", executionTips: ["Keep elbows in", "Lower bar to forehead"] },
      [Language.ES]: { id: "ar5", name: "Press Francés", description: "Trabajo de masa y potencia.", executionTips: ["Codos cerrados", "Barra a la frente"] },
      common: { videoUrl: "https://www.youtube.com/embed/d_KZx7p6N-Y", muscleGroup: "ARMS", sets: 3, reps: "12", tags: ["TRICEPS"] }
    },
    {
      [Language.PT]: { id: "ar6", name: "Tríceps Coice", description: "Isolamento da cabeça longa do tríceps.", executionTips: ["Braço paralelo ao chão", "Estenda totalmente"] },
      [Language.EN]: { id: "ar6", name: "Tricep Kickbacks", description: "Isolation of the long head.", executionTips: ["Arm parallel to floor", "Extend fully"] },
      [Language.ES]: { id: "ar6", name: "Patada de Tríceps", description: "Aislamiento de cabeza larga.", executionTips: ["Brazo paralelo al suelo", "Extiende total"] },
      common: { videoUrl: "https://www.youtube.com/embed/6SS6K3lAwZ8", muscleGroup: "ARMS", sets: 3, reps: "15", tags: ["TRICEPS"] }
    }
  ],
  GLUTES: [
    {
      [Language.PT]: { id: "gl1", name: "Elevação Pélvica", description: "Foco máximo em glúteo maior.", executionTips: ["Queixo no peito", "Segure 1s no topo"] },
      [Language.EN]: { id: "gl1", name: "Hip Thrust", description: "Maximum focus on gluteus maximus.", executionTips: ["Chin to chest", "Hold 1s at top"] },
      [Language.ES]: { id: "gl1", name: "Empuje de Cadera", description: "Foco máximo en glúteo mayor.", executionTips: ["Barbilla al pecho", "Aguanta 1s arriba"] },
      common: { videoUrl: "https://www.youtube.com/embed/SEdqBc_z_Yw", muscleGroup: "GLUTES", sets: 4, reps: "10", tags: ["POWER"] }
    },
    {
      [Language.PT]: { id: "gl2", name: "Glúteo Coice Cabo", description: "Isolamento e definição.", executionTips: ["Coluna neutra", "Estenda a perna para trás"] },
      [Language.EN]: { id: "gl2", name: "Cable Glute Kickback", description: "Isolation and definition.", executionTips: ["Neutral spine", "Extend leg backward"] },
      [Language.ES]: { id: "gl2", name: "Patada Glúteo Polea", description: "Aislamiento y definición.", executionTips: ["Columna neutra", "Extiende pierna atrás"] },
      common: { videoUrl: "https://www.youtube.com/embed/SJ1Xuz9D-ZQ", muscleGroup: "GLUTES", sets: 3, reps: "15", tags: ["ISOLATION"] }
    },
    {
      [Language.PT]: { id: "gl3", name: "Abdução de Quadril", description: "Foco no glúteo médio (estabilidade).", executionTips: ["Coluna reta", "Afaste as pernas contra resistência"] },
      [Language.EN]: { id: "gl3", name: "Hip Abduction", description: "Focus on gluteus medius (stability).", executionTips: ["Back straight", "Push legs outward"] },
      [Language.ES]: { id: "gl3", name: "Abducción de Cadera", description: "Foco en glúteo medio.", executionTips: ["Espalda recta", "Separa piernas"] },
      common: { videoUrl: "https://www.youtube.com/embed/YyvSfVjKUH0", muscleGroup: "GLUTES", sets: 3, reps: "20", tags: ["STABILITY"] }
    }
  ],
  CORE: [
    {
      [Language.PT]: { id: "cr1", name: "Prancha Abdominal", description: "Estabilidade estática do core.", executionTips: ["Corpo alinhado", "Respire fundo"] },
      [Language.EN]: { id: "cr1", name: "Plank", description: "Static core stability.", executionTips: ["Aligned body", "Breathe deeply"] },
      [Language.ES]: { id: "cr1", name: "Plancha Abdominal", description: "Estabilidad estática.", executionTips: ["Cuerpo alineado", "Respira profundo"] },
      common: { videoUrl: "https://www.youtube.com/embed/ASdvN_XEl_c", muscleGroup: "CORE", sets: 3, reps: "60s", tags: ["STABILITY"] }
    },
    {
      [Language.PT]: { id: "cr2", name: "Abdominal Infra", description: "Foco na porção inferior do abdômen.", executionTips: ["Não encoste os pés no chão", "Lombar colada no chão"] },
      [Language.EN]: { id: "cr2", name: "Leg Raises", description: "Focus on lower abs.", executionTips: ["Don't touch feet to floor", "Low back flat"] },
      [Language.ES]: { id: "cr2", name: "Elevación de Piernas", description: "Foco en abdomen inferior.", executionTips: ["No toques el suelo", "Lumbares pegadas"] },
      common: { videoUrl: "https://www.youtube.com/embed/l4kQd9eWclE", muscleGroup: "CORE", sets: 3, reps: "15", tags: ["ABS"] }
    },
    {
      [Language.PT]: { id: "cr3", name: "Abdominal Supra", description: "Foco na porção superior do reto abdominal.", executionTips: ["Pense em levar o peito ao umbigo"] },
      [Language.EN]: { id: "cr3", name: "Standard Crunch", description: "Focus on upper rectus abdominis.", executionTips: ["Think of bringing chest to navel"] },
      [Language.ES]: { id: "cr3", name: "Crunch Abdominal", description: "Foco en abdomen superior.", executionTips: ["Lleva el pecho al ombligo"] },
      common: { videoUrl: "https://www.youtube.com/embed/Xyd_fa5zoEU", muscleGroup: "CORE", sets: 3, reps: "20", tags: ["ABS"] }
    },
    {
      [Language.PT]: { id: "cr4", name: "Russian Twist", description: "Foco em oblíquos e rotação.", executionTips: ["Gire o tronco totalmente", "Siga com o olhar"] },
      [Language.EN]: { id: "cr4", name: "Russian Twist", description: "Focus on obliques and rotation.", executionTips: ["Rotate torso fully", "Follow with eyes"] },
      [Language.ES]: { id: "cr4", name: "Giro Ruso", description: "Foco en oblicuos y rotación.", executionTips: ["Gira el tronco totalmente", "Sigue con la mirada"] },
      common: { videoUrl: "https://www.youtube.com/embed/wkD8rjkodUI", muscleGroup: "CORE", sets: 3, reps: "20", tags: ["OBLIQUES"] }
    }
  ],
  BALANCE: [
    {
      [Language.PT]: { id: "bl1", name: "Equilíbrio em Uma Perna", description: "Propriocepção e equilíbrio.", executionTips: ["Olhe fixamente para um ponto"] },
      [Language.EN]: { id: "bl1", name: "Single Leg Stance", description: "Proprioception and balance.", executionTips: ["Stare at a fixed point"] },
      [Language.ES]: { id: "bl1", name: "Equilibrio a una pierna", description: "Propiocepción y equilibrio.", executionTips: ["Mira un punto fijo"] },
      common: { videoUrl: "https://www.youtube.com/embed/XmG-wA-W_44", muscleGroup: "BALANCE", sets: 3, reps: "30s", tags: ["BALANCE"] }
    }
  ]
};

const getLocalizedExercise = (id: string, lang: Language): Exercise => {
  for (const group of Object.values(EXERCISE_CATALOG)) {
    const found = group.find(item => item[lang].id === id);
    if (found) {
      return { ...found.common, ...found[lang] } as Exercise;
    }
  }
  return { id: "empty", name: "Exercise", description: "", executionTips: [], muscleGroup: "BODY", sets: 3, reps: "10", videoUrl: "", imageUrl: "" };
};

const getLocalizedLibrary = (lang: Language): Record<string, Exercise[]> => {
  const lib: Record<string, Exercise[]> = {};
  for (const [key, exercises] of Object.entries(EXERCISE_CATALOG)) {
    lib[key] = exercises.map(item => ({ ...item.common, ...item[lang] } as Exercise));
  }
  return lib;
};

// Logic to generate 5-7 exercises per day based on category
const generateWeeklySchedule = (profile: UserProfile, lang: Language): WorkoutDay[] => {
  const t = translations[lang] as any;
  const schedule: WorkoutDay[] = [];
  const currentLib = getLocalizedLibrary(lang);

  DAYS_KEYS.forEach((dayKey) => {
    const dayPlan = profile.customSchedule[dayKey];
    const dayName = t[dayKey] || dayKey;

    if (!dayPlan || dayPlan.type === 'REST') {
      schedule.push({ id: dayKey, dayName, title: t.restDay || "Rest", exercises: [], isRestDay: true });
    } else {
      let dailyExercises: Exercise[] = [];
      if (dayPlan.customExerciseIds && dayPlan.customExerciseIds.length > 0) {
        dailyExercises = dayPlan.customExerciseIds.map(id => getLocalizedExercise(id, lang));
      } else {
        const muscleGroup = dayPlan.type;
        if (muscleGroup === 'FULLBODY') {
          // Full body: 2 from chest, 2 from back, 2 from legs, 1-2 core
          const chest = currentLib['CHEST']?.slice(0, 2) || [];
          const back = currentLib['BACK']?.slice(0, 2) || [];
          const legs = currentLib['LEGS']?.slice(0, 2) || [];
          const core = currentLib['CORE']?.slice(0, 1) || [];
          dailyExercises = [...chest, ...back, ...legs, ...core];
        } else if (muscleGroup === 'CHEST') {
          // Chest day: 4-5 chest + 2-3 shoulders (as requested)
          const chest = currentLib['CHEST']?.slice(0, 5) || [];
          const shoulders = currentLib['SHOULDERS']?.slice(0, 2) || [];
          dailyExercises = [...chest, ...shoulders];
        } else if (muscleGroup === 'LEGS') {
          // Legs day: 5 legs + 1-2 glutes (as requested)
          const legs = currentLib['LEGS']?.slice(0, 5) || [];
          const glutes = currentLib['GLUTES']?.slice(0, 2) || [];
          dailyExercises = [...legs, ...glutes];
        } else if (muscleGroup === 'ARMS') {
          // Arms day: 3 biceps + 3 triceps (as requested)
          const biceps = currentLib['ARMS']?.filter(ex => ex.tags?.includes('BICEPS')).slice(0, 3) || [];
          const triceps = currentLib['ARMS']?.filter(ex => ex.tags?.includes('TRICEPS')).slice(0, 3) || [];
          dailyExercises = [...biceps, ...triceps];
        } else {
          // Default: Up to 7 exercises from specified group
          const pool = currentLib[muscleGroup];
          if (pool) dailyExercises = [...pool].slice(0, 7);
        }
      }
      schedule.push({ id: dayKey, dayName, title: t[dayPlan.type.toLowerCase()] || dayPlan.type, isRestDay: false, exercises: dailyExercises });
    }
  });
  return schedule;
};

const PRESETS: Record<string, Record<string, DayPlan>> = {
  LONGEVITY: { mon: { type: 'FULLBODY' }, tue: { type: 'REST' }, wed: { type: 'BALANCE' }, thu: { type: 'REST' }, fri: { type: 'FULLBODY' }, sat: { type: 'REST' }, sun: { type: 'CORE' } },
  STRENGTH_SPLIT: { mon: { type: 'CHEST' }, tue: { type: 'BACK' }, wed: { type: 'REST' }, thu: { type: 'LEGS' }, fri: { type: 'REST' }, sat: { type: 'ARMS' }, sun: { type: 'REST' } }
};

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('myfitroute_profile');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [lang, setLang] = useState<Language>(profile?.language || Language.PT);
  const [theme, setTheme] = useState<Theme>(profile?.theme || 'dark');
  const [view, setView] = useState<'home' | 'workout' | 'schedule' | 'ai' | 'profile'>('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [isAddingExercise, setIsAddingExercise] = useState<{ day: string } | null>(null);

  const t = translations[lang] as any;

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const schedule = useMemo(() => {
    if (!profile) return [];
    return generateWeeklySchedule(profile, lang);
  }, [profile, lang]);

  const currentDayWorkout = useMemo(() => {
    if (!schedule.length) return null;
    const day = new Date().getDay(); 
    const todayIndex = day === 0 ? 6 : day - 1; 
    return schedule[todayIndex];
  }, [schedule]);

  const activeWorkoutDay = useMemo(() => {
    if (selectedDayId) return schedule.find(d => d.id === selectedDayId) || currentDayWorkout;
    return currentDayWorkout;
  }, [selectedDayId, schedule, currentDayWorkout]);

  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('myfitroute_profile', JSON.stringify(newProfile));
    setIsEditingProfile(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (profile) saveProfile({ ...profile, theme: newTheme });
  };

  const handleReset = () => {
    localStorage.clear();
    setProfile(null);
    setView('home');
    window.location.reload();
  };

  const handleRemoveExercise = (dayId: string, exId: string) => {
    if (!profile) return;
    const newSchedule = { ...profile.customSchedule };
    const dayPlan = newSchedule[dayId];
    let currentIds = dayPlan.customExerciseIds || (EXERCISE_CATALOG[dayPlan.type] || []).map(e => e[Language.EN].id);
    newSchedule[dayId] = { ...dayPlan, customExerciseIds: currentIds.filter(id => id !== exId) };
    saveProfile({ ...profile, customSchedule: newSchedule });
  };

  const handleAddExerciseToDay = (dayId: string, exId: string) => {
    if (!profile) return;
    const newSchedule = { ...profile.customSchedule };
    const dayPlan = newSchedule[dayId];
    let currentIds = dayPlan.customExerciseIds || [];
    if (!currentIds.includes(exId)) {
      newSchedule[dayId] = { ...dayPlan, customExerciseIds: [...currentIds, exId] };
      saveProfile({ ...profile, customSchedule: newSchedule });
    }
    setIsAddingExercise(null);
  };

  const handleAskAI = async () => {
    if (!aiQuery.trim() || !profile) return;
    setIsAiLoading(true);
    const feedback = await getAIFeedback(aiQuery, profile, lang);
    setAiResponse(feedback);
    setIsAiLoading(false);
  };

  if (!profile) {
    return <Onboarding onComplete={saveProfile} lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />;
  }

  const themeClasses = theme === 'dark' ? 'bg-slate-900 text-slate-50' : 'bg-slate-50 text-slate-900';
  const cardClasses = theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';

  return (
    <div className={`min-h-screen ${themeClasses} font-sans pb-24 transition-colors duration-300`}>
      <header className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-b'} px-6 py-4 sticky top-0 z-20 flex items-center justify-between shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md rotate-3">
            <Dumbbell size={24} />
          </div>
          <h1 className="font-extrabold text-xl tracking-tight text-indigo-500 italic">MyFitRoute</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 hover:bg-indigo-500/10 rounded-full transition-colors border shadow-sm">
            {theme === 'light' ? <Moon size={20} className="text-slate-600" /> : <Sun size={20} className="text-amber-400" />}
          </button>
          <button onClick={() => setView('profile')} className="p-2 hover:bg-indigo-500/10 rounded-full transition-colors border shadow-sm">
            <User size={20} className={theme === 'dark' ? "text-slate-300" : "text-slate-600"} />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 md:p-6 space-y-6">
        {view === 'home' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 rounded-3xl p-7 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Flame size={120} />
              </div>
              <span className="text-indigo-100 text-sm font-semibold uppercase tracking-widest">{t.welcome}, {profile.name}</span>
              <h2 className="text-3xl font-black mt-2 leading-tight">{t.dailyWorkout}</h2>
              <div className="mt-6 flex flex-col gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">
                    {currentDayWorkout?.isRestDay ? t.restDay : "Session"}
                  </p>
                  <p className="text-xl font-bold">{currentDayWorkout?.title}</p>
                </div>
                <button 
                  onClick={() => { setSelectedDayId(null); setView('workout'); }}
                  className="w-full bg-white text-indigo-700 py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-indigo-50"
                >
                  <Play fill="currentColor" size={20} />
                  {t.startJourney.toUpperCase()}
                </button>
              </div>
            </section>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setView('schedule')} className={`${cardClasses} p-5 rounded-2xl border shadow-sm flex flex-col items-center text-center hover:bg-indigo-500/5 transition-colors`}>
                <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center mb-3">
                  <LayoutList className="text-indigo-500" size={20} />
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{t.weeklySchedule}</p>
                <p className={`text-sm font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>Full Week</p>
              </button>
              <button onClick={() => setView('profile')} className={`${cardClasses} p-5 rounded-2xl border shadow-sm flex flex-col items-center text-center hover:bg-orange-500/5 transition-colors`}>
                <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center mb-3">
                  <Target className="text-orange-500" size={20} />
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{t.editNeeds}</p>
                <p className={`text-sm font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>Routine</p>
              </button>
            </div>
          </div>
        )}

        {view === 'schedule' && (
          <div className="space-y-6 animate-in slide-in-from-left-4 duration-400">
            <button onClick={() => setView('home')} className={`flex items-center gap-2 font-bold text-sm ${cardClasses} px-4 py-2 rounded-full border shadow-sm`}>
              <ChevronLeft size={18} /> Back
            </button>
            <h2 className="text-2xl font-black text-indigo-500 px-2">{t.weeklySchedule}</h2>
            <div className="grid gap-3">
              {schedule.map(day => (
                <button 
                  key={day.id}
                  onClick={() => { setSelectedDayId(day.id); setView('workout'); }}
                  className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all ${day.isRestDay ? 'opacity-50' : ''} ${cardClasses} hover:border-indigo-500`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center font-black text-xs uppercase text-indigo-500">
                      {day.dayName.slice(0, 3)}
                    </div>
                    <div>
                      <h4 className="font-black tracking-tight">{day.title}</h4>
                      <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                        {day.isRestDay ? t.rest : `${day.exercises.length} Exercises`}
                      </p>
                    </div>
                  </div>
                  {!day.isRestDay && <ChevronRight size={20} className="text-slate-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'workout' && activeWorkoutDay && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-400">
            <div className="flex justify-between items-center">
              <button onClick={() => setView(selectedDayId ? 'schedule' : 'home')} className={`flex items-center gap-2 font-bold text-sm ${cardClasses} px-4 py-2 rounded-full border shadow-sm`}>
                <ChevronLeft size={18} /> Back
              </button>
              {!activeWorkoutDay.isRestDay && (
                <button onClick={() => setIsAddingExercise({ day: activeWorkoutDay.id })} className="bg-indigo-600 text-white px-4 py-2 rounded-full text-xs font-black shadow-lg flex items-center gap-2">
                  <Plus size={16} /> ADD
                </button>
              )}
            </div>
            
            <div className={`${cardClasses} p-6 rounded-3xl border shadow-sm relative overflow-hidden`}>
              <div className="absolute top-0 right-0 bg-indigo-500/10 p-3 rounded-bl-3xl flex items-center gap-1">
                <Timer size={14} className="text-indigo-500" />
                <span className="text-[10px] font-black text-indigo-500">{activeWorkoutDay.exercises.length * 6} min</span>
              </div>
              <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest block mb-1">{activeWorkoutDay.dayName}</span>
              <h2 className="text-2xl font-black">{activeWorkoutDay.title}</h2>
            </div>

            {activeWorkoutDay.exercises.map((ex) => (
              <div key={ex.id} className={`${cardClasses} rounded-3xl border p-5 shadow-sm space-y-4 relative group`}>
                <button onClick={() => handleRemoveExercise(activeWorkoutDay.id, ex.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 p-2 transition-colors z-10">
                  <Trash2 size={20} />
                </button>
                <div className="flex justify-between items-start pr-8">
                  <div className="space-y-1">
                    <h4 className="font-black text-xl leading-tight">{ex.name}</h4>
                    <span className="inline-block text-[10px] bg-indigo-500/10 px-3 py-1 rounded-full text-indigo-500 font-black uppercase tracking-wider">
                      {t[ex.muscleGroup?.toLowerCase()] || ex.muscleGroup}
                    </span>
                  </div>
                  <div className="bg-indigo-600 text-white px-4 py-2 rounded-2xl font-black text-sm shadow-md shrink-0">
                    {ex.sets} × {ex.reps}
                  </div>
                </div>
                <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden relative border-4 border-indigo-500/10">
                  <iframe className="w-full h-full opacity-90 hover:opacity-100 transition-opacity" src={ex.videoUrl} title={ex.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div className={`${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'} rounded-2xl p-4 space-y-3`}>
                  <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.executionPriority}</h5>
                  <p className="text-sm font-medium opacity-80">{ex.description}</p>
                  {ex.executionTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm font-medium opacity-70">
                      <div className="mt-1 w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle2 size={12} className="text-green-500" />
                      </div>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'ai' && (
          <div className="flex flex-col h-[75vh] space-y-4 animate-in slide-in-from-right-4">
            <button onClick={() => setView('home')} className={`flex items-center gap-2 font-bold text-sm ${cardClasses} px-4 py-2 rounded-full border shadow-sm w-fit`}>
              <ChevronLeft size={18} /> Exit
            </button>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              <div className={`${cardClasses} border rounded-2xl p-4 text-sm font-medium italic border-l-4 border-l-indigo-500 shadow-sm opacity-80`}>
                "Hello {profile.name}. I'm localized to your language. Ask me about your routine."
              </div>
              {aiResponse && <div className="bg-indigo-600 text-white p-5 rounded-3xl rounded-tl-none self-start shadow-lg whitespace-pre-wrap leading-relaxed font-medium">{aiResponse}</div>}
              {isAiLoading && <div className="flex items-center gap-2 text-indigo-400 font-black animate-pulse text-sm px-4"><Activity size={16} /> Coach is thinking...</div>}
            </div>
            <div className={`${cardClasses} flex gap-3 p-3 rounded-2xl border shadow-lg`}>
              <input value={aiQuery} onChange={(e) => setAiQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAskAI()} placeholder="Ask Coach..." className="flex-1 bg-transparent px-4 py-2 focus:outline-none font-bold placeholder:text-slate-400" />
              <button onClick={handleAskAI} disabled={isAiLoading || !aiQuery.trim()} className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md active:scale-90 transition-transform"><Send size={22} /></button>
            </div>
          </div>
        )}

        {view === 'profile' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-400">
            <div className="flex justify-between items-center">
               <button onClick={() => setView('home')} className={`flex items-center gap-2 font-bold text-sm ${cardClasses} px-4 py-2 rounded-full border shadow-sm w-fit`}><ChevronLeft size={18} /> Back</button>
               <button onClick={() => setIsEditingProfile(!isEditingProfile)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all border shadow-sm flex items-center gap-2 ${isEditingProfile ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-indigo-600 text-white border-indigo-700'}`}>
                 {isEditingProfile ? <><X size={16}/> Cancel</> : <><Settings size={16}/> {t.editNeeds}</>}
               </button>
            </div>

            {isEditingProfile ? <ProfileEditor profile={profile} onSave={saveProfile} lang={lang} theme={theme} toggleTheme={toggleTheme} /> : (
              <div className="space-y-6">
                <div className={`text-center p-8 ${cardClasses} rounded-3xl border shadow-sm relative overflow-hidden`}>
                  <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
                  <div className="w-24 h-24 bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4 border-4 border-white/10 shadow-xl">
                    <User size={48} className="text-indigo-500" />
                  </div>
                  <h2 className="text-2xl font-black">{profile.name}</h2>
                  <p className="text-indigo-500 font-black uppercase tracking-widest text-[10px] mt-1">{profile.level} ATHLETE • {t[profile.focus?.toLowerCase()] || profile.focus}</p>
                </div>
                
                <div className={`${cardClasses} border rounded-3xl divide-y overflow-hidden shadow-sm`}>
                  <div className="p-5 flex justify-between items-center">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Active Days</span>
                    <div className="flex gap-1 flex-wrap justify-end max-w-[50%]">
                      {(Object.entries(profile.customSchedule) as [string, DayPlan][]).filter(([_, p]) => p.type !== 'REST').map(([d]) => (
                        <span key={d} className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-[10px] font-black uppercase">{d.slice(0,1)}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">{t.selectMembership}</span>
                    <div className="flex items-center gap-2 text-indigo-500 font-black"><ShieldCheck size={16} />{profile.membership}</div>
                  </div>
                </div>

                <button onClick={handleReset} className="w-full bg-red-500/10 text-red-500 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all border border-red-500/20 flex items-center justify-center gap-2"><RotateCcw size={18} />{t.resetProfile}</button>
              </div>
            )}
          </div>
        )}
      </main>

      {isAddingExercise && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end justify-center p-4">
          <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} w-full max-w-md rounded-[40px] p-6 space-y-6 shadow-2xl animate-in slide-in-from-bottom duration-300 border-t border-indigo-500/30`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black">Add Exercise</h3>
                <p className="text-xs opacity-50 font-bold">Selecting for {t[isAddingExercise.day]}</p>
              </div>
              <button onClick={() => setIsAddingExercise(null)} className="p-2 hover:bg-slate-500/10 rounded-full"><X size={24} /></button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {Object.values(getLocalizedLibrary(lang)).flat().map(ex => (
                <button key={ex.id} onClick={() => handleAddExerciseToDay(isAddingExercise.day, ex.id)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border ${theme === 'dark' ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-100 hover:bg-indigo-50'} transition-all text-left group`}>
                   <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Plus size={20} /></div>
                   <div className="flex-1"><p className="font-black">{ex.name}</p><p className="text-[10px] opacity-40 font-black uppercase">{ex.muscleGroup}</p></div>
                   <div className="text-[10px] bg-indigo-500/10 px-2 py-1 rounded font-black text-indigo-500">{ex.tags?.[0]}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav className={`fixed bottom-0 left-0 right-0 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-t'} px-8 py-4 flex justify-between items-center shadow-lg max-w-md mx-auto z-30 rounded-t-[40px]`}>
        {[
          { id: 'home', icon: Flame, label: 'Home' },
          { id: 'schedule', icon: LayoutList, label: 'Plan' },
          { id: 'ai', icon: Activity, label: 'Coach' },
          { id: 'profile', icon: User, label: 'Me' }
        ].map(item => (
          <button key={item.id} onClick={() => setView(item.id as any)} className={`flex flex-col items-center gap-1 transition-all ${view === item.id ? 'text-indigo-500 scale-110' : 'opacity-30'}`}>
            <div className={view === item.id ? 'bg-indigo-500/10 p-2 rounded-2xl' : ''}><item.icon size={24} /></div>
            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

const ProfileEditor: React.FC<{ profile: UserProfile, onSave: (p: UserProfile) => void, lang: Language, theme: Theme, toggleTheme: () => void }> = ({ profile, onSave, lang, theme, toggleTheme }) => {
  const [formData, setFormData] = useState<UserProfile>(() => ({ ...profile }));
  const t = translations[lang] as any;
  const cardClasses = theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const inputClasses = theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-100 text-slate-900';

  const updateDayType = (day: string, type: string) => {
    setFormData({ ...formData, customSchedule: { ...formData.customSchedule, [day]: { type, customExerciseIds: [] } } });
  };

  return (
    <div className={`space-y-6 ${cardClasses} border p-6 rounded-3xl shadow-sm animate-in fade-in duration-300`}>
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">{t.themeMode}</label>
        <button onClick={toggleTheme} className={`p-3 rounded-2xl border ${cardClasses} flex items-center gap-2 font-bold text-sm`}>
          {theme === 'dark' ? <><Moon size={16} /> {t.dark}</> : <><Sun size={16} /> {t.light}</>}
        </button>
      </div>
      <div className="space-y-4">
        <div className="space-y-2"><label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Display Name</label>
        <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={`w-full ${inputClasses} border-2 rounded-2xl p-4 focus:border-indigo-600 outline-none transition-all font-bold shadow-sm`} /></div>
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Weekly Plan</label>
          <div className="space-y-2">
            {DAYS_KEYS.map(dayKey => (
              <div key={dayKey} className="flex gap-2 items-center">
                 <div className={`w-10 h-10 ${inputClasses} rounded-xl flex items-center justify-center font-black text-[10px] uppercase opacity-50 shrink-0`}>{t[dayKey]?.substring(0, 3)}</div>
                 <select value={formData.customSchedule[dayKey]?.type || 'REST'} onChange={(e) => updateDayType(dayKey, e.target.value)} className={`flex-1 ${inputClasses} border-2 rounded-2xl p-3 focus:border-indigo-600 outline-none transition-all font-bold text-xs`}>
                   <option value="REST">{t.restDay}</option><option value="FULLBODY">{t.fullbody}</option><option value="CHEST">{t.chest}</option><option value="BACK">{t.back}</option><option value="LEGS">{t.legs}</option><option value="SHOULDERS">{t.shoulders}</option><option value="ARMS">{t.arms}</option><option value="CORE">{t.core}</option><option value="GLUTES">{t.glutes}</option><option value="BALANCE">{t.balance}</option>
                 </select>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => onSave(formData)} className="w-full bg-indigo-600 text-white py-5 rounded-[25px] font-black text-xl shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95"><Save size={24} /> SAVE</button>
    </div>
  );
};

const Onboarding: React.FC<{ onComplete: (p: UserProfile) => void, lang: Language, setLang: (l: Language) => void, theme: Theme, toggleTheme: () => void }> = ({ onComplete, lang, setLang, theme, toggleTheme }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '', weight: 70, height: 170, level: ExperienceLevel.BEGINNER, focus: WorkoutFocus.QUALITY, goal: FitnessGoal.STRENGTHEN,
    preference: WorkoutPreference.FULLBODY, membership: MembershipType.DIGITAL, language: lang, theme, customSchedule: PRESETS.LONGEVITY,
    sessionDuration: 45, subscriptionActive: true, nextBillingDate: '2025-01-01'
  });
  const t = translations[lang] as any;
  const themeClasses = theme === 'dark' ? 'bg-slate-900 text-slate-50' : 'bg-slate-50 text-slate-900';
  const cardClasses = theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const inputClasses = theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100 text-slate-900';

  if (step === 0) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-8 ${themeClasses} text-center`}>
        <div className="absolute top-8 right-8"><button onClick={toggleTheme} className="p-3 bg-indigo-500/10 rounded-full">{theme === 'dark' ? <Sun className="text-amber-400" /> : <Moon />}</button></div>
        <div className="w-24 h-24 bg-indigo-600 rounded-[30px] flex items-center justify-center text-white mb-10 shadow-2xl rotate-6"><Dumbbell size={48} /></div>
        <h1 className="text-5xl font-black mb-6 tracking-tight leading-none">{t.onboardingTitle}</h1>
        <div className="flex gap-4 mb-12">
          {[Language.PT, Language.EN, Language.ES].map(l => (
            <button key={l} onClick={() => { setLang(l); setFormData(d => ({ ...d, language: l })); }} className={`w-14 h-14 rounded-2xl border-4 flex items-center justify-center font-black transition-all ${lang === l ? 'border-indigo-600 text-indigo-600 bg-indigo-50 shadow-lg' : 'opacity-20'}`}>{l}</button>
          ))}
        </div>
        <button onClick={() => setStep(1)} className="w-full max-w-xs bg-indigo-600 text-white py-5 rounded-[25px] font-black text-xl shadow-xl active:scale-95">START</button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses} p-8 max-w-md mx-auto flex flex-col transition-colors`}>
      <div className="flex-1 space-y-10">
        <header className="space-y-4">
          <div className="h-2 bg-slate-500/10 rounded-full"><div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${(step / 3) * 100}%` }} /></div>
          <h2 className="text-4xl font-black">Profile</h2>
        </header>
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2"><label className="text-xs font-black uppercase opacity-40">Display Name</label>
            <input value={formData.name || ''} placeholder={t.namePlaceholder} className={`w-full ${inputClasses} border-2 rounded-2xl p-5 focus:border-indigo-600 outline-none transition-all font-bold placeholder:opacity-30 shadow-sm`} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><label className="text-xs font-black uppercase opacity-40">Weight (kg)</label>
              <input type="number" value={formData.weight || ''} className={`w-full ${inputClasses} border-2 rounded-2xl p-5 focus:border-indigo-600 outline-none font-bold`} onChange={e => setFormData({ ...formData, weight: Number(e.target.value) })} /></div>
              <div className="space-y-2"><label className="text-xs font-black uppercase opacity-40">Height (cm)</label>
              <input type="number" value={formData.height || ''} className={`w-full ${inputClasses} border-2 rounded-2xl p-5 focus:border-indigo-600 outline-none font-bold`} onChange={e => setFormData({ ...formData, height: Number(e.target.value) })} /></div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6">
            <p className="font-black text-xl">{t.selectLevel}</p>
            <div className="grid grid-cols-1 gap-4">
              {[ExperienceLevel.BEGINNER, ExperienceLevel.INTERMEDIATE, ExperienceLevel.ADVANCED].map(lvl => (
                <button key={lvl} onClick={() => setFormData({ ...formData, level: lvl })} className={`p-6 rounded-3xl border-2 text-left flex justify-between items-center transition-all ${formData.level === lvl ? 'border-indigo-600 bg-indigo-500/10 shadow-md' : 'border-slate-500/10'}`}>
                  <div className="flex flex-col gap-1"><span className="font-black text-lg">{lvl}</span></div>
                  {formData.level === lvl && <CheckCircle2 className="text-indigo-600" size={24} />}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-8 text-center py-6">
             <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4"><ShieldCheck className="text-indigo-600" size={40} /></div>
             <p className="font-black text-2xl">{t.selectMembership}</p>
             <button onClick={() => onComplete(formData as UserProfile)} className="w-full bg-indigo-600 text-white py-5 rounded-[25px] font-black text-xl shadow-xl mt-10 active:scale-95 transition-transform">FINALIZE</button>
          </div>
        )}
      </div>
      {step < 3 && <button onClick={() => setStep(step + 1)} className="bg-indigo-600 text-white py-5 rounded-[25px] font-black text-xl mt-12 shadow-xl active:scale-95">CONTINUE</button>}
    </div>
  );
};

export default App;
