// ==========================================
// WWEBBA TESTE — MOTOR DE SIMULADOS
// ==========================================

// ---------- MENU MOBILE ----------

const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
        mainNav.classList.toggle("active");
    });
}

document.querySelectorAll("#mainNav a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("active");
    });
});


// ==========================================
// BANCO DE QUESTÕES — PROTÓTIPO
// ==========================================

const bancoQuestoes = {

    "Química": [
        {
            pergunta: "Qual é a unidade fundamental da matéria que conserva as propriedades de um elemento químico?",
            alternativas: [
                "Molécula",
                "Átomo",
                "Ião",
                "Núcleo"
            ],
            correta: 1,
            explicacao: "O átomo é a unidade fundamental de um elemento químico que conserva as suas propriedades químicas."
        },

        {
            pergunta: "Qual é o número atómico do oxigénio?",
            alternativas: [
                "6",
                "7",
                "8",
                "16"
            ],
            correta: 2,
            explicacao: "O oxigénio possui 8 protões no núcleo. Portanto, o seu número atómico é Z = 8."
        },

        {
            pergunta: "Qual destas partículas possui carga elétrica negativa?",
            alternativas: [
                "Protão",
                "Neutrão",
                "Eletrão",
                "Núcleo"
            ],
            correta: 2,
            explicacao: "O eletrão possui carga elétrica negativa. O protão é positivo e o neutrão não possui carga elétrica."
        },

        {
            pergunta: "Qual é a fórmula química da água?",
            alternativas: [
                "CO₂",
                "H₂O",
                "O₂",
                "H₂"
            ],
            correta: 1,
            explicacao: "A água é constituída por dois átomos de hidrogénio e um átomo de oxigénio, formando H₂O."
        },

        {
            pergunta: "Qual destas substâncias é um elemento químico?",
            alternativas: [
                "Água",
                "Dióxido de carbono",
                "Oxigénio",
                "Cloreto de sódio"
            ],
            correta: 2,
            explicacao: "O oxigénio (O₂) é uma substância simples constituída por apenas um elemento químico."
        }
    ]

};


// ==========================================
// VARIÁVEIS DO SIMULADOR
// ==========================================

let questoesAtuais = [];
let questaoAtual = 0;
let pontuacao = 0;
let respostasDadas = [];


// ==========================================
// CRIAR ÁREA DO SIMULADOR
// ==========================================

const quizArea = document.createElement("section");

quizArea.id = "quizArea";
quizArea.style.display = "none";

document.querySelector("main").appendChild(quizArea);


// ==========================================
// INICIAR SIMULADO
// ==========================================

function iniciarSimulado(disciplina) {

    if (!bancoQuestoes[disciplina]) {
        alert("Este simulado ainda está em desenvolvimento.");
        return;
    }

    questoesAtuais = bancoQuestoes[disciplina];

    questaoAtual = 0;
    pontuacao = 0;
    respostasDadas = [];

    quizArea.style.display = "block";

    mostrarQuestao();

    quizArea.scrollIntoView({
        behavior: "smooth"
    });
}


// ==========================================
// MOSTRAR QUESTÃO
// ==========================================

function mostrarQuestao() {

    const questao = questoesAtuais[questaoAtual];

    quizArea.innerHTML = `
        <div class="quiz-container">

            <div class="quiz-header">
                <span>
                    Questão ${questaoAtual + 1}
                    de ${questoesAtuais.length}
                </span>

                <span>
                    Pontos: ${pontuacao}
                </span>
            </div>

            <div class="quiz-progress">
                <div style="width:${((questaoAtual + 1) / questoesAtuais.length) * 100}%"></div>
            </div>

            <h2>${questao.pergunta}</h2>

            <div class="alternativas">

                ${questao.alternativas.map((alternativa, index) => `
                    <button
                        class="alternativa"
                        onclick="responder(${index})">
                        <span>${String.fromCharCode(65 + index)}</span>
                        ${alternativa}
                    </button>
                `).join("")}

            </div>

            <div id="feedback"></div>

        </div>
    `;
}


// ==========================================
// RESPONDER QUESTÃO
// ==========================================

function responder(indiceEscolhido) {

    const questao = questoesAtuais[questaoAtual];

    const botoes = document.querySelectorAll(".alternativa");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    const feedback = document.getElementById("feedback");

    respostasDadas.push({
        questao: questaoAtual,
        escolhida: indiceEscolhido,
        correta: questao.correta
    });

    if (indiceEscolhido === questao.correta) {

        pontuacao++;

        botoes[indiceEscolhido].classList.add("certa");

        feedback.innerHTML = `
            <div class="feedback certo">
                <strong>✅ Resposta correta!</strong>
                <p>${questao.explicacao}</p>
            </div>
        `;

    } else {

        botoes[indiceEscolhido].classList.add("errada");
        botoes[questao.correta].classList.add("certa");

        feedback.innerHTML = `
            <div class="feedback errado">
                <strong>❌ Resposta incorreta.</strong>
                <p><strong>Resposta correta:</strong>
                ${questao.alternativas[questao.correta]}</p>
                <p>${questao.explicacao}</p>
            </div>
        `;
    }


    const textoBotao =
        questaoAtual < questoesAtuais.length - 1
        ? "Próxima questão →"
        : "Ver resultado";

    feedback.innerHTML += `
        <button
            class="btn primary next-btn"
            onclick="proximaQuestao()">
            ${textoBotao}
        </button>
    `;
}


// ==========================================
// PRÓXIMA QUESTÃO
// ==========================================

function proximaQuestao() {

    questaoAtual++;

    if (questaoAtual < questoesAtuais.length) {
        mostrarQuestao();
    } else {
        mostrarResultado();
    }
}


// ==========================================
// RESULTADO
// ==========================================

function mostrarResultado() {

    const total = questoesAtuais.length;

    const percentagem =
        Math.round((pontuacao / total) * 100);

    let mensagem;

    if (percentagem >= 90) {
        mensagem = "🏆 Excelente desempenho!";
    } else if (percentagem >= 70) {
        mensagem = "👏 Muito bom desempenho!";
    } else if (percentagem >= 50) {
        mensagem = "📚 Bom começo. Continue estudando!";
    } else {
        mensagem = "💪 É preciso reforçar os conteúdos.";
    }

    quizArea.innerHTML = `
        <div class="quiz-container resultado">

            <div class="resultado-icon">🎯</div>

            <h2>Simulado concluído!</h2>

            <div class="pontuacao">
                ${pontuacao}/${total}
            </div>

            <p class="percentagem">
                ${percentagem}%
            </p>

            <h3>${mensagem}</h3>

            <button
                class="btn primary"
                onclick="iniciarSimulado('Química')">
                🔄 Refazer simulado
            </button>

            <button
                class="btn secondary"
                onclick="fecharSimulado()">
                Voltar às categorias
            </button>

        </div>
    `;
}


// ==========================================
// FECHAR SIMULADO
// ==========================================

function fecharSimulado() {

    quizArea.style.display = "none";

    document.getElementById("categorias")
        ?.scrollIntoView({
            behavior: "smooth"
        });
}


// ==========================================
// LIGAR OS CARTÕES ÀS DISCIPLINAS
// ==========================================

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("click", () => {

        const nome = card.querySelector("strong");

        if (!nome) return;

        const disciplina = nome.textContent.trim();

        if (disciplina === "Química") {

            iniciarSimulado("Química");

        } else {

            alert(
                "📚 " + disciplina +
                "\n\nEste banco de questões será desenvolvido nas próximas etapas."
            );
        }
    });

});


// ==========================================
// WWEBBA IA — FUTURA INTEGRAÇÃO
// ==========================================

const iaBtn = document.getElementById("iaBtn");

if (iaBtn) {

    iaBtn.addEventListener("click", () => {

        alert(
            "🤖 Wwebba IA\n\n" +
            "O módulo de Inteligência Artificial será integrado " +
            "numa próxima etapa."
        );

    });

}


console.log("Wwebba Teste — sistema iniciado.");
