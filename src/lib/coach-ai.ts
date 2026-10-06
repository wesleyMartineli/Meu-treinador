import { appStorage } from './storage';

export interface AIResponse {
  message: string;
  category: 'strength' | 'running' | 'recovery' | 'nutrition' | 'general';
}

export function generateCoachResponse(userQuery: string): AIResponse {
  const query = userQuery.toLowerCase().trim();
  const profile = appStorage.getProfile();
  const bodyMetrics = appStorage.getBodyMetrics();
  const checkins = appStorage.getRecoveryCheckins();
  const runs = appStorage.getRunningLogs();
  const runningPlan = appStorage.getRunningPlan();
  const lastCheckin = checkins[0];
  const lastMetric = bodyMetrics[bodyMetrics.length - 1];

  // 1. Weekly Evolution & Progress Analysis
  if (
    query.includes('evolu') ||
    query.includes('como foi') ||
    query.includes('semana') ||
    query.includes('resultado') ||
    query.includes('progresso')
  ) {
    const weightDiff = (profile.current_weight_kg - profile.initial_weight_kg).toFixed(1);
    const weightDirection = Number(weightDiff) < 0 ? `reduziu ${Math.abs(Number(weightDiff))} kg` : `ganhou ${weightDiff} kg`;

    return {
      category: 'general',
      message: `📊 **Análise Geral de Evolução — Meu Treinador:**\n\n- **Composição Corporal:** Desde o início do protocolo você ${weightDirection} (atualmente com **${profile.current_weight_kg} kg** rumo à meta de **${profile.target_weight_kg} kg**).\n- **Performance de Força:** Cargas expressivas consolidadas:\n  • Supino: **${profile.bench_pr_kg} kg**\n  • Agachamento: **${profile.squat_pr_kg} kg**\n  • Levantamento Terra: **${profile.deadlift_pr_kg} kg**\n- **Cardio & Corrida:** Seu recorde nos 5km é **${profile.best_5k_time}** (Pace médio **${profile.best_5k_pace}/km**).\n- **Consistência:** Total de **${profile.total_workouts_completed} treinos** concluídos com alta adesão ao plano.\n\n💡 *Recomendação do Treinador:* Continue priorizando a sobrecarga progressiva nos compostos e mantenha a rodagem de corrida na zona aeróbica 2 para preservar sua recuperação neuromuscular!`,
    };
  }

  // 2. Running & Pace advice
  if (
    query.includes('corrida') ||
    query.includes('pace') ||
    query.includes('5k') ||
    query.includes('10k') ||
    query.includes('maratona') ||
    query.includes('velocidade')
  ) {
    const lastRun = runs[0];
    return {
      category: 'running',
      message: `🏃 **Análise de Corrida & Performance Aeróbica:**\n\n- **Sua Meta Atual:** ${runningPlan.goal_name} (Pace alvo: **${runningPlan.target_pace}**).\n- **Última Sessão Registrada:** ${lastRun ? `${lastRun.distance_km} km em ${lastRun.pace_min_per_km}/km (${lastRun.workout_type})` : 'Nenhuma recente'}.\n- **Estratégia para Baixar o Pace:**\n  1. **Volume Polarizado (80/20):** Mantenha 80% das suas corridas em ritmo fácil conversacional (Zona 2) e apenas 20% em alta intensidade (tiros intervalados).\n  2. **Treinos de Tiro:** Sessões de 6x400m ou 4x800m com 90s de intervalo para aumentar seu VO2 Máximo.\n  3. **Cadência:** Mire em 175-180 passos por minuto para diminuir o tempo de contato com o solo e o risco de canelite.`,
    };
  }

  // 3. Load progression & Strength
  if (
    query.includes('carga') ||
    query.includes('supino') ||
    query.includes('agachamento') ||
    query.includes('força') ||
    query.includes('aumentar') ||
    query.includes('peso')
  ) {
    return {
      category: 'strength',
      message: `🏋️‍♂️ **Princípio da Dupla Sobrecarga Progressiva:**\n\nPara aumentar cargas com segurança e hipertrofia máxima:\n\n1. **Domine as Repetições Primeiro:** Se a sua série alvo é de 8 a 12 repetições, só aumente o peso quando conseguir fazer **12 repetições limpas em TODAS as séries**.\n2. **Incrementos Pequenos:** Aumente de 2kg a 5kg no total da barra (ou 1kg a 2kg em halteres). Ao subir o peso, suas repetições cairão naturalmente para ~8 reps.\n3. **Mantenha a Cadência:** 2 a 3 segundos na fase excêntrica (descida) e explosão controlada na subida.\n\n*Seu Supino atual está em ${profile.bench_pr_kg}kg e Agachamento em ${profile.squat_pr_kg}kg.* Mantenha o foco na técnica!`,
    };
  }

  // 4. Recovery & Fatigue / Deload
  if (
    query.includes('recupera') ||
    query.includes('cansado') ||
    query.includes('dor') ||
    query.includes('sono') ||
    query.includes('deload') ||
    query.includes('prontidão')
  ) {
    const readiness = lastCheckin ? lastCheckin.readiness_total : 85;
    const statusText =
      readiness >= 75
        ? '🟢 Alta Prontidão (Ótimo estado)'
        : readiness >= 50
        ? '🟡 Prontidão Moderada'
        : '🔴 Fadiga Acumulada';

    return {
      category: 'recovery',
      message: `🧬 **Status Biológico & Prontidão Diária:**\n\n- **Índice de Prontidão Atual:** **${readiness}/100** (${statusText}).\n- **Último Check-in:** Sono: ${lastCheckin?.sleep_score || 8}/10 | Energia: ${lastCheckin?.energy_score || 8}/10 | Dor Muscular: ${lastCheckin?.muscle_soreness_score || 3}/10.\n\n**Diretrizes de Manejo de Fadiga:**\n- Durma de 7h30 a 9h por noite: é durante o sono profundo que ocorre a maior liberação de GH e síntese proteica miofibrilar.\n- Se sua pontuação de prontidão cair abaixo de 50 por 2 dias seguidos, programe um treino regenerativo ou dia de descanso ativo.`,
    };
  }

  // 5. Body & Diet / Weight
  if (
    query.includes('gordura') ||
    query.includes('dieta') ||
    query.includes('cintura') ||
    query.includes('proteina') ||
    query.includes('caloria')
  ) {
    const proteinTarget = Math.round(profile.current_weight_kg * 2.0);
    return {
      category: 'nutrition',
      message: `🥗 **Diretrizes Nutricionais para Atleta Híbrido:**\n\n- **Proteína Recomendada:** **${proteinTarget}g por dia** (2.0g/kg de peso corporal) para máxima manutenção e construção de massa muscular.\n- **Medidas Corporais Atuais:** Peso: **${profile.current_weight_kg}kg** | Cintura: **${lastMetric?.waist_cm || 82}cm** | Peito: **${lastMetric?.chest_cm || 107}cm**.\n- **Carboidratos Estratégicos:** Consuma carboidratos complexos (aveia, arroz, batata doce) 2h a 3h antes de treinos de corrida intensos ou treinos pesados de perna.\n- **Hidratação:** Beba no mínimo **3.5 litros de água por dia**, adicionando eletrólitos em dias de corrida longa (>10km).`,
    };
  }

  // Generic fallback smart response
  return {
    category: 'general',
    message: `🤖 **Coach Meu Treinador:**\n\nRecebi sua pergunta: *"${userQuery}"*.\n\nCom base no seu perfil de atleta híbrido (${profile.current_weight_kg}kg, nível ${profile.experience_level}):\n\n1. O segredo da evolução constante entre musculação e corrida é a **periodização inteligente**.\n2. Evite fazer treino pesado de pernas no mesmo dia de treinos de velocidade de corrida.\n3. Monitore seu check-in diário para ajustar o volume de treino antes que o excesso de fadiga limite seus ganhos.\n\nEm qual exercício ou meta você gostaria de aprofundar agora?`,
  };
}
