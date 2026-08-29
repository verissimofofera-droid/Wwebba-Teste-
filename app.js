// ==========================================
// WWEBBA TESTE — APP.JS
// MOTOR DE SIMULADOS
// ==========================================


// ==========================================
// MENU MOBILE
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
// BANCO DE QUESTÕES — PRIMEIRO TESTE
// ==========================================

const bancoQuestoes = {

    "Química": [

        {
            pergunta: "Qual é o número atómico do oxigénio?",

            alternativas: [
                "6",
                "7",
                "8",
                "16"
            ],

            correta: 2,

            explicacao:
                "O oxigénio possui 8 protões no núcleo. " +
                "Por isso, o seu número atómico é 8."
        },


        {
            pergunta:
                "Qual destas partículas possui carga elétrica negativa?",

            alternativas: [
                "Protão",
                "Neutrão",
                "Eletrão",
                "Núcleo"
            ],

            correta: 2,

            explicacao:
                "O eletrão possui carga elétrica negativa. " +
                "O protão possui carga positiva e o neutrão é eletricamente neutro."
        },


        {
            pergunta:
                "Qual é a fórmula química da água?",

            alternativas: [
                "CO₂",
                "H₂O",
                "O₂",
                "H₂"
            ],

            correta: 1,

            explicacao:
                "A molécula de água é constituída por dois átomos " +
                "de hidrogénio e um átomo de oxigénio: H₂O."
        },


        {
            pergunta:
                "Qual destas substâncias é formada por apenas um elemento químico?",

            alternativas: [
                "Água",
                "Dióxido de carbono",
                "Oxigénio",
                "Cloreto de sódio"
            ],

            correta: 2,

            explicacao:
                "O oxigénio molecular, O₂, é uma substância simples, " +
                "pois é constituído apenas por átomos de oxigénio."
        },


        {
            pergunta:
                "Qual das seguintes partículas se encontra no núcleo do átomo?",

            alternativas: [
                "Eletrão",
                "Protão",
                "Eletrão livre",
                "Fotão"
            ],

            correta: 1,

            explicacao:
                "O núcleo atómico é constituído principalmente por protões " +
                "e neutrões. Os eletrões encontram-se na eletrosfera."
        }

    ]

};


// ==========================================
// ESTADO DO SIMULADO
// ==========================================

let questoesAtuais = [];

let indiceQuestao = 0;

let pontuacao = 0;

let simuladoIniciado = false;


// ==========================================
// CRIAR ÁREA DO SIMULADO
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

        alert(
            "Este simulado ainda está em desenvolvimento."
        );

        return;
    }


    questoesAtuais = bancoQuestoes[disciplina];

    indiceQuestao = 0;

    pontuacao = 0;

    simuladoIniciado = true;


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


            <!-- CABEÇALHO -->

            <div class="quiz-top">

                <div>

                    <span class="quiz-label">
                        SIMULADO DE QUÍMICA
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


            <!-- PROGRESSO -->

            <div class="quiz-progress">

                <div
                    style="width:${progresso}%">
                </div>

            </div>


            <!-- PERGUNTA -->

            <div class="question-box">

                <p class="question-number">
                    QUESTÃO ${numero}
                </p>

                <h2>
                    ${questao.pergunta}
                </h2>

            </div>


            <!-- ALTERNATIVAS -->

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

                `)
                .join("")}

            </div>


            <!-- FEEDBACK -->

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


    const botoes =
        document.querySelectorAll(".alternativa");


    // Impede escolher mais de uma alternativa

    botoes.forEach(botao => {

        botao.disabled = true;

    });


    // Verificar resposta

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


    // Feedback

    const feedback =
        document.getElementById("feedback");


    if (acertou) {

        feedback.innerHTML = `

            <div class="feedback certo">

                <strong>
                    ✅ Resposta correta!
                </strong>

                <p>
                    ${questao.explicacao}
                </p>

            </div>

        `;

    } else {

        feedback.innerHTML = `

            <div class="feedback errado">

                <strong>
                    ❌ Resposta incorreta.
                </strong>

                <p>
                    <strong>
                        Resposta correta:
                    </strong>

                    ${questao.alternativas[questao.correta]}
                </p>

                <p>
                    ${questao.explicacao}
                </p>

            </div>

        `;
    }


    // Botão seguinte

    const ultimo =
        indiceQuestao === questoesAtuais.length - 1;


    feedback.innerHTML += `

        <button
            class="btn primary next-btn"
            onclick="proximaQuestao()">

            ${ultimo
                ? "Ver resultado"
                : "Próxima questão →"}

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

        mensagem =
            "🏆 Excelente desempenho!";

    } else if (percentagem >= 70) {

        mensagem =
            "👏 Muito bom desempenho!";

    } else if (percentagem >= 50) {

        mensagem =
            "📚 Bom começo. Continue estudando!";

    } else {

        mensagem =
            "💪 É preciso reforçar os conteúdos.";

    }


    quizArea.innerHTML = `

        <div class="quiz-container resultado">

            <div class="resultado-icon">
                🎯
            </div>


            <h2>
                Simulado concluído!
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


            <div class="resultado-botoes">

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

        </div>

    `;
}


// ==========================================
// FECHAR SIMULADO
// ==========================================

function fecharSimulado() {

    quizArea.style.display = "none";


    const categorias =
        document.getElementById("categorias");


    if (categorias) {

        categorias.scrollIntoView({
            behavior: "smooth"
        });

    }
}


// ==========================================
// LIGAR CATEGORIAS
// ==========================================

document.querySelectorAll(".card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const nome =
                    card.querySelector("strong");


                if (!nome) return;


                const disciplina =
                    nome.textContent.trim();


                if (
                    disciplina === "Química"
                ) {

                    iniciarSimulado(
                        "Química"
                    );

                } else {

                    alert(
                        "📚 " +
                        disciplina +
                        "\n\n" +
                        "Esta área será " +
                        "adicionada ao banco " +
                        "de questões nas próximas etapas."
                    );

                }

            }
        );

    });


// ==========================================
// WWEBBA IA
// ==========================================

const iaBtn =
    document.getElementById("iaBtn");


if (iaBtn) {

    iaBtn.addEventListener(
        "click",
        () => {

            alert(
                "🤖 Wwebba IA\n\n" +
                "O módulo de Inteligência " +
                "Artificial será integrado " +
                "numa próxima etapa."
            );

        }
    );

}


// ==========================================
// SISTEMA INICIADO
// ==========================================

console.log(
    "🔥 Wwebba Teste — sistema iniciado."
);
