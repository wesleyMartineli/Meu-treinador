import { ExerciseItem } from '@/types';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';

export const COMPREHENSIVE_EXERCISES: ExerciseItem[] = [
  // ==========================================
  // PEITO (CHEST)
  // ==========================================
  {
    id: 'supino-reto-barra',
    name: 'Supino Reto com Barra',
    muscleGroup: 'peito',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '8 - 10',
    restSeconds: 90,
    suggestedWeightKg: 80,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Maior (Fibras Médias) • Deltóide Anterior • Tríceps Braquial',
    secondaryMuscles: ['Tríceps', 'Ombro Anterior'],
    instructions: [
      'Deite-se no banco mantendo os pés firmes no chão e escápulas aduzidas e retraídas.',
      'Segure a barra com pegada ligeiramente mais larga que a largura dos ombros.',
      'Desça a barra de forma controlada até tocar suavemente a linha dos mamilos.',
      'Empurre a barra para cima com força sem desencaixar as escápulas.',
    ],
    commonMistakes: [
      'Bater a barra no peito com impacto descontrolado.',
      'Projetar os ombros para frente no topo do movimento.',
      'Abrir excessivamente os cotovelos a 90 graus em relação ao tronco.',
    ],
  },
  {
    id: 'supino-inclinado-halteres',
    name: 'Supino Inclinado com Halteres',
    muscleGroup: 'peito',
    equipment: 'halteres',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 75,
    suggestedWeightKg: 28,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif',
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Superior (Porção Clavicular) • Deltóide Anterior',
    secondaryMuscles: ['Deltóide Anterior', 'Tríceps'],
    instructions: [
      'Ajuste o banco em uma inclinação entre 30 e 45 graus.',
      'Inicie com os halteres na altura do peito superior, cotovelos em ângulo de 45 a 60 graus.',
      'Empurre os halteres para cima aproximando-os no topo sem bater os pesos.',
      'Desça controlando a fase excêntrica até sentir alongamento na porção superior do peitoral.',
    ],
    commonMistakes: [
      'Inclinar o banco em 60 graus ou mais, sobrecarregando os ombros em vez do peito.',
      'Deixar os cotovelos abertos demais em linha com os ombros.',
    ],
  },
  {
    id: 'supino-inclinado-barra',
    name: 'Supino Inclinado com Barra',
    muscleGroup: 'peito',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '8 - 10',
    restSeconds: 90,
    suggestedWeightKg: 70,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Superior (Fibras Claviculares) • Tríceps Braquial',
    instructions: [
      'Deite-se no banco inclinado a 30-45 graus.',
      'Retire a barra do suporte e posicione-a sobre a linha superior do peito.',
      'Desça controlando a carga até a clavícula/peitoral superior.',
      'Empurre explosivamente mantendo a estabilidade das escápulas.',
    ],
  },
  {
    id: 'supino-reto-halteres',
    name: 'Supino Reto com Halteres',
    muscleGroup: 'peito',
    equipment: 'halteres',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 75,
    suggestedWeightKg: 30,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif',
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Maior • Estabilizadores do Ombro',
    instructions: [
      'Deite-se no banco plano com os halteres alinhados ao peitoral.',
      'Empurre os halteres para cima mantendo trajetória estável.',
      'Desça profundamente para explorar maior amplitude que a barra.',
    ],
  },
  {
    id: 'crucifixo-reto-halteres',
    name: 'Crucifixo Reto com Halteres',
    muscleGroup: 'peito',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 16,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Fly.gif',
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Maior (Alongamento Tensional)',
    instructions: [
      'Com halteres sobre o peito e cotovelos levemente flexionados, abra os braços em arco.',
      'Desça até sentir alongamento agradável no peitoral.',
      'Retorne unindo os halteres contraindo o peito com força.',
    ],
  },
  {
    id: 'crucifixo-inclinado-halteres',
    name: 'Crucifixo Inclinado com Halteres',
    muscleGroup: 'peito',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 14,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/dumbbell-incline-fly.gif',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Superior (Alongamento)',
    instructions: [
      'Banco inclinado a 30-45 graus.',
      'Abra os braços em semicírculo mantendo os cotovelos fixos.',
      'Suba contraindo o peitoral superior no ponto mais alto.',
    ],
  },
  {
    id: 'crossover-polia-alta',
    name: 'Crossover na Polia Alta',
    muscleGroup: 'peito',
    equipment: 'polia',
    targetSets: 4,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 20,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Inferior e Médio • Tensão Contínua',
    instructions: [
      'Posicione as polias acima da cabeça e dê um passo à frente com o tronco levemente inclinado.',
      'Traga os pegadores para frente e para baixo cruzando ou encostando as mãos.',
      'Controle a volta abrindo os braços e sentindo o alongamento do peito.',
    ],
  },
  {
    id: 'crossover-polia-baixa',
    name: 'Crossover na Polia Baixa',
    muscleGroup: 'peito',
    equipment: 'polia',
    targetSets: 3,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 15,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/cable-low-fly.gif',
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Superior (Porção Clavicular)',
    instructions: [
      'Polias ajustadas na posição mais baixa.',
      'Puxe os cabos para cima e para o centro até a altura do queixo/peito superior.',
      'Mantenha o peito estufado e contraia no pico do movimento.',
    ],
  },
  {
    id: 'peck-deck-voador',
    name: 'Peck Deck / Voador na Máquina',
    muscleGroup: 'peito',
    equipment: 'maquina',
    targetSets: 4,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 55,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif',
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Maior (Isolamento Guiado sem Estresse Articular)',
    instructions: [
      'Ajuste o assento para que os braços fiquem na altura do meio do peitoral.',
      'Feche os braços contraindo o peito e segure 1 segundo no pico de contração.',
      'Abra os braços controladamente até sentir o alongamento peitoral.',
    ],
  },
  {
    id: 'paralelas-foco-peito',
    name: 'Barras Paralelas (Foco Peitoral)',
    muscleGroup: 'peito',
    equipment: 'peso_corporal',
    targetSets: 4,
    targetReps: '8 - 12',
    restSeconds: 90,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Chest-Dips.gif',
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Inferior • Tríceps • Deltóide Anterior',
    instructions: [
      'Suspenda-se nas barras paralelas inclinando o tronco ligeiramente para a frente.',
      'Afaste os cotovelos levemente para direcionar a tensão ao peitoral.',
      'Desça até 90 graus nos cotovelos e empurre com explosão.',
    ],
  },
  {
    id: 'flexao-de-braco-pushup',
    name: 'Flexão de Braço no Solo (Push-up)',
    muscleGroup: 'peito',
    equipment: 'peso_corporal',
    targetSets: 3,
    targetReps: '15 - 20',
    restSeconds: 60,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral • Tríceps • Core Abdominal',
    instructions: [
      'Mãos no chão na largura dos ombros, corpo formando uma linha reta dos calcanhares à cabeça.',
      'Desça até o peito quase tocar o chão mantendo o abdômen travado.',
      'Empurre o chão até a extensão total dos braços.',
    ],
  },
  {
    id: 'pullover-com-halter',
    name: 'Pullover com Halter no Banco',
    muscleGroup: 'peito',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 22,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Pullover.gif',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Peitoral Maior • Serrátil Anterior • Dorsal',
    instructions: [
      'Apoie a parte superior das costas transversalmente no banco.',
      'Segure um halter com as duas mãos acima do peito.',
      'Desça o halter para trás da cabeça em arco até sentir o alongamento da caixa torácica.',
      'Puxe o halter de volta usando a força do peitoral e serrátil.',
    ],
  },

  // ==========================================
  // COSTAS & DORSAL (BACK)
  // ==========================================
  {
    id: 'puxada-alta-aberta',
    name: 'Puxada Alta Frontal na Polia (Lat Pulldown)',
    muscleGroup: 'costas',
    equipment: 'polia',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 75,
    suggestedWeightKg: 65,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Grande Dorsal • Redondo Maior • Bíceps Braquial',
    instructions: [
      'Sente-se no aparelho com as coxas bem apoiadas sob as almofadas.',
      'Segure a barra com pegada pronada aberta além da largura dos ombros.',
      'Puxe a barra em direção ao peitoral superior, projetando o peito para cima e aproximando as escápulas.',
      'Retorne de forma controlada até o alongamento completo das dorsais.',
    ],
  },
  {
    id: 'puxada-triangulo-fechada',
    name: 'Puxada com Triângulo na Polia',
    muscleGroup: 'costas',
    equipment: 'polia',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 60,
    suggestedWeightKg: 60,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/cable-lateral-pulldown-with-v-bar.gif',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Grande Dorsal (Alongamento) • Braquial • Trapézio Médio',
    instructions: [
      'Use o puxador em triângulo com pegada neutra.',
      'Puxe o acessório até a parte superior do peito.',
      'Concentre a força nos cotovelos puxando para baixo e para trás.',
    ],
  },
  {
    id: 'barra-fixa-pullup',
    name: 'Barra Fixa Pronada (Pull-up)',
    muscleGroup: 'costas',
    equipment: 'peso_corporal',
    targetSets: 4,
    targetReps: '6 - 10',
    restSeconds: 90,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Grande Dorsal • Rombóides • Core',
    instructions: [
      'Pendure-se na barra fixa com pegada pronada aberta.',
      'Inicie a puxada deprimindo as escápulas antes de flexionar os cotovelos.',
      'Eleve o corpo até que o queixo ultrapasse a linha da barra.',
      'Desça de maneira 100% controlada.',
    ],
  },
  {
    id: 'barra-fixa-chinup',
    name: 'Barra Fixa Supinada (Chin-up)',
    muscleGroup: 'costas',
    equipment: 'peso_corporal',
    targetSets: 3,
    targetReps: '8 - 10',
    restSeconds: 90,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/assisted-standing-chin-up.gif',
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Grande Dorsal • Bíceps Braquial',
    instructions: [
      'Pegada supinada (palmas voltadas para você) na largura dos ombros.',
      'Puxe o corpo para cima até o queixo passar da barra.',
      'Excelente exercício composto para dorsal e bíceps.',
    ],
  },
  {
    id: 'remada-curvada-barra',
    name: 'Remada Curvada com Barra',
    muscleGroup: 'costas',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '8 - 10',
    restSeconds: 90,
    suggestedWeightKg: 70,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif',
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Espessura Dorsal • Rombóides • Trapézio Médio • Eretores da Espinha',
    instructions: [
      'Incline o tronco para a frente a 45 graus mantendo a coluna lombar selada e joelhos semiflexionados.',
      'Segure a barra com pegada pronada ou supinada.',
      'Puxe a barra em direção ao umbigo direcionando os cotovelos para trás.',
      'Desça controlando a carga sem arredondar as costas.',
    ],
  },
  {
    id: 'remada-cavalinho-ou-t-bar',
    name: 'Remada Cavalinho (T-Bar Row)',
    muscleGroup: 'costas',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '8 - 12',
    restSeconds: 75,
    suggestedWeightKg: 50,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/cable-pulldown-pro-lat-bar.gif',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Espessura das Costas • Trapézio Médio • Rombóides',
    instructions: [
      'Posicione-se sobre a barra T com pegada neutra.',
      'Puxe a carga em direção ao peito inferior contraindo a musculatura dorsal.',
      'Mantenha a coluna travada e evite usar impulso excessivo do tronco.',
    ],
  },
  {
    id: 'remada-unilateral-serrote',
    name: 'Remada Unilateral com Halter (Serrote)',
    muscleGroup: 'costas',
    equipment: 'halteres',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 60,
    suggestedWeightKg: 30,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif',
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Grande Dorsal Unilateral • Rombóides • Core',
    instructions: [
      'Apoie o joelho e mão do mesmo lado sobre o banco plano.',
      'Com a outra mão, puxe o halter rente ao quadril focando na contração da dorsal.',
      'Desça alongando bem o grande dorsal sem rodar excessivamente a coluna.',
    ],
  },
  {
    id: 'remada-baixa-polia',
    name: 'Remada Baixa Sentado na Polia',
    muscleGroup: 'costas',
    equipment: 'polia',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 60,
    suggestedWeightKg: 60,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Rombóides • Trapézio Médio/Inferior • Grande Dorsal',
    instructions: [
      'Sente-se com a coluna ereta e joelhos levemente destravados.',
      'Puxe o triângulo em direção ao abdômen projetando o peito para a frente.',
      'Aperte as escápulas por 1 segundo e retorne sem curvar as costas.',
    ],
  },
  {
    id: 'pulldown-corda-polia',
    name: 'Pulldown com Corda / Barra Reta na Polia',
    muscleGroup: 'costas',
    equipment: 'polia',
    targetSets: 3,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 30,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/cable-straight-arm-pulldown.gif',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Grande Dorsal (Isolamento Escapular sem Bíceps)',
    instructions: [
      'Em pé, incline o tronco ligeiramente à frente com braços estendidos segurando o cabo.',
      'Puxe a corda para baixo em arco em direção às coxas mantendo os braços quase retos.',
      'Controle o retorno até a altura dos olhos.',
    ],
  },
  {
    id: 'levantamento-terra-convencional',
    name: 'Levantamento Terra Convencional',
    muscleGroup: 'costas',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '5 - 8',
    restSeconds: 120,
    suggestedWeightKg: 120,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif',
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Cadeia Posterior Completa • Glúteos • Dorsais • Eretores da Espinha • Trapézio',
    instructions: [
      'Pés na largura do quadril, barra tocando as canelas.',
      'Flexione os joelhos e quadris mantendo a coluna neutra e peito aberto.',
      'Puxe a barra do chão estendendo joelhos e quadris simultaneamente.',
      'Trave o quadril no topo sem hiperextender a lombar.',
    ],
  },
  {
    id: 'encolhimento-com-barra',
    name: 'Encolhimento de Ombros com Barra / Halteres',
    muscleGroup: 'costas',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 80,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shrug.gif',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Trapézio Superior',
    instructions: [
      'Em pé, segure a barra à frente das coxas.',
      'Eleve os ombros verticalmente em direção às orelhas sem rodar a articulação.',
      'Segure 1 segundo no topo e desça com controle.',
    ],
  },

  // ==========================================
  // PERNAS & MEMBROS INFERIORES (LEGS)
  // ==========================================
  {
    id: 'agachamento-livre-barra',
    name: 'Agachamento Livre com Barra (Back Squat)',
    muscleGroup: 'pernas',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '6 - 8',
    restSeconds: 120,
    suggestedWeightKg: 100,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif',
    coverImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Quadríceps • Glúteo Máximo • Core • Adutores',
    instructions: [
      'Posicione a barra confortavelmente sobre o trapézio.',
      'Pés na largura dos ombros ou ligeiramente mais afastados, pontas levemente para fora.',
      'Inicie a descida projetando os quadris para trás e flexionando os joelhos.',
      'Desça até ultrapassar a linha de 90 graus (paralela) mantendo o peito erguido.',
      'Empurre o chão com os calcanhares para retornar ao topo.',
    ],
  },
  {
    id: 'agachamento-frontal-barra',
    name: 'Agachamento Frontal (Front Squat)',
    muscleGroup: 'pernas',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '8 - 10',
    restSeconds: 90,
    suggestedWeightKg: 70,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/quads/barbell-bench-squat.gif',
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Quadríceps (Foco Anterior) • Core Abdominal Vertical',
    instructions: [
      'Barra apoiada sobre a parte frontal dos deltóides com cotovelos altos.',
      'Agache mantendo o tronco estritamente ereto.',
      'Excelente ativação de quadríceps com menor sobrecarga na coluna lombar.',
    ],
  },
  {
    id: 'leg-press-45',
    name: 'Leg Press 45 Graus',
    muscleGroup: 'pernas',
    equipment: 'maquina',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 90,
    suggestedWeightKg: 200,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/quads/lever-alternate-leg-press.gif',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Quadríceps • Glúteos • Isquiotibiais',
    instructions: [
      'Posicione as costas e lombar 100% apoiadas no encosto.',
      'Pés na plataforma na largura dos ombros.',
      'Destrave a máquina e desça a plataforma até 90 graus nos joelhos.',
      'Empurre sem travar os joelhos em hiperextensão no final.',
    ],
  },
  {
    id: 'agachamento-hack-machine',
    name: 'Agachamento Hack na Máquina',
    muscleGroup: 'pernas',
    equipment: 'maquina',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 90,
    suggestedWeightKg: 80,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Sled-Hack-Squat.gif',
    coverImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Vasto Lateral • Reto Femoral (Isolamento de Quadríceps)',
    instructions: [
      'Apoie os ombros e costas na máquina Hack.',
      'Pés na frente na plataforma, desça profundamente com controle.',
      'Empurre focando a pressão nos quadríceps.',
    ],
  },
  {
    id: 'agachamento-bulgaro-halteres',
    name: 'Agachamento Búlgaro com Halteres',
    muscleGroup: 'pernas',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '10 - 12 cada perna',
    restSeconds: 60,
    suggestedWeightKg: 18,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/quads/band-one-arm-single-leg-split-squat.gif',
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Glúteo Máximo • Quadríceps Unilateral • Estabilidade',
    instructions: [
      'Apoie o peito de um pé atrás sobre um banco.',
      'Dê um passo à frente com a outra perna e desça o quadril verticalmente.',
      'O joelho da frente deve formar 90 graus.',
      'Empurre pelo calcanhar da frente para subir.',
    ],
  },
  {
    id: 'cadeira-extensora',
    name: 'Cadeira Extensora',
    muscleGroup: 'pernas',
    equipment: 'maquina',
    targetSets: 4,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 60,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Quadríceps (Pico de Contração e Reto Femoral)',
    instructions: [
      'Ajuste o encosto para o joelho alinhar com o eixo de rotação da máquina.',
      'Estenda os joelhos até a contração máxima e segure 1 segundo no topo.',
      'Desça de forma controlada sem deixar os pesos baterem.',
    ],
  },
  {
    id: 'avanco-passada-halteres',
    name: 'Avanço / Passada com Halteres',
    muscleGroup: 'pernas',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '12 passos cada perna',
    restSeconds: 60,
    suggestedWeightKg: 16,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif',
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Quadríceps • Glúteos • Coordenação Unilateral',
    instructions: [
      'Dê um passo largo à frente e flexione ambos os joelhos.',
      'O joelho de trás quase toca o chão.',
      'Alterne as pernas caminhando de forma contínua.',
    ],
  },
  {
    id: 'stiff-com-barra',
    name: 'Stiff com Barra (Romanian Deadlift)',
    muscleGroup: 'pernas',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 75,
    suggestedWeightKg: 70,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Romanian-Deadlift.gif',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Isquiotibiais (Posterior de Coxa) • Glúteos • Lombar',
    instructions: [
      'Em pé, joelhos levemente destravados e pés na largura dos quadris.',
      'Projete os quadris para trás mantendo a coluna perfeitamente alinhada.',
      'Desça a barra rente às pernas até sentir alongamento intenso nos posteriores.',
      'Contraia os glúteos e posteriores para retornar à posição ereta.',
    ],
  },
  {
    id: 'mesa-flexora',
    name: 'Mesa Flexora Deitada',
    muscleGroup: 'pernas',
    equipment: 'maquina',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 60,
    suggestedWeightKg: 45,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Curl.gif',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Bíceps Femoral • Semitendíneo • Semimembranáceo',
    instructions: [
      'Deite-se de bruços no aparelho com o rolo apoiado logo acima dos calcanhares.',
      'Flexione os joelhos trazendo os calcanhares em direção aos glúteos.',
      'Segure 1 segundo na contração e desça sem soltar o peso.',
    ],
  },
  {
    id: 'cadeira-flexora',
    name: 'Cadeira Flexora Sentada',
    muscleGroup: 'pernas',
    equipment: 'maquina',
    targetSets: 4,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 50,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/hamstrings/lever-seated-leg-curl.gif',
    coverImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Isquiotibiais em Alongamento Pélvico',
    instructions: [
      'Sente-se com as costas bem apoiadas e a trava firme sobre as coxas.',
      'Flexione os joelhos empurrando a almofada para baixo.',
      'Controle a subida explorando o alongamento do músculo.',
    ],
  },
  {
    id: 'elevacao-pelvica-barra',
    name: 'Elevação Pélvica com Barra (Hip Thrust)',
    muscleGroup: 'pernas',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 90,
    suggestedWeightKg: 100,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif',
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Glúteo Máximo (Maior Ativação Eletromiográfica do Corpo)',
    instructions: [
      'Apoie a parte superior das costas em um banco plano.',
      'Posicione a barra com acolchoado sobre a dobra do quadril.',
      'Pés firmes no chão na largura dos ombros.',
      'Eleve o quadril até alinhar tronco e coxas, apertando os glúteos no topo.',
    ],
  },
  {
    id: 'panturrilha-em-pe-maquina',
    name: 'Elevação de Panturrilha em Pé (Máquina)',
    muscleGroup: 'pernas',
    equipment: 'maquina',
    targetSets: 4,
    targetReps: '15 - 20',
    restSeconds: 45,
    suggestedWeightKg: 70,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Standing-Calf-Raise.gif',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Gastrocnêmio (Músculo Principal da Panturrilha)',
    instructions: [
      'Apoie a ponta dos pés no degrau da máquina com joelhos estendidos.',
      'Desça os calcanhares ao máximo para alongamento completo.',
      'Eleve o corpo na ponta dos pés contraindo a panturrilha no topo.',
    ],
  },
  {
    id: 'panturrilha-sentado-gemeos',
    name: 'Panturrilha Sentado (Gêmeos Sentado)',
    muscleGroup: 'pernas',
    equipment: 'maquina',
    targetSets: 4,
    targetReps: '15 - 20',
    restSeconds: 45,
    suggestedWeightKg: 40,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/calves/barbell-seated-calf-raise-1371.gif',
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Músculo Sóleo (Espessura Inferior da Panturrilha)',
    instructions: [
      'Sente-se com as almofadas travadas sobre as coxas.',
      'Realize o movimento completo de dorsiflexão e flexão plantar com cadência controlada.',
    ],
  },

  // ==========================================
  // OMBROS & DELTÓIDES (SHOULDERS)
  // ==========================================
  {
    id: 'desenvolvimento-militar-barra',
    name: 'Desenvolvimento Militar com Barra (Overhead Press)',
    muscleGroup: 'ombros',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '8 - 10',
    restSeconds: 90,
    suggestedWeightKg: 50,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shoulder-Press.gif',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóide Anterior e Lateral • Tríceps • Trapézio',
    instructions: [
      'Em pé, segure a barra na altura dos ombros com pegada na largura dos ombros.',
      'Core e glúteos firmemente contraídos.',
      'Empurre a barra verticalmente para cima até a extensão completa dos braços.',
      'Passe a cabeça levemente para a frente no topo do movimento.',
    ],
  },
  {
    id: 'desenvolvimento-halteres-sentado',
    name: 'Desenvolvimento com Halteres Sentado',
    muscleGroup: 'ombros',
    equipment: 'halteres',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 75,
    suggestedWeightKg: 24,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif',
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóide Anterior e Lateral',
    instructions: [
      'Sente-se no banco a 90 graus com halteres na altura das orelhas.',
      'Empurre os halteres para cima sem bater os pesos.',
      'Desça controlando até a linha dos ombros.',
    ],
  },
  {
    id: 'desenvolvimento-arnold',
    name: 'Desenvolvimento Arnold com Halteres',
    muscleGroup: 'ombros',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '10 - 12',
    restSeconds: 60,
    suggestedWeightKg: 20,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Arnold-Press.gif',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóide Completo (Anterior, Lateral e Posterior com Rotação)',
    instructions: [
      'Inicie com os halteres na frente do peito, palmas viradas para você.',
      'Conforme empurra os pesos para cima, gire os punhos para fora.',
      'No topo, as palmas devem estar viradas para a frente.',
    ],
  },
  {
    id: 'elevacao-lateral-halteres',
    name: 'Elevação Lateral com Halteres',
    muscleGroup: 'ombros',
    equipment: 'halteres',
    targetSets: 4,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 12,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif',
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóide Lateral (Aspecto de Ombros Largos em V)',
    instructions: [
      'Em pé, segure os halteres ao lado do corpo com leve inclinação do tronco.',
      'Eleve os braços lateralmente até a altura dos ombros, cotovelos levemente flexionados.',
      'Pense em despejar água de uma jarra no topo para isolamento perfeito.',
    ],
  },
  {
    id: 'elevacao-lateral-polia',
    name: 'Elevação Lateral na Polia',
    muscleGroup: 'ombros',
    equipment: 'polia',
    targetSets: 4,
    targetReps: '12 - 15',
    restSeconds: 45,
    suggestedWeightKg: 10,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Lateral-Raise.gif',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóide Lateral com Tensão Mecânica Contínua',
    instructions: [
      'Polia na altura do tornozelo, passe o cabo por trás do corpo.',
      'Eleve o braço lateralmente aproveitando a tensão em toda a amplitude.',
    ],
  },
  {
    id: 'face-pull-polia-corda',
    name: 'Face Pull na Polia com Corda',
    muscleGroup: 'ombros',
    equipment: 'polia',
    targetSets: 4,
    targetReps: '15 - 20',
    restSeconds: 60,
    suggestedWeightKg: 25,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif',
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóide Posterior • Manguito Rotador • Trapézio • Postura Escapular',
    instructions: [
      'Polia na altura dos olhos com acessório de corda.',
      'Puxe a corda em direção aos olhos e orelhas, abrindo os cotovelos para trás e para cima.',
      'Realize rotação externa dos ombros no final da puxada.',
    ],
  },
  {
    id: 'crucifixo-invertido-halteres',
    name: 'Crucifixo Invertido com Halteres / Voador Invertido',
    muscleGroup: 'ombros',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 10,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/band-standing-rear-delt-row.gif',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Deltóide Posterior • Rombóides',
    instructions: [
      'Tronco inclinado para a frente a 45 graus ou deitado no banco inclinado.',
      'Abra os braços lateralmente focando na parte traseira dos ombros.',
    ],
  },

  // ==========================================
  // BRAÇOS (BICEPS, TRICEPS & FOREARMS)
  // ==========================================
  {
    id: 'rosca-direta-barra-w',
    name: 'Rosca Direta com Barra W',
    muscleGroup: 'bracos',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '8 - 12',
    restSeconds: 60,
    suggestedWeightKg: 35,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif',
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Bíceps Braquial (Cabeça Curta e Longa) • Braquiorradial',
    instructions: [
      'Em pé, segure a barra W com pegada supinada na curvatura ergonômica.',
      'Mantenha os cotovelos colados ao tronco.',
      'Flexione os cotovelos elevando a barra até a contração máxima do bíceps.',
      'Desça de forma lenta e controlada.',
    ],
  },
  {
    id: 'rosca-alternada-halteres',
    name: 'Rosca Alternada com Halteres',
    muscleGroup: 'bracos',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '10 - 12',
    restSeconds: 60,
    suggestedWeightKg: 16,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Bíceps Braquial com Supinação Completa',
    instructions: [
      'Em pé ou sentado, segure os halteres ao lado do corpo com pegada neutra.',
      'Suba um halter de cada vez girando o punho para cima (supinação) durante a subida.',
      'Aperte o bíceps no topo e desça controlando.',
    ],
  },
  {
    id: 'rosca-martelo-halteres',
    name: 'Rosca Martelo com Halteres',
    muscleGroup: 'bracos',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '10 - 12',
    restSeconds: 60,
    suggestedWeightKg: 18,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif',
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Músculo Braquial (Espessura do Braço) • Braquiorradial',
    instructions: [
      'Segure os halteres com as palmas das mãos voltadas uma para a outra.',
      'Flexione os braços mantendo a pegada neutra durante todo o movimento.',
    ],
  },
  {
    id: 'rosca-scott-barra-w',
    name: 'Rosca Scott com Barra W / Máquina',
    muscleGroup: 'bracos',
    equipment: 'barra',
    targetSets: 3,
    targetReps: '10 - 12',
    restSeconds: 60,
    suggestedWeightKg: 30,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Z-Bar-Preacher-Curl.gif',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Bíceps Cabeça Curta (Isolamento sem Balanço)',
    instructions: [
      'Apoie os braços no banco Scott com as axilas bem encaixadas no topo da almofada.',
      'Suba a barra até a contração máxima e desça até quase estender totalmente os cotovelos.',
    ],
  },
  {
    id: 'triceps-corda-polia',
    name: 'Tríceps Corda na Polia Alta',
    muscleGroup: 'bracos',
    equipment: 'polia',
    targetSets: 4,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 25,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Rope-Pushdown.gif',
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Tríceps Cabeça Lateral e Medial',
    instructions: [
      'Cotovelos travados ao lado das costelas.',
      'Puxe a corda para baixo estendendo os braços e abrindo as pontas da corda no final.',
      'Segure 1 segundo contraindo o tríceps.',
    ],
  },
  {
    id: 'triceps-barra-reta-polia',
    name: 'Tríceps na Polia com Barra Reta / V',
    muscleGroup: 'bracos',
    equipment: 'polia',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 60,
    suggestedWeightKg: 35,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Tríceps Braquial (Carga Pesada)',
    instructions: [
      'Segure a barra com pegada pronada.',
      'Empurre para baixo até a extensão completa dos cotovelos.',
    ],
  },
  {
    id: 'triceps-testa-barra-w',
    name: 'Tríceps Testa com Barra W (Skull Crusher)',
    muscleGroup: 'bracos',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 75,
    suggestedWeightKg: 30,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/barbell-lying-triceps-extension.gif',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Tríceps Cabeça Longa (Alongamento)',
    instructions: [
      'Deite-se no banco com a barra W estendida sobre o peito.',
      'Flexione apenas os cotovelos descendo a barra em direção à testa.',
      'Empurre de volta usando a força do tríceps.',
    ],
  },
  {
    id: 'triceps-frances-halteres',
    name: 'Tríceps Francês com Halter',
    muscleGroup: 'bracos',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '10 - 12',
    restSeconds: 60,
    suggestedWeightKg: 24,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Seated-Dumbbell-Triceps-Extension.gif',
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Tríceps Cabeça Longa (Máxima Extensão Acima da Cabeça)',
    instructions: [
      'Sentado, segure o halter com as duas mãos acima da cabeça.',
      'Desça o peso por trás da nuca mantendo os cotovelos o mais fechados possível.',
      'Estenda os braços de volta ao topo.',
    ],
  },
  {
    id: 'supino-fechado-barra',
    name: 'Supino Fechado com Barra',
    muscleGroup: 'bracos',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '8 - 10',
    restSeconds: 90,
    suggestedWeightKg: 70,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Close-Grip-Bench-Press.gif',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Tríceps Braquial • Peitoral Médio',
    instructions: [
      'Pegada na largura dos ombros no banco de supino.',
      'Desça com cotovelos rente ao corpo.',
      'Empurre focando o esforço no tríceps.',
    ],
  },

  // ==========================================
  // CORE & ABDÔMEN
  // ==========================================
  {
    id: 'prancha-isometrica',
    name: 'Prancha Abdominal Isométrica',
    muscleGroup: 'core',
    equipment: 'peso_corporal',
    targetSets: 3,
    targetReps: '45s - 60s',
    restSeconds: 45,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/bodyweight-incline-side-plank.gif',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Transverso do Abdômen • Reto Abdominal • Estabilidade Lombar',
    instructions: [
      'Apoie os antebraços e pontas dos pés no chão.',
      'Mantenha o corpo perfeitamente reto sem deixar o quadril cair ou empinar.',
      'Respire de forma controlada mantendo o abdômen contraído.',
    ],
  },
  {
    id: 'abdominal-cabo-corda',
    name: 'Abdominal na Polia com Corda (Cable Crunch)',
    muscleGroup: 'core',
    equipment: 'polia',
    targetSets: 4,
    targetReps: '15 - 20',
    restSeconds: 60,
    suggestedWeightKg: 40,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Kneeling-Cable-Crunch.gif',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Reto Abdominal Superior e Médio com Sobrecarga',
    instructions: [
      'Ajoelhe-se em frente à polia alta segurando a corda ao lado das orelhas.',
      'Flexione a coluna curvando o tronco e levando a cabeça em direção aos joelhos.',
      'Mantenha o quadril fixo, usando apenas a contração do abdômen.',
    ],
  },
  {
    id: 'abdominal-infra-na-paralela',
    name: 'Abdominal Infra na Paralela / Barra Fixa',
    muscleGroup: 'core',
    equipment: 'peso_corporal',
    targetSets: 3,
    targetReps: '12 - 15',
    restSeconds: 60,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/hanging-leg-raise.gif',
    coverImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Reto Abdominal Inferior • Flexores de Quadril',
    instructions: [
      'Apoie os antebraços na paralela ou pendure-se na barra.',
      'Eleve os joelhos ou pernas estendidas em direção ao peito arredondando levemente a pelve.',
      'Desça controladamente sem balançar o corpo.',
    ],
  },
  {
    id: 'abdominal-com-roda',
    name: 'Abdominal com Roda (Ab Wheel Roller)',
    muscleGroup: 'core',
    equipment: 'peso_corporal',
    targetSets: 3,
    targetReps: '10 - 12',
    restSeconds: 60,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Ab-Wheel-Rollout.gif',
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Core Completo • Anti-Extensão Lombar',
    instructions: [
      'Ajoelhe-se segurando a roda no chão à sua frente.',
      'Role a roda para a frente estendendo o corpo o máximo possível sem arquear a lombar.',
      'Puxe a roda de volta com a força do abdômen.',
    ],
  },

  // ==========================================
  // CARDIO & ENDURANCE
  // ==========================================
  {
    id: 'corrida-intervalada-esteira',
    name: 'Corrida Intervalada (HIIT Esteira)',
    muscleGroup: 'cardio',
    equipment: 'esteira',
    targetSets: 1,
    targetReps: '20 min',
    restSeconds: 0,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/cardio/run-equipment.gif',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
    targetAnatomy: 'VO2 Máximo • Sistema Cardiovascular • Fibras Tipo II',
    instructions: [
      'Aquecimento de 3 minutos em trote leve.',
      'Alterne 1 minuto em velocidade de tiro (14-16 km/h) com 1 minuto de recuperação ativa (6 km/h).',
      'Desaquecimento de 2 minutos no final.',
    ],
  },
  {
    id: 'remo-indoor',
    name: 'Remo Indoor (Rowing Machine)',
    muscleGroup: 'cardio',
    equipment: 'maquina',
    targetSets: 1,
    targetReps: '15 min / 3000m',
    restSeconds: 0,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/cable-seated-high-row-v-bar.gif',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Corpo Inteiro (Pernas, Costas, Ombros e Sistema Cardiorrespiratório)',
    instructions: [
      'Empurre com as pernas, incline o tronco para trás e puxe o cabo até o abdômen.',
      'Retorne estendendo os braços, inclinando o tronco e flexionando os joelhos.',
    ],
  },
  {
    id: 'pular-corda-jump-rope',
    name: 'Pular Corda (Jump Rope HIIT)',
    muscleGroup: 'cardio',
    equipment: 'peso_corporal',
    targetSets: 4,
    targetReps: '3 min',
    restSeconds: 60,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/cardio/jump-rope.gif',
    coverImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Agilidade • Panturrilhas • Gasto Calórico Elevado',
    instructions: [
      'Mantenha os cotovelos próximos ao corpo e gire a corda com os punhos.',
      'Salte na ponta dos pés de forma suave e ritmada.',
    ],
  },

  // ==========================================
  // EXERCÍCIOS ADICIONAIS CATALOGADOS
  // ==========================================
  {
    id: 'supino-declinado-barra',
    name: 'Supino Declinado com Barra',
    muscleGroup: 'peito',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '8 - 10',
    restSeconds: 90,
    suggestedWeightKg: 75,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/barbell-decline-bench-press.gif',
    targetAnatomy: 'Peitoral Inferior (Porção Costal) • Tríceps Braquial',
    secondaryMuscles: ["Tríceps","Deltóide Anterior"],
    instructions: [
      "Prenda os pés firmemente no suporte do banco declinado.",
      "Segure a barra com pegada ligeiramente mais aberta que a largura dos ombros.",
      "Desça a barra controladamente em direção à linha inferior do peitoral.",
      "Empurre com força estendendo os cotovelos sem perder a retração escapular."
],
    commonMistakes: [
      "Bater a barra com impacto na caixa torácica.",
      "Não travar as pernas adequadamente no banco declinado."
]
  },
  {
    id: 'supino-declinado-halteres',
    name: 'Supino Declinado com Halteres',
    muscleGroup: 'peito',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '10 - 12',
    restSeconds: 75,
    suggestedWeightKg: 26,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/dumbbell-decline-bench-press.gif',
    targetAnatomy: 'Peitoral Inferior • Maior Amplitude sem Estresse no Ombro',
    secondaryMuscles: ["Tríceps","Deltóide Anterior"],
    instructions: [
      "Posicione-se no banco declinado com os halteres alinhados ao peitoral inferior.",
      "Desça os pesos em trajetória controlada abrindo o peitoral.",
      "Empurre os halteres para cima convergindo no topo sem encostar os pesos."
],
    commonMistakes: [
      "Descer os halteres muito próximos do pescoço em vez do peitoral inferior."
]
  },
  {
    id: 'crucifixo-declinado-halteres',
    name: 'Crucifixo Declinado com Halteres',
    muscleGroup: 'peito',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 14,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/dumbbell-decline-fly.gif',
    targetAnatomy: 'Porção Inferior do Peitoral Maior (Isolamento)',
    secondaryMuscles: ["Deltóide Anterior"],
    instructions: [
      "Deite-se no banco declinado segurando os halteres acima do peitoral com cotovelos levemente flexionados.",
      "Abra os braços em arco amplo sentindo o alongamento do peito inferior.",
      "Retorne unindo os braços em movimento de abraço."
],
    commonMistakes: [
      "Flexionar excessivamente os cotovelos transformando o exercício em supino."
]
  },
  {
    id: 'crossover-polia-media',
    name: 'Crossover na Polia Média',
    muscleGroup: 'peito',
    equipment: 'polia',
    targetSets: 4,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 20,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/pectorals/cable-standing-up-straight-crossovers.gif',
    targetAnatomy: 'Peitoral Maior (Fibras Esternocostais Médias)',
    secondaryMuscles: ["Deltóide Anterior"],
    instructions: [
      "Ajuste as polias na altura do peito/ombros.",
      "Dê um passo à frente mantendo a coluna ereta e core travado.",
      "Puxe os cabos unindo as mãos à frente do centro do peito.",
      "Segure 1 segundo no pico de contração antes de controlar o retorno."
],
    commonMistakes: [
      "Projetar o tronco para frente usando impulso corporal."
]
  },
  {
    id: 'flexao-de-braco-diamante',
    name: 'Flexão de Braço Diamante (Foco Peitoral e Tríceps)',
    muscleGroup: 'peito',
    equipment: 'peso_corporal',
    targetSets: 3,
    targetReps: '10 - 15',
    restSeconds: 60,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/band-close-grip-push-up.gif',
    targetAnatomy: 'Peitoral Medial • Tríceps Cabeça Medial e Lateral',
    secondaryMuscles: ["Tríceps","Core"],
    instructions: [
      "Posicione as mãos no chão sob o peito unindo polegares e indicadores em formato de diamante.",
      "Desça o corpo em bloco reto até o peito quase tocar as mãos.",
      "Empurre o chão com força até a extensão dos braços."
],
    commonMistakes: [
      "Deixar o quadril cair desalinhando a coluna vertebral."
]
  },
  {
    id: 'puxada-articulada-maquina',
    name: 'Puxada Alta Articulada na Máquina',
    muscleGroup: 'costas',
    equipment: 'maquina',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 75,
    suggestedWeightKg: 70,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/lever-front-pulldown.gif',
    targetAnatomy: 'Grande Dorsal (Movimento Convergente Guiado)',
    secondaryMuscles: ["Bíceps","Redondo Maior"],
    instructions: [
      "Ajuste a altura do banco para total extensão dos braços no topo.",
      "Puxe as manoplas convergindo os cotovelos para baixo e para trás.",
      "Contraia o grande dorsal na base e retorne controladamente."
],
    commonMistakes: [
      "Puxar usando excesso de força nos antebraços e bíceps em vez das costas."
]
  },
  {
    id: 'remada-curvada-supinada',
    name: 'Remada Curvada com Pegada Supinada (Yates Row)',
    muscleGroup: 'costas',
    equipment: 'barra',
    targetSets: 4,
    targetReps: '8 - 10',
    restSeconds: 90,
    suggestedWeightKg: 75,
    gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif',
    targetAnatomy: 'Dorsal Inferior • Bíceps Braquial • Trapézio Médio',
    secondaryMuscles: ["Bíceps","Lombar"],
    instructions: [
      "Segure a barra com palmas voltadas para a frente (pegada supinada).",
      "Incline o tronco mantendo a coluna lombar perfeitamente travada.",
      "Puxe a barra em direção ao umbigo rente às coxas.",
      "Aperte as escápulas no final do movimento."
],
    commonMistakes: [
      "Arredondar a coluna lombar durante a puxada."
]
  },
  {
    id: 'remada-cavalinho-pegada-aberta',
    name: 'Remada Cavalinho com Pegada Aberta (T-Bar Pronada)',
    muscleGroup: 'costas',
    equipment: 'barra',
    targetSets: 3,
    targetReps: '10 - 12',
    restSeconds: 75,
    suggestedWeightKg: 45,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/cable-pulldown-pro-lat-bar.gif',
    targetAnatomy: 'Dorsal Superior • Deltóide Posterior • Rombóides',
    secondaryMuscles: ["Trapézio","Bíceps"],
    instructions: [
      "Posicione-se com os pés firmes na plataforma da barra T.",
      "Segure na pegada aberta pronada e puxe em direção ao peitoral inferior.",
      "Foque na adução das escápulas e controle a descida."
],
    commonMistakes: [
      "Fazer tranco com as pernas para levantar a carga."
]
  },
  {
    id: 'barra-fixa-neutra',
    name: 'Barra Fixa com Pegada Neutra (Triângulo / Paralela)',
    muscleGroup: 'costas',
    equipment: 'peso_corporal',
    targetSets: 4,
    targetReps: '6 - 10',
    restSeconds: 90,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/assisted-standing-chin-up.gif',
    targetAnatomy: 'Grande Dorsal • Braquial • Menor Estresse nos Ombros',
    secondaryMuscles: ["Braquial","Bíceps"],
    instructions: [
      "Segure as manoplas paralelas com palmas voltadas uma para a outra.",
      "Puxe o corpo verticalmente até o peito atingir a linha das mãos.",
      "Desça de forma estrita e sem balanço."
],
    commonMistakes: [
      "Balançar as pernas para criar impulso (kipping)."
]
  },
  {
    id: 'puxada-unilateral-polia',
    name: 'Puxada Unilateral na Polia Alta',
    muscleGroup: 'costas',
    equipment: 'polia',
    targetSets: 3,
    targetReps: '10 - 12 cada lado',
    restSeconds: 60,
    suggestedWeightKg: 25,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/lats/band-kneeling-one-arm-pulldown.gif',
    targetAnatomy: 'Grande Dorsal Unilateral (Alinhamento de Fibras)',
    secondaryMuscles: ["Bíceps","Core"],
    instructions: [
      "Ajoelhe-se ou sente-se em frente à polia segurando uma manopla única.",
      "Puxe o cotovelo para baixo e para o lado do quadril.",
      "Aperte o grande dorsal e sinta o alongamento completo no topo."
],
    commonMistakes: [
      "Rotacionar excessivamente o tronco durante o movimento."
]
  },
  {
    id: 'agachamento-goblet-halter',
    name: 'Agachamento Goblet com Halter / Kettlebell',
    muscleGroup: 'pernas',
    equipment: 'halteres',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 60,
    suggestedWeightKg: 24,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/quads/dumbbell-goblet-squat.gif',
    targetAnatomy: 'Quadríceps • Core Vertical • Mobilidade de Tornozelo',
    secondaryMuscles: ["Glúteos","Core"],
    instructions: [
      "Segure um halter verticalmente junto ao peito com ambas as mãos.",
      "Pés na largura dos ombros, pontas levemente para fora.",
      "Agache profundamente empurrando os joelhos para fora.",
      "Mantenha o tronco ereto e suba empurrando o solo."
],
    commonMistakes: [
      "Afastar o halter do peito, sobrecarregando a lombar."
]
  },
  {
    id: 'agachamento-smith',
    name: 'Agachamento no Smith Machine',
    muscleGroup: 'pernas',
    equipment: 'maquina',
    targetSets: 4,
    targetReps: '8 - 10',
    restSeconds: 90,
    suggestedWeightKg: 80,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/quads/smith-chair-squat.gif',
    targetAnatomy: 'Quadríceps (Estabilidade Guiada e Foco Muscular)',
    secondaryMuscles: ["Glúteos","Isquiotibiais"],
    instructions: [
      "Posicione a barra sobre os trapézios com pés ligeiramente à frente.",
      "Destrave a barra e desça controladamente até 90 graus.",
      "Empurre o chão com foco na contração dos quadríceps."
],
    commonMistakes: [
      "Posicionar os pés muito atrás sob a barra comprimindo as patelas."
]
  },
  {
    id: 'stiff-com-halteres',
    name: 'Stiff com Halteres (Romanian Deadlift)',
    muscleGroup: 'pernas',
    equipment: 'halteres',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 75,
    suggestedWeightKg: 22,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/hamstrings/barbell-straight-leg-deadlift.gif',
    targetAnatomy: 'Isquiotibiais (Posterior de Coxa) • Glúteo Máximo',
    secondaryMuscles: ["Glúteos","Lombar"],
    instructions: [
      "Em pé segurando os halteres à frente das coxas.",
      "Empurre o quadril para trás mantendo os joelhos levemente destravados.",
      "Desça os halteres rente às pernas até sentir forte alongamento posterior.",
      "Suba contraindo os glúteos e posteriores."
],
    commonMistakes: [
      "Flexionar os joelhos como agachamento em vez de empurrar o quadril."
]
  },
  {
    id: 'extensao-de-quadril-na-polia-gluteo',
    name: 'Extensão de Quadril na Polia (Glúteo Coice)',
    muscleGroup: 'pernas',
    equipment: 'polia',
    targetSets: 4,
    targetReps: '12 - 15 cada perna',
    restSeconds: 45,
    suggestedWeightKg: 15,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/cable-standing-hip-extension.gif',
    targetAnatomy: 'Glúteo Máximo (Isolamento e Tensão Contínua)',
    secondaryMuscles: ["Isquiotibiais"],
    instructions: [
      "Prenda o estribo no tornozelo e conecte à polia baixa.",
      "Incline o tronco levemente à frente apoiando as mãos na estrutura.",
      "Empurre a perna para trás e para cima contraindo o glúteo.",
      "Segure 1 segundo no topo e retorne com controle."
],
    commonMistakes: [
      "Hiperestender a lombar para elevar a perna além do limite do quadril."
]
  },
  {
    id: 'panturrilha-no-leg-press',
    name: 'Panturrilha no Leg Press 45°',
    muscleGroup: 'pernas',
    equipment: 'maquina',
    targetSets: 4,
    targetReps: '15 - 20',
    restSeconds: 45,
    suggestedWeightKg: 160,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/calves/lever-seated-squat-calf-raise-on-leg-press-machine.gif',
    targetAnatomy: 'Gastrocnêmio • Sobrecarga Alta para Panturrilha',
    secondaryMuscles: ["Sóleo"],
    instructions: [
      "Posicione apenas a ponta dos pés na borda inferior da plataforma do Leg Press.",
      "Mantenha os joelhos quase estendidos (com trava de segurança ativa).",
      "Faça flexão plantar empurrando a plataforma com a ponta dos pés.",
      "Desça até sentir alongamento profundo no calcanhar."
],
    commonMistakes: [
      "Deixar a ponta dos pés escorregar da plataforma."
]
  },
  {
    id: 'agachamento-sumo-com-halter',
    name: 'Agachamento Sumô com Halter',
    muscleGroup: 'pernas',
    equipment: 'halteres',
    targetSets: 4,
    targetReps: '10 - 12',
    restSeconds: 75,
    suggestedWeightKg: 28,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/glutes/smith-sumo-squat.gif',
    targetAnatomy: 'Adutores da Coxa • Glúteo Máximo • Quadríceps',
    secondaryMuscles: ["Quadríceps","Core"],
    instructions: [
      "Pés bem afastados (mais largos que os ombros) e pontas apontando para fora a 45°.",
      "Segure o halter na vertical com as duas mãos entre as pernas.",
      "Desça o quadril verticalmente mantendo os joelhos na direção dos pés.",
      "Suba apertando os adutores e glúteos."
],
    commonMistakes: [
      "Deixar os joelhos desabarem para dentro (valgo dinâmico)."
]
  },
  {
    id: 'elevacao-frontal-com-halteres',
    name: 'Elevação Frontal com Halteres',
    muscleGroup: 'ombros',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 10,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/dumbbell-front-raise-v-2.gif',
    targetAnatomy: 'Deltóide Anterior (Porção Clavicular)',
    secondaryMuscles: ["Peitoral Superior","Trapézio"],
    instructions: [
      "Em pé, segure os halteres à frente das coxas com pegada pronada ou neutra.",
      "Eleve os braços à frente até a altura dos olhos com leve flexão no cotovelo.",
      "Desça de forma controlada resistindo à gravidade."
],
    commonMistakes: [
      "Balançar o tronco para trás para impulsionar o peso."
]
  },
  {
    id: 'elevacao-frontal-na-polia-corda',
    name: 'Elevação Frontal na Polia com Corda',
    muscleGroup: 'ombros',
    equipment: 'polia',
    targetSets: 3,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 15,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/cable-front-raise.gif',
    targetAnatomy: 'Deltóide Anterior com Tensão Mecânica Contínua',
    secondaryMuscles: ["Trapézio"],
    instructions: [
      "Fique de costas para a polia baixa passando a corda entre as pernas.",
      "Segure as pontas da corda e eleve os braços à frente até a linha dos olhos.",
      "Aproveite a tensão no ponto inferior sem deixar o peso encostar."
],
    commonMistakes: [
      "Puxar com os punhos em vez de elevar com os deltóides."
]
  },
  {
    id: 'remada-alta-na-polia',
    name: 'Remada Alta na Polia com Barra Reta / Corda',
    muscleGroup: 'ombros',
    equipment: 'polia',
    targetSets: 3,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 30,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/cable-upright-row.gif',
    targetAnatomy: 'Deltóide Lateral • Trapézio Superior',
    secondaryMuscles: ["Bíceps","Braquial"],
    instructions: [
      "Segure a barra da polia baixa com pegada na largura dos ombros.",
      "Puxe a barra verticalmente rente ao corpo elevando os cotovelos acima da linha dos ombros.",
      "Desça controladamente estendendo os braços."
],
    commonMistakes: [
      "Usar pegada muito fechada que comprime as articulações dos punhos e ombros."
]
  },
  {
    id: 'remada-alta-com-barra-w',
    name: 'Remada Alta com Barra W',
    muscleGroup: 'ombros',
    equipment: 'barra',
    targetSets: 3,
    targetReps: '10 - 12',
    restSeconds: 60,
    suggestedWeightKg: 35,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/delts/barbell-upright-row-v-2.gif',
    targetAnatomy: 'Deltóide Lateral • Trapézio',
    secondaryMuscles: ["Bíceps","Braquiorradial"],
    instructions: [
      "Segure a barra W na curvatura externa anatômica.",
      "Puxe a barra em direção ao peito com cotovelos apontando para o teto.",
      "Controle a fase excêntrica da descida."
],
    commonMistakes: [
      "Elevar a barra acima do peito gerando impacto subacromial."
]
  },
  {
    id: 'encolhimento-com-halteres',
    name: 'Encolhimento de Ombros com Halteres',
    muscleGroup: 'ombros',
    equipment: 'halteres',
    targetSets: 4,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 32,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/traps/dumbbell-shrug.gif',
    targetAnatomy: 'Trapézio Superior (Espessura do Pescoço/Ombros)',
    secondaryMuscles: ["Antebraço"],
    instructions: [
      "Segure halteres pesados ao lado do corpo com pegada neutra.",
      "Eleve os ombros diretamente para cima em direção às orelhas.",
      "Segure 1 a 2 segundos no topo com contração máxima e desça lentamente."
],
    commonMistakes: [
      "Rodar os ombros em círculos (risco de lesão articular)."
]
  },
  {
    id: 'rosca-biceps-polia-baixa',
    name: 'Rosca Bíceps na Polia Baixa com Barra Reta',
    muscleGroup: 'bracos',
    equipment: 'polia',
    targetSets: 4,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 30,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/cable-close-grip-curl.gif',
    targetAnatomy: 'Bíceps Braquial com Tensão Mecânica Contínua',
    secondaryMuscles: ["Braquial"],
    instructions: [
      "Em pé, segure a barra da polia baixa com pegada supinada.",
      "Mantenha os cotovelos travados junto ao tronco.",
      "Flexione os braços até a contração máxima do bíceps.",
      "Desça devagar aproveitando a resistência constante do cabo."
],
    commonMistakes: [
      "Mover os cotovelos para frente tirando a tensão do bíceps."
]
  },
  {
    id: 'rosca-concentrada-com-halter',
    name: 'Rosca Concentrada com Halter (Arnold Curl)',
    muscleGroup: 'bracos',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '10 - 12 cada braço',
    restSeconds: 60,
    suggestedWeightKg: 14,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/dumbbell-concentration-curl.gif',
    targetAnatomy: 'Pico do Bíceps (Cabeça Longa e Braquial)',
    secondaryMuscles: ["Braquiorradial"],
    instructions: [
      "Sente-se no banco com as pernas abertas, apoiando o cotovelo na parte interna da coxa.",
      "Erga o halter flexionando o braço até a contração máxima.",
      "Aperte o bíceps no topo por 1 segundo e desça com controle total."
],
    commonMistakes: [
      "Usar o tronco para puxar o peso em vez de manter o cotovelo fixo."
]
  },
  {
    id: 'rosca-inclinada-no-banco-45',
    name: 'Rosca Inclinada no Banco 45° com Halteres',
    muscleGroup: 'bracos',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '10 - 12',
    restSeconds: 60,
    suggestedWeightKg: 14,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/dumbbell-incline-biceps-curl.gif',
    targetAnatomy: 'Cabeça Longa do Bíceps (Alongamento Máximo Posterior)',
    secondaryMuscles: ["Braquial"],
    instructions: [
      "Ajuste o banco a 45 graus e deite apoiando totalmente as costas.",
      "Deixe os braços suspensos para trás na vertical.",
      "Flexione os cotovelos girando os punhos para cima (supinação).",
      "Desça até sentir o alongamento profundo na cabeça longa do bíceps."
],
    commonMistakes: [
      "Projetar os cotovelos para frente durante a subida."
]
  },
  {
    id: 'rosca-inversa-barra-w',
    name: 'Rosca Inversa com Barra W (Antebraço & Braquiorradial)',
    muscleGroup: 'bracos',
    equipment: 'barra',
    targetSets: 3,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 25,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/biceps/barbell-reverse-curl.gif',
    targetAnatomy: 'Braquiorradial • Extensores do Punho • Braquial',
    secondaryMuscles: ["Antebraço"],
    instructions: [
      "Segure a barra W com pegada pronada (palmas voltadas para baixo).",
      "Flexione os cotovelos mantendo os punhos firmes e alinhados.",
      "Excelente para desenvolvimento da espessura do antebraço."
],
    commonMistakes: [
      "Flexionar os punhos para trás desestabilizando a articulação."
]
  },
  {
    id: 'triceps-coice-com-halter',
    name: 'Tríceps Coice com Halter / Polia (Kickback)',
    muscleGroup: 'bracos',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '12 - 15 cada braço',
    restSeconds: 60,
    suggestedWeightKg: 10,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/cable-kickback.gif',
    targetAnatomy: 'Tríceps Cabeça Lateral (Pico de Encurtamento)',
    secondaryMuscles: ["Deltóide Posterior"],
    instructions: [
      "Apoie o joelho no banco ou incline o tronco paralelo ao solo.",
      "Mantenha o cotovelo alto alinhado ao tronco.",
      "Estenda o antebraço para trás até o alinhamento completo.",
      "Aperte o tríceps por 1 segundo e retorne a 90 graus."
],
    commonMistakes: [
      "Deixar o cotovelo cair durante o movimento perdendo a linha de tensão."
]
  },
  {
    id: 'triceps-banco',
    name: 'Mergulho no Banco para Tríceps (Bench Dip)',
    muscleGroup: 'bracos',
    equipment: 'peso_corporal',
    targetSets: 3,
    targetReps: '12 - 15',
    restSeconds: 60,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/bench-dip-knees-bent.gif',
    targetAnatomy: 'Tríceps Braquial Completo',
    secondaryMuscles: ["Deltóide Anterior","Peitoral Inferior"],
    instructions: [
      "Apoie as mãos na borda do banco com os dedos apontando para a frente.",
      "Estenda ou flexione as pernas à frente.",
      "Desça o quadril próximo ao banco flexionando os cotovelos até 90 graus.",
      "Empurre estendendo os braços com força."
],
    commonMistakes: [
      "Afastar o corpo do banco sobrecarregando a cápsula anterior do ombro."
]
  },
  {
    id: 'triceps-frances-na-polia-corda',
    name: 'Tríceps Francês na Polia com Corda',
    muscleGroup: 'bracos',
    equipment: 'polia',
    targetSets: 4,
    targetReps: '12 - 15',
    restSeconds: 60,
    suggestedWeightKg: 25,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/triceps/cable-overhead-triceps-extension-rope-attachment.gif',
    targetAnatomy: 'Cabeça Longa do Tríceps (Alongamento em Tensão Contínua)',
    secondaryMuscles: ["Core"],
    instructions: [
      "Posicione a polia média/alta com corda e dê um passo à frente de costas para o aparelho.",
      "Inicie com os braços flexionados atrás da cabeça.",
      "Estenda os braços à frente abrindo a corda no ponto de contração máxima.",
      "Controle a volta sentindo o alongamento do tríceps."
],
    commonMistakes: [
      "Abrir excessivamente os cotovelos lateralmente."
]
  },
  {
    id: 'abdominal-supra-solo',
    name: 'Abdominal Supra Tradicional no Solo',
    muscleGroup: 'core',
    equipment: 'peso_corporal',
    targetSets: 3,
    targetReps: '20 - 25',
    restSeconds: 45,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/band-push-sit-up.gif',
    targetAnatomy: 'Reto Abdominal (Porção Superior e Média)',
    secondaryMuscles: ["Oblíquos"],
    instructions: [
      "Deite-se de costas com os joelhos flexionados e pés no chão.",
      "Mãos ao lado das têmporas ou cruzadas no peito.",
      "Flexione a coluna elevando as escápulas do chão com contração abdominal.",
      "Desça lentamente sem relaxar a musculatura."
],
    commonMistakes: [
      "Puxar o pescoço com as mãos gerando tensão cervical."
]
  },
  {
    id: 'abdominal-bicicleta-air-bike',
    name: 'Abdominal Bicicleta no Solo (Air Bike Crunch)',
    muscleGroup: 'core',
    equipment: 'peso_corporal',
    targetSets: 3,
    targetReps: '15 - 20 cada lado',
    restSeconds: 45,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/air-bike.gif',
    targetAnatomy: 'Oblíquos Internos e Externos • Reto Abdominal',
    secondaryMuscles: ["Flexores de Quadril"],
    instructions: [
      "Deite-se no chão e eleve as pernas com joelhos a 90 graus.",
      "Gire o tronco levando o cotovelo direito em direção ao joelho esquerdo enquanto estende a perna direita.",
      "Alterne os lados de forma contínua e rítmica."
],
    commonMistakes: [
      "Fazer o movimento rápido demais sem contração consciente dos oblíquos."
]
  },
  {
    id: 'prancha-lateral',
    name: 'Prancha Lateral Isométrica',
    muscleGroup: 'core',
    equipment: 'peso_corporal',
    targetSets: 3,
    targetReps: '30s - 45s cada lado',
    restSeconds: 45,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/bodyweight-incline-side-plank.gif',
    targetAnatomy: 'Quadrado Lombar • Oblíquos • Estabilizadores do Quadril',
    secondaryMuscles: ["Glúteo Médio"],
    instructions: [
      "Apoie o antebraço no chão alinhado abaixo do ombro.",
      "Eleve o quadril formando uma linha reta dos pés à cabeça.",
      "Segure a posição contraindo o abdômen e glúteos."
],
    commonMistakes: [
      "Deixar o quadril cair em direção ao chão."
]
  },
  {
    id: 'russian-twist-com-peso',
    name: 'Russian Twist com Halter / Anilha',
    muscleGroup: 'core',
    equipment: 'halteres',
    targetSets: 3,
    targetReps: '15 cada lado',
    restSeconds: 45,
    suggestedWeightKg: 8,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/abs/assisted-motion-russian-twist.gif',
    targetAnatomy: 'Oblíquos do Abdômen • Força Rotacional do Core',
    secondaryMuscles: ["Reto Abdominal"],
    instructions: [
      "Sente-se no chão inclinando o tronco a 45 graus e tirando os pés do solo.",
      "Segure o peso com as duas mãos e gire o tronco de um lado para o outro.",
      "Toque suavemente o peso próximo ao chão a cada repetição."
],
    commonMistakes: [
      "Girar apenas os braços em vez de rotacionar todo o tronco."
]
  },
  {
    id: 'air-bike-assault-bike',
    name: 'Air Bike / Assault Bike (HIIT Intenso)',
    muscleGroup: 'cardio',
    equipment: 'maquina',
    targetSets: 1,
    targetReps: '15 min / Tabata',
    restSeconds: 0,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/cardio/cycle-cross-trainer.gif',
    targetAnatomy: 'Sistema Cardiorrespiratório Total • Queima Calórica Intensa',
    secondaryMuscles: ["Pernas","Ombros","Braços"],
    instructions: [
      "Ajuste a altura do selim para ligeira flexão de joelho na base.",
      "Empurre e puxe as alavancas com os braços enquanto pedala com força máxima.",
      "Excelente para protocolos HIIT de 20s de tiro por 10s de descanso."
],
    commonMistakes: [
      "Usar apenas a força das pernas sem engajar os membros superiores."
]
  },
  {
    id: 'burpee-completo',
    name: 'Burpee Completo com Salto',
    muscleGroup: 'cardio',
    equipment: 'peso_corporal',
    targetSets: 4,
    targetReps: '15 repetições',
    restSeconds: 60,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/cardio/burpee.gif',
    targetAnatomy: 'Condicionamento Metabólico • Corpo Inteiro',
    secondaryMuscles: ["Pernas","Peitoral","Core"],
    instructions: [
      "Em pé, agache e apoie as mãos no chão.",
      "Jogue as pernas para trás em posição de prancha e faça uma flexão tocando o peito no chão.",
      "Puxe os pés de volta para perto das mãos e salte explosivamente estendendo os braços acima."
],
    commonMistakes: [
      "Deixar a lombar desabar na descida da flexão."
]
  },
  {
    id: 'mountain-climber-escalador',
    name: 'Mountain Climber (Escalador no Solo)',
    muscleGroup: 'cardio',
    equipment: 'peso_corporal',
    targetSets: 4,
    targetReps: '45 segundos',
    restSeconds: 45,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/cardio/mountain-climber.gif',
    targetAnatomy: 'Cardio Dinâmico • Core • Estabilidade de Ombros',
    secondaryMuscles: ["Core","Quadríceps"],
    instructions: [
      "Inicie em posição de flexão de braço com o corpo em linha reta.",
      "Puxe um joelho em direção ao peito e alterne as pernas em ritmo acelerado.",
      "Mantenha o quadril baixo e o abdômen contraído."
],
    commonMistakes: [
      "Elevar o quadril muito alto durante a corrida."
]
  },

  // ==========================================
  // CORRIDA & MODALIDADES AERÓBICAS
  // ==========================================
  {
    id: 'rodagem-leve-base',
    name: 'Rodagem Leve (ou Base)',
    muscleGroup: 'corrida',
    equipment: 'rua',
    targetSets: 1,
    targetReps: '40 - 60 min (Zona 2)',
    restSeconds: 0,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/cardio/run-equipment.gif',
    coverImage: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Resistência Aeróbica (Zona 2) • Densidade Mitocondrial • Economia de Corrida',
    secondaryMuscles: ['Panturrilhas', 'Quadríceps', 'Glúteos', 'Core'],
    instructions: [
      'Corra em intensidade moderada/leve (Zona 2 cardíaca: 65% a 75% da FCM), em ritmo confortável e conversacional.',
      'Mantenha a postura ereta com leve inclinação do tronco a partir dos tornozelos.',
      'Cadência controlada em torno de 170 a 180 passos por minuto, aterrissando suavemente com o médio-pé.',
      'Foco em respiração ritmada (ex: 3 passos inspirando, 3 passos expirando).'
    ],
    commonMistakes: [
      'Correr rápido demais no dia de base, ultrapassando o limiar aeróbio.',
      'Overstriding (pisar com o calcanhar muito à frente do centro de gravidade).',
      'Tensionar ombros e trapézio durante a passada.'
    ]
  },
  {
    id: 'treino-longo-longao',
    name: 'Treino Longo (Longão)',
    muscleGroup: 'corrida',
    equipment: 'rua',
    targetSets: 1,
    targetReps: '60 - 120 min (10k - 21k+)',
    restSeconds: 0,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/cardio/run-equipment.gif',
    coverImage: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Capacidade de Sustentação Aeróbica • Metabolismo de Lipídios • Resiliência Articular',
    secondaryMuscles: ['Glúteo Médio', 'Isquiotibiais', 'Sóleo', 'Cardiovascular'],
    instructions: [
      'Inicie a corrida em ritmo conservador (ritmo de rodagem suave) e mantenha constância em toda a sessão.',
      'Realize hidratação a cada 20 a 30 minutos e suplementação com carboidrato em gel a cada 40 a 50 minutos.',
      'Mantenha oscilação vertical mínima para poupar energia mecânica.',
      'Finalize os últimos 2 a 3 km mantendo o ritmo sem sprintar para preservar a recuperação neuromuscular.'
    ],
    commonMistakes: [
      'Começar acelerado e quebrar drasticamente na segunda metade do treino.',
      'Não se planejar com hidratação e reposição eletrolítica.',
      'Ignorar o descanso prévio e o sono na véspera do longão.'
    ]
  },
  {
    id: 'treino-intervalado-tiros',
    name: 'Treino Intervalado (Tiros)',
    muscleGroup: 'corrida',
    equipment: 'pista',
    targetSets: 8,
    targetReps: '400m - 1000m (Zona 5)',
    restSeconds: 90,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/cardio/run-equipment.gif',
    coverImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Consumo Máximo de Oxigênio (VO2 Máx) • Fibras Tipo II • Potência Neuromuscular',
    secondaryMuscles: ['Quadríceps', 'Isquiotibiais', 'Gastrocnêmio', 'Core'],
    instructions: [
      'Faça aquecimento de 15 minutos em trote leve seguido de educativos de corrida (skipping, anfersen, acelerações curtas).',
      'Execute as repetições de tiro (ex: 8x 400m ou 6x 800m) no pace alvo prescrito (Zona 5 / acima de 90% FCM).',
      'Durante o intervalo de 60 a 90 segundos, mantenha recuperação ativa com caminhada ou trote muito leve.',
      'Finalize com 10 minutos de desaquecimento e soltura.'
    ],
    commonMistakes: [
      'Dar 100% no primeiro tiro e não conseguir sustentar os intervalos seguintes.',
      'Pular a fase de aquecimento dinâmico gerando alto risco de estiramento de isquiotibiais.',
      'Sentar ou parar bruscamente durante o intervalo de recuperação.'
    ]
  },
  {
    id: 'tempo-run-ritmo',
    name: 'Tempo Run (Ritmo)',
    muscleGroup: 'corrida',
    equipment: 'rua',
    targetSets: 1,
    targetReps: '20 - 40 min no Limiar',
    restSeconds: 0,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/cardio/run-equipment.gif',
    coverImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Limiar Anaeróbio de Lactato • Eficiência em Ritmo de Prova • Tolerância à Acidose',
    secondaryMuscles: ['Sistema Cardiovascular', 'Panturrilhas', 'Glúteos', 'Isquiotibiais'],
    instructions: [
      'Aqueça por 10 minutos em trote suave antes do bloco contínuo de ritmo.',
      'Entre no ritmo do bloco principal: esforço "confortavelmente difícil" (Zona 4: 85% a 90% FCM, ritmo de prova de 10k/15k).',
      'Mantenha o pace milimetricamente estável do início ao fim do bloco sem oscilar para tiro.',
      'Desaqueça por 5 a 10 minutos em trote regenerativo.'
    ],
    commonMistakes: [
      'Exceder o limiar de lactato e transformar a sessão em tiro anaeróbio com fadiga precoce.',
      'Oscilar o ritmo em terrenos irregulares em vez de manter esforço perceptivo constante.'
    ]
  },
  {
    id: 'fartlek-jogo-de-velocidade',
    name: 'Fartlek',
    muscleGroup: 'corrida',
    equipment: 'rua',
    targetSets: 1,
    targetReps: '30 - 45 min (Ritmos Variados)',
    restSeconds: 0,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/cardio/run-equipment.gif',
    coverImage: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Flexibilidade Metabólica • Adaptação a Subidas e Mudanças de Ritmo • Recrutamento Misto',
    secondaryMuscles: ['Quadríceps', 'Glúteos', 'Panturrilhas', 'Estabilizadores do Quadril'],
    instructions: [
      'Treino contínuo sem paradas, alternando estímulos fortes (ex: 2 min forte) com recuperações em trote ativo (ex: 1 min leve).',
      'Aproveite subidas e retas do percurso para acelerar e descidas suaves para soltura.',
      'Treino guiado por sensação de esforço (RPE 7-9 nos trechos fortes, RPE 4-5 nas recuperações).',
      'Excelente ferramenta para quebrar monotonia e ganhar inteligência de prova.'
    ],
    commonMistakes: [
      'Parar completamente de correr nos trechos de recuperação.',
      'Não manter uma estrutura planejada ou se desgastar nos primeiros 10 minutos.'
    ]
  },
  {
    id: 'corrida-regenerativa',
    name: 'Regenerativo',
    muscleGroup: 'corrida',
    equipment: 'esteira',
    targetSets: 1,
    targetReps: '20 - 35 min (Zona 1)',
    restSeconds: 0,
    gifUrl: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/cardio/run-equipment.gif',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80',
    targetAnatomy: 'Recuperação Ativa (Zona 1) • Aumento do Fluxo Sanguíneo • Remoção de Metabólitos',
    secondaryMuscles: ['Panturrilhas', 'Sistema Cardiovascular'],
    instructions: [
      'Corrida em intensidade extremamente leve (Zona 1: < 65% FCM), trote muito solto e relaxado.',
      'Foco total em postura descontraída, braços soltos e aterrissagem leve.',
      'Sessão ideal para o dia seguinte a um treino pesado de pernas ou um longão de fim de semana.',
      'Pode ser realizada na esteira acolchoada ou em grama/pista para minimizar impacto articular.'
    ],
    commonMistakes: [
      'Aumentar o ritmo por ego ou impaciência, atrapalhando a regeneração das fibras musculares.',
      'Correr com calçado desgastado ou com dor articular aguda.'
    ]
  }
];
