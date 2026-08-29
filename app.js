// ==========================================
// WWEBBA TESTE — VERSÃO 4
// SELEÇÃO + CONFIGURAÇÃO + QUIZ + RESULTADO
// ==========================================


// ==========================================
// MENU
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
// ESTADO DO SISTEMA
// ==========================================

let disciplinaAtual = "";
let nivelAtual = "";
let conteudoAtual = "";

let questoesAtuais = [];
let indiceQuestao = 0;
let pontuacao = 0;

// NOVO: histórico completo das respostas
let historicoRespostas = [];

// NOVO: guarda a configuração do último simulado
let quantidadeAtual = 0;
let dificuldadeAtual = "todas";


// ==========================================
// ÁREA DO QUIZ
// ==========================================

const quizArea = document.createElement("section");

quizArea.id = "quizArea";
quizArea.style.display = "none";

const mainElement = document.querySelector("main");

if (mainElement) {
    mainElement.appendChild(quizArea);
}


// ==========================================
// FUNÇÃO DE SEGURANÇA PARA TEXTO
// ==========================================

function escaparHTML(texto) {

    if (texto === undefined || texto === null) {
        return "";
    }

    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==========================================
// DISCIPLINA
// ==========================================

function selecionarDisciplina(disciplina) {

    disciplinaAtual = disciplina;

    nivelAtual = "";
    conteudoAtual = "";

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

            <div class="selection-icon">
                📚
            </div>

            <span class="quiz-label">
                WWEBBA TESTE
            </span>

            <h2>
                ${escaparHTML(disciplinaAtual)}
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
                            ${escaparHTML(nivel)}
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
                    ${escaparHTML(disciplinaAtual)}
                </span>

                <h2>
                    ${escaparHTML(nivelAtual)}
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
                ${escaparHTML(disciplinaAtual)}
            </span>

            <h2>
                ${escaparHTML(nivelAtual)}
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
                                ${escaparHTML(conteudo)}
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

    const banco =
        bancoQuestoes[disciplinaAtual]
        ?.[nivelAtual]
        ?.[conteudoAtual];


    const quantidadeDisponivel =
        banco ? banco.length : 0;


    if (quantidadeDisponivel === 0) {

        quizArea.innerHTML = `

            <div class="quiz-container selection-container">

                <div class="selection-icon">
                    ⚠️
                </div>

                <h2>
                    Nenhuma questão disponível
                </h2>

                <p class="selection-description">
                    Este conteúdo ainda não possui questões.
                </p>

                <button
                    class="btn secondary"
                    onclick="mostrarConteudos()">

                    ← Voltar

                </button>

            </div>

        `;

        return;
    }


    let opcoesQuantidade = [5, 10, 15, 20]
        .filter(numero => numero <= quantidadeDisponivel);


    if (opcoesQuantidade.length === 0) {
        opcoesQuantidade = [quantidadeDisponivel];
    }


    quizArea.innerHTML = `

        <div class="quiz-container selection-container">

            <div class="selection-icon">
                ⚙️
            </div>

            <span class="quiz-label">
                CONFIGURAR SIMULADO
            </span>

            <h2>
                ${escaparHTML(conteudoAtual)}
            </h2>

            <p class="selection-description">
                ${escaparHTML(disciplinaAtual)}
                ·
                ${escaparHTML(nivelAtual)}
            </p>

            <div class="config-box">

                <label for="quantidadeQuestoes">
                    Número de questões
                </label>

                <select id="quantidadeQuestoes">

                    ${opcoesQuantidade.map(numero => `

                        <option value="${numero}">
                            ${numero} questões
                        </option>

                    `).join("")}

                </select>


                <label for="dificuldade">
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

function iniciarSimulado(refazer = false) {

    let quantidade;
    let dificuldade;


    // Se for um novo simulado, pega os valores da configuração
    if (!refazer) {

        quantidade =
            Number(
                document.getElementById("quantidadeQuestoes")?.value
            ) || 0;


        dificuldade =
            document.getElementById("dificuldade")?.value
            || "todas";


        quantidadeAtual = quantidade;
        dificuldadeAtual = dificuldade;

    } else {

        // Ao refazer, utiliza a configuração anterior
        quantidade = quantidadeAtual;
        dificuldade = dificuldadeAtual;

    }


    const banco =
        bancoQuestoes
        [disciplinaAtual]
        ?.[nivelAtual]
        ?.[conteudoAtual];


    if (!banco || banco.length === 0) {

        alert(
            "Não existem questões disponíveis."
        );

        return;
    }


    // ======================================
    // FILTRO DE DIFICULDADE
    // ======================================
    //
    // Se as questões possuírem a propriedade
    // "dificuldade", o sistema poderá filtrá-las.
    //
    // Como as questões atuais ainda não possuem
    // essa propriedade, "todas" utiliza o banco inteiro.
    //

    let bancoFiltrado = [...banco];


    if (dificuldade !== "todas") {

        const filtradas =
            banco.filter(
                questao =>
                    questao.dificuldade === dificuldade
            );


        // Se ainda não houver questões classificadas
        // por dificuldade, evita deixar o aluno sem questões.
        if (filtradas.length > 0) {
            bancoFiltrado = filtradas;
        }

    }


    // ======================================
    // EMBARALHAR QUESTÕES
    // ======================================

    const embaralhadas =
        [...bancoFiltrado].sort(
            () => Math.random() - 0.5
        );


    questoesAtuais =
        embaralhadas.slice(
            0,
            Math.min(quantidade, bancoFiltrado.length)
        );


    // ======================================
    // RESETAR SIMULADO
    // ======================================

    indiceQuestao = 0;

    pontuacao = 0;

    historicoRespostas = [];


    if (questoesAtuais.length === 0) {

        alert(
            "Não foi possível iniciar o simulado."
        );

        return;
    }


    mostrarQuestao();

}


// ==========================================
// MOSTRAR QUESTÃO
// ==========================================

function mostrarQuestao() {

    const questao =
        questoesAtuais[indiceQuestao];


    if (!questao) {

        mostrarResultado();

        return;
    }


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
                        ${escaparHTML(
                            disciplinaAtual.toUpperCase()
                        )}
                    </span>

                    <h3>
                        Questão ${numero}
                        <span>/ ${total}</span>
                    </h3>

                </div>


                <div class="quiz-score">
                    ${pontuacao}
                    ponto${pontuacao !== 1 ? "s" : ""}
                </div>

            </div>


            <div class="quiz-progress">

                <div style="width:${progresso}%"></div>

            </div>


            <div class="question-box">

                <p class="question-number">
                    ${escaparHTML(nivelAtual)}
                    ·
                    ${escaparHTML(conteudoAtual)}
                </p>

                <h2>
                    ${escaparHTML(questao.pergunta)}
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
                            ${escaparHTML(alternativa)}
                        </strong>

                    </button>

                `).join("")}

            </div>


            <div id="feedback"></div>

        </div>

    `;

}


// ==========================================
// RESPONDER
// ==========================================

function responder(indiceEscolhido) {

    const questao =
        questoesAtuais[indiceQuestao];


    if (!questao) {
        return;
    }


    const botoes =
        document.querySelectorAll(".alternativa");


    // Impede clicar duas vezes
    botoes.forEach(botao => {
        botao.disabled = true;
    });


    const acertou =
        indiceEscolhido === questao.correta;


    // ======================================
    // PONTUAÇÃO
    // ======================================

    if (acertou) {

        pontuacao++;

        if (botoes[indiceEscolhido]) {
            botoes[indiceEscolhido]
                .classList.add("certa");
        }

    } else {

        if (botoes[indiceEscolhido]) {

            botoes[indiceEscolhido]
                .classList.add("errada");

        }


        if (botoes[questao.correta]) {

            botoes[questao.correta]
                .classList.add("certa");

        }

    }


    // ======================================
    // NOVO: GUARDAR HISTÓRICO
    // ======================================

    historicoRespostas.push({

        numero: indiceQuestao + 1,

        pergunta: questao.pergunta,

        respostaEscolhida: indiceEscolhido,

        textoRespostaEscolhida:
            questao.alternativas[indiceEscolhido],

        respostaCorreta: questao.correta,

        textoRespostaCorreta:
            questao.alternativas[questao.correta],

        acertou: acertou,

        explicacao:
            questao.explicacao

    });


    // ======================================
    // FEEDBACK
    // ======================================

    const feedback =
        document.getElementById("feedback");


    if (!feedback) {
        return;
    }


    feedback.innerHTML = `

        <div class="feedback ${acertou ? "certo" : "errado"}">

            <strong>
                ${
                    acertou
                    ? "✅ Resposta correta!"
                    : "❌ Resposta incorreta!"
                }
            </strong>

            <p>

                ${
                    acertou

                    ? escaparHTML(
                        questao.explicacao
                      )

                    : "Resposta correta: " +
                      escaparHTML(
                          questao.alternativas[
                              questao.correta
                          ]
                      ) +
                      "<br><br>" +
                      escaparHTML(
                          questao.explicacao
                      )

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
// RESULTADO FINAL
// ==========================================

function mostrarResultado() {

    const total =
        questoesAtuais.length;


    if (total === 0) {

        quizArea.innerHTML = `

            <div class="quiz-container resultado">

                <div class="resultado-icon">
                    ⚠️
                </div>

                <h2>
                    Não há questões para apresentar.
                </h2>

                <button
                    class="btn secondary"
                    onclick="mostrarConteudos()">

                    ← Voltar

                </button>

            </div>

        `;

        return;
    }


    const erros =
        total - pontuacao;


    const percentagem =
        Math.round(
            (pontuacao / total) * 100
        );


    // ======================================
    // MENSAGEM
    // ======================================

    let mensagem;


    if (percentagem >= 90) {

        mensagem =
            "🏆 Excelente desempenho!";

    } else if (percentagem >= 70) {

        mensagem =
            "👏 Muito bom desempenho!";

    } else if (percentagem >= 50) {

        mensagem =
            "📚 Bom desempenho. Continue praticando!";

    } else {

        mensagem =
            "💪 Continue estudando. Você consegue!";

    }


    // ======================================
    // REVISÃO DAS RESPOSTAS
    // ======================================

    const revisao =
        historicoRespostas.map(item => {

            const classe =
                item.acertou
                ? "revisao-certa"
                : "revisao-errada";


            const icone =
                item.acertou
                ? "✅"
                : "❌";


            return `

                <div class="revisao-item ${classe}">

                    <div class="revisao-cabecalho">

                        <strong>
                            ${icone} Questão ${item.numero}
                        </strong>

                    </div>


                    <div class="revisao-pergunta">

                        <strong>
                            ${escaparHTML(item.pergunta)}
                        </strong>

                    </div>


                    <div class="revisao-resposta">

                        ${
                            item.acertou
                            ? "✅"
                            : "❌"
                        }

                        <strong>
                            Sua resposta:
                        </strong>

                        ${escaparHTML(
                            item.textoRespostaEscolhida
                        )}

                    </div>


                    <div class="revisao-correta">

                        ✅

                        <strong>
                            Resposta correta:
                        </strong>

                        ${escaparHTML(
                            item.textoRespostaCorreta
                        )}

                    </div>


                    <div class="revisao-explicacao">

                        <strong>
                            💡 Explicação:
                        </strong>

                        <p>
                            ${escaparHTML(
                                item.explicacao
                            )}
                        </p>

                    </div>

                </div>

            `;

        }).join("");


    // ======================================
    // TELA FINAL
    // ======================================

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


            <!-- ========================== -->
            <!-- RESUMO -->
            <!-- ========================== -->

            <div class="resultado-resumo">

                <div class="resultado-card">

                    <span>
                        📊
                    </span>

                    <strong>
                        ${pontuacao}/${total}
                    </strong>

                    <small>
                        Pontuação
                    </small>

                </div>


                <div class="resultado-card">

                    <span>
                        ✅
                    </span>

                    <strong>
                        ${pontuacao}
                    </strong>

                    <small>
                        Acertos
                    </small>

                </div>


                <div class="resultado-card">

                    <span>
                        ❌
                    </span>

                    <strong>
                        ${erros}
                    </strong>

                    <small>
                        Erros
                    </small>

                </div>


                <div class="resultado-card">

                    <span>
                        🎯
                    </span>

                    <strong>
                        ${percentagem}%
                    </strong>

                    <small>
                        Aproveitamento
                    </small>

                </div>

            </div>


            <!-- ========================== -->
            <!-- REVISÃO -->
            <!-- ========================== -->

            <div class="revisao-container">

                <div class="revisao-titulo">

                    <span>
                        📝
                    </span>

                    <h3>
                        Revisão das respostas
                    </h3>

                </div>


                <div class="revisao-lista">

                    ${revisao}

                </div>

            </div>


            <!-- ========================== -->
            <!-- BOTÕES -->
            <!-- ========================== -->

            <button
                class="btn primary"
                onclick="iniciarSimulado(true)">

                🔄 Refazer simulado

            </button>


            <button
                class="btn secondary"
                onclick="mostrarConfiguracao()">

                ⚙️ Alterar configuração

            </button>


            <button
                class="btn secondary"
                onclick="mostrarConteudos()">

                📖 Escolher outro conteúdo

            </button>


            <button
                class="btn secondary"
                onclick="mostrarNiveis()">

                🎓 Escolher outro nível

            </button>

        </div>

    `;

}


// ==========================================
// FECHAR SELEÇÃO
// ==========================================

function fecharSelecao() {

    quizArea.style.display = "none";


    document.getElementById("categorias")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// CARTÕES DE DISCIPLINAS
// ==========================================

document.querySelectorAll(".card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const nome =
                card.querySelector("strong");


            if (!nome) {
                return;
            }


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


// ==========================================
// INICIALIZAÇÃO
// ==========================================

console.log(
    "🔥 Wwebba Teste V4 iniciado com sucesso."
);
