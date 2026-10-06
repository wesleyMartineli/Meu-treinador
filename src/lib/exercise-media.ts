import { MuscleGroup } from '@/types/database';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';

export interface ExerciseMediaData {
  gifUrl: string;
  frames?: [string, string];
  coverImage: string;
  targetAnatomy: string;
}

/**
 * Complete 100% mapped dictionary of animated GIFs, biomechanical keyframe animations, and cover visuals.
 */
export const EXERCISE_MEDIA_MAP: Record<string, ExerciseMediaData> = {
  // ==========================================
  // PEITORAL (CHEST)
  // ==========================================
  'supino-reto-barra': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Barbell_Bench_Press_-_Medium_Grip/0.jpg`,
      `${GITHUB_RAW_BASE}/Barbell_Bench_Press_-_Medium_Grip/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Maior (Fibras Médias) • Tríceps • Deltóide Anterior',
  },
  'supino-inclinado-halteres': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Incline_Dumbbell_Press/0.jpg`,
      `${GITHUB_RAW_BASE}/Incline_Dumbbell_Press/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Superior (Clavicular) • Deltóide Anterior',
  },
  'supino-inclinado-barra': {
    gifUrl: `${GITHUB_RAW_BASE}/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg`,
      `${GITHUB_RAW_BASE}/Barbell_Incline_Bench_Press_-_Medium_Grip/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Superior (Porção Clavicular)',
  },
  'supino-declinado-barra': {
    gifUrl: `${GITHUB_RAW_BASE}/Decline_Barbell_Bench_Press/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Decline_Barbell_Bench_Press/0.jpg`,
      `${GITHUB_RAW_BASE}/Decline_Barbell_Bench_Press/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Inferior (Porção Abdominal)',
  },
  'supino-reto-halteres': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Dumbbell_Bench_Press/0.jpg`,
      `${GITHUB_RAW_BASE}/Dumbbell_Bench_Press/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Médio • Estabilizadores de Ombro',
  },
  'crucifixo-reto-halteres': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Fly.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Dumbbell_Flyes/0.jpg`,
      `${GITHUB_RAW_BASE}/Dumbbell_Flyes/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Maior (Alongamento Tensional)',
  },
  'crucifixo-inclinado-halteres': {
    gifUrl: `${GITHUB_RAW_BASE}/Incline_Dumbbell_Flyes/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Incline_Dumbbell_Flyes/0.jpg`,
      `${GITHUB_RAW_BASE}/Incline_Dumbbell_Flyes/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Superior (Fibras Claviculares)',
  },
  'crucifixo-polia-crossover': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Cable_Crossover/0.jpg`,
      `${GITHUB_RAW_BASE}/Cable_Crossover/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Médio e Esternal (Tensão Contínua)',
  },
  'crossover-polia-alta': {
    gifUrl: `${GITHUB_RAW_BASE}/Cable_Crossover/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Cable_Crossover/0.jpg`,
      `${GITHUB_RAW_BASE}/Cable_Crossover/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Inferior • Corte Escapular',
  },
  'crossover-polia-baixa': {
    gifUrl: `${GITHUB_RAW_BASE}/Low_Cable_Crossover/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Low_Cable_Crossover/0.jpg`,
      `${GITHUB_RAW_BASE}/Low_Cable_Crossover/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Superior e Clavicular',
  },
  'peck-deck-voador': {
    gifUrl: `${GITHUB_RAW_BASE}/Butterfly/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Butterfly/0.jpg`,
      `${GITHUB_RAW_BASE}/Butterfly/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Maior (Isolamento Guiado)',
  },
  'flexao-de-braco-pushup': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Pushups/0.jpg`,
      `${GITHUB_RAW_BASE}/Pushups/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral • Tríceps • Core / Abdômen',
  },
  'paralelas-foco-peito': {
    gifUrl: `${GITHUB_RAW_BASE}/Dips_-_Chest_Version/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Dips_-_Chest_Version/0.jpg`,
      `${GITHUB_RAW_BASE}/Dips_-_Chest_Version/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Inferior • Tríceps • Ombro Anterior',
  },
  'pullover-com-halter': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Pullover.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Straight-Arm_Dumbbell_Pullover/0.jpg`,
      `${GITHUB_RAW_BASE}/Straight-Arm_Dumbbell_Pullover/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Caixa Torácica • Peitoral Maior • Serrátil',
  },
  'spoto-press-supino': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Barbell_Bench_Press_-_Medium_Grip/0.jpg`,
      `${GITHUB_RAW_BASE}/Barbell_Bench_Press_-_Medium_Grip/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Maior (Pausa Isométrica) • Força Explosiva',
  },

  // ==========================================
  // COSTAS & DORSAL (BACK)
  // ==========================================
  'puxada-alta-aberta': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Wide-Grip_Lat_Pulldown/0.jpg`,
      `${GITHUB_RAW_BASE}/Wide-Grip_Lat_Pulldown/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Grande Dorsal • Redondo Maior • Bíceps',
  },
  'puxada-triangulo-fechada': {
    gifUrl: `${GITHUB_RAW_BASE}/Close-Grip_Front_Lat_Pulldown/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Close-Grip_Front_Lat_Pulldown/0.jpg`,
      `${GITHUB_RAW_BASE}/Close-Grip_Front_Lat_Pulldown/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Grande Dorsal (Alongamento Máximo) • Braquial',
  },
  'barra-fixa-pullup': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Pullups/0.jpg`,
      `${GITHUB_RAW_BASE}/Pullups/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Grande Dorsal • Rombóides • Core',
  },
  'barra-fixa-chinup': {
    gifUrl: `${GITHUB_RAW_BASE}/Chin-Up/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Chin-Up/0.jpg`,
      `${GITHUB_RAW_BASE}/Chin-Up/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Grande Dorsal Inferior • Bíceps Braquial',
  },
  'remada-curvada-barra': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Bent_Over_Barbell_Row/0.jpg`,
      `${GITHUB_RAW_BASE}/Bent_Over_Barbell_Row/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Dorsais • Rombóides • Trapézio Médio • Eretores da Espinha',
  },
  'remada-cavalinho-ou-t-bar': {
    gifUrl: `${GITHUB_RAW_BASE}/T-Bar_Row_with_Handle/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/T-Bar_Row_with_Handle/0.jpg`,
      `${GITHUB_RAW_BASE}/T-Bar_Row_with_Handle/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Espessura Dorsal • Meio das Costas',
  },
  'remada-unilateral-serrote': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif',
    frames: [
      `${GITHUB_RAW_BASE}/One-Arm_Dumbbell_Row/0.jpg`,
      `${GITHUB_RAW_BASE}/One-Arm_Dumbbell_Row/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Grande Dorsal Unilateral • Core',
  },
  'remada-baixa-polia': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Seated_Cable_Rows/0.jpg`,
      `${GITHUB_RAW_BASE}/Seated_Cable_Rows/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Trapézio Médio e Inferior • Rombóides',
  },
  'pulldown-corda-polia': {
    gifUrl: `${GITHUB_RAW_BASE}/Rope_Straight-Arm_Pulldown/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Rope_Straight-Arm_Pulldown/0.jpg`,
      `${GITHUB_RAW_BASE}/Rope_Straight-Arm_Pulldown/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Grande Dorsal (Isolamento Escapular)',
  },
  'levantamento-terra-convencional': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Barbell_Deadlift/0.jpg`,
      `${GITHUB_RAW_BASE}/Barbell_Deadlift/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Cadeia Posterior Completa • Glúteos • Costas • Antebraço',
  },
  'terra-sumo-barra': {
    gifUrl: `${GITHUB_RAW_BASE}/Sumo_Deadlift/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Sumo_Deadlift/0.jpg`,
      `${GITHUB_RAW_BASE}/Sumo_Deadlift/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Glúteos • Adutores de Quadril • Cadeia Posterior',
  },
  'encolhimento-com-barra': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shrug.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Barbell_Shrug/0.jpg`,
      `${GITHUB_RAW_BASE}/Barbell_Shrug/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Trapézio Superior',
  },
  'muscle-up-barra': {
    gifUrl: `${GITHUB_RAW_BASE}/Pullups/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Pullups/0.jpg`,
      `${GITHUB_RAW_BASE}/Pullups/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Grande Dorsal • Tríceps • Peitoral • Potência de Puxada',
  },

  // ==========================================
  // QUADRÍCEPS & MEMBROS INFERIORES (QUADS)
  // ==========================================
  'agachamento-livre-barra': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Barbell_Full_Squat/0.jpg`,
      `${GITHUB_RAW_BASE}/Barbell_Full_Squat/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Quadríceps • Glúteo Máximo • Core • Adutores',
  },
  'agachamento-frontal-barra': {
    gifUrl: `${GITHUB_RAW_BASE}/Front_Barbell_Squat/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Front_Barbell_Squat/0.jpg`,
      `${GITHUB_RAW_BASE}/Front_Barbell_Squat/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Quadríceps (Foco Anterior) • Core Abdominal',
  },
  'leg-press-45': {
    gifUrl: `${GITHUB_RAW_BASE}/Leg_Press/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Leg_Press/0.jpg`,
      `${GITHUB_RAW_BASE}/Leg_Press/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Quadríceps • Glúteos',
  },
  'agachamento-hack-machine': {
    gifUrl: `${GITHUB_RAW_BASE}/Barbell_Hack_Squat/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Barbell_Hack_Squat/0.jpg`,
      `${GITHUB_RAW_BASE}/Barbell_Hack_Squat/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Vasto Lateral • Reto Femoral',
  },
  'agachamento-bulgaro-halteres': {
    gifUrl: `${GITHUB_RAW_BASE}/Split_Squat_with_Dumbbells/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Split_Squat_with_Dumbbells/0.jpg`,
      `${GITHUB_RAW_BASE}/Split_Squat_with_Dumbbells/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Glúteo Máximo • Quadríceps Unilateral',
  },
  'cadeira-extensora': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Leg_Extensions/0.jpg`,
      `${GITHUB_RAW_BASE}/Leg_Extensions/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Quadríceps (Pico de Contração)',
  },
  'avanco-passada-halteres': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Dumbbell_Lunges/0.jpg`,
      `${GITHUB_RAW_BASE}/Dumbbell_Lunges/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Quadríceps • Glúteos • Equilíbrio Unilateral',
  },
  'agachamento-goblet': {
    gifUrl: `${GITHUB_RAW_BASE}/Goblet_Squat/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Goblet_Squat/0.jpg`,
      `${GITHUB_RAW_BASE}/Goblet_Squat/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Quadríceps • Mobilidade de Quadril • Core',
  },
  'pin-squat-gaiola': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Barbell_Full_Squat/0.jpg`,
      `${GITHUB_RAW_BASE}/Barbell_Full_Squat/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Quadríceps • Força Concêntrica Pura',
  },
  'pistol-squat-unilateral': {
    gifUrl: `${GITHUB_RAW_BASE}/Bodyweight_Squat/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Bodyweight_Squat/0.jpg`,
      `${GITHUB_RAW_BASE}/Bodyweight_Squat/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Quadríceps Unilateral • Mobilidade de Tornozelo',
  },

  // ==========================================
  // POSTERIOR & GLÚTEOS (HAMSTRINGS & GLUTES)
  // ==========================================
  'stiff-com-barra': {
    gifUrl: `${GITHUB_RAW_BASE}/Romanian_Deadlift_from_Deficit/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Romanian_Deadlift_from_Deficit/0.jpg`,
      `${GITHUB_RAW_BASE}/Romanian_Deadlift_from_Deficit/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Isquiotibiais (Posterior de Coxa) • Glúteos',
  },
  'stiff-com-halteres': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Romanian-Deadlift.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Romanian_Deadlift_With_Dumbbells/0.jpg`,
      `${GITHUB_RAW_BASE}/Romanian_Deadlift_With_Dumbbells/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Isquiotibiais • Glúteo Máximo',
  },
  'mesa-flexora': {
    gifUrl: `${GITHUB_RAW_BASE}/Lying_Leg_Curls/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Lying_Leg_Curls/0.jpg`,
      `${GITHUB_RAW_BASE}/Lying_Leg_Curls/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Bíceps Femoral • Semitendíneo • Semimembranáceo',
  },
  'cadeira-flexora': {
    gifUrl: `${GITHUB_RAW_BASE}/Seated_Leg_Curl/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Seated_Leg_Curl/0.jpg`,
      `${GITHUB_RAW_BASE}/Seated_Leg_Curl/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Isquiotibiais em Alongamento Pélvico',
  },
  'elevacao-nordica': {
    gifUrl: `${GITHUB_RAW_BASE}/Floor_Glute-Ham_Raise/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Floor_Glute-Ham_Raise/0.jpg`,
      `${GITHUB_RAW_BASE}/Floor_Glute-Ham_Raise/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Posteriores de Coxa (Contração Excêntrica Máxima)',
  },
  'elevacao-pelvica-barra': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Barbell_Glute_Bridge/0.jpg`,
      `${GITHUB_RAW_BASE}/Barbell_Glute_Bridge/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Glúteo Máximo (Ativação Eletromiográfica Máxima)',
  },
  'cadeira-abdutora': {
    gifUrl: `${GITHUB_RAW_BASE}/Thigh_Abductor/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Thigh_Abductor/0.jpg`,
      `${GITHUB_RAW_BASE}/Thigh_Abductor/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Glúteo Médio e Mínimo',
  },
  'gluteo-coice-polia': {
    gifUrl: `${GITHUB_RAW_BASE}/Glute_Kickback/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Glute_Kickback/0.jpg`,
      `${GITHUB_RAW_BASE}/Glute_Kickback/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Glúteo Máximo Superior',
  },

  // ==========================================
  // OMBROS & DELTÓIDES (SHOULDERS)
  // ==========================================
  'desenvolvimento-militar-barra': {
    gifUrl: `${GITHUB_RAW_BASE}/Standing_Military_Press/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Standing_Military_Press/0.jpg`,
      `${GITHUB_RAW_BASE}/Standing_Military_Press/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóide Anterior • Tríceps • Trapézio',
  },
  'desenvolvimento-halteres-sentado': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Seated_Dumbbell_Press/0.jpg`,
      `${GITHUB_RAW_BASE}/Seated_Dumbbell_Press/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóide Anterior e Lateral',
  },
  'desenvolvimento-arnold': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Arnold-Press.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Arnold_Dumbbell_Press/0.jpg`,
      `${GITHUB_RAW_BASE}/Arnold_Dumbbell_Press/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóides (3 Cabeças com Rotação)',
  },
  'elevacao-lateral-halteres': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Side_Lateral_Raise/0.jpg`,
      `${GITHUB_RAW_BASE}/Side_Lateral_Raise/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóide Lateral (Aspecto em V)',
  },
  'elevacao-lateral-polia': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Lateral-Raise.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Cable_Seated_Lateral_Raise/0.jpg`,
      `${GITHUB_RAW_BASE}/Cable_Seated_Lateral_Raise/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóide Lateral com Tensão Contínua',
  },
  'crucifixo-invertido-halteres': {
    gifUrl: `${GITHUB_RAW_BASE}/Dumbbell_Lying_Rear_Lateral_Raise/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Dumbbell_Lying_Rear_Lateral_Raise/0.jpg`,
      `${GITHUB_RAW_BASE}/Dumbbell_Lying_Rear_Lateral_Raise/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóide Posterior • Manguito Rotador',
  },
  'face-pull-polia-corda': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Face_Pull/0.jpg`,
      `${GITHUB_RAW_BASE}/Face_Pull/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóide Posterior • Trapézio • Saúde Articular',
  },
  'elevacao-frontal-barra-halteres': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Front-Raise.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Front_Dumbbell_Raise/0.jpg`,
      `${GITHUB_RAW_BASE}/Front_Dumbbell_Raise/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóide Anterior (Porção Clavicular)',
  },

  // ==========================================
  // BÍCEPS (BICEPS)
  // ==========================================
  'rosca-direta-barra-w': {
    gifUrl: `${GITHUB_RAW_BASE}/EZ-Bar_Curl/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/EZ-Bar_Curl/0.jpg`,
      `${GITHUB_RAW_BASE}/EZ-Bar_Curl/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Bíceps Braquial • Braquiorradial',
  },
  'rosca-alternada-halteres': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Dumbbell_Alternate_Bicep_Curl/0.jpg`,
      `${GITHUB_RAW_BASE}/Dumbbell_Alternate_Bicep_Curl/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Bíceps com Supinação Máxima',
  },
  'rosca-martelo-halteres': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Alternate_Hammer_Curl/0.jpg`,
      `${GITHUB_RAW_BASE}/Alternate_Hammer_Curl/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Músculo Braquial • Espessura do Braço',
  },
  'rosca-scott-barra-w': {
    gifUrl: `${GITHUB_RAW_BASE}/Preacher_Curl/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Preacher_Curl/0.jpg`,
      `${GITHUB_RAW_BASE}/Preacher_Curl/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Bíceps Cabeça Curta (Pico Isolar)',
  },
  'rosca-inclinada-banco-45': {
    gifUrl: `${GITHUB_RAW_BASE}/Alternate_Incline_Dumbbell_Curl/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Alternate_Incline_Dumbbell_Curl/0.jpg`,
      `${GITHUB_RAW_BASE}/Alternate_Incline_Dumbbell_Curl/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Bíceps Cabeça Longa (Pico)',
  },
  'rosca-concentrada-halter': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Concentration-Curl.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Concentration_Curls/0.jpg`,
      `${GITHUB_RAW_BASE}/Concentration_Curls/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Bíceps Braquial (Isolamento)',
  },

  // ==========================================
  // TRÍCEPS (TRICEPS)
  // ==========================================
  'triceps-corda-polia': {
    gifUrl: `${GITHUB_RAW_BASE}/Cable_Rope_Overhead_Triceps_Extension/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Cable_Rope_Overhead_Triceps_Extension/0.jpg`,
      `${GITHUB_RAW_BASE}/Cable_Rope_Overhead_Triceps_Extension/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Tríceps Cabeça Lateral',
  },
  'triceps-barra-reta-polia': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Triceps_Pushdown/0.jpg`,
      `${GITHUB_RAW_BASE}/Triceps_Pushdown/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Tríceps Braquial (Carga Pesada)',
  },
  'triceps-testa-barra-w': {
    gifUrl: `${GITHUB_RAW_BASE}/Decline_EZ_Bar_Triceps_Extension/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Decline_EZ_Bar_Triceps_Extension/0.jpg`,
      `${GITHUB_RAW_BASE}/Decline_EZ_Bar_Triceps_Extension/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Tríceps Cabeça Longa (Alongamento)',
  },
  'triceps-frances-halteres': {
    gifUrl: `${GITHUB_RAW_BASE}/Dumbbell_One-Arm_Triceps_Extension/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Dumbbell_One-Arm_Triceps_Extension/0.jpg`,
      `${GITHUB_RAW_BASE}/Dumbbell_One-Arm_Triceps_Extension/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Tríceps Cabeça Longa',
  },
  'supino-fechado-barra': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Close-Grip-Bench-Press.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Close-Grip_Barbell_Bench_Press/0.jpg`,
      `${GITHUB_RAW_BASE}/Close-Grip_Barbell_Bench_Press/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Tríceps (Composto Pesado) • Peitoral Médio',
  },
  'mergulho-no-banco-dips': {
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Bench-Dips.gif',
    frames: [
      `${GITHUB_RAW_BASE}/Bench_Dips/0.jpg`,
      `${GITHUB_RAW_BASE}/Bench_Dips/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Tríceps • Ombros Anteriores',
  },

  // ==========================================
  // PANTURRILHA & ANTEBRAÇO
  // ==========================================
  'panturrilha-em-pe-maquina': {
    gifUrl: `${GITHUB_RAW_BASE}/Standing_Calf_Raises/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Standing_Calf_Raises/0.jpg`,
      `${GITHUB_RAW_BASE}/Standing_Calf_Raises/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Gastrocnêmio (Músculo da Panturrilha)',
  },
  'panturrilha-sentado-gemeos': {
    gifUrl: `${GITHUB_RAW_BASE}/Barbell_Seated_Calf_Raise/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Barbell_Seated_Calf_Raise/0.jpg`,
      `${GITHUB_RAW_BASE}/Barbell_Seated_Calf_Raise/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Músculo Sóleo',
  },
  'rosca-inversa-barra-w': {
    gifUrl: `${GITHUB_RAW_BASE}/Reverse_Barbell_Preacher_Curls/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Reverse_Barbell_Preacher_Curls/0.jpg`,
      `${GITHUB_RAW_BASE}/Reverse_Barbell_Preacher_Curls/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Braquiorradial • Extensores de Punho',
  },
  'farmers-walk-halteres': {
    gifUrl: `${GITHUB_RAW_BASE}/Dumbbell_Suitcase_Carry/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Dumbbell_Suitcase_Carry/0.jpg`,
      `${GITHUB_RAW_BASE}/Dumbbell_Suitcase_Carry/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Antebraço (Força de Pegada) • Trapézio • Core',
  },

  // ==========================================
  // CORE & ABDÔMEN
  // ==========================================
  'prancha-isometrica': {
    gifUrl: `${GITHUB_RAW_BASE}/Plank/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Plank/0.jpg`,
      `${GITHUB_RAW_BASE}/Plank/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Transverso do Abdômen • Estabilidade Lombo-Pélvica',
  },
  'prancha-lateral': {
    gifUrl: `${GITHUB_RAW_BASE}/Push_Up_to_Side_Plank/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Push_Up_to_Side_Plank/0.jpg`,
      `${GITHUB_RAW_BASE}/Push_Up_to_Side_Plank/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Oblíquos Internos e Externos • Quadrado Lombar',
  },
  'abdominal-infra-na-paralela': {
    gifUrl: `${GITHUB_RAW_BASE}/Hanging_Leg_Raise/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Hanging_Leg_Raise/0.jpg`,
      `${GITHUB_RAW_BASE}/Hanging_Leg_Raise/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Reto Abdominal Inferior',
  },
  'abdominal-cabo-corda': {
    gifUrl: `${GITHUB_RAW_BASE}/Cable_Crunch/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Cable_Crunch/0.jpg`,
      `${GITHUB_RAW_BASE}/Cable_Crunch/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Reto Abdominal com Sobrecarga',
  },
  'abdominal-com-roda': {
    gifUrl: `${GITHUB_RAW_BASE}/Ab_Roller/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Ab_Roller/0.jpg`,
      `${GITHUB_RAW_BASE}/Ab_Roller/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Core Completo • Anti-Extensão Lombar',
  },
  'dragon-flag-core': {
    gifUrl: `${GITHUB_RAW_BASE}/Decline_Crunch/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/Decline_Crunch/0.jpg`,
      `${GITHUB_RAW_BASE}/Decline_Crunch/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Reto Abdominal Avançado • Estabilidade Máxima',
  },

  // ==========================================
  // TREINOS DE CORRIDA (RUNNING WORKOUTS)
  // ==========================================
  'corrida-rodagem-leve': {
    gifUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=80',
    targetAnatomy: 'Base Aeróbica (Zona 2) • Resistência Cardiovascular • Membros Inferiores',
  },
  'corrida-treino-longo': {
    gifUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=80',
    targetAnatomy: 'Volume & Resistência Máxima • Eficiência Mitocondrial • Glúteos e Core',
  },
  'corrida-treino-intervalado': {
    gifUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
    targetAnatomy: 'VO2 Máximo • Fibras Rápidas Tipo II • Potência de Propulsão & Velocidade',
  },
  'corrida-tempo-run': {
    gifUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80',
    targetAnatomy: 'Limiar Anaeróbico de Lactato • Ritmo Sustentável de Prova (Zona 3/4)',
  },
  'corrida-fartlek': {
    gifUrl: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&auto=format&fit=crop&q=80',
    targetAnatomy: 'Agilidade de Cadência • Adaptação de Relevo e Ritmo Variável • Pernas e Core',
  },
  'corrida-regenerativo': {
    gifUrl: 'https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&auto=format&fit=crop&q=80',
    targetAnatomy: 'Recuperação Ativa (Zona 1) • Fluxo Sanguíneo Muscular • Prevenção Articular',
  },

  // ==========================================
  // MOBILIDADE & FLEXIBILIDADE
  // ==========================================
  'mobilidade-quadril-worlds-greatest': {
    gifUrl: `${GITHUB_RAW_BASE}/World_s_Greatest_Stretch/0.jpg`,
    frames: [
      `${GITHUB_RAW_BASE}/World_s_Greatest_Stretch/0.jpg`,
      `${GITHUB_RAW_BASE}/World_s_Greatest_Stretch/1.jpg`,
    ],
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Flexores de Quadril • Coluna Torácica • Glúteos',
  },
  'skipping-alto-pliometria': {
    gifUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Pliometria • Panturrilhas • Cadência de Corrida',
  },
  'salto-no-caixote-box-jump': {
    gifUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Potência Pliométrica de Pernas • Glúteos',
  },
};

/**
 * Returns visual media object for any exercise with smart fallback
 */
export function getExerciseMedia(exerciseId: string, primaryMuscle?: MuscleGroup): ExerciseMediaData {
  if (EXERCISE_MEDIA_MAP[exerciseId]) {
    return EXERCISE_MEDIA_MAP[exerciseId];
  }

  // Fallback by muscle group
  const muscleFallbacks: Record<string, ExerciseMediaData> = {
    peito: {
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif',
      frames: [
        `${GITHUB_RAW_BASE}/Barbell_Bench_Press_-_Medium_Grip/0.jpg`,
        `${GITHUB_RAW_BASE}/Barbell_Bench_Press_-_Medium_Grip/1.jpg`,
      ],
      coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
      targetAnatomy: 'Peitoral Maior e Tríceps',
    },
    costas: {
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif',
      frames: [
        `${GITHUB_RAW_BASE}/Wide-Grip_Lat_Pulldown/0.jpg`,
        `${GITHUB_RAW_BASE}/Wide-Grip_Lat_Pulldown/1.jpg`,
      ],
      coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
      targetAnatomy: 'Grande Dorsal e Bíceps',
    },
    quadriceps: {
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif',
      frames: [
        `${GITHUB_RAW_BASE}/Barbell_Full_Squat/0.jpg`,
        `${GITHUB_RAW_BASE}/Barbell_Full_Squat/1.jpg`,
      ],
      coverImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
      targetAnatomy: 'Quadríceps e Glúteos',
    },
    posterior: {
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Romanian-Deadlift.gif',
      frames: [
        `${GITHUB_RAW_BASE}/Romanian_Deadlift_With_Dumbbells/0.jpg`,
        `${GITHUB_RAW_BASE}/Romanian_Deadlift_With_Dumbbells/1.jpg`,
      ],
      coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      targetAnatomy: 'Posterior de Coxa e Glúteos',
    },
    gluteos: {
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif',
      frames: [
        `${GITHUB_RAW_BASE}/Barbell_Glute_Bridge/0.jpg`,
        `${GITHUB_RAW_BASE}/Barbell_Glute_Bridge/1.jpg`,
      ],
      coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
      targetAnatomy: 'Glúteo Máximo',
    },
    ombros: {
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif',
      frames: [
        `${GITHUB_RAW_BASE}/Side_Lateral_Raise/0.jpg`,
        `${GITHUB_RAW_BASE}/Side_Lateral_Raise/1.jpg`,
      ],
      coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
      targetAnatomy: 'Deltóides (Ombros)',
    },
    biceps: {
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif',
      frames: [
        `${GITHUB_RAW_BASE}/Dumbbell_Alternate_Bicep_Curl/0.jpg`,
        `${GITHUB_RAW_BASE}/Dumbbell_Alternate_Bicep_Curl/1.jpg`,
      ],
      coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
      targetAnatomy: 'Bíceps Braquial',
    },
    triceps: {
      gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif',
      frames: [
        `${GITHUB_RAW_BASE}/Triceps_Pushdown/0.jpg`,
        `${GITHUB_RAW_BASE}/Triceps_Pushdown/1.jpg`,
      ],
      coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      targetAnatomy: 'Tríceps Braquial',
    },
    antebraco: {
      gifUrl: `${GITHUB_RAW_BASE}/Reverse_Barbell_Preacher_Curls/0.jpg`,
      frames: [
        `${GITHUB_RAW_BASE}/Reverse_Barbell_Preacher_Curls/0.jpg`,
        `${GITHUB_RAW_BASE}/Reverse_Barbell_Preacher_Curls/1.jpg`,
      ],
      coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
      targetAnatomy: 'Antebraço e Pegada',
    },
    panturrilha: {
      gifUrl: `${GITHUB_RAW_BASE}/Standing_Calf_Raises/0.jpg`,
      frames: [
        `${GITHUB_RAW_BASE}/Standing_Calf_Raises/0.jpg`,
        `${GITHUB_RAW_BASE}/Standing_Calf_Raises/1.jpg`,
      ],
      coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
      targetAnatomy: 'Panturrilhas (Gastrocnêmio e Sóleo)',
    },
    core: {
      gifUrl: `${GITHUB_RAW_BASE}/Plank/0.jpg`,
      frames: [
        `${GITHUB_RAW_BASE}/Plank/0.jpg`,
        `${GITHUB_RAW_BASE}/Plank/1.jpg`,
      ],
      coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
      targetAnatomy: 'Abdômen e Core',
    },
    cardio: {
      gifUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&auto=format&fit=crop&q=80',
      coverImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&auto=format&fit=crop&q=80',
      targetAnatomy: 'Sistema Cardiorrespiratório',
    },
    corrida: {
      gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/cardio/run-equipment.gif',
      coverImage: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&auto=format&fit=crop&q=80',
      targetAnatomy: 'Sistema Cardiovascular • Resistência & Ritmo',
    },
    mobilidade: {
      gifUrl: `${GITHUB_RAW_BASE}/World_s_Greatest_Stretch/0.jpg`,
      frames: [
        `${GITHUB_RAW_BASE}/World_s_Greatest_Stretch/0.jpg`,
        `${GITHUB_RAW_BASE}/World_s_Greatest_Stretch/1.jpg`,
      ],
      coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
      targetAnatomy: 'Mobilidade Articular e Flexibilidade',
    },
  };

  const muscle = (primaryMuscle || 'peito').toLowerCase();
  const fallback = muscleFallbacks[muscle] || muscleFallbacks['peito'];

  return fallback;
}
