import {
  Exercise,
  WorkoutRoutine,
  RunningLog,
  RunningPlan,
  BodyMetrics,
  ProgressPhoto,
  RecoveryCheckin,
  WeeklyScheduleDay,
  UserProfile,
  WeeklyReport,
} from '../types/database';

export const SEED_PROFILE: UserProfile = {
  id: 'user_default',
  name: 'Atleta',
  email: 'atleta@meutreinador.app',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  initial_weight_kg: 84.5,
  target_weight_kg: 78.0,
  current_weight_kg: 79.8,
  height_cm: 178,
  experience_level: 'intermediario',
  bench_pr_kg: 105,
  squat_pr_kg: 140,
  deadlift_pr_kg: 165,
  best_5k_time: '24:12',
  best_5k_pace: '4:50',
  streak_days: 14,
  total_workouts_completed: 48,
};

export const SEED_EXERCISES: Exercise[] = [
  // ==========================================
  // PEITORAL (CHEST)
  // ==========================================
  {
    id: 'supino-reto-barra',
    name: 'Supino Reto com Barra',
    primary_muscle: 'peito',
    secondary_muscles: ['triceps', 'ombros'],
    equipment: 'barra',
    focus: 'hipertrofia',
    description: 'Exercício composto fundamental para construção de força e hipertrofia da porção média e esternal do peitoral maior.',
    execution_cues: [
      'Deite-se no banco mantendo os pés firmes no chão.',
      'Abaixe as escápulas e faça uma leve retração escapular.',
      'Pegue a barra com pegada ligeiramente mais larga que a largura dos ombros.',
      'Desça a barra controladamente até a linha dos mamilos.',
      'Empurre a barra com força sem perder o arco natural lombar e sem estalar os cotovelos.'
    ],
    common_mistakes: [
      'Projetar os ombros para frente no topo da subida.',
      'Bater a barra no peito com impulso.',
      'Abrir os cotovelos a 90 graus em relação ao tronco (risco articular).'
    ],
    image_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'supino-inclinado-halteres',
    name: 'Supino Inclinado com Halteres',
    primary_muscle: 'peito',
    secondary_muscles: ['ombros', 'triceps'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Excelente para ênfase na porção clavicular (superior) do peitoral com maior amplitude de movimento.',
    execution_cues: [
      'Ajuste o banco em inclinação de 30° a 45°.',
      'Segure os halteres na altura do peito com escápulas travadas.',
      'Empurre os halteres até o topo em trajetória levemente convergente.',
      'Desça até sentir um alongamento agradável no peitoral superior.'
    ],
    common_mistakes: [
      'Inclinar o banco a mais de 45° (transforma em treino de ombro).',
      'Bater os halteres no topo perdendo a tensão mecânica.'
    ]
  },
  {
    id: 'supino-inclinado-barra',
    name: 'Supino Inclinado com Barra',
    primary_muscle: 'peito',
    secondary_muscles: ['ombros', 'triceps'],
    equipment: 'barra',
    focus: 'forca',
    description: 'Desenvolvimento de força bruta no peitoral superior e ombros anteriores.',
    execution_cues: [
      'Banco a 30-45 graus. Mãos firmes um pouco além da largura dos ombros.',
      'Desça a barra tocando suavemente a parte superior do tórax / clavícula.',
      'Empurre estendendo os cotovelos sem descolar as escápulas do banco.'
    ],
    common_mistakes: ['Descer a barra no pescoço', 'Tirar o quadril do banco']
  },
  {
    id: 'supino-declinado-barra',
    name: 'Supino Declinado com Barra',
    primary_muscle: 'peito',
    secondary_muscles: ['triceps'],
    equipment: 'barra',
    focus: 'hipertrofia',
    description: 'Foco na porção inferior do peitoral maior com menor estresse na articulação glenoumeral.',
    execution_cues: [
      'Prenda os pés no apoio do banco declinado.',
      'Desça a barra controladamente na linha inferior do peito.',
      'Empurre para cima verticalmente com controle.'
    ],
    common_mistakes: ['Perder a pegada firme na barra', 'Subir muito rápido sem controle excêntrico']
  },
  {
    id: 'supino-reto-halteres',
    name: 'Supino Reto com Halteres',
    primary_muscle: 'peito',
    secondary_muscles: ['triceps', 'ombros'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Permite maior amplitude de alongamento e correção de assimetrias bilaterais.',
    execution_cues: [
      'Deite-se com os halteres na linha do peito.',
      'Empurre os pesos convergindo suavemente no topo sem encostá-los.',
      'Desça controlando a rotação natural dos punhos.'
    ],
    common_mistakes: ['Abrir os cotovelos demais', 'Deixar os halteres caírem descontroladamente']
  },
  {
    id: 'crucifixo-reto-halteres',
    name: 'Crucifixo Reto com Halteres',
    primary_muscle: 'peito',
    secondary_muscles: ['ombros'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Exercício isolador para estiramento e tensão excêntrica no peitoral.',
    execution_cues: [
      'Mantenha os cotovelos em leve flexão fixa (ângulo constante).',
      'Abra os braços em arco até sentir o peito alongar totalmente.',
      'Feche o arco como se estivesse abraçando um barril.'
    ],
    common_mistakes: ['Flexionar e estender cotovelos como se fosse supino', 'Descer com peso excessivo']
  },
  {
    id: 'crucifixo-inclinado-halteres',
    name: 'Crucifixo Inclinado com Halteres',
    primary_muscle: 'peito',
    secondary_muscles: ['ombros'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Isolamento com alongamento máximo das fibras claviculares do peito.',
    execution_cues: [
      'Banco em 30°. Cotovelos levemente flexionados.',
      'Abra os braços na linha dos ombros sentindo a porção superior esticar.',
      'Retorne contraindo o peito no topo.'
    ],
    common_mistakes: ['Descer os braços abaixo da linha articular confortável']
  },
  {
    id: 'crucifixo-polia-crossover',
    name: 'Crucifixo na Polia (Crossover Médio)',
    primary_muscle: 'peito',
    secondary_muscles: ['ombros'],
    equipment: 'polia',
    focus: 'hipertrofia',
    description: 'Isolador de peitoral mantendo tensão constante ao longo de toda a curva de contração.',
    execution_cues: [
      'Posicione as polias na altura média.',
      'Dê um passo à frente com uma perna para estabilizar.',
      'Com cotovelos levemente flexionados, abrace o ar até as mãos se aproximarem.',
      'Aperte o peito por 1 segundo no pico de contração.'
    ],
    common_mistakes: [
      'Flexionar e estender demais os cotovelos.',
      'Usar impulso com o tronco.'
    ]
  },
  {
    id: 'crossover-polia-alta',
    name: 'Crossover na Polia Alta (Foco Inferior)',
    primary_muscle: 'peito',
    secondary_muscles: ['ombros', 'core'],
    equipment: 'polia',
    focus: 'hipertrofia',
    description: 'Trajetória de cima para baixo com ênfase na porção inferior do peitoral e corte esternal.',
    execution_cues: [
      'Polias no topo. Tronco levemente inclinado à frente.',
      'Puxe os cabos para baixo e para frente cruzando suavemente as mãos no final.',
      'Segure 1s na contração máxima.'
    ],
    common_mistakes: ['Deixar o tronco oscilar para frente e para trás']
  },
  {
    id: 'crossover-polia-baixa',
    name: 'Crossover na Polia Baixa (Foco Superior)',
    primary_muscle: 'peito',
    secondary_muscles: ['ombros'],
    equipment: 'polia',
    focus: 'hipertrofia',
    description: 'Trajetória de baixo para cima com ênfase em feixes superiores do peitoral maior.',
    execution_cues: [
      'Polias no chão. Palmas viradas para cima ou semi-supinadas.',
      'Eleve os braços em direção à altura do queixo.',
      'Aperte a parte de cima do peito.'
    ],
    common_mistakes: ['Usar impulso das pernas']
  },
  {
    id: 'peck-deck-voador',
    name: 'Peck Deck / Voador Máquina',
    primary_muscle: 'peito',
    secondary_muscles: ['ombros'],
    equipment: 'maquina',
    focus: 'hipertrofia',
    description: 'Máxima segurança e estabilidade com isolamento do peitoral sem sobrecarga nos punhos.',
    execution_cues: [
      'Ajuste o assento para as mãos ficarem alinhadas ao peitoral médio.',
      'Apoie as costas firmemente no estofado.',
      'Junte os braços até tocar no centro e aperte o peito.'
    ],
    common_mistakes: ['Descolar as costas do encosto para conseguir fechar a máquina']
  },
  {
    id: 'flexao-de-braco-pushup',
    name: 'Flexão de Braço (Push-Up)',
    primary_muscle: 'peito',
    secondary_muscles: ['triceps', 'ombros', 'core'],
    equipment: 'peso_corporal',
    focus: 'resistencia',
    description: 'Clássico com peso do corpo para força funcional, peito, tríceps e estabilidade abdominal.',
    execution_cues: [
      'Corpo reto em prancha, mãos na largura dos ombros.',
      'Desça o peito até 2 dedos do chão mantendo os cotovelos a 45 graus.',
      'Empurre o chão com força até estender os braços.'
    ],
    common_mistakes: ['Deixar a lombar afundar', 'Abrir os cotovelos a 90 graus']
  },
  {
    id: 'paralelas-foco-peito',
    name: 'Mergulho nas Paralelas (Foco Peitoral)',
    primary_muscle: 'peito',
    secondary_muscles: ['triceps', 'ombros'],
    equipment: 'peso_corporal',
    focus: 'forca',
    description: 'Movimento com peso corporal com ênfase no feixe inferior e externo do peitoral.',
    execution_cues: [
      'Incline o tronco levemente para frente (cerca de 30°).',
      'Abra ligeiramente os cotovelos para os lados.',
      'Desça até os ombros ficarem ligeiramente abaixo dos cotovelos.',
      'Empurre estendendo os braços com controle.'
    ],
    common_mistakes: [
      'Descer além da amplitude articular segura do ombro.',
      'Manter o tronco 100% reto (joga o foco para o tríceps).'
    ]
  },
  {
    id: 'pullover-com-halter',
    name: 'Pullover com Halter',
    primary_muscle: 'peito',
    secondary_muscles: ['costas', 'triceps', 'core'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Expansão da caixa torácica e estímulo conjunto de peitoral maior e grande dorsal.',
    execution_cues: [
      'Apoie a parte superior das costas transversalmente no banco.',
      'Segure o halter com as duas mãos em formato de diamante.',
      'Desça o halter atrás da cabeça alongando o tórax.',
      'Puxe de volta até a linha do rosto contraindo o peito.'
    ],
    common_mistakes: ['Flexionar excessivamente os cotovelos', 'Levantar o quadril junto']
  },

  // ==========================================
  // COSTAS & DORSAL (BACK)
  // ==========================================
  {
    id: 'puxada-alta-aberta',
    name: 'Puxada Alta Aberta (Lat Pulldown)',
    primary_muscle: 'costas',
    secondary_muscles: ['biceps', 'antebraco', 'ombros'],
    equipment: 'polia',
    focus: 'hipertrofia',
    description: 'Construtor clássico de largura dorsal e controle escapular.',
    execution_cues: [
      'Segure a barra com pegada pronada aberta.',
      'Incline o tronco levemente para trás (10-15°).',
      'Inicie o movimento puxando com os cotovelos em direção aos bolsos da calça.',
      'Finalize trazendo a barra na altura da clavícula.'
    ],
    common_mistakes: [
      'Balançar excessivamente a coluna para trás com impulso.',
      'Puxar a barra atrás da nuca (sobrecarga na cervical).'
    ]
  },
  {
    id: 'puxada-triangulo-fechada',
    name: 'Puxada Alta com Triângulo (Pegada Neutra)',
    primary_muscle: 'costas',
    secondary_muscles: ['biceps', 'antebraco'],
    equipment: 'polia',
    focus: 'hipertrofia',
    description: 'Excelente para alongamento do grande dorsal com pegada neutra anatômica.',
    execution_cues: [
      'Segure o puxador triângulo com as duas mãos.',
      'Puxe em direção ao peitoral superior mantendo o peito estufado.',
      'Alongue totalmente os braços no topo controlando a subida.'
    ],
    common_mistakes: ['Curvar as costas na descida']
  },
  {
    id: 'barra-fixa-pullup',
    name: 'Barra Fixa Pronada (Pull-Up)',
    primary_muscle: 'costas',
    secondary_muscles: ['biceps', 'core', 'antebraco'],
    equipment: 'peso_corporal',
    focus: 'forca',
    description: 'O teste definitivo de força relativa para costas e pegada.',
    execution_cues: [
      'Pegada pronada além da largura dos ombros.',
      'Inicie ativando as escápulas para baixo.',
      'Puxe o corpo até o queixo ultrapassar a barra.',
      'Desça de forma controlada até estender os braços.'
    ],
    common_mistakes: ['Fazer o movimento com impulso de pernas (kipping)', 'Não descer até a extensão completa']
  },
  {
    id: 'barra-fixa-chinup',
    name: 'Barra Fixa Supinada (Chin-Up)',
    primary_muscle: 'costas',
    secondary_muscles: ['biceps', 'antebraco', 'core'],
    equipment: 'peso_corporal',
    focus: 'forca',
    description: 'Grande estímulo para grande dorsal inferior e forte recrutamento dos bíceps.',
    execution_cues: [
      'Pegada supinada na largura dos ombros.',
      'Puxe o peito em direção à barra.',
      'Controle a descida.'
    ],
    common_mistakes: ['Soltar o peso rápido demais na descida']
  },
  {
    id: 'remada-curvada-barra',
    name: 'Remada Curvada com Barra',
    primary_muscle: 'costas',
    secondary_muscles: ['biceps', 'antebraco', 'core'],
    equipment: 'barra',
    focus: 'forca',
    description: 'Exercício rei para densidade e espessura dorsal e estabilidade lombar/core.',
    execution_cues: [
      'Incline o tronco em cerca de 45° a 60°, joelhos semi-flexionados.',
      'Mantenha a coluna neutra e abdômen contraído.',
      'Puxe a barra em direção ao umbigo direcionando os cotovelos para trás.',
      'Segure 1 segundo contraindo a musculatura dorsal.'
    ],
    common_mistakes: [
      'Curvar a lombar (risco de lesão).',
      'Fazer o movimento muito em pé sem inclinação adequada.'
    ]
  },
  {
    id: 'remada-cavalinho-ou-t-bar',
    name: 'Remada Cavalinho (T-Bar)',
    primary_muscle: 'costas',
    secondary_muscles: ['biceps', 'core'],
    equipment: 'maquina',
    focus: 'hipertrofia',
    description: 'Excelente para sobrecarga mecânica com pegada neutra para o meio das costas.',
    execution_cues: [
      'Pés na largura dos ombros, peito apoiado se for máquina.',
      'Puxe a manopla concentrando a força nas escápulas.',
      'Alongue totalmente os dorsais na fase excêntrica.'
    ],
    common_mistakes: [
      'Arredondar a coluna torácica na descida.',
      'Usar apenas a força do bíceps.'
    ]
  },
  {
    id: 'remada-unilateral-serrote',
    name: 'Remada Unilateral com Halter (Serrote)',
    primary_muscle: 'costas',
    secondary_muscles: ['biceps', 'core'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Construtor unilatral de espessura de grande dorsal com suporte estável no banco.',
    execution_cues: [
      'Apoie joelho e mão no banco plano.',
      'Puxe o halter em direção ao quadril com o cotovelo rente ao corpo.',
      'Alongue o braço na descida sem rodar o tronco.'
    ],
    common_mistakes: ['Girar o tronco excessivamente para puxar o peso']
  },
  {
    id: 'remada-baixa-polia',
    name: 'Remada Baixa na Polia com Triângulo',
    primary_muscle: 'costas',
    secondary_muscles: ['biceps', 'antebraco'],
    equipment: 'polia',
    focus: 'hipertrofia',
    description: 'Isolamento e pico de contração de romboides e trapézio médio/inferior.',
    execution_cues: [
      'Sente-se com joelhos levemente flexionados.',
      'Puxe o triângulo até o abdômen estufando o peito.',
      'Alongue controlando a volta sem dobrar a coluna.'
    ],
    common_mistakes: ['Balançar o tronco para frente e para trás feito remo']
  },
  {
    id: 'pulldown-corda-polia',
    name: 'Pulldown com Corda na Polia',
    primary_muscle: 'costas',
    secondary_muscles: ['triceps'],
    equipment: 'polia',
    focus: 'hipertrofia',
    description: 'Isolador do grande dorsal sem fadiga no bíceps.',
    execution_cues: [
      'Fique a um passo de distância da polia alta.',
      'Braços quase estendidos, puxe a corda em arco até encostar nas coxas.',
      'Abra as pontas da corda no final para máxima contração.'
    ],
    common_mistakes: [
      'Flexionar os cotovelos como se fosse tríceps testa.'
    ]
  },
  {
    id: 'levantamento-terra-convencional',
    name: 'Levantamento Terra Convencional (Deadlift)',
    primary_muscle: 'costas',
    secondary_muscles: ['gluteos', 'posterior', 'quadriceps', 'core', 'antebraco'],
    equipment: 'barra',
    focus: 'forca',
    description: 'Exercício composto soberano para força sistêmica em toda a cadeia posterior.',
    execution_cues: [
      'Barra colada nas canelas, pés na largura do quadril.',
      'Quadril encaixado, peito aberto, escápulas sobre a barra.',
      'Empurre o chão com os pés mantendo a barra raspando no corpo.',
      'Trave o quadril no topo sem hiperextender a coluna.'
    ],
    common_mistakes: ['Arredondar a coluna lombar', 'Deixar a barra se afastar do corpo']
  },
  {
    id: 'encolhimento-com-barra',
    name: 'Encolhimento de Ombros com Barra (Trapézio)',
    primary_muscle: 'costas',
    secondary_muscles: ['ombros', 'antebraco'],
    equipment: 'barra',
    focus: 'hipertrofia',
    description: 'Foco no trapézio superior com alta capacidade de carga.',
    execution_cues: [
      'Segure a barra à frente das coxas.',
      'Eleve os ombros em direção às orelhas em linha reta.',
      'Segure 1-2s no topo e desça com controle.'
    ],
    common_mistakes: ['Girar os ombros em círculos (danoso para a articulação)']
  },

  // ==========================================
  // QUADRÍCEPS & MEMBROS INFERIORES (QUADS)
  // ==========================================
  {
    id: 'agachamento-livre-barra',
    name: 'Agachamento Livre com Barra (Back Squat)',
    primary_muscle: 'quadriceps',
    secondary_muscles: ['gluteos', 'posterior', 'core'],
    equipment: 'barra',
    focus: 'forca',
    description: 'O exercício mais completo para membros inferiores, força máxima e estabilidade.',
    execution_cues: [
      'Posicione a barra sobre o trapézio.',
      'Pés na largura dos ombros com pontas ligeiramente para fora.',
      'Agache empurrando os joelhos para fora e quadril para trás.',
      'Desça até 90 graus ou mais com coluna neutra.',
      'Suba fazendo força no meio do pé sem fechar os joelhos.'
    ],
    common_mistakes: [
      'Deixar os joelhos colapsarem para dentro (valgo dinâmico).',
      'Tirar os calcanhares do chão.',
      'Curvar excessivamente a lombar.'
    ]
  },
  {
    id: 'agachamento-frontal-barra',
    name: 'Agachamento Frontal com Barra (Front Squat)',
    primary_muscle: 'quadriceps',
    secondary_muscles: ['core', 'gluteos'],
    equipment: 'barra',
    focus: 'forca',
    description: 'Maior ênfase no quadríceps com tronco mais ereto e alto recrutamento do core.',
    execution_cues: [
      'Apoie a barra nos deltóides anteriores com cotovelos altos.',
      'Agache com o tronco o mais vertical possível.',
      'Empurre o chão mantendo os cotovelos apontados para frente.'
    ],
    common_mistakes: ['Deixar os cotovelos caírem durante a descida']
  },
  {
    id: 'leg-press-45',
    name: 'Leg Press 45°',
    primary_muscle: 'quadriceps',
    secondary_muscles: ['gluteos'],
    equipment: 'maquina',
    focus: 'hipertrofia',
    description: 'Permite aplicar grande sobrecarga nas pernas com apoio lombar estável.',
    execution_cues: [
      'Apoie as costas e o quadril firmes no encosto.',
      'Pés no centro da plataforma na largura dos ombros.',
      'Desça até formar 90 graus nos joelhos.',
      'Empurre sem travar (estalar) os joelhos no topo.'
    ],
    common_mistakes: [
      'Tirar a lombar do encosto no final da descida.',
      'Estender totalmente as pernas bloqueando as articulações.'
    ]
  },
  {
    id: 'agachamento-hack-machine',
    name: 'Agachamento no Hack (Hack Squat)',
    primary_muscle: 'quadriceps',
    secondary_muscles: ['gluteos'],
    equipment: 'maquina',
    focus: 'hipertrofia',
    description: 'Isolamento de quadríceps em cadeia fechada com trilho estável.',
    execution_cues: [
      'Apoie os ombros e costas no acolchoamento.',
      'Pés na largura dos ombros.',
      'Desça até a flexão profunda dos joelhos.',
      'Empurre pela base do pé.'
    ],
    common_mistakes: ['Tirar os calcanhares da plataforma']
  },
  {
    id: 'agachamento-bulgaro-halteres',
    name: 'Agachamento Búlgaro com Halteres',
    primary_muscle: 'quadriceps',
    secondary_muscles: ['gluteos', 'core'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Exercício unilateral supremo para pernas e glúteos corrigindo desequilíbrios.',
    execution_cues: [
      'Apoie um dos pés atrás em um banco.',
      'Dê um passo largo à frente com a perna de apoio.',
      'Desça até o joelho de trás quase tocar o chão.',
      'Empurre com a perna da frente.'
    ],
    common_mistakes: ['Colocar a perna da frente muito perto do banco']
  },
  {
    id: 'cadeira-extensora',
    name: 'Cadeira Extensora',
    primary_muscle: 'quadriceps',
    secondary_muscles: [],
    equipment: 'maquina',
    focus: 'hipertrofia',
    description: 'Isolador puro para os 4 feixes do quadríceps com pico de contração no topo.',
    execution_cues: [
      'Ajuste o rolo logo acima dos tornozelos.',
      'Alinhe o eixo da máquina com a linha articular do joelho.',
      'Estenda os joelhos até a contração máxima e segure 1 segundo.',
      'Desça de forma controlada em 2 a 3 segundos.'
    ],
    common_mistakes: [
      'Dar tranco e soltar o peso na descida.'
    ]
  },
  {
    id: 'avanco-passada-halteres',
    name: 'Avanço / Passada com Halteres (Walking Lunges)',
    primary_muscle: 'quadriceps',
    secondary_muscles: ['gluteos', 'posterior', 'core'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Excelente para condicionamento neuromuscular, força unilateral e glúteos.',
    execution_cues: [
      'Dê um passo largo à frente flexionando ambos os joelhos a 90°.',
      'Mantenha o tronco firme e postura ereta.',
      'Suba impulsionando com o calcanhar da perna da frente e dê o próximo passo.'
    ],
    common_mistakes: ['Bater o joelho traseiro com força no chão']
  },
  {
    id: 'agachamento-goblet',
    name: 'Agachamento Goblet com Halter / Kettlebell',
    primary_muscle: 'quadriceps',
    secondary_muscles: ['gluteos', 'core'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Excelente para mobilidade de quadril, profundidade de agachamento e postura.',
    execution_cues: [
      'Segure o halter na altura do peito com as duas mãos.',
      'Agache entre as pernas abrindo os joelhos com os cotovelos.',
      'Suba mantendo o peito ereto.'
    ],
    common_mistakes: ['Inclinar o tronco para frente']
  },

  // ==========================================
  // POSTERIOR DE COXA / ISQUIOTIBIAIS (HAMSTRINGS)
  // ==========================================
  {
    id: 'stiff-com-barra',
    name: 'Stiff com Barra (Romanian Deadlift - RDL)',
    primary_muscle: 'posterior',
    secondary_muscles: ['gluteos', 'core'],
    equipment: 'barra',
    focus: 'hipertrofia',
    description: 'Padrão-ouro para alongamento sob tensão de posteriores de coxa e glúteos.',
    execution_cues: [
      'Segure a barra na largura dos ombros.',
      'Com joelhos semi-flexionados, projete o quadril para trás enquanto desce a barra colada nas pernas.',
      'Desça até o limite do alongamento dos posteriores sem curvar a coluna.',
      'Retorne estendendo o quadril e contraindo os glúteos.'
    ],
    common_mistakes: [
      'Flexionar os joelhos demais transformando em agachamento.',
      'Arredondar a coluna lombar.'
    ]
  },
  {
    id: 'stiff-com-halteres',
    name: 'Stiff com Halteres',
    primary_muscle: 'posterior',
    secondary_muscles: ['gluteos', 'core'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Permite rotação natural dos punhos e foco total no quadril.',
    execution_cues: [
      'Segure halteres em frente às coxas.',
      'Jogue o quadril para trás como se fosse encostar na parede.',
      'Sinta o estiramento forte na parte de trás da coxa e retorne.'
    ],
    common_mistakes: ['Olhar para cima forçando a cervical']
  },
  {
    id: 'mesa-flexora',
    name: 'Mesa Flexora',
    primary_muscle: 'posterior',
    secondary_muscles: ['panturrilha'],
    equipment: 'maquina',
    focus: 'hipertrofia',
    description: 'Isolador fundamental para os isquiotibiais em posição deitada.',
    execution_cues: [
      'Deite-se de bruços com o rolo posicionado atrás dos calcanhares.',
      'Mantenha o quadril colado no estofado.',
      'Flexione os joelhos puxando os calcanhares em direção aos glúteos.'
    ],
    common_mistakes: [
      'Elevar o quadril da mesa durante a flexão.'
    ]
  },
  {
    id: 'cadeira-flexora',
    name: 'Cadeira Flexora Sentada',
    primary_muscle: 'posterior',
    secondary_muscles: [],
    equipment: 'maquina',
    focus: 'hipertrofia',
    description: 'Maior alongamento dos isquiotibiais devido à flexão de quadril sentada.',
    execution_cues: [
      'Ajuste o encosto e trave o acolchoamento sobre as coxas.',
      'Flexione os joelhos para baixo até o limite.',
      'Controle a volta em 2 a 3 segundos.'
    ],
    common_mistakes: ['Deixar o corpo escorregar para frente no assento']
  },
  {
    id: 'elevacao-nordica',
    name: 'Elevação Nórdica (Nordic Hamstring Curl)',
    primary_muscle: 'posterior',
    secondary_muscles: ['gluteos', 'core'],
    equipment: 'peso_corporal',
    focus: 'forca',
    description: 'O maior estímulo excêntrico para prevenção de lesões e força nos isquiotibiais.',
    execution_cues: [
      'Ajoelhe-se com os calcanhares travados firmemente.',
      'Com o corpo reto da cabeça aos joelhos, incline o tronco para frente o máximo possível.',
      'Use os braços para amortecer suavemente no final e empurre para voltar.'
    ],
    common_mistakes: ['Dobrar o quadril ao invés de usar os joelhos']
  },

  // ==========================================
  // GLÚTEOS (GLUTES)
  // ==========================================
  {
    id: 'elevacao-pelvica-barra',
    name: 'Elevação Pélvica com Barra (Hip Thrust)',
    primary_muscle: 'gluteos',
    secondary_muscles: ['posterior', 'core'],
    equipment: 'barra',
    focus: 'hipertrofia',
    description: 'O maior estímulo de ativação eletromiográfica para glúteo máximo.',
    execution_cues: [
      'Apoie as escápulas na borda de um banco estável.',
      'Posicione a barra com acolchoamento sobre a linha do quadril.',
      'Pés firmes no chão, joelhos a 90° no topo.',
      'Empurre o quadril para cima até o alinhamento reto e segure 2s.'
    ],
    common_mistakes: [
      'Hiperextender a coluna lombar no topo.'
    ]
  },
  {
    id: 'cadeira-abdutora',
    name: 'Cadeira Abdutora',
    primary_muscle: 'gluteos',
    secondary_muscles: [],
    equipment: 'maquina',
    focus: 'hipertrofia',
    description: 'Isolamento de glúteo médio e mínimo para estabilidade pélvica e estética.',
    execution_cues: [
      'Sente-se com as costas apoiadas ou levemente inclinadas à frente.',
      'Abra as pernas com força contra a resistência das almofadas.',
      'Segure 1s na abertura máxima e controle o retorno.'
    ],
    common_mistakes: ['Deixar o peso bater no retorno']
  },
  {
    id: 'gluteo-coice-polia',
    name: 'Glúteo na Polia (Coice / Cable Kickback)',
    primary_muscle: 'gluteos',
    secondary_muscles: [],
    equipment: 'polia',
    focus: 'hipertrofia',
    description: 'Isolador unilateral para contração máxima do glúteo com cabo contínuo.',
    execution_cues: [
      'Prenda a tornozeleira na polia baixa.',
      'Estenda a perna para trás e ligeiramente para fora.',
      'Aperte o glúteo no topo sem arquear a lombar.'
    ],
    common_mistakes: ['Balançar o tronco para ganhar impulso']
  },

  // ==========================================
  // OMBROS & DELTÓIDES (SHOULDERS)
  // ==========================================
  {
    id: 'desenvolvimento-militar-barra',
    name: 'Desenvolvimento Militar em Pé (Overhead Press - OHP)',
    primary_muscle: 'ombros',
    secondary_muscles: ['triceps', 'core'],
    equipment: 'barra',
    focus: 'forca',
    description: 'Construtor clássico de força no trem superior e estabilidade de tronco.',
    execution_cues: [
      'Barra apoiada na frente dos ombros / clavícula.',
      'Glúteos e abdômen travados.',
      'Empurre a barra para cima em linha reta passando a cabeça para frente no topo.',
      'Estenda os braços completamente.'
    ],
    common_mistakes: ['Arquear a lombar para trás excessivamente']
  },
  {
    id: 'desenvolvimento-halteres-sentado',
    name: 'Desenvolvimento com Halteres Sentado',
    primary_muscle: 'ombros',
    secondary_muscles: ['triceps'],
    equipment: 'halteres',
    focus: 'forca',
    description: 'Construtor de força e volume para a porção anterior e lateral do deltóide.',
    execution_cues: [
      'Sente-se com o encosto a 80-85 graus.',
      'Eleve os halteres até a linha das orelhas.',
      'Empurre para cima sem bater os halteres no topo.',
      'Desça controladamente até a altura dos ombros.'
    ],
    common_mistakes: [
      'Arquear excessivamente a lombar tirando as costas do banco.'
    ]
  },
  {
    id: 'desenvolvimento-arnold',
    name: 'Desenvolvimento Arnold com Halteres',
    primary_muscle: 'ombros',
    secondary_muscles: ['triceps'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Criado por Arnold Schwarzenegger, combina rotação de punhos para atingir todos os feixes do ombro.',
    execution_cues: [
      'Inicie com os halteres na altura do queixo, palmas viradas para você.',
      'Conforme empurra para cima, gire os punhos até as palmas ficarem para frente no topo.',
      'Inverta a rotação na descida.'
    ],
    common_mistakes: ['Usar carga muito alta perdendo o controle da rotação']
  },
  {
    id: 'elevacao-lateral-halteres',
    name: 'Elevação Lateral com Halteres',
    primary_muscle: 'ombros',
    secondary_muscles: ['core'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'O exercício mais eficiente para criar o aspecto de ombros largos (deltóide lateral).',
    execution_cues: [
      'Tronco levemente inclinado para frente (5°).',
      'Eleve os braços lateralmente até a altura dos ombros com cotovelos ligeiramente flexionados.',
      'Pense em afastar as mãos do corpo em vez de só levantar.',
      'Desça controlando a fase excêntrica em 2 segundos.'
    ],
    common_mistakes: [
      'Usar impulso com as pernas ou tronco.',
      'Elevar as mãos acima da linha dos cotovelos.'
    ]
  },
  {
    id: 'elevacao-lateral-polia',
    name: 'Elevação Lateral na Polia',
    primary_muscle: 'ombros',
    secondary_muscles: [],
    equipment: 'polia',
    focus: 'hipertrofia',
    description: 'Tensão constante desde o primeiro centímetro de movimento no deltóide lateral.',
    execution_cues: [
      'Polia baixa passando por trás ou pela frente do corpo.',
      'Puxe a manopla até a altura do ombro.',
      'Desça controladamente sentindo o cabo puxar.'
    ],
    common_mistakes: ['Puxar com o trapézio']
  },
  {
    id: 'crucifixo-invertido-halteres',
    name: 'Crucifixo Invertido com Halteres',
    primary_muscle: 'ombros',
    secondary_muscles: ['costas'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Isolador para o deltóide posterior e estabilizadores escapulares.',
    execution_cues: [
      'Incline o tronco paralelo ao chão.',
      'Abra os braços para os lados mantendo uma leve flexão nos cotovelos.',
      'Foque em contrair a parte de trás do ombro.'
    ],
    common_mistakes: [
      'Fazer força com as costas e trapézio em vez do posterior de ombro.'
    ]
  },
  {
    id: 'face-pull-polia-corda',
    name: 'Face Pull na Polia com Corda',
    primary_muscle: 'ombros',
    secondary_muscles: ['costas', 'mobilidade'],
    equipment: 'polia',
    focus: 'prevencao',
    description: 'O melhor exercício para saúde articular do manguito rotador, postura e deltóide posterior.',
    execution_cues: [
      'Polia na altura dos olhos com corda.',
      'Puxe a corda em direção ao rosto, abrindo as mãos e rodando externamente os ombros.',
      'Cotovelos altos e punhos alinhados com as orelhas no final.'
    ],
    common_mistakes: ['Puxar para baixo no peito', 'Usar peso excessivo']
  },
  {
    id: 'elevacao-frontal-barra-halteres',
    name: 'Elevação Frontal com Halteres / Barra',
    primary_muscle: 'ombros',
    secondary_muscles: ['peito'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Isolamento da porção anterior do deltóide.',
    execution_cues: [
      'Eleve o peso à frente até a linha dos olhos.',
      'Mantenha os braços quase retos.',
      'Desça sem balanço do tronco.'
    ],
    common_mistakes: ['Jogar o corpo para trás']
  },

  // ==========================================
  // BÍCEPS (BICEPS)
  // ==========================================
  {
    id: 'rosca-direta-barra-w',
    name: 'Rosca Direta com Barra W',
    primary_muscle: 'biceps',
    secondary_muscles: ['antebraco'],
    equipment: 'barra',
    focus: 'hipertrofia',
    description: 'Construtor clássico de massa para o bíceps braquial com menor estresse nos punhos.',
    execution_cues: [
      'Cotovelos colados ao lado do tronco.',
      'Flexione os braços até a contração máxima sem projetar os cotovelos para frente.',
      'Desça a barra até estender os braços quase por completo.'
    ],
    common_mistakes: [
      'Balançar o tronco para trás (roubar).'
    ]
  },
  {
    id: 'rosca-alternada-halteres',
    name: 'Rosca Alternada com Halteres (Supinada)',
    primary_muscle: 'biceps',
    secondary_muscles: ['antebraco'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Permite rotação e supinação completa do punho, ativando as duas cabeças do bíceps.',
    execution_cues: [
      'Inicie com os halteres na lateral com pegada neutra.',
      'Ao subir, gire a palma da mão para cima e para fora.',
      'Aperte o bíceps no topo.'
    ],
    common_mistakes: ['Impulso com os ombros']
  },
  {
    id: 'rosca-martelo-halteres',
    name: 'Rosca Martelo com Halteres',
    primary_muscle: 'biceps',
    secondary_muscles: ['antebraco'],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Excelente para braquial e braquiorradial, aumentando a espessura do braço.',
    execution_cues: [
      'Pegada neutra (palmas voltadas uma para a outra).',
      'Puxe os halteres simultaneamente ou alternados até a altura do peito.',
      'Mantenha os cotovelos fixos.'
    ],
    common_mistakes: [
      'Girar o punho durante o movimento.'
    ]
  },
  {
    id: 'rosca-scott-barra-w',
    name: 'Rosca Scott com Barra W (Banco Preacher)',
    primary_muscle: 'biceps',
    secondary_muscles: [],
    equipment: 'barra',
    focus: 'hipertrofia',
    description: 'Isolamento estrito sem chance de roubo com apoio total dos braços.',
    execution_cues: [
      'Apoie as axilas no topo do estofado do banco Scott.',
      'Flexione os braços até a contração no topo.',
      'Desça controlando até quase estender os braços.'
    ],
    common_mistakes: ['Esticar os braços bruscamente arriscando o tendão distal']
  },
  {
    id: 'rosca-inclinada-banco-45',
    name: 'Rosca Inclinada com Halteres no Banco 45°',
    primary_muscle: 'biceps',
    secondary_muscles: [],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Máximo alongamento da cabeça longa do bíceps para gerar o pico do braço.',
    execution_cues: [
      'Banco inclinado a 45-60 graus.',
      'Deixe os braços caírem retos atrás da linha do tronco.',
      'Flexione os braços supinando as mãos.'
    ],
    common_mistakes: ['Projetar os cotovelos para frente durante a subida']
  },
  {
    id: 'rosca-concentrada-halter',
    name: 'Rosca Concentrada com Halter',
    primary_muscle: 'biceps',
    secondary_muscles: [],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Isolador clássico sentado com apoio no interior da coxa.',
    execution_cues: [
      'Apoie o tríceps na parte interna da coxa correspondente.',
      'Puxe o halter até o peito sem mover o tronco.',
      'Aperte o bíceps no ápice do movimento.'
    ],
    common_mistakes: ['Mover o braço de apoio']
  },

  // ==========================================
  // TRÍCEPS (TRICEPS)
  // ==========================================
  {
    id: 'triceps-corda-polia',
    name: 'Tríceps Corda na Polia',
    primary_muscle: 'triceps',
    secondary_muscles: [],
    equipment: 'polia',
    focus: 'hipertrofia',
    description: 'Permite separar as pontas no final, atingindo o feixe lateral do tríceps.',
    execution_cues: [
      'Cotovelos fixos ao lado das costelas.',
      'Estenda os braços para baixo e abra a corda no final da descida.',
      'Contraia o tríceps por 1 segundo antes de retornar.'
    ],
    common_mistakes: [
      'Mover os cotovelos para frente e para trás durante a repetição.'
    ]
  },
  {
    id: 'triceps-barra-reta-polia',
    name: 'Tríceps Barra Reta / V na Polia',
    primary_muscle: 'triceps',
    secondary_muscles: [],
    equipment: 'polia',
    focus: 'forca',
    description: 'Permite maior aplicação de carga no tríceps com pegada pronada sólida.',
    execution_cues: [
      'Segure a barra com pegada pronada na largura dos ombros.',
      'Empurre a barra para baixo até estender os cotovelos.',
      'Controle a subida até 90 graus nos cotovelos.'
    ],
    common_mistakes: ['Usar o peso do corpo para empurrar']
  },
  {
    id: 'triceps-testa-barra-w',
    name: 'Tríceps Testa com Barra W (Skull Crusher)',
    primary_muscle: 'triceps',
    secondary_muscles: [],
    equipment: 'barra',
    focus: 'hipertrofia',
    description: 'Foco na cabeça longa do tríceps com excelente amplitude de alongamento.',
    execution_cues: [
      'Deite-se no banco, braços levemente inclinados para trás em relação à cabeça.',
      'Flexione apenas os cotovelos descendo a barra até o topo da cabeça.',
      'Estenda os cotovelos retornando à posição inicial.'
    ],
    common_mistakes: [
      'Abrir os cotovelos excessivamente para os lados.'
    ]
  },
  {
    id: 'triceps-frances-halteres',
    name: 'Tríceps Francês com Halter (Overhead Extension)',
    primary_muscle: 'triceps',
    secondary_muscles: [],
    equipment: 'halteres',
    focus: 'hipertrofia',
    description: 'Alongamento máximo da cabeça longa do tríceps acima da cabeça.',
    execution_cues: [
      'Segure o halter com as duas mãos atrás da cabeça.',
      'Estenda os braços para cima mantendo os cotovelos fechados.',
      'Desça sentindo o tríceps esticar.'
    ],
    common_mistakes: ['Abrir os cotovelos como asas']
  },
  {
    id: 'supino-fechado-barra',
    name: 'Supino com Pegada Fechada (Close-Grip Bench Press)',
    primary_muscle: 'triceps',
    secondary_muscles: ['peito', 'ombros'],
    equipment: 'barra',
    focus: 'forca',
    description: 'Exercício composto pesado para tríceps com grande capacidade de sobrecarga.',
    execution_cues: [
      'Segure a barra na largura dos ombros (mãos alinhadas).',
      'Desça a barra mantendo os cotovelos rentes ao tronco.',
      'Empurre focando a força na extensão dos braços.'
    ],
    common_mistakes: ['Juntar as mãos demais forçando os punhos']
  },
  {
    id: 'mergulho-no-banco-dips',
    name: 'Mergulho no Banco (Bench Dips)',
    primary_muscle: 'triceps',
    secondary_muscles: ['ombros'],
    equipment: 'peso_corporal',
    focus: 'resistencia',
    description: 'Exercício clássico com peso do corpo para finalizar o treino de braços.',
    execution_cues: [
      'Mãos apoiadas na borda do banco atrás de você.',
      'Desça o quadril próximo ao banco flexionando os cotovelos a 90°.',
      'Empurre de volta estendendo os braços.'
    ],
    common_mistakes: ['Afastar o quadril do banco projetando os ombros para frente']
  },

  // ==========================================
  // PANTURRILHAS & ANTEBRAÇO (CALVES & FOREARMS)
  // ==========================================
  {
    id: 'panturrilha-em-pe-maquina',
    name: 'Panturrilha em Pé na Máquina / Smith',
    primary_muscle: 'panturrilha',
    secondary_muscles: [],
    equipment: 'maquina',
    focus: 'hipertrofia',
    description: 'Foco no gastrocnêmio com joelhos estendidos e amplitude máxima.',
    execution_cues: [
      'Pontas dos pés na borda da plataforma.',
      'Desça o calcanhar o máximo possível sentindo alongar.',
      'Suba na ponta dos pés e segure 2 segundos no topo.'
    ],
    common_mistakes: ['Fazer repetições curtas e rápidas pulando']
  },
  {
    id: 'panturrilha-sentado-gemeos',
    name: 'Panturrilha Sentado (Gêmeos Sentado)',
    primary_muscle: 'panturrilha',
    secondary_muscles: [],
    equipment: 'maquina',
    focus: 'hipertrofia',
    description: 'Foco no músculo sóleo com joelhos flexionados a 90°.',
    execution_cues: [
      'Ajuste o apoio sobre as coxas.',
      'Desça os calcanhares e empurre subindo até a ponta dos dedos.',
      'Cadência controlada.'
    ],
    common_mistakes: ['Usar impulso dos braços']
  },
  {
    id: 'rosca-inversa-barra-w',
    name: 'Rosca Inversa com Barra W (Antebraço & Braquiorradial)',
    primary_muscle: 'antebraco',
    secondary_muscles: ['biceps'],
    equipment: 'barra',
    focus: 'hipertrofia',
    description: 'Pegada pronada para desenvolvimento de antebraços grossos e pegada de aço.',
    execution_cues: [
      'Segure a barra com as palmas voltadas para baixo (pronada).',
      'Flexione os braços mantendo os punhos retos.',
      'Desça com controle total.'
    ],
    common_mistakes: ['Deixar os punhos dobrarem para baixo']
  },
  {
    id: 'farmers-walk-halteres',
    name: 'Caminhada do Fazendeiro (Farmer\'s Walk)',
    primary_muscle: 'antebraco',
    secondary_muscles: ['core', 'costas', 'panturrilha'],
    equipment: 'halteres',
    focus: 'forca',
    description: 'Exercício de força funcional para força de pegada, trapézio e estabilização de core.',
    execution_cues: [
      'Segure halteres ou kettlebells pesados em cada mão.',
      'Caminhe com passos curtos e postura ereta e abdômen travado.',
      'Mantenha os ombros alinhados.'
    ],
    common_mistakes: ['Deixar os pesos balançarem batendo nas pernas']
  },

  // ==========================================
  // CORE & ABDÔMEN (ABS & CORE)
  // ==========================================
  {
    id: 'prancha-isometrica',
    name: 'Prancha Isométrica',
    primary_muscle: 'core',
    secondary_muscles: ['ombros', 'gluteos'],
    equipment: 'peso_corporal',
    focus: 'resistencia',
    description: 'Fortalecimento do transverso do abdômen e estabilidade lombo-pélvica.',
    execution_cues: [
      'Apoie os antebraços e pontas dos pés no chão.',
      'Mantenha o corpo em linha reta da cabeça aos calcanhares.',
      'Contraia glúteos e puxe o umbigo para dentro.',
      'Respire de forma controlada.'
    ],
    common_mistakes: [
      'Deixar o quadril cair ou levantar demais o bumbum.'
    ]
  },
  {
    id: 'prancha-lateral',
    name: 'Prancha Lateral',
    primary_muscle: 'core',
    secondary_muscles: ['gluteos'],
    equipment: 'peso_corporal',
    focus: 'resistencia',
    description: 'Fortalecimento dos oblíquos e do quadrado lombar para prevenção de dores na coluna.',
    execution_cues: [
      'Apoie o antebraço lateralmente no chão.',
      'Eleve o quadril formando uma linha reta.',
      'Mantenha a posição estável.'
    ],
    common_mistakes: ['Deixar o quadril ceder em direção ao chão']
  },
  {
    id: 'abdominal-infra-na-paralela',
    name: 'Abdominal Infra na Paralela / Barra Fixa',
    primary_muscle: 'core',
    secondary_muscles: [],
    equipment: 'peso_corporal',
    focus: 'hipertrofia',
    description: 'Foco na porção inferior do reto abdominal com elevação pélvica.',
    execution_cues: [
      'Apoie os antebraços ou pendure-se na barra.',
      'Eleve os joelhos ou pernas em direção ao peito enrolando a pelve.',
      'Desça de forma controlada sem balançar o corpo.'
    ],
    common_mistakes: [
      'Apenas mexer as pernas sem enrolar o quadril.'
    ]
  },
  {
    id: 'abdominal-cabo-corda',
    name: 'Abdominal na Polia com Corda (Cable Crunch)',
    primary_muscle: 'core',
    secondary_muscles: [],
    equipment: 'polia',
    focus: 'hipertrofia',
    description: 'Permite sobrecarga progressiva com pesos no reto abdominal.',
    execution_cues: [
      'Ajoelhe-se em frente à polia alta com a corda atrás da cabeça.',
      'Enrole a coluna torácica aproximando as costelas da pelve.',
      'Aperte o abdômen por 1 segundo no final.'
    ],
    common_mistakes: ['Sentar nos calcanhares ao invés de flexionar a coluna']
  },
  {
    id: 'abdominal-com-roda',
    name: 'Abdominal com Roda (Ab Wheel Rollout)',
    primary_muscle: 'core',
    secondary_muscles: ['costas', 'ombros'],
    equipment: 'outro',
    focus: 'forca',
    description: 'Altíssima ativação excêntrica do reto abdominal e controle anti-extensão lombar.',
    execution_cues: [
      'Ajoelhe-se segurando a roda no chão.',
      'Role a roda para frente estendendo o corpo com abdômen travado.',
      'Puxe de volta usando a força do core.'
    ],
    common_mistakes: ['Deixar a lombar arquear durante a extensão']
  },

  // ==========================================
  // TREINOS DE CORRIDA (RUNNING WORKOUTS)
  // ==========================================
  {
    id: 'corrida-rodagem-leve',
    name: 'Rodagem Leve (ou Base)',
    primary_muscle: 'corrida',
    secondary_muscles: ['quadriceps', 'panturrilha', 'posterior', 'gluteos'],
    equipment: 'rua',
    focus: 'resistencia',
    image_url: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=80',
    description: 'Corrida contínua em ritmo confortável e constante (Zona 2), ideal para criar volume de quilometragem e base aeróbica sólida.',
    execution_cues: [
      'Mantenha a intensidade na Zona 2 (65% a 75% da FCM).',
      'Ritmo conversacional: seja capaz de manter uma conversa sem perder o fôlego.',
      'Cadência ideal entre 170 e 180 passos por minuto.',
      'Aterrissagem suave com o mediopé abaixo do centro de gravidade.',
      'Mantenha ombros relaxados e braços em 90 graus.'
    ],
    common_mistakes: [
      'Correr rápido demais estragando a proposta regenerativa/base da Zona 2.',
      'Dar passadas muito longas (overstriding) batendo forte com o calcanhar.'
    ]
  },
  {
    id: 'corrida-treino-longo',
    name: 'Treino Longo (Longão)',
    primary_muscle: 'corrida',
    secondary_muscles: ['quadriceps', 'gluteos', 'panturrilha', 'core'],
    equipment: 'rua',
    focus: 'resistencia',
    image_url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=80',
    description: 'Corrida de maior distância ou duração da semana, feita em ritmo moderado ou leve para ampliar a resistência física, metabólica e mental.',
    execution_cues: [
      'Inicie os primeiros 2-3km em ritmo bem controlado e confortável.',
      'Faça hidratação e reposição de carboidratos a cada 40 a 45 minutos.',
      'Economia de corrida: mantenha o tronco ereto e o movimento dos braços fluido.',
      'Foque na respiração rítmica constante nos quilômetros finais.'
    ],
    common_mistakes: [
      'Iniciar o treino em ritmo de prova e quebrar na metade final.',
      'Negligenciar hidratação e reposição de eletrólitos em dias quentes.'
    ]
  },
  {
    id: 'corrida-treino-intervalado',
    name: 'Treino Intervalado (Tiros)',
    primary_muscle: 'corrida',
    secondary_muscles: ['quadriceps', 'gluteos', 'panturrilha', 'posterior'],
    equipment: 'pista',
    focus: 'forca',
    image_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
    description: 'Alternância entre tiros de alta intensidade (Zona 4/5) e pausas de recuperação (caminhada ou trote) para melhorar a velocidade e o VO2 máximo.',
    execution_cues: [
      'Aquecimento obrigatório de 10 a 15 min de trote + educativos antes dos tiros.',
      'Execute cada tiro na velocidade alvo programada (ex: 400m, 800m ou 1000m).',
      'Elevação forte dos joelhos e uso vigoroso da alavanca dos braços.',
      'Aproveite a pausa para baixar a frequência cardíaca com caminhada ou trote leve.'
    ],
    common_mistakes: [
      'Dar tudo no primeiro tiro e não conseguir manter o ritmo nas séries seguintes.',
      'Pular o aquecimento aumentando risco de lesão muscular.'
    ]
  },
  {
    id: 'corrida-tempo-run',
    name: 'Tempo Run (Ritmo)',
    primary_muscle: 'corrida',
    secondary_muscles: ['quadriceps', 'panturrilha', 'core', 'posterior'],
    equipment: 'rua',
    focus: 'resistencia',
    image_url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80',
    description: 'Corrida contínua em ritmo mais forte e desafiador ("confortavelmente duro"), mantido de forma constante para elevar o limiar de lactato.',
    execution_cues: [
      'Mantenha ritmo constante na Zona 3/4 (cerca de 85% a 90% da FCM).',
      'Ritmo em que você consegue falar apenas palavras isoladas.',
      'Mantenha a concentração para não deixar o ritmo cair na segunda metade.',
      'Respiração controlada com foco no relaxamento facial e escapular.'
    ],
    common_mistakes: [
      'Confundir com tiro e correr rápido demais no início.',
      'Oscilar a velocidade em vez de manter uma linha estável.'
    ]
  },
  {
    id: 'corrida-fartlek',
    name: 'Fartlek',
    primary_muscle: 'corrida',
    secondary_muscles: ['quadriceps', 'gluteos', 'panturrilha', 'posterior'],
    equipment: 'rua',
    focus: 'resistencia',
    image_url: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&auto=format&fit=crop&q=80',
    description: 'Treino dinâmico que mistura variações de velocidade "brincando" com o ritmo de acordo com a percepção de esforço, subidas ou o terreno.',
    execution_cues: [
      'Alterne acelerações moderadas e fortes com trotes de recuperação sem parar.',
      'Use referências visuais da rua ou parque (postes, esquinas, subidas) para mudar de ritmo.',
      'Treino livre e intuitivo: escute seu corpo e explore diferentes cadências.',
      'Aproveite aclives para desenvolver força específica de impulsão.'
    ],
    common_mistakes: [
      'Fazer as acelerações tão fortes que forcem uma parada completa.',
      'Perder a diversão do jogo de velocidade tornando o treino excessivamente rígido.'
    ]
  },
  {
    id: 'corrida-regenerativo',
    name: 'Regenerativo',
    primary_muscle: 'corrida',
    secondary_muscles: ['quadriceps', 'panturrilha'],
    equipment: 'esteira',
    focus: 'prevencao',
    image_url: 'https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&auto=format&fit=crop&q=80',
    description: 'Corrida muito leve realizada após dias de treinos pesados, servindo para acelerar a recuperação muscular, aumentar o fluxo sanguíneo e prevenir lesões.',
    execution_cues: [
      'Ritmo ultraleve em Zona 1 (menos de 65% a 70% da FCM).',
      'Sensação de esforço muito baixa, quase sem cansaço muscular.',
      'Duração moderada de 20 a 35 minutos para não acumular fadiga.',
      'Foque na soltura articular e sensação de bem-estar.'
    ],
    common_mistakes: [
      'Acelerar o ritmo achando que o treino "não está fazendo efeito".',
      'Estender a distância transformando em rodagem longa.'
    ]
  },

  // ==========================================
  // MOBILIDADE & FLEXIBILIDADE
  // ==========================================
  {
    id: 'mobilidade-quadril-worlds-greatest',
    name: 'Mobilidade de Quadril & Torácica (Maior Alongamento do Mundo)',
    primary_muscle: 'mobilidade',
    secondary_muscles: ['core', 'quadriceps', 'posterior'],
    equipment: 'peso_corporal',
    focus: 'mobilidade',
    description: 'Exercício indispensável de pré-treino para soltar quadril, tornozelos e coluna torácica.',
    execution_cues: [
      'Dê um passo largo em afundo com as duas mãos no chão ao lado do pé.',
      'Gire o braço do mesmo lado em direção ao teto abrindo o peito.',
      'Retorne e estenda a perna da frente para alongar posterior.'
    ],
    common_mistakes: ['Prender a respiração durante o movimento']
  }
];

export const SEED_ROUTINES: WorkoutRoutine[] = [
  {
    id: 'rotina-treino-a',
    title: 'Treino A — Peito, Ombros & Tríceps',
    subtitle: 'Foco em Empurrar (Push) & Hipertrofia Superior',
    split_tag: 'Treino A',
    day_of_week: 1, // Segunda
    color: '#3b82f6',
    created_at: '2026-09-01T08:00:00Z',
    updated_at: '2026-09-28T10:00:00Z',
    exercises: [
      {
        id: 're-1',
        routine_id: 'rotina-treino-a',
        exercise_id: 'supino-reto-barra',
        exercise: SEED_EXERCISES[0],
        order_index: 0,
        target_sets: 4,
        target_reps_min: 6,
        target_reps_max: 10,
        target_weight_kg: 85,
        rest_seconds: 120,
        set_type: 'normal',
        notes: 'Aquecer bem antes da primeira série pesada. Manter escápulas aduzidas.'
      },
      {
        id: 're-2',
        routine_id: 'rotina-treino-a',
        exercise_id: 'supino-inclinado-halteres',
        exercise: SEED_EXERCISES[1],
        order_index: 1,
        target_sets: 3,
        target_reps_min: 8,
        target_reps_max: 12,
        target_weight_kg: 28,
        rest_seconds: 90,
        set_type: 'normal',
        notes: 'Inclinação de 30 graus. Foco na porção superior.'
      },
      {
        id: 're-3',
        routine_id: 'rotina-treino-a',
        exercise_id: 'crucifixo-polia-crossover',
        exercise: SEED_EXERCISES[7],
        order_index: 2,
        target_sets: 3,
        target_reps_min: 12,
        target_reps_max: 15,
        target_weight_kg: 17.5,
        rest_seconds: 60,
        set_type: 'dropset',
        notes: 'Última série com Drop Set (reduzir 30% da carga e ir até a falha).'
      },
      {
        id: 're-4',
        routine_id: 'rotina-treino-a',
        exercise_id: 'desenvolvimento-halteres-sentado',
        exercise: SEED_EXERCISES[30],
        order_index: 3,
        target_sets: 3,
        target_reps_min: 8,
        target_reps_max: 10,
        target_weight_kg: 22,
        rest_seconds: 90,
        set_type: 'normal'
      },
      {
        id: 're-5',
        routine_id: 'rotina-treino-a',
        exercise_id: 'elevacao-lateral-halteres',
        exercise: SEED_EXERCISES[32],
        order_index: 4,
        target_sets: 4,
        target_reps_min: 12,
        target_reps_max: 15,
        target_weight_kg: 12,
        rest_seconds: 60,
        set_type: 'rest_pause',
        notes: 'Rest-pause na última série: 12 reps + 15s pausa + 5 reps + 15s pausa + 4 reps.'
      },
      {
        id: 're-6',
        routine_id: 'rotina-treino-a',
        exercise_id: 'triceps-corda-polia',
        exercise: SEED_EXERCISES[42],
        order_index: 5,
        target_sets: 3,
        target_reps_min: 10,
        target_reps_max: 12,
        target_weight_kg: 25,
        rest_seconds: 60,
        set_type: 'normal'
      }
    ]
  },
  {
    id: 'rotina-treino-b',
    title: 'Treino B — Costas, Posterior Ombro & Bíceps',
    subtitle: 'Foco em Puxar (Pull) & Densidade Dorsal',
    split_tag: 'Treino B',
    day_of_week: 3, // Quarta
    color: '#10b981',
    created_at: '2026-09-01T08:00:00Z',
    updated_at: '2026-09-28T10:00:00Z',
    exercises: [
      {
        id: 're-7',
        routine_id: 'rotina-treino-b',
        exercise_id: 'puxada-alta-aberta',
        exercise: SEED_EXERCISES[14],
        order_index: 0,
        target_sets: 4,
        target_reps_min: 8,
        target_reps_max: 12,
        target_weight_kg: 65,
        rest_seconds: 90,
        set_type: 'normal'
      },
      {
        id: 're-8',
        routine_id: 'rotina-treino-b',
        exercise_id: 'remada-curvada-barra',
        exercise: SEED_EXERCISES[18],
        order_index: 1,
        target_sets: 4,
        target_reps_min: 6,
        target_reps_max: 10,
        target_weight_kg: 70,
        rest_seconds: 120,
        set_type: 'normal'
      },
      {
        id: 're-9',
        routine_id: 'rotina-treino-b',
        exercise_id: 'face-pull-polia-corda',
        exercise: SEED_EXERCISES[35],
        order_index: 2,
        target_sets: 3,
        target_reps_min: 12,
        target_reps_max: 15,
        target_weight_kg: 20,
        rest_seconds: 60,
        set_type: 'normal'
      },
      {
        id: 're-10',
        routine_id: 'rotina-treino-b',
        exercise_id: 'rosca-direta-barra-w',
        exercise: SEED_EXERCISES[37],
        order_index: 3,
        target_sets: 3,
        target_reps_min: 8,
        target_reps_max: 12,
        target_weight_kg: 32,
        rest_seconds: 75,
        set_type: 'normal'
      },
      {
        id: 're-11',
        routine_id: 'rotina-treino-b',
        exercise_id: 'rosca-martelo-halteres',
        exercise: SEED_EXERCISES[39],
        order_index: 4,
        target_sets: 3,
        target_reps_min: 10,
        target_reps_max: 12,
        target_weight_kg: 14,
        rest_seconds: 60,
        set_type: 'biset'
      }
    ]
  },
  {
    id: 'rotina-treino-c',
    title: 'Treino C — Pernas Completo & Core',
    subtitle: 'Foco em Membros Inferiores & Estabilidade',
    split_tag: 'Treino C',
    day_of_week: 5, // Sexta
    color: '#f97316',
    created_at: '2026-09-01T08:00:00Z',
    updated_at: '2026-09-28T10:00:00Z',
    exercises: [
      {
        id: 're-12',
        routine_id: 'rotina-treino-c',
        exercise_id: 'agachamento-livre-barra',
        exercise: SEED_EXERCISES[24],
        order_index: 0,
        target_sets: 4,
        target_reps_min: 6,
        target_reps_max: 8,
        target_weight_kg: 110,
        rest_seconds: 150,
        set_type: 'normal'
      },
      {
        id: 're-13',
        routine_id: 'rotina-treino-c',
        exercise_id: 'leg-press-45',
        exercise: SEED_EXERCISES[26],
        order_index: 1,
        target_sets: 3,
        target_reps_min: 10,
        target_reps_max: 12,
        target_weight_kg: 240,
        rest_seconds: 90,
        set_type: 'normal'
      },
      {
        id: 're-14',
        routine_id: 'rotina-treino-c',
        exercise_id: 'mesa-flexora',
        exercise: SEED_EXERCISES[33],
        order_index: 2,
        target_sets: 4,
        target_reps_min: 10,
        target_reps_max: 12,
        target_weight_kg: 45,
        rest_seconds: 60,
        set_type: 'normal'
      },
      {
        id: 're-15',
        routine_id: 'rotina-treino-c',
        exercise_id: 'stiff-com-barra',
        exercise: SEED_EXERCISES[31],
        order_index: 3,
        target_sets: 3,
        target_reps_min: 8,
        target_reps_max: 10,
        target_weight_kg: 70,
        rest_seconds: 90,
        set_type: 'normal'
      },
      {
        id: 're-16',
        routine_id: 'rotina-treino-c',
        exercise_id: 'prancha-isometrica',
        exercise: SEED_EXERCISES[49],
        order_index: 4,
        target_sets: 3,
        target_reps_min: 45,
        target_reps_max: 60,
        rest_seconds: 60,
        set_type: 'normal',
        notes: 'Segurar 45 a 60 segundos por série.'
      }
    ]
  }
];

export const SEED_RUNNING_LOGS: RunningLog[] = [
  {
    id: 'run-1',
    date: '2026-09-27T06:30:00Z',
    title: '🏃 Longão de Sábado — Base Aeróbica',
    workout_type: 'longao',
    distance_km: 12.5,
    duration_seconds: 4050, // 1h07m30s
    pace_min_per_km: '5:24',
    speed_kmh: 11.1,
    elevation_gain_m: 85,
    avg_heart_rate_bpm: 148,
    max_heart_rate_bpm: 164,
    rpe: 6,
    terrain: 'asfalto',
    shoes: 'Nike Pegasus 40',
    notes: 'Sensação excelente, hidratação a cada 4km. Pace constante na zona 2.'
  },
  {
    id: 'run-2',
    date: '2026-09-25T18:00:00Z',
    title: '⚡ Treino de Velocidade / Tiros 6x400m',
    workout_type: 'intervalado',
    distance_km: 6.2,
    duration_seconds: 1800,
    pace_min_per_km: '4:50',
    speed_kmh: 12.4,
    elevation_gain_m: 20,
    avg_heart_rate_bpm: 162,
    max_heart_rate_bpm: 178,
    rpe: 8,
    terrain: 'pista',
    shoes: 'Adidas Adios Pro',
    notes: 'Tiros de 400m abaixo de 4:10/km com 90s trote de intervalo.'
  },
  {
    id: 'run-3',
    date: '2026-09-23T07:00:00Z',
    title: '🎯 Corrida de Ritmo (Tempo Run 5k)',
    workout_type: 'ritmo',
    distance_km: 5.0,
    duration_seconds: 1452, // 24m12s
    pace_min_per_km: '4:50',
    speed_kmh: 12.4,
    elevation_gain_m: 35,
    avg_heart_rate_bpm: 168,
    max_heart_rate_bpm: 176,
    rpe: 8,
    terrain: 'asfalto',
    shoes: 'Nike Pegasus 40',
    notes: 'Melhor tempo nos 5km batido hoje! Sensação de controle até o km 4.'
  }
];

export const SEED_RUNNING_PLAN: RunningPlan = {
  id: 'plan-5k-sub25',
  goal_name: 'Meta 5 km Sub-24 Minutos',
  target_distance_km: 5.0,
  target_time_seconds: 1440, // 24:00
  current_best_pace: '4:50/km',
  target_pace: '4:48/km',
  target_date: '2026-10-31',
  weekly_target_km: 25,
  sessions_per_week: 3,
  schedule_suggestion: {
    tuesday: 'Corrida de Ritmo (5km progressivo)',
    thursday: 'Intervalado / Velocidade (Tiros de 400m a 800m)',
    saturday: 'Corrida Longa de Resistência (10 a 14km Z2)'
  }
};

export const SEED_BODY_METRICS: BodyMetrics[] = [
  {
    id: 'bm-1',
    date: '2026-07-01',
    weight_kg: 84.5,
    body_fat_percent: 19.8,
    waist_cm: 89.0,
    chest_cm: 104.0,
    arm_right_cm: 37.0,
    arm_left_cm: 36.5,
    thigh_right_cm: 59.0,
    thigh_left_cm: 58.5,
    calves_cm: 37.5,
    notes: 'Início do ciclo híbrido de força e corrida.'
  },
  {
    id: 'bm-2',
    date: '2026-08-01',
    weight_kg: 82.8,
    body_fat_percent: 17.5,
    waist_cm: 86.5,
    chest_cm: 105.0,
    arm_right_cm: 37.8,
    arm_left_cm: 37.3,
    thigh_right_cm: 59.5,
    thigh_left_cm: 59.0,
    calves_cm: 38.0
  },
  {
    id: 'bm-3',
    date: '2026-09-01',
    weight_kg: 81.2,
    body_fat_percent: 15.9,
    waist_cm: 84.0,
    chest_cm: 106.0,
    arm_right_cm: 38.5,
    arm_left_cm: 38.0,
    thigh_right_cm: 60.5,
    thigh_left_cm: 60.0,
    calves_cm: 38.5
  },
  {
    id: 'bm-4',
    date: '2026-09-28',
    weight_kg: 79.8,
    body_fat_percent: 14.4,
    waist_cm: 82.0,
    chest_cm: 107.0,
    arm_right_cm: 39.0,
    arm_left_cm: 38.6,
    thigh_right_cm: 61.0,
    thigh_left_cm: 60.5,
    calves_cm: 38.8,
    notes: 'Cintura afinando e mantendo densidade e massa muscular.'
  }
];

export const SEED_PROGRESS_PHOTOS: ProgressPhoto[] = [
  {
    id: 'photo-1',
    date: '2026-07-01',
    front_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
    weight_kg: 84.5,
    notes: 'Semana 1 — Início do protocolo.'
  },
  {
    id: 'photo-2',
    date: '2026-09-28',
    front_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
    weight_kg: 79.8,
    notes: 'Semana 12 — Redução de 4.7kg com ganho de definição visível.'
  }
];

export const SEED_RECOVERY_CHECKINS: RecoveryCheckin[] = [
  {
    id: 'rec-1',
    date: '2026-09-29',
    sleep_score: 9,
    energy_score: 8,
    muscle_soreness_score: 3,
    stress_score: 2,
    motivation_score: 9,
    readiness_total: 88,
    status: 'intense',
    ai_recommendation: '🟢 Excelente recuperação! Sistema nervoso e muscular prontos para treino de alta intensidade ou progressão de carga.'
  },
  {
    id: 'rec-2',
    date: '2026-09-28',
    sleep_score: 7,
    energy_score: 7,
    muscle_soreness_score: 4,
    stress_score: 4,
    motivation_score: 8,
    readiness_total: 74,
    status: 'moderate',
    ai_recommendation: '🟡 Prontidão moderada. Treino de musculação ou corrida em ritmo moderado recomendado. Evite séries até a falha extrema.'
  }
];

export const SEED_WEEKLY_SCHEDULE: WeeklyScheduleDay[] = [
  {
    day_name: 'Segunda',
    day_index: 1,
    primary_activity: '🏋 Musculação A (Peito/Ombro/Tríceps)',
    activity_type: 'strength',
    routine_id: 'rotina-treino-a',
    completed: true,
    date_str: '2026-09-28',
    notes: 'Treino de força e hipertrofia de membros superiores com foco em peito.'
  },
  {
    day_name: 'Terça',
    day_index: 2,
    primary_activity: '🏃 Tempo Run (Ritmo - 5km)',
    activity_type: 'running',
    running_modality: 'ritmo',
    target_distance_km: 5.0,
    target_duration_minutes: 25,
    completed: true,
    date_str: '2026-09-29',
    notes: 'Manter pace constante de 4:50 a 5:00/km no limiar de lactato.'
  },
  {
    day_name: 'Quarta',
    day_index: 3,
    primary_activity: '🏋 Musculação B (Costas/Bíceps)',
    activity_type: 'strength',
    routine_id: 'rotina-treino-b',
    completed: false,
    date_str: '2026-09-30',
    notes: 'Foco em puxadas e dorsais com intensidade alta.'
  },
  {
    day_name: 'Quinta',
    day_index: 4,
    primary_activity: '🏃 Treino Intervalado (Tiros na Pista)',
    activity_type: 'running',
    running_modality: 'intervalado',
    target_distance_km: 6.0,
    target_duration_minutes: 35,
    completed: false,
    date_str: '2026-10-01',
    notes: '8x 400m na Zona 5 com 90s de trote leve de recuperação.'
  },
  {
    day_name: 'Sexta',
    day_index: 5,
    primary_activity: '🏋 Musculação C (Pernas/Core)',
    activity_type: 'strength',
    routine_id: 'rotina-treino-c',
    completed: false,
    date_str: '2026-10-02',
    notes: 'Agachamento livre, leg press e estabilização de core.'
  },
  {
    day_name: 'Sábado',
    day_index: 6,
    primary_activity: '🏃 Treino Longo (Longão - 12km)',
    activity_type: 'running',
    running_modality: 'longao',
    target_distance_km: 12.0,
    target_duration_minutes: 65,
    completed: false,
    date_str: '2026-10-03',
    notes: 'Longão em Zona 2 contínua. Hidratação a cada 4km e gel no km 7.'
  },
  {
    day_name: 'Domingo',
    day_index: 0,
    primary_activity: '🏃 Regenerativo ou Descanso Ativo',
    activity_type: 'running',
    running_modality: 'regenerativo',
    target_distance_km: 3.5,
    target_duration_minutes: 20,
    completed: false,
    date_str: '2026-10-04',
    notes: 'Trote super leve na grama/esteira (Zona 1) + 15 min de mobilidade.'
  }
];

export const SEED_WEEKLY_REPORT: WeeklyReport = {
  id: 'rep-curr',
  week_start: '2026-09-22',
  week_end: '2026-09-28',
  total_workouts: 6,
  strength_sessions: 3,
  running_sessions: 3,
  total_tonnage_kg: 24650,
  total_running_km: 23.7,
  weight_delta_kg: -0.5,
  volume_increase_percent: 8.2,
  highlights: [
    'Superou recorde no Supino Reto: 4x8 com 85kg.',
    'Novo melhor pace nos 5km: 4:50/km (tempo total de 24:12).',
    'Aderência de 100% ao cronograma semanal híbrido.',
    'Redução de 0.5kg com preservação de medidas de braço e peitoral.'
  ],
  coach_feedback: 'Semana exemplar! Você aumentou seu volume total de treino em 8.2% mantendo sua recuperação e prontidão diária acima de 80. Sugestão para a próxima semana: manter a progressão no supino e adicionar mais 1km no longão de sábado mantendo o mesmo pace em Zona 2.'
};

export const mockUser = SEED_PROFILE;
export const mockExerciseDatabase = SEED_EXERCISES;
export const mockRoutines = SEED_ROUTINES;
export const mockRunningSessions = SEED_RUNNING_LOGS;
export const mockBodyMetrics = SEED_BODY_METRICS;
export const mockProgressPhotos = SEED_PROGRESS_PHOTOS;
export const mockRecoveryLogs = SEED_RECOVERY_CHECKINS;
export const mockWeeklySchedule = SEED_WEEKLY_SCHEDULE;
export const mockWeeklyReport = SEED_WEEKLY_REPORT;

export function getWeeklyConsistency() {
  return 94.8;
}

