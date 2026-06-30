Este segundo conjunto de documentos foi estruturado em formato Markdown técnico, ideal para alimentar a base de dados de IA do seu WPA e fornecer especificações diretas para componentes interativos da interface do usuário (UI/UX).

---

```markdown
# metadata
title: "Checklist de Presença Comunicativa"
author: "Hélia Diz - Fonoaudióloga"
version: "1.0.0"
tags: [expressao-verbal, expressao-corporal, fonoaudiologia, oratoria, inteligenca-emocional]
category: "Vocal & Communication Coaching"

---

# 🧠 DIRETRIZES TÉCNICAS E ARQUITETURA DE MICRO-COACHING

Este módulo do aplicativo foi desenhado para atuar como um "Treinador de Bolso" (Micro-Coaching). Ele se divide em rotinas de aquecimento rápido, exercícios de voz/dicção, refinamento de postura corporal e estratégias de controle de ansiedade.

---

# 📲 RECURSOS INTERATIVOS SUGERIDOS PARA O WPA (UI/UX)

### 1. Exercício de Respiração com Guia Visual (Pacer)
*Um widget circular interativo que guia o usuário no ritmo correto de respiração para controle de ansiedade.*

```markdown
[WPA_WIDGET: BREATHING_PACER]
Configurações do Ciclo (4-4-6):
1. Inspirar (Nariz): 4 segundos (Animação de expansão)
2. Reter/Segurar: 4 segundos (Animação estática)
3. Expirar (Boca): 6 segundos (Animação de contração)
Objetivo: Estabilização de voz, redução de ansiedade imediata e projeção vocal.
```

### 2. Cronômetro de Aquecimento Vocal (Vocal Warmup Timer)
*Um botão simples para iniciar um contador de 30 segundos com instruções na tela.*

```markdown
[WPA_WIDGET: COUNTDOWN_TIMER]
Tempo: 30 segundos
Ação: Vibração de lábios com som "hummmm" (como "brrrrr" de frio).
Objetivo: Aquecer pregas vocais, evitar esforço excessivo e melhorar o brilho da voz.
```

### 3. Desafio de Dicção (Validação por Reconhecimento de Voz)
*Usando a API de reconhecimento de voz do navegador para validar a pronúncia clara.*

```markdown
[WPA_FEATURE: SPEECH_TO_TEXT_CHALLENGE]
Frase de Teste: "O rato roeu a roupa do rei de Roma"
Instrução do App: "Abra bem a boca para pronunciar as vogais e exagere na movimentação."
Critério de Sucesso: Reconhecimento limpo de 100% das palavras pelo motor de busca de voz.
```

---

# 📝 CONTEÚDO E REGRAS DE NEGÓCIO DA COMUNICAÇÃO

---

## MÓDULO 1: PREPARAÇÃO IMEDIATA (ANTES DE SE COMUNICAR)

```yaml
[STAGE: PREPARATION]
```

### 1.1 Respiração Diafragmática
*   **Ação:** Realizar 3 respirações profundas usando o diafragma.
*   **Padrão Técnico:** Inspira pelo nariz (4s) $\rightarrow$ Segura (4s) $\rightarrow$ Solta pela boca (6s).
*   **Benefício:** Redução de ansiedade e estabilização da projeção vocal.

### 1.2 Postura Alinhada
*   **Posicionamento:** Pés firmes no chão, coluna ereta, ombros relaxados, cabeça alinhada.
*   **Bloqueio de Postura:** Proibir cruzamento de braços ou curvar-se (transmite insegurança e fecha a comunicação).

### 1.3 Aquecimento Vocal
*   **Ação:** Exercício de vibração labial ("hummmm"/"brrrrr") por 30 segundos.

### 1.4 Definição de Intenção
*   **Mecanismo de Filtro (Prompt Mental):** Responder à pergunta central antes de falar:
    *   *Qual é o meu objetivo?* ( `[ ] Informar` | `[ ] Convencer` | `[ ] Motivar` )

---

## MÓDULO 2: VOZ, ARTICULAÇÃO E RITMO

```yaml
[STAGE: VOICE_AND_ARTICULATION]
```

### 2.1 Tom de Voz Adequado
*   **Volume/Intensidade:** Tom médio e firme.
*   **Evitar:** Tom muito alto (agressividade) ou tom muito baixo (insegurança).
*   **Modulação:** Uso de variações naturais de entonação para prender a atenção do ouvinte.

### 2.2 Ritmo e Pausas Estratégicas
*   **Velocidade:** Ritmo pausado e consciente.
*   **Frequência de Pausa:** Pequenas pausas estratégicas após pontos-chave para retenção da informação.
*   **Métrica de Alerta:** Falar rápido demais pontua negativamente no indicador de ansiedade do app.

### 2.3 Filtro de Vícios de Linguagem (Dicionário Limpo)
*   **Termos a serem eliminados:** *"ééé..."*, *"tipo assim..."*, *"né?"*, *"entendeu?"*.
*   **Substituto Recomendado:** Silêncio intencional (pausa silenciosa) no lugar do vício de linguagem.

### 2.4 Energização da Fala
*   **Dinâmica:** Aumentar levemente a intensidade ao pronunciar termos e frases de alta relevância no discurso. Evita a monotonia.

---

## MÓDULO 3: EXPRESSÃO CORPORAL (COMUNICAÇÃO NÃO-VERBAL)

```yaml
[STAGE: BODY_LANGUAGE]
```

### 3.1 Contato Visual
*   **Diretriz:** Olhar diretamente para o interlocutor.
*   **Em Audiências/Platoneias:** Alternar o olhar entre diferentes setores do público para criar conexão generalizada.

### 3.2 Gestualidade Eficaz
*   **Regra:** Mantenha as mãos visíveis acima da linha da cintura. Gestos suaves, naturais e congruentes com o que está sendo dito.
*   **Evitar gestos sem propósito.**

### 3.3 Antídotos para Posturas de Insegurança
*   O aplicativo deve alertar o usuário para evitar:
    *   ⚠️ **Mãos nos bolsos:** Transmite despreparo ou desinteresse.
    *   ⚠️ **Braços cruzados:** Bloqueio de conexão / comunicação fechada.
    *   ⚠️ **Mexer no cabelo/roupa:** Demonstra nervosismo inconsciente.

### 3.4 Coerência Facial
*   Alinhamento de microexpressões com o tema.
    *   *Tema leve/conector:* Sorriso natural.
    *   *Tema corporativo/crítico:* Semblante firme e focado.

---

## MÓDULO 4: ADAPTAÇÃO DE AMBIENTE (CONTEXTOS)

```yaml
[STAGE: CONTEXT_ADAPTATION]
```

| Ambiente | Diretriz de Comunicação (WPA Check) |
| :--- | :--- |
| **Reuniões e Apresentações** | • Foco na objetividade e clareza estrutural.<br>• Respire antes de responder perguntas (ganho de tempo tático).<br>• Tom firme e sem pressa. |
| **Vídeos e Redes Sociais** | • Postura ereta voltada para o ponto da câmera.<br>• Micro-sorriso antes de iniciar (gerador de simpatia instantânea).<br>• Gravação em trechos curtos para adaptação gradativa. |
| **Conversas em Grupo** | • Falar com intenção (sem hesitar).<br>• Engajar o grupo através de perguntas abertas.<br>• Evitar baixar o volume ou pedir permissão formal excessiva para opinar. |
| **Ambientes Profissionais** | • Cumprimentar com firmeza e confiança ao entrar.<br>• Apresentar-se com uma frase de impacto clara e segura.<br>• Ajustar a postura física antes de emitir a primeira palavra. |

---

## MÓDULO 5: GERENCIAMENTO EMOCIONAL

```yaml
[STAGE: EMOTIONAL_MANAGEMENT]
```

### 5.1 Reprogramação Cognitiva Rápida
*   **Inversão de Padrão:** Substituir pensamentos limitantes de falha por foco no impacto positivo.
    *   *De:* "E se eu errar?"
    *   *Para:* "E se eu impactar alguém positivamente com o meu conhecimento?"
*   **Visualização Ativa:** Praticar a imaginação guiada da apresentação com sucesso minutos antes do evento.

### 5.2 Treinamento de Dessensibilização (Medo de Falar em Público)
*   Treino no espelho ou gravação de áudios no aplicativo para adaptação com a própria voz.
*   Escalonamento de público: Começar em círculos pequenos (1-3 pessoas) antes de apresentações maiores.

### 5.3 Linguagem Interna e Afirmações de Posicionamento
*   **Substituições de Vocabulário Reativas:**
    *   🚫 **Evitar:** *"Desculpa, posso falar?"* $\rightarrow$ ✅ **Usar:** Entrar diretamente na fala com firmeza.
    *   🚫 **Evitar:** *"Não sou boa nisso."* $\rightarrow$ ✅ **Usar:** *"Estou melhorando a minha comunicação a cada dia."*
```