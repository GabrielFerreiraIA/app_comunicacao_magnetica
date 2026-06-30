Este quinto documento traz a matriz de mapeamento dos **12 Arquétipos de Marca/Personalidade**. No contexto do seu aplicativo WPA, esta tabela serve como o motor de diagnóstico (backend) para identificar o perfil arquetípico do usuário, o qual direcionará as sugestões de cores (Documento 1), voz (Documentos 2 e 3) e comportamento de comunicação (Documento 4).

Abaixo, o conteúdo está estruturado em Markdown técnico, mapeado com propriedades de dados (JSON-friendly) para facilitar a integração no banco de dados e na lógica de cálculo de pontuação do aplicativo.

---

```markdown
# metadata
title: "Matriz de Diagnóstico de Arquétipos Predominantes"
author: "Hélia Diz - Posicionamento Estratégico"
version: "1.0.0"
tags: [arquetipos, branding-pessoal, diagnostico, identidade-de-marca, posicionamento]
category: "Archetypal Profiling Engine"

---

# 🧠 LÓGICA DE CÁLCULO E CALIBRAÇÃO (DIAGNOSTIC ENGINE)

Para transformar esta tabela estática em um recurso interativo dentro do WPA, o sistema deve adotar o seguinte modelo de pontuação:

```markdown
[WPA_WIDGET: ARCHETYPE_QUIZ]
Método de Avaliação: Para cada arquétipo, o usuário atribui uma pontuação de 0 a 3 para cada um dos 4 pilares (Desejo, Meta, Medo, Dons), baseando-se em fatos reais, decisões cotidianas, aspirações e medos pessoais.

Pontuação por Item:
- 0: Não me identifico / Não se aplica à minha realidade.
- 1: Identificação leve ou ocasional.
- 2: Forte identificação / Guia minhas decisões frequentemente.
- 3: Identificação absoluta / Representa meu comportamento central.

Cálculo da Soma por Arquétipo:
Soma = (Pontuação Desejo) + (Pontuação Meta) + (Pontuação Medo) + (Pontuação Dons)
Pontuação Máxima por Arquétipo: 12 pontos.
```

---

# 📂 MODELO DE DADOS DOS 12 ARQUÉTIPOS (DATABASE SCHEMA)

---

### 1. INOCENTE
*   **ID:** `archetype_01_inocente`
*   **Desejo:** Quer vivenciar o paraíso. O melhor de dois mundos: céu e terra.
*   **Meta:** Quer ser feliz.
*   **Medo:** Fazer algo errado ou ruim e ser punida por isso.
*   **Dons:** Uma pessoa de muita fé e é muito otimista.
*   **Nomes Alternativos / Conhecido Como:** Utópica, sonhadora, romântica, ingênua, mística, tradicionalista.
*   **Conexão de Paleta (Sugerida):** Neutros Estratégicos (`BRANCO`), Lilás (`CRIATIVIDADE_E_INTUICAO`).

---

### 2. EXPLORADORA
*   **ID:** `archetype_02_exploradora`
*   **Desejo:** Liberdade para descobrir quem você é, mediante exploração do mundo.
*   **Meta:** Experimentar uma vida mais autêntica, melhor e mais gratificante.
*   **Medo:** Ter um vazio interior, se conformar, cair em uma armadilha.
*   **Dons:** Ser fiel ao que acredita e à sua alma, autonomia, independência, ambição.
*   **Nomes Alternativos / Conhecido Como:** Buscador, Aventureiro, Peregrino, Andarilho.
*   **Conexão de Paleta (Sugerida):** Marrom (`SEGURANCA_E_ESTABILIDADE`), Laranja (`ENGAJAMENTO`).

---

### 3. SÁBIA
*   **ID:** `archetype_03_sabia`
*   **Desejo:** Descoberta da verdade.
*   **Meta:** Usar a inteligência e a análise para compreender o mundo.
*   **Medo:** Ser enganado e iludido. Tem medo de ser ignorante.
*   **Dons:** Sabedoria, Inteligência.
*   **Nomes Alternativos / Conhecido Como:** Especialista, Profissional, Planejador, Professor, Mentor, Pensador, Pesquisador.
*   **Conexão de Paleta (Sugerida):** Azul (`AUTORIDADE_TECNICA`), Cinza (`NEUTRALIDADE_SOPHISTICATION`).

---

### 4. HEROÍNA
*   **ID:** `archetype_04_heroina`
*   **Desejo:** Provar o próprio valor por meio de uma ação corajosa e difícil.
*   **Meta:** Quer melhorar o mundo, exercendo a sua função com maestria.
*   **Medo:** Fraqueza, medo de "amarelar" e vulnerabilidade.
*   **Dons:** Coragem e competência.
*   **Nomes Alternativos / Conhecido Como:** Guerreiro, atleta vencedor, competidor, jogador de equipe, super-herói, libertador.
*   **Conexão de Paleta (Sugerida):** Vermelho (`PRESENCA_E_IMPACTO`), Preto (`PODER_E_MISTERIO`).

---

### 5. REBELDE
*   **ID:** `archetype_05_rebelde`
*   **Desejo:** Vingança ou revolução.
*   **Meta:** Destruir aquilo que não funciona (para si própria ou para a sociedade).
*   **Medo:** Não ter poder, ser comum ou inconsequente.
*   **Dons:** Liberdade radical e irreprimível.
*   **Nomes Alternativos / Conhecido Como:** Rebelde, Revolucionário, Inimigo, vilão, desajustado.
*   **Conexão de Paleta (Sugerida):** Preto (`PODER_E_MISTERIO`), Vermelho (`PRESENCA_E_IMPACTO`).

---

### 6. MAGA
*   **ID:** `archetype_06_maga`
*   **Desejo:** Conhecer as leis fundamentais do funcionamento do mundo e do universo.
*   **Meta:** Tornar os sonhos realidade.
*   **Medo:** Consequências negativas e inesperadas.
*   **Dons:** Encontrar resultados.
*   **Nomes Alternativos / Conhecido Como:** Visionário, Catalisador, Inovador, líder, carismático, curandeiro, mediador, xamã.
*   **Conexão de Paleta (Sugerida):** Roxo (`AUTORIDADE_SENSIVEL`), Lilás (`CRIATIVIDADE_E_INTUICAO`).

---

### 7. CIDADÃ
*   **ID:** `archetype_07_cidada`
*   **Desejo:** Conexão com os outros.
*   **Meta:** Pertencer-se, adequar-se.
*   **Medo:** Medo de aparecer, de se destacar, parecer que está se dando importância e ser exilado por isso.
*   **Dons:** Realismo, empatia, ausência de vaidade.
*   **Nomes Alternativos / Conhecido Como:** O bom companheiro, o trabalhador, o bom vizinho, homem/mulher comum, garota média.
*   **Conexão de Paleta (Sugerida):** Bege (`LUXO_SILENCIOSO`), Verde (`CONEXAO_E_EQUILIBRIO`).

---

### 8. AMANTE
*   **ID:** `archetype_08_amante`
*   **Desejo:** Conseguir intimidade e experimentar o prazer sensual.
*   **Meta:** Manter um relacionamento com as pessoas, com o trabalho, com as experiências que ama.
*   **Medo:** Ficar sozinho, ser indesejado, não ser amado, "tomar chá de cadeira".
*   **Dons:** Paixão, apreço, gratidão, comprometimento.
*   **Nomes Alternativos / Conhecido Como:** Parceiros, amigos, os íntimos, casamenteiros, especialistas, sensualistas, harmonizadores.
*   **Conexão de Paleta (Sugerida):** Vinho (`ELEGANCIA_E_PODER_DISCRETO`), Vermelho (`PRESENCA_E_IMPACTO`).

---

### 9. PERFORMÁTICA
*   **ID:** `archetype_09_performatica`
*   **Desejo:** Viver no momento presente, com alegria total.
*   **Meta:** Divertir-se e alegrar o mundo.
*   **Medo:** Aborrecer-se ou ser maçante.
*   **Dons:** Alegria.
*   **Nomes Alternativos / Conhecido Como:** Conhecido como tolo, o bobo, o malandro, o palhaço, comediante, blefista, o animador.
*   **Conexão de Paleta (Sugerida):** Amarelo (`ATIVA_E_EXPANDE`), Estampas (`DINAMISMO_E_PERSONALIDADE`).

---

### 10. CUIDADORA
*   **ID:** `archetype_10_cuidadora`
*   **Desejo:** Proteger os outros do mal.
*   **Meta:** Ajudar os outros.
*   **Medo:** Medo do egoísmo e da ingratidão.
*   **Dons:** Compaixão e generosidade.
*   **Nomes Alternativos / Conhecido Como:** O altruísta, o santo, o pai (mãe), o ajudante, o cuidador.
*   **Conexão de Paleta (Sugerida):** Verde (`CONEXAO_E_EQUILIBRIO`), Bege (`LUXO_SILENCIOSO`).

---

### 11. CRIATIVA
*   **ID:** `archetype_11_criativa`
*   **Desejo:** Criar algo de valor duradouro.
*   **Meta:** Dar forma a uma visão.
*   **Medo:** Ter uma visão medíocre na execução.
*   **Dons:** Criatividade e imaginação.
*   **Nomes Alternativos / Conhecido Como:** O artista, o inovador, o inventor, o músico, o escritor ou o sonhador.
*   **Conexão de Paleta (Sugerida):** Roxo (`AUTORIDADE_SENSIVEL`), Amarelo (`ATIVA_E_EXPANDE`), Estampas (`DINAMISMO_E_PERSONALIDADE`).

---

### 12. GOVERNANTE
*   **ID:** `archetype_12_governante`
*   **Desejo:** Controle.
*   **Meta:** Criar uma família, uma empresa ou comunidade próspera.
*   **Medo:** Caos e ser destruído.
*   **Dons:** Responsabilidade e Liderança.
*   **Nomes Alternativos / Conhecido Como:** O chefe, o líder, o aristocrata, o pai (mãe), o político, o administrador.
*   **Conexão de Paleta (Sugerida):** Vinho (`ELEGANCIA_E_PODER_DISCRETO`), Preto (`PODER_E_MISTERIO`).

---

# 🔗 INTEGRAÇÃO DE SISTEMAS DO WPA (SABEDORIA DO DIAGNÓSTICO)

```markdown
[AI_RULE_ENGINE: ARCHETYPE_OUTCOME_ALIGNMENT]
Após o usuário responder o teste arquetípico e o sistema consolidar os dados, a IA integrará as frentes da seguinte forma:

Se o principal arquétipo dominante for: criativa ou governante
1. RECOMENDAR PALETA: Vinho, Preto ou Roxo (Garante o pilar de Autoridade, Poder e Visão).
2. CONFIGURAR TOM DE VOZ (WPA): Tom médio-firme, pausas estratégicas de liderança (Documento 2, Seção 2).
3. MODELO DE ASSERTIVIDADE: Focar na Tríade da Comunicação com ênfase no pilar "Direção" (Documento 4).
```
