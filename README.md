# 🏋️‍♂️ Meu Treinador — Personal Trainer Digital Inteligente

> **"Sua evolução acompanhada todos os dias."**

Sistema profissional de acompanhamento físico de alta performance para atletas de **Musculação**, **Corrida** e **Treino Híbrido** (força + resistência).

---

## 📱 Módulos Implementados

1. **Meu Dashboard (Visão 360°)**
   - Cards de Composição Corporal (Peso atual, peso inicial, meta, variação em kg, cintura e % gordura).
   - Cards de Performance (Recordes nos 5km, Pace médio, 1RM estimado em Supino, Agachamento e Levantamento Terra).
   - Consistência (Sequência ativa em dias, treinos no mês, taxa de conclusão).
   - Gráficos interativos com **Recharts** (Tendência de peso e volume híbrido semanal força vs corrida).

2. **Meu Treino (Gestão de Fichas de Musculação)**
   - Divisões completas (Treino A, B, C, D) com edição, duplicação e exclusão.
   - Suporte a métodos avançados: **Drop set**, **Bi-set**, **Rest pause**, **Série até a falha** e **Aquecimento**.
   - Definição de cargas alvo, faixa de repetições (min-max), descanso programado e dicas técnicas.

3. **Modo Treino Ativo (Live Workout Tracker)**
   - Cronômetro global de treino em tempo real.
   - Registro série a série com inputs de carga (kg), repetições e seleção de tipo de série.
   - **Rest Timer Overlay Flutuante**: Temporizador automático de descanso pós-série com avisos sonoros (Web Audio API) e vibração.
   - Cálculo instantâneo de tonelagem movimentada e detecção automática de novos Recordes Pessoais (PRs).
   - Efeito comemorativo de confetes ao finalizar a sessão.

4. **Sistema de Progressão Inteligente**
   - Algoritmo de **Dupla Sobrecarga Progressiva**: detecta quando o usuário atinge o teto da faixa de repetições estipulada em todas as séries e recomenda o aumento de carga para a próxima sessão.
   - Cálculo de 1RM estimado baseado na fórmula de Epley.

5. **Biblioteca de Exercícios**
   - Mais de 60 exercícios pré-cadastrados categorizados por grupo muscular primário e secundário, equipamento (barra, halteres, polia, máquina, peso corporal) e foco.
   - Instruções de execução correta e erros comuns a evitar.
   - Formulário para cadastro de novos exercícios personalizados.

6. **Minha Corrida & Treino Híbrido**
   - Registro detalhado de sessões de corrida: distância (km), tempo, cálculo automático de pace (min/km), velocidade média (km/h), frequência cardíaca (bpm), ganho de elevação (+m), esforço percebido (RPE), terreno e calçado.
   - Planejador de Metas de Corrida (Ex: 5km Sub-24min com pace alvo de 4:48/km).
   - Gráfico de evolução temporal de pace.

7. **Meu Calendário (Microciclo Híbrido)**
   - Grade semanal intercalando musculação, corridas de ritmo/velocidade/longão e descanso ativo.
   - Botão de alternância rápida entre realizado e pendente.

8. **Meu Corpo & Fotos (Antes x Depois)**
   - Registro histórico de peso, % de gordura e circunferências (cintura, peito, braço D/E, coxa D/E, panturrilhas).
   - Componente interativo de comparação **Antes x Depois** com divisor arrastável.
   - Linha do tempo de medições e gráfico de evolução.

9. **Recuperação & Prontidão Biológica (Readiness Score)**
   - Check-in diário com 5 sliders (0 a 10): Sono, Energia, Dor Muscular (DOMS), Estresse e Motivação.
   - Cálculo algorítmico do Índice de Prontidão (0 a 100):
     - 🟢 Pronto para Treino Intenso (80-100)
     - 🟡 Treino Moderado (52-79)
     - 🔴 Recuperação Recomendada (<52)
   - Recomendações técnicas diárias geradas pelo Treinador.

10. **Relatórios Semanais Automáticos**
    - Resumo de volume total, sessões de força e corrida, tonelagem acumulada e variação de peso.
    - Parecer técnico do treinador e destaques da semana.

11. **Coach IA (Treinador Digital Inteligente)**
    - Chat interativo com inteligência esportiva.
    - Análise dinâmica baseada nos dados reais do atleta (peso, cargas, treinos recentes e check-ins).
    - Chips de perguntas rápidas pré-configuradas.

12. **Banco de Dados Supabase (SQL & RLS)**
    - Schema relacional completo em `supabase/schema.sql` com tabelas, chaves estrangeiras, índices e políticas de segurança RLS.
    - Camada de persistência local reativa automática com fallback para testes imediatos sem necessidade de backend prévio.

---

## 🚀 Como Executar o Projeto

### 1. Instalar dependências (caso ainda não tenha feito)
```bash
npm install
```

### 2. Rodar em modo de desenvolvimento
```bash
npm run dev
```
Abra no navegador em: `http://localhost:3000`

### 3. Build de Produção
```bash
npm run build
npm run start
```

---

## 🗄️ Configuração do Supabase (Opcional)

Para conectar a um projeto real no Supabase:
1. Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Preencha suas credenciais do projeto Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
   ```
3. Execute o script `supabase/schema.sql` no SQL Editor do dashboard do seu projeto Supabase.
