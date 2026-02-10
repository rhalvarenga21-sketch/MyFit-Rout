# 🏗️ Organograma de Desconstrução: Planejador de Rotina Granular

Este documento detalha o plano para **desconstruir** o seletor atual de "Treinos Prontos" e **implementar** um seletor granular de Grupos Musculares.

---

## 1. 🧨 O que será "Destruído" (Removido/Alterado)

*   **❌ Dropdown Único**: Aquele menu suspenso (`<select>`) que obriga você a escolher um pacote pronto (ex: "Peito e Tríceps") será removido da visualização principal do dia.
*   **❌ Vínculo Rígido**: A lógica que obriga um dia a ter *necessariamente* um `presetWorkoutId` único será flexibilizada. O dia passará a ter **Tags de Foco** como prioridade.

---

## 2. 🧱 A Nova Estrutura (Proposta de Fluxo)

### Passo A: A Interface do Dia (Visão Geral)
Ao entrar na aba **Plano**, em vez de ver um dropdown, você verá o card do dia com o estado atual e um botão de ação claro.

> **VISUALIZAÇÃO (Estado Inicial):**
> 
> **SEGUNDA**
> *Status:* ⚪ Nenhum foco definido
> [ ➕ DEFINIR FOCO DO DIA ]

---

### Passo B: O Seletor Granular (A Mágica 🎩)
Ao clicar em `[ ➕ DEFINIR FOCO ]`, abre-se um painel (Modal ou Expansão) com a **"Matriz de Músculos"**.

> **PAINEL DE SELEÇÃO:**
> *"O que vamos treinar na Segunda?"*
>
> **Superiores:**
> `[ ⬜ Peito ]` `[ ⬜ Costas ]` `[ ⬜ Ombros ]`
> `[ ⬜ Bíceps ]` `[ ⬜ Tríceps ]` `[ ⬜ Trapézio ]`
>
> **Inferiores:**
> `[ ⬜ Quadríceps ]` `[ ⬜ Posterior ]` `[ ⬜ Glúteos ]` `[ ⬜ Panturrilha ]`
>
> **Outros:**
> `[ ⬜ Abdômen ]` `[ ⬜ Cardio ]` `[ ⬜ Descanso ]`
>
> *O usuário clica, por exemplo, em **[ ☑️ Peito ]** e **[ ☑️ Ombros ]**.*

---

### Passo C: A Inteligência de Sugestão (Otimização)
Após você selecionar os músculos (ex: Peito + Ombros), o sistema reage:

> **SUGESTÃO AUTOMÁTICA:**
> *"Baseado nas suas escolhas (Peito, Ombros), sugerimos:"*
>
> 1.  **🏆 Opção A:** Treino de Empurrar (Foco Peito/Ombro/Tríceps)
> 2.  **🥈 Opção B:** Personalizado (Montar do zero com estes músculos)
>
> `[ CONFIRMAR SELEÇÃO ]`

---

## 3. 🎯 Resultado Final Esperado

Na tela principal do Plano, o card de Segunda-feira ficará assim:

> **SEGUNDA**
> **FOCO:** `PEITO` `OMBROS`
> *Treino Sugerido:* Empurrar A (Adaptado)
> `[ ✏️ EDITAR ]`

---

## ✅ Aprovação para Execução
Se este fluxo estiver correto (selecionar **Músculos** primeiro -> Sistema sugere o **Treino** depois), posso iniciar a "destruição" do seletor antigo e implementar esta nova matriz?
