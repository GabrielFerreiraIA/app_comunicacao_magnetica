Este documento consolida a base teórica e prática do **Branding Arquetípico** e da **Comunicação Intencional**, integrando as metodologias de Carol Pearson, Mariana Barbosa (Lytron) e Hélia Diz (Fonoaudiologia & Imagem). 

O material foi estruturado para funcionar como o **núcleo de dados e lógica funcional (backend/frontend)** de um aplicativo WPA de alto padrão, dividindo o conteúdo em schemas de dados, componentes interativos e regras de exibição dinâmica.

---

```markdown
# metadata
title: "Core Database: Os 12 Arquétipos da Comunicação Intencional & Branding"
authors: ["Mariana Barbosa (Lytron)", "Hélia Diz (Comunicação Intencional)", "Carol Pearson (Adapt.)"]
version: "1.2.0"
database_type: "Archetypal Relational Schema"
tags: [branding-arquetipico, expressao-verbal, estilo-visual, motivacoes-humanas, interatividade-wpa]

---

# ⚙️ ARQUITETURA TÉCNICA DO WPA: "INTERACTIVE ARCHETYPE HUB"

Para viabilizar a experiência do usuário de forma fluida no WPA, o módulo de desenvolvimento deve estruturar a interface em torno de três widgets principais baseados em JSON:

### 1. Visualizador Dinâmico (Archetype Details Modal)
*Quando o usuário clica em um dos 12 arquétipos na grade principal do app, o sistema abre uma janela exclusiva contendo quatro abas de conteúdo dinâmico:*
1. **Fisiologia Vocal** (Voz e Linguagem)
2. **Branding & Posicionamento** (Venda e Liderança)
3. **Sombra & Limitações** (Gestão de Crise)
4. **Style Protocol** (Diretriz de Roupas, Cores e Linhas de Design)

```json
{
  "widget_id": "archetype_details_modal",
  "navigation_tabs": [
    {"id": "essence", "label": "Essência e Desejos"},
    {"id": "voice", "label": "Voz e Linguagem"},
    {"id": "business", "label": "Vendas e Liderança"},
    {"id": "wardrobe", "label": "Guarda-Roupa Arquetípico"}
  ]
}
```

### 2. Bússola Arquetípica Interativa (The Composition Wheel)
*Exibe graficamente a composição do usuário, geralmente dividida entre um **Arquétipo Primário** (60% da força) e um **Arquétipo Secundário** (40% da força).*

```markdown
[WPA_INTERACTIVE: COMPOSITION_WHEEL]
Input: Pontuação total do Quiz de Arquétipos.
Output: Gráfico de radar ou rosca exibindo a distribuição percentual das 4 Grandes Motivações Humanas e os arquétipos predominantes.
```

### 3. Calculadora de Sombra (Vocal guardrail)
*Alerta o usuário quando sua comunicação entra na "sombra" do seu arquétipo dominante (ex: rigidez no Governante, ou promessas irreais no Mago).*

---

# 🧭 AS 4 GRANDES MOTIVAÇÕES HUMANAS (ESTRUTURA DE AGRUPAMENTO)

Os 12 arquétipos são organizados em quadrantes de acordo com a necessidade humana primária que ajudam a satisfazer:

```yaml
[MOTIVATIONAL_QUADRANTS]
```

### 🟢 Quadrante 1: Controle e Estabilidade (Dão estrutura ao mundo)
*   **Foco do Consumidor:** Sentir-se seguro.
*   **Arquétipos:** `Criador`, `Prestativo (Cuidador)`, `Monarca (Governante)`.

### 🔵 Quadrante 2: Comunidade e Diversão (Nenhum homem é uma ilha)
*   **Foco do Consumidor:** Ter amor, pertencimento e conexão.
*   **Arquétipos:** `Cara Comum (Pessoa Comum)`, `Amante`, `Arlequina (Bobo da Corte)`.

### 🟡 Quadrante 3: Independência e Realização (Anseio pelo paraíso)
*   **Foco do Consumidor:** Encontrar a felicidade e a verdade.
*   **Arquétipos:** `Inocente (Idealista)`, `Explorador`, `Sábio`.

### 🔴 Quadrante 4: Risco e Excelência (Deixam sua marca no mundo)
*   **Foco do Consumidor:** Realizar-se, mudar o status quo e vencer limites.
*   **Arquétipos:** `Herói`, `Fora da Lei (Rebelde)`, `Mago`.

---

# 📑 BANCO DE DADOS DETALHADO DOS 12 ARQUÉTIPOS

Abaixo está o mapeamento completo para cada arquétipo. A seção de **Style Protocol** integra as diretrizes de cores e intenções extraídas do Guia de Imagem Estratégica.

---

## 1. O INOCENTE (O Idealista)
*   **ID:** `arch_inocente`
*   **Quadrante:** Independência e Realização (Busca da felicidade)

```yaml
[PROFILE: INOCENTE]
```

*   **Desejo Central:** Vivenciar o paraíso, pureza e o melhor de dois mundos (céu e terra).
*   **Meta:** Ser feliz, livre de preconceitos e experimentar a simplicidade.
*   **Medo:** Fazer algo errado ou ruim que provoque punição.
*   **Força / Dons:** Fé, otimismo inabalável, espontaneidade e honestidade.
*   **Fraqueza / Sombra:** Negar a realidade, ingenuidade excessiva ou ignorar problemas reais.
*   **Frase Interna:** *"Tudo pode dar certo."*

### 🎙 Expressão Verbal e Fonoaudiológica
*   **Voz:** Suave, leve, com cadência linear e tranquila.
*   **Linguagem:** Altamente positiva, encorajadora, focada no bem comum e livre de termos agressivos.
*   **Comunicação:** Simples, leve e otimista.

### 💼 Branding, Vendas e Liderança
*   **Em Vendas:** Vende confiança, paz de espírito, bem-estar e promessas de retorno à simplicidade ou vida saudável.
*   **Em Liderança:** Inspira segurança emocional e constrói ambientes baseados na confiança e harmonia.

### ✦ Style Protocol (Guarda-Roupa Arquetípico)
*   **Peças-Chave:** Vestidos fluidos, camisas de corte simples em tecidos naturais (algodão, linho), suéteres leves, alfaiataria desestruturada e de caimento suave.
*   **Cores Estratégicas:** `BRANCO` (Transparência, limpeza mental), `LILÁS` (Doçura, espiritualidade leve) e tons pastel.
*   **Acessórios & Linhas:** Acessórios discretos e minimalistas, linhas predominantemente curvas e arredondadas (suavidade).

---

## 2. O SÁBIO (A Sábia)
*   **ID:** `arch_sabio`
*   **Quadrante:** Independência e Realização (Busca da felicidade)

```yaml
[PROFILE: SABIO]
```

*   **Desejo Central:** Descoberta da verdade e clareza de pensamento.
*   **Meta:** Usar a inteligência, análise e racionalidade para compreender o funcionamento do mundo.
*   **Medo:** Ser enganado, iludido ou cair na ignorância.
*   **Força / Dons:** Sabedoria, prudência, análise objetiva e pensamento lógico.
*   **Fraqueza / Sombra:** Excesso de racionalidade, isolamento analítico, paralisia por análise ou frieza na comunicação.
*   **Frase Interna:** *"Preciso entender antes de agir."*

### 🎙 Expressão Verbal e Fonoaudiológica
*   **Voz:** Controlada, pausada, com articulação precisa de vogais e consoantes (Dicção Clara).
*   **Linguagem:** Didática, estruturada, fundamentada em dados ou referências claras.
*   **Comunicação:** Lógica, limpa e altamente esclarecedora.

### 💼 Branding, Vendas e Liderança
*   **Em Vendas:** Vende conhecimento estruturado, perícia, dados analíticos e autoridade técnica indubitável.
*   **Em Liderança:** Lidera pela competência intelectual, meritocracia do saber e planejamento estratégico.

### ✦ Style Protocol (Guarda-Roupa Arquetípico)
*   **Peças-Chave:** Blazer estruturado, óculos de design clássico, camisas sociais perfeitamente alinhadas, trench coats, roupas funcionais e limpas.
*   **Cores Estratégicas:** `AZUL` (Autoridade técnica e segurança), `CINZA` (Racionalidade, equilíbrio e neutralidade).
*   **Acessórios & Linhas:** Linhas retas e angulares (racionalidade), relógios discretos, pastas estruturadas, ausência de estampas chamativas.

---

## 3. O HERÓI (A Heroína)
*   **ID:** `arch_heroi`
*   **Quadrante:** Risco e Excelência (Deixar sua marca no mundo)

```yaml
[PROFILE: HEROI]
```

*   **Desejo Central:** Provar o próprio valor por meio de ações difíceis, corajosas e desafiadoras.
*   **Meta:** Melhorar o mundo através da excelência, força e maestria técnica.
*   **Medo:** Fraqueza, vulnerabilidade e medo de "amarelar" diante do perigo.
*   **Força / Dons:** Determinação implacável, coragem física/mental, competência e energia.
*   **Fraqueza / Sombra:** Autocobrança excessiva, agressividade velada ou ver a vida apenas como uma batalha eterna.
*   **Frase Interna:** *"Onde há vontade, há um caminho. Eu consigo."*

### 🎙 Expressão Verbal e Fonoaudiológica
*   **Voz:** Firme, enérgica, com intensidade bem projetada e boa sustentação respiratória.
*   **Linguagem:** Direta, motivadora, focada em metas, conquistas e superação de barreiras.
*   **Comunicação:** Assertiva, estimulante e focada na ação.

### 💼 Branding, Vendas e Liderança
*   **Em Vendas:** Vende transformação acelerada, resultados rápidos e superação de crises ou problemas graves.
*   **Em Liderança:** Lidera pelo exemplo prático de esforço e resiliência, estimulando as equipes a darem o seu melhor.

### ✦ Style Protocol (Guarda-Roupa Arquetípico)
*   **Peças-Chave:** Ombros marcados (estruturados/ombreiras), jaquetas de couro ou gabardina, calçados robustos, alfaiataria bem cortada e com aspecto "armadura".
*   **Cores Estratégicas:** `VERMELHO` (Ação, presença e impacto), `PRETO` (Poder e mistério) e contrastes de alto impacto gráfico.
*   **Acessórios & Linhas:** Linhas verticais e diagonais marcadas (dinamismo e força), relógios esportivos de alta performance ou joias geométricas pesadas.

---

## 4. O FORA DA LEI (O Rebelde)
*   **ID:** `arch_foradalei`
*   **Quadrante:** Risco e Excelência (Deixar sua marca no mundo)

```yaml
[PROFILE: FORADALEI]
```

*   **Desejo Central:** Liberdade radical, quebra de regras limitantes e revolução.
*   **Meta:** Destruir o que não funciona na sociedade, nas empresas ou na própria vida.
*   **Medo:** Não ter poder, ser controlado, domesticado ou ser considerado comum.
*   **Força / Dons:** Capacidade de quebrar padrões, inovação radical e independência irreprimível.
*   **Fraqueza / Sombra:** Rebeldia improdutiva, comportamento destrutivo sem causa ou isolamento antissocial.
*   **Frase Interna:** *"As regras foram feitas para serem quebradas. Existe um jeito melhor."*

### 🎙 Expressão Verbal e Fonoaudiológica
*   **Voz:** Intensa, por vezes rouca ou com variações bruscas de tom, transmitindo inconformismo.
*   **Linguagem:** Provocativa, questionadora, irônica e avessa a clichês corporativos tradicionais.
*   **Comunicação:** Disruptiva, desafiadora de dogmas e de forte magnetismo.

### 💼 Branding, Vendas e Liderança
*   **Em Vendas:** Vende ruptura com o convencional, exclusividade radical e alternativas revolucionárias ao status quo.
*   **Em Liderança:** Transforma sistemas inteiros, desafia velhas estruturas organizacionais e estimula o pensamento autônomo.

### ✦ Style Protocol (Guarda-Roupa Arquetípico)
*   **Peças-Chave:** Jaqueta jeans destroyed ou couro preto, cortes assimétricos, calças com rasgos discretos, botas pesadas, camisetas com estampas conceituais ou tipográficas provocadoras.
*   **Cores Estratégicas:** `PRETO` (Elegância extrema, distanciamento), `CINZA ESCURO` e detalhes metálicos ou em tons de ferrugem/vinho profundo.
*   **Acessórios & Linhas:** Linhas quebradas ou de corte diagonal agudo. Acessórios com metal, tachas ou joias autorais de design não convencional.

---

## 5. O EXPLORADOR (A Exploradora)
*   **ID:** `arch_explorador`
*   **Quadrante:** Independência e Realização (Busca da felicidade)

```yaml
[PROFILE: EXPLORADOR]
```

*   **Desejo Central:** Liberdade para descobrir quem é por meio da exploração ativa do mundo.
*   **Meta:** Experimentar uma vida autêntica, melhor e muito mais gratificante.
*   **Medo:** Sentir-se preso, conformar-se ou cair na armadilha da rotina maçante.
*   **Força / Dons:** Autonomia, ambição de crescimento, adaptabilidade e independência.
*   **Fraqueza / Sombra:** Falta de consistência, inquietude crônica ou dificuldade de manter compromissos de longo prazo.
*   **Frase Interna:** *"Não levante cercas à minha volta. Quero descobrir meu potencial."*

### 🎙 Expressão Verbal e Fonoaudiológica
*   **Voz:** Natural, dinâmica, com bom fluxo de ar e ritmo estimulante.
*   **Linguagem:** Inspiradora, descritiva de experiências, focada em horizontes, autonomia e descobertas.
*   **Comunicação:** Reflexiva, mas impulsionadora de novas perspectivas.

### 💼 Branding, Vendas e Liderança
*   **Em Vendas:** Vende liberdade de escolha, jornadas de autodescoberta e produtos/serviços altamente customizáveis e flexíveis.
*   **Em Liderança:** Expande os limites da equipe, incentiva a autonomia individual e busca novos nichos de mercado.

### ✦ Style Protocol (Guarda-Roupa Arquetípico)
*   **Peças-Chave:** Calças cargo com corte moderno, camisas com bolsos utilitários, casacos corta-vento de alfaiataria, tecidos resistentes e confortáveis, botas de cano curto de boa qualidade.
*   **Cores Estratégicas:** `MARROM` (Confiabilidade, pé no chão) e tons de verde militar, cáqui ou bege safari.
*   **Acessórios & Linhas:** Bolsas transversais utilitárias, óculos de design utilitário chic, linhas orgânicas e confortáveis.

---

## 6. O MAGO (A Maga)
*   **ID:** `arch_mago`
*   **Quadrante:** Risco e Excelência (Deixar sua marca no mundo)

```yaml
[PROFILE: MAGO]
```

*   **Desejo Central:** Conhecer as leis fundamentais do funcionamento do mundo, da física e do universo para criar transformações.
*   **Meta:** Tornar sonhos e visões abstratas em realidade prática concreta.
*   **Medo:** Consequências negativas e inesperadas causadas por falta de controle do processo.
*   **Força / Dons:** Visão clarividente, carisma hipnótico, intuição e capacidade de encontrar soluções fora do padrão comum.
*   **Fraqueza / Sombra:** Fazer promessas irreais ou manipular a percepção alheia de forma antiética.
*   **Frase Interna:** *"Tudo pode ser transformado. Pode acontecer."*

### 🎙 Expressão Verbal e Fonoaudiológica
*   **Voz:** Hipnotizante, melodiosa, com tom de voz levemente aveludado e pausas magnéticas.
*   **Linguagem:** Transformadora, metafórica, repleta de conceitos que expandem a imaginação do ouvinte.
*   **Comunicação:** Altamente carismática, magnética e persuasiva pelo encantamento.

### 💼 Branding, Vendas e Liderança
*   **Em Vendas:** Vende experiências de transição ou "antes e depois" radicais, ferramentas de alta tecnologia ou metodologias proprietárias inovadoras.
*   **Em Liderança:** Catalisa processos de transformação de cultura organizacional e ajuda a equipe a enxergar novas realidades operacionais.

### ✦ Style Protocol (Guarda-Roupa Arquetípico)
*   **Peças-Chave:** Casacos longos ou capas com caimento esvoaçante, veludo, sedas escuras, cortes fluidos com tecidos que mudam de tonalidade sob a luz, alfaiataria conceitual.
*   **Cores Estratégicas:** `ROXO` (Espiritualidade e valor premium), `VINO` ou tons escuros e misteriosos.
*   **Acessórios & Linhas:** Joias com pedras naturais e símbolos geométricos complexos. Linhas fluidas e sinuosas que remetem ao fluxo e à transição de energia.

---

## 7. A PESSOA COMUM (O Cara Comum / O Realista)
*   **ID:** `arch_caracomum`
*   **Quadrante:** Comunidade e Diversão (Nenhum homem é uma ilha)

```yaml
[PROFILE: CARACOMUM]
```

*   **Desejo Central:** Conexão autêntica e pertencimento à comunidade de forma igualitária.
*   **Meta:** Pertencer, adequar-se e ser útil sem a necessidade de holofotes.
*   **Medo:** Ser excluído, rejeitado ou parecer arrogante por tentar se destacar da média.
*   **Força / Dons:** Realismo, forte empatia prática, ausência total de vaidade e lealdade profissional.
*   **Fraqueza / Sombra:** Medo de se destacar ou de expressar o próprio brilho por receio de julgamento do grupo.
*   **Frase Interna:** *"Sou igual a você. Todos os homens e mulheres nascem iguais."*

### 🎙 Expressão Verbal e Fonoaudiológica
*   **Voz:** Acessível, acolhedora, sem variações técnicas rebuscadas, tom coloquial e simpático.
*   **Linguagem:** Simples, direta, livre de jargões técnicos exagerados ou termos pomposos.
*   **Comunicação:** Próxima, informal e de alta identificação imediata.

### 💼 Branding, Vendas e Liderança
*   **Em Vendas:** Vende identificação, senso de comunidade, custo-benefício honesto e utilidade prática no dia a dia.
*   **Em Liderança:** Constrói confiança através do trabalho horizontal, promovendo a colaboração mútua nas equipes.

### ✦ Style Protocol (Guarda-Roupa Arquetípico)
*   **Peças-Chave:** Camisas polo clássicas, camisas de algodão simples, calças jeans de corte tradicional, jaquetas estruturadas de estilo casual e calçados confortáveis.
*   **Cores Estratégicas:** `AZUL JEANS`, `CINZA CLARO`, `BEGE` e tons terrosos suaves.
*   **Acessórios & Linhas:** Linhas simples e confortáveis. Acessórios discretos e funcionais (como relógios de couro ou mochilas de lona).

---

## 8. O AMANTE (A Amante)
*   **ID:** `arch_amante`
*   **Quadrante:** Comunidade e Diversão (Nenhum homem é uma ilha)

```yaml
[PROFILE: AMANTE]
```

*   **Desejo Central:** Conseguir intimidade profunda, cultivar a afeição mútua e experimentar o prazer sensorial estético.
*   **Meta:** Manter e nutrir relacionamentos íntimos com as pessoas, o trabalho e as experiências que ama.
*   **Medo:** Rejeição, solidão, isolamento emocional ou sentir-se indesejável.
*   **Força / Dons:** Paixão, apreço estético apurado, gratidão profunda e forte comprometimento interpessoal.
*   **Fraqueza / Sombra:** Busca excessiva por aprovação externa, perda da própria identidade para agradar aos outros.
*   **Frase Interna:** *"Só tenho olhos para você. Quero criar conexão verdadeira."*

### 🎙 Expressão Verbal e Fonoaudiológica
*   **Voz:** Calorosa, envolvente, levemente modulada e intimista, gerando sensação de acolhimento.
*   **Linguagem:** Afetiva, empática, elogiosa e focada nas emoções e na experiência estética ou de bem-estar.
*   **Comunicação:** Altamente conetiva, próxima, que estabelece vínculos emocionais instantâneos.

### 💼 Branding, Vendas e Liderança
*   **Em Vendas:** Vende experiências sensoriais exclusivas, bem-estar pessoal, conexão profunda e beleza estética impecável.
*   **Em Liderança:** Constrói lealdade absoluta através da valorização genuína de cada liderado e do desenvolvimento de um ambiente afetuoso.

### ✦ Style Protocol (Guarda-Roupa Arquetípico)
*   **Peças-Chave:** Tecidos luxuosos e táteis (seda, cetim, cashmere), alfaiataria slim fit que contorna o corpo de forma elegante, drapeados sutis, decotes refinados e camisas de caimento impecável.
*   **Cores Estratégicas:** `VINHO` (Elegância e sofisticação refinada), `VERMELHO` (Magnetismo e paixão), tons nude e blush.
*   **Acessórios & Linhas:** Linhas curvas e orgânicas sinuosas. Acessórios delicados e sofisticados, metais brilhantes (ouro ou prata polida) e fragrâncias marcantes.

---

## 9. O BOBO DA CORTE (A Arlequina)
*   **ID:** `arch_bobo`
*   **Quadrante:** Comunidade e Diversão (Nenhum homem é uma ilha)

```yaml
[PROFILE: BOBO]
```

*   **Desejo Central:** Viver no momento presente com alegria total e divertimento contínuo.
*   **Meta:** Divertir a si mesmo, quebrar o tédio geral e alegrar o ambiente ao redor.
*   **Medo:** Tédio, parecer maçante, chato ou excessivamente formal.
*   **Força / Dons:** Espontaneidade radical, bom humor, alta inteligência social e flexibilidade mental.
*   **Fraqueza / Sombra:** Falta de profundidade profissional ou usar o humor para mascarar desconfortos e evitar conversas difíceis.
*   **Frase Interna:** *"A vida pode ser mais leve. Se eu não puder dançar, não quero participar."*

### 🎙 Expressão Verbal e Fonoaudiológica
*   **Voz:** Altamente expressiva, dinâmica, com variações rápidas de intensidade, ritmo e tom para manter o engajamento.
*   **Linguagem:** Espontânea, cheia de metáforas divertidas, piadas inteligentes e construções linguísticas irreverentes.
*   **Comunicação:** Leve, divertida, descontraída e avessa a rituais corporativos tradicionais.

### 💼 Branding, Vendas e Liderança
*   **Em Vendas:** Vende entretenimento, quebra de rotina, diversão espontânea e produtos/serviços que descomplicam tarefas complexas.
*   **Em Liderança:** Humaniza os ambientes corporativos pesados, quebra tensões em momentos de crise com ideias inusitadas.

### ✦ Style Protocol (Guarda-Roupa Arquetípico)
*   **Peças-Chave:** Peças com toques divertidos (meias coloridas, estampas criativas), peças de alfaiataria combinadas de forma descontraída (ex: blazer com tênis de design vibrante), modelagens irreverentes.
*   **Cores Estratégicas:** `AMARELO` (Energia e criatividade), `LARANJA` (Entusiasmo e engajamento) e mix de cores quentes.
*   **Acessórios & Linhas:** Estampas geométricas ou abstratas ousadas, linhas dinâmicas e assimétricas que quebram a rigidez visual.

---

## 10. O CUIDADOR (O Prestativo)
*   **ID:** `arch_cuidador`
*   **Quadrante:** Controle e Estabilidade (Dar estrutura ao mundo)

```yaml
[PROFILE: CUIDADOR]
```

*   **Desejo Central:** Proteger os outros de danos, privações e sofrimento.
*   **Meta:** Ajudar o próximo e garantir o bem-estar e o suporte de quem está ao redor.
*   **Medo:** Egoísmo, ingratidão ou ser incapaz de fornecer suporte quando necessário.
*   **Força / Dons:** Generosidade desinteressada, compaixão natural, paciência inesgotável e empatia ativa.
*   **Fraqueza / Sombra:** Esquecimento de si mesmo, sobrecarga física/emocional ou assumir as responsabilidades dos outros de forma invasiva.
*   **Frase Interna:** *"Como posso ajudar você hoje? Ama teu próximo como a ti mesmo."*

### 🎙 Expressão Verbal e Fonoaudiológica
*   **Voz:** Protetora, suave, com ressonância que transmite calor e aconchego ao ouvinte.
*   **Linguagem:** Altamente empática, acolhedora, com uso frequente de termos de apoio emocional.
*   **Comunicação:** Acolhedora, focada nas necessidades do outro e de tom apaziguador.

### 💼 Branding, Vendas e Liderança
*   **Em Vendas:** Vende suporte contínuo, pós-venda impecável, segurança para a família e soluções que reduzem o estresse e a carga mental.
*   **Em Liderança:** Desenvolve e cuida ativamente da carreira das pessoas da equipe, garantindo um ambiente de trabalho acolhedor.

### ✦ Style Protocol (Guarda-Roupa Arquetípico)
*   **Peças-Chave:** Cardigans aconchegantes, blusas de lã de tramas suaves, calças de caimento solto e confortável, sapatos macios, casacos envolventes que remetem ao abraço.
*   **Cores Estratégicas:** `VERDE` (Saúde, acolhimento e harmonia), `BEGE` (Conforto e calma).
*   **Acessórios & Linhas:** Linhas arredondadas, tecidos macios ao toque (algodão orgânico, lã), joias afetivas ou discretas.

---

## 11. O CRIADOR (A Criadora)
*   **ID:** `arch_criador`
*   **Quadrante:** Controle e Estabilidade (Dar estrutura ao mundo)

```yaml
[PROFILE: CRIADOR]
```

*   **Desejo Central:** Criar algo de valor duradouro, inovador e esteticamente belo que dê forma a uma visão interior.
*   **Meta:** Dar forma física ou conceitual a ideias e visões abstratas.
*   **Medo:** Mediocridade, falta de visão ou ser considerado medíocre na execução dos seus projetos.
*   **Força / Dons:** Imaginação fértil, aptidão artística e pensamento estruturado não linear.
*   **Fraqueza / Sombra:** Perfeccionismo paralisante, insatisfação crônica com os resultados obtidos ou criar projetos complexos demais para serem executados.
*   **Frase Interna:** *"Se pode ser imaginado, pode ser criado. Posso fazer algo extraordinário."*

### 🎙 Expressão Verbal e Fonoaudiológica
*   **Voz:** Expressiva, com ritmo dinâmico que reflete o entusiasmo de novas criações.
*   **Linguagem:** Criativa, inventiva, utilizando analogias artísticas ou conceituais.
*   **Comunicação:** Original, entusiasmada e focada na inovação de design ou ideias.

### 💼 Branding, Vendas e Liderança
*   **Em Vendas:** Vende inovação, metodologias criativas, customização autoral e design exclusivo que destaca o usuário.
*   **Em Liderança:** Estimula o pensamento criativo na equipe, elimina a burocracia desnecessária e fomenta a experimentação prática.

### ✦ Style Protocol (Guarda-Roupa Arquetípico)
*   **Peças-Chave:** Peças de alfaiataria com cortes arquitetônicos ou geométricos diferenciados, camisas com golas esculturais, sobreposições inteligentes de tecidos estruturados, óculos de design autoral marcante.
*   **Cores Estratégicas:** `ROXO` (Valor premium e autoridade), `AMARELO` (Ativa e expande a mente) e estampas de design próprio ou com grafismo sofisticado.
*   **Acessórios & Linhas:** Peças de design autoral exclusivo (joias esculturais), linhas retas combinadas com curvas marcantes de design ousado.

---

## 12. O GOVERNANTE (A Soberana)
*   **ID:** `arch_governante`
*   **Quadrante:** Controle e Estabilidade (Dar estrutura ao mundo)

```yaml
[PROFILE: GOVERNANTE]
```

*   **Desejo Central:** Exercer o controle e liderança para organizar processos e evitar a decadência de um sistema.
*   **Meta:** Criar uma empresa, família ou comunidade próspera, estável e de sucesso contínuo.
*   **Medo:** Caos, desordem sistêmica e perda de controle ou autoridade pessoal.
*   **Força / Dons:** Responsabilidade extrema, liderança estratégica nata e habilidade organizacional.
*   **Fraqueza / Sombra:** Rigidez comportamental, autoritarismo, dificuldade de delegar ou arrogância profissional.
*   **Frase Interna:** *"Preciso assumir a liderança e criar ordem para que todos prosperem."*

### 🎙 Expressão Verbal e Fonoaudiológica
*   **Voz:** Segura, com boa projeção e colocação vocal firme, sem hesitações no tom.
*   **Linguagem:** Objetiva, focada em metas de legado, governança corporativa e consolidação de valor estável.
*   **Comunicação:** Estratégica, clara e imponente.

### 💼 Branding, Vendas e Liderança
*   **Em Vendas:** Vende segurança de longo prazo, status de prestígio elevado, durabilidade e sistemas de organização eficientes.
*   **Em Liderança:** Cria ordem, desenvolve regulamentos claros que geram estabilidade e direciona as metas de longo prazo da organização.

### ✦ Style Protocol (Guarda-Roupa Arquetípico)
*   **Peças-Chave:** Ternos sob medida impecáveis, blazers estruturados com ombreiras e lapelas marcantes, camisas sociais estruturadas com tecidos de alta gramatura, relógios de marcas consolidadas de prestígio.
*   **Cores Estratégicas:** `VINHO` (Sofisticação refinada), `PRETO` (Elegância extrema e autoridade), marinho ou carvão.
*   **Acessórios & Linhas:** Linhas predominantemente verticais de corte limpo (autoridade), joias em ouro maciço com design tradicional e estruturado.

---

# 🎛 REGRA DE PROCESSAMENTO: "THE COMBINATION ENGINE"

Para alimentar a inteligência artificial ou a lógica de programação do WPA quando o usuário possuir mais de um arquétipo em destaque no resultado do teste, adote o seguinte cruzamento de dados de estilo e posicionamento:

```yaml
[COMBINATION_RULES]
```

### 1. Governante + Amante (Autoridade com Conexão)
*   **Ação:** Suavizar a rigidez do Governante através do apelo táteis do Amante.
*   **Look Sugerido:** Blazer estruturado preto (Governante) combinado com uma blusa de seda fluida em tom vinho profundo (Amante).
*   **Voz:** Firmeza no conteúdo (Soberano) com modulação de tom calorosa (Amante).

### 2. Sábio + Governante (Especialista Estratégico)
*   **Ação:** Maximização do pilar de autoridade intelectual e técnica.
*   **Look Sugerido:** Camisa social branca (Sábio/Clareza) com terno sob medida cinza-chumbo (Governante) e linhas limpas.
*   **Voz:** Dicção perfeitamente clara, ritmo lento com pausas de autoridade.

### 3. Criador + Explorador (Inovador Nato)
*   **Ação:** Unir a originalidade estética com o pragmatismo utilitário de movimento.
*   **Look Sugerido:** Peças utilitárias com cortes assimétricos em tons terrosos, combinadas com acessórios de design autoral.
*   **Voz:** Expressiva e entusiasta, focada em expandir os limites conhecidos.
```