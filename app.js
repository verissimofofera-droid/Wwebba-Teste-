// ==========================================
// WWEBBA TESTE — VERSÃO 3
// SELEÇÃO DE CONTEÚDO + CONFIGURAÇÃO
// ==========================================

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
// BANCO DE QUESTÕES
// ==========================================

const bancoQuestoes = {

    "Química": {

        "7.ª Classe": {

            "Introdução à Química": [

                {
                    pergunta:
                        "Qual é o objeto fundamental de estudo da Química?",

                    alternativas: [
                        "Apenas os seres vivos",
                        "A matéria, suas propriedades e transformações",
                        "Somente os astros",
                        "Apenas os movimentos dos corpos"
                    ],

                    correta: 1,

                    explicacao:
                        "A Química estuda a matéria, suas propriedades, " +
                        "composição, estrutura e as transformações que ela sofre."
                },

                {
                    pergunta:
                        "Qual das opções representa uma propriedade da matéria?",

                    alternativas: [
                        "Massa",
                        "Democracia",
                        "Velocidade da luz",
                        "Temperatura do Sol"
                    ],

                    correta: 0,

                    explicacao:
                        "A massa é uma propriedade geral da matéria."
                }

            ],


            "Matéria e suas propriedades": [

                {
                    pergunta:
                        "Qual estado físico possui volume definido, mas assume a forma do recipiente?",

                    alternativas: [
                        "Sólido",
                        "Líquido",
                        "Gasoso",
                        "Plasma"
                    ],

                    correta: 1,

                    explicacao:
                        "Os líquidos possuem volume definido, mas não possuem forma própria."
                },

                {
                    pergunta:
                        "Em qual estado físico as partículas apresentam maior liberdade de movimento?",

                    alternativas: [
                        "Sólido",
                        "Líquido",
                        "Gasoso",
                        "Sólido e líquido"
                    ],

                    correta: 2,

                    explicacao:
                        "No estado gasoso, as partículas encontram-se mais afastadas " +
                        "e apresentam maior liberdade de movimento."
                }

            ]

        }

    }

};


// ==========================================
// ESTADO
// ==========================================

let disciplinaAtual = "";
let nivelAtual = "";
let conteudoAtual = "";

let questoesAtuais = [];
let indiceQuestao = 0;
let pontuacao = 0;


// ==========================================
// ÁREA DO SISTEMA
// ==========================================

const quizArea = document.createElement("section");

quizArea.id = "quizArea";
quizArea.style.display = "none";

document.querySelector("main").appendChild(quizArea);


// ==========================================
// DISCIPLINA
// ==========================================

function selecionarDisciplina(disciplina) {

    disciplinaAtual = disciplina;

    quizArea.style.display = "block";

    mostrarNiveis();

    quizArea.scrollIntoView({
        behavior: "smooth"
    });
}


// ==========================================
// NÍVEIS
// ==========================================

function mostrarNiveis() {

    const niveis = [
        "7.ª Classe",
        "8.ª Classe",
        "9.ª Classe",
        "10.ª Classe",
        "11.ª Classe",
        "12.ª Classe",
        "Universidade"
    ];

    quizArea.innerHTML = `

        <div class="quiz-container selection-container">

            <div class="selection-icon">📚</div>

            <span class="quiz-label">
                WWEBBA TESTE
            </span>

            <h2>
                ${disciplinaAtual}
            </h2>

            <p class="selection-description">
                Escolha o seu nível de estudo.
            </p>

            <div class="nivel-grid">

                ${niveis.map(nivel => `

                    <button
                        class="nivel-btn"
                        onclick="selecionarNivel('${nivel}')">

                        <span class="nivel-icon">
                            🎓
                        </span>

                        <span>
                            ${nivel}
                        </span>

                        <small>
                            Ver conteúdos
                        </small>

                    </button>

                `).join("")}

            </div>

            <button
                class="btn secondary"
                onclick="fecharSelecao()">

                ← Voltar

            </button>

        </div>
    `;
}


// ==========================================
// NÍVEL SELECIONADO
// ==========================================

function selecionarNivel(nivel) {

    nivelAtual = nivel;

    mostrarConteudos();

}


// ==========================================
// CONTEÚDOS
// ==========================================

function mostrarConteudos() {

    const dados =
        bancoQuestoes[disciplinaAtual]?.[nivelAtual];


    if (!dados) {

        quizArea.innerHTML = `

            <div class="quiz-container selection-container">

                <div class="selection-icon">
                    🚧
                </div>

                <span class="quiz-label">
                    ${disciplinaAtual}
                </span>

                <h2>
                    ${nivelAtual}
                </h2>

                <p class="selection-description">
                    Os conteúdos deste nível
                    ainda estão sendo preparados.
                </p>

                <button
                    class="btn secondary"
                    onclick="mostrarNiveis()">

                    ← Escolher outro nível

                </button>

            </div>
        `;

        return;
    }


    const conteudos =
        Object.keys(dados);


    quizArea.innerHTML = `

        <div class="quiz-container selection-container">

            <div class="selection-icon">
                📖
            </div>

            <span class="quiz-label">
                ${disciplinaAtual}
            </span>

            <h2>
                ${nivelAtual}
            </h2>

            <p class="selection-description">
                Escolha o conteúdo que deseja estudar.
            </p>


            <div class="conteudo-list">

                ${conteudos.map(conteudo => `

                    <button
                        class="conteudo-item"
                        onclick="selecionarConteudo('${conteudo}')">

                        <div class="conteudo-item-icon">
                            📘
                        </div>

                        <div class="conteudo-item-text">

                            <strong>
                                ${conteudo}
                            </strong>

                            <small>
                                ${dados[conteudo].length}
                                questões disponíveis
                            </small>

                        </div>

                        <span class="arrow">
                            →
                        </span>

                    </button>

                `).join("")}

            </div>


            <button
                class="btn secondary"
                onclick="mostrarNiveis()">

                ← Voltar

            </button>

        </div>
    `;
}


// ==========================================
// CONTEÚDO SELECIONADO
// ==========================================

function selecionarConteudo(conteudo) {

    conteudoAtual = conteudo;

    mostrarConfiguracao();

}


// ==========================================
// CONFIGURAÇÃO DO SIMULADO
// ==========================================

function mostrarConfiguracao() {

    const quantidadeDisponivel =
        bancoQuestoes[disciplinaAtual]
        [nivelAtual]
        [conteudoAtual]
        .length;


    quizArea.innerHTML = `

        <div class="quiz-container selection-container">

            <div class="selection-icon">
                ⚙️
            </div>

            <span class="quiz-label">
                CONFIGURAR SIMULADO
            </span>

            <h2>
                ${conteudoAtual}
            </h2>

            <p class="selection-description">
                ${disciplinaAtual} · ${nivelAtual}
            </p>


            <div class="config-box">

                <label>
                    Número de questões
                </label>

                <select id="quantidadeQuestoes">

                    ${[5, 10, 15, 20]
                        .filter(numero => numero <= quantidadeDisponivel)
                        .map(numero => `
                            <option value="${numero}">
                                ${numero} questões
                            </option>
                        `)
                        .join("")}

                    ${quantidadeDisponivel < 5
                        ? `
                            <option value="${quantidadeDisponivel}">
                                ${quantidadeDisponivel} questões
                            </option>
                          `
                        : ""}

                </select>


                <label>
                    Nível de dificuldade
                </label>

                <select id="dificuldade">

                    <option value="todas">
                        Todas as dificuldades
                    </option>

                    <option value="facil">
                        Fácil
                    </option>

                    <option value="medio">
                        Médio
                    </option>

                    <option value="dificil">
                        Difícil
                    </option>

                </select>

            </div>


            <button
                class="btn primary iniciar-btn"
                onclick="iniciarSimulado()">

                🚀 Iniciar simulado

            </button>


            <button
                class="btn secondary"
                onclick="mostrarConteudos()">

                ← Voltar

            </button>

        </div>

    `;
}


// ==========================================
// INICIAR SIMULADO
// ==========================================

function iniciarSimulado() {

    const quantidade =
        Number(
            document.getElementById("quantidadeQuestoes")?.value
        ) || 0;


    const banco =
        bancoQuestoes
        [disciplinaAtual]
        [nivelAtual]
        [conteudoAtual];


    if (!banco || banco.length === 0) {

        alert(
            "Não existem questões disponíveis."
        );

        return;
    }


    // Embaralhar questões

    const embaralhadas =
        [...banco].sort(
            () => Math.random() - 0.5
        );


    questoesAtuais =
        embaralhadas.slice(
            0,
            Math.min(quantidade, banco.length)
        );


    indiceQuestao = 0;

    pontuacao = 0;


    mostrarQuestao();

}


// ==========================================
// QUESTÃO
// ==========================================

function mostrarQuestao() {

    const questao =
        questoesAtuais[indiceQuestao];


    const numero =
        indiceQuestao + 1;


    const total =
        questoesAtuais.length;


    const progresso =
        (numero / total) * 100;


    quizArea.innerHTML = `

        <div class="quiz-container">

            <div class="quiz-top">

                <div>

                    <span class="quiz-label">
                        ${disciplinaAtual.toUpperCase()}
                    </span>

                    <h3>
                        Questão ${numero}
                        <span>/ ${total}</span>
                    </h3>

                </div>


                <div class="quiz-score">
                    ${pontuacao} ponto${pontuacao !== 1 ? "s" : ""}
                </div>

            </div>


            <div class="quiz-progress">

                <div style="width:${progresso}%"></div>

            </div>


            <div class="question-box">

                <p class="question-number">
                    ${nivelAtual} · ${conteudoAtual}
                </p>

                <h2>
                    ${questao.pergunta}
                </h2>

            </div>


            <div class="alternativas">

                ${questao.alternativas
                    .map((alternativa, index) => `

                    <button
                        class="alternativa"
                        onclick="responder(${index})">

                        <span>
                            ${String.fromCharCode(97 + index)})
                        </span>

                        <strong>
                            ${alternativa}
                        </strong>

                    </button>

                `).join("")}

            </div>


            <div id="feedback"></div>

        </div>

    `;
}


// ==========================================
// RESPOSTA
// ==========================================

function responder(indiceEscolhido) {

    const questao =
        questoesAtuais[indiceQuestao];


    const botoes =
        document.querySelectorAll(".alternativa");


    botoes.forEach(botao => {
        botao.disabled = true;
    });


    const acertou =
        indiceEscolhido === questao.correta;


    if (acertou) {

        pontuacao++;

        botoes[indiceEscolhido]
            .classList.add("certa");

    } else {

        botoes[indiceEscolhido]
            .classList.add("errada");

        botoes[questao.correta]
            .classList.add("certa");

    }


    const feedback =
        document.getElementById("feedback");


    feedback.innerHTML = `

        <div class="feedback ${acertou ? "certo" : "errado"}">

            <strong>
                ${acertou
                    ? "✅ Resposta correta!"
                    : "❌ Resposta incorreta!"}
            </strong>

            <p>
                ${
                    acertou
                    ? questao.explicacao
                    : "Resposta correta: " +
                      questao.alternativas[questao.correta] +
                      "<br><br>" +
                      questao.explicacao
                }
            </p>

        </div>


        <button
            class="btn primary next-btn"
            onclick="proximaQuestao()">

            ${
                indiceQuestao <
                questoesAtuais.length - 1
                ? "Próxima questão →"
                : "Ver resultado"
            }

        </button>

    `;
}


// ==========================================
// PRÓXIMA QUESTÃO
// ==========================================

function proximaQuestao() {

    indiceQuestao++;


    if (
        indiceQuestao <
        questoesAtuais.length
    ) {

        mostrarQuestao();

    } else {

        mostrarResultado();

    }

}


// ==========================================
// RESULTADO
// ==========================================

function mostrarResultado() {

    const total =
        questoesAtuais.length;


    const percentagem =
        Math.round(
            (pontuacao / total) * 100
        );


    let mensagem;


    if (percentagem >= 90) {

        mensagem = "🏆 Excelente desempenho!";

    } else if (percentagem >= 70) {

        mensagem = "👏 Muito bom desempenho!";

    } else if (percentagem >= 50) {

        mensagem = "📚 Bom desempenho. Continue praticando!";

    } else {

        mensagem = "💪 Continue estudando. Você consegue!";

    }


    quizArea.innerHTML = `

        <div class="quiz-container resultado">

            <div class="resultado-icon">
                🏆
            </div>

            <span class="quiz-label">
                RESULTADO FINAL
            </span>

            <h2>
                Simulado concluído
            </h2>

            <div class="pontuacao">
                ${pontuacao}/${total}
            </div>

            <p class="percentagem">
                ${percentagem}%
            </p>

            <h3>
                ${mensagem}
            </h3>

            <br>

            <button
                class="btn primary"
                onclick="iniciarSimulado()">

                🔄 Refazer simulado

            </button>

            <button
                class="btn secondary"
                onclick="mostrarConteudos()">

                📖 Escolher outro conteúdo

            </button>

        </div>

    `;
}


// ==========================================
// FECHAR
// ==========================================

function fecharSelecao() {

    quizArea.style.display = "none";

    document.getElementById("categorias")
        ?.scrollIntoView({
            behavior: "smooth"
        });
}


// ==========================================
// CARTÕES
// ==========================================

document.querySelectorAll(".card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const nome =
                card.querySelector("strong");

            if (!nome) return;

            const disciplina =
                nome.textContent.trim();


            if (disciplina === "Química") {

                selecionarDisciplina("Química");

            } else {

                alert(
                    "📚 " +
                    disciplina +
                    "\n\n" +
                    "Esta disciplina será adicionada em breve."
                );

            }

        });

    });


// ==========================================
// WWEBBA IA
// ==========================================

const iaBtn =
    document.getElementById("iaBtn");


if (iaBtn) {

    iaBtn.addEventListener("click", () => {

        alert(
            "🤖 Wwebba IA\n\n" +
            "O módulo de IA será integrado " +
            "numa próxima etapa."
        );

    });

}


console.log(
    "🔥 Wwebba Teste V3 iniciado."
);
