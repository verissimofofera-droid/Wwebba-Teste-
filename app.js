const perguntas = {
    "Química": [
        {
            pergunta: "Qual é o símbolo químico do oxigênio?",
            opcoes: ["O", "Ox", "Og", "C"],
            correta: 0
        },
        {
            pergunta: "Qual é a fórmula da água?",
            opcoes: ["CO2", "H2O", "O2", "H2"],
            correta: 1
        },
        {
            pergunta: "Qual é o número atômico do hidrogênio?",
            opcoes: ["1", "2", "8", "10"],
            correta: 0
        }
    ],

    "Português": [
        {
            pergunta: "Qual destas palavras é um substantivo?",
            opcoes: ["Casa", "Correr", "Bonito", "Rapidamente"],
            correta: 0
        },
        {
            pergunta: "Qual é o plural de 'animal'?",
            opcoes: ["Animais", "Animals", "Animalis", "Animães"],
            correta: 0
        },
        {
            pergunta: "Qual destas palavras é um verbo?",
            opcoes: ["Mesa", "Correr", "Azul", "Casa"],
            correta: 1
        }
    ],

    "Matemática": [
        {
            pergunta: "Quanto é 5 + 7?",
            opcoes: ["10", "11", "12", "13"],
            correta: 2
        },
        {
            pergunta: "Quanto é 8 × 3?",
            opcoes: ["21", "24", "27", "32"],
            correta: 1
        },
        {
            pergunta: "Quanto é 20 ÷ 4?",
            opcoes: ["4", "5", "6", "8"],
            correta: 1
        }
    ],

    "Biologia": [
        {
            pergunta: "Qual é a unidade básica dos seres vivos?",
            opcoes: ["Átomo", "Célula", "Órgão", "Tecido"],
            correta: 1
        },
        {
            pergunta: "Qual órgão bombeia o sangue pelo corpo?",
            opcoes: ["Pulmão", "Fígado", "Coração", "Rim"],
            correta: 2
        },
        {
            pergunta: "Qual gás é essencial para a respiração humana?",
            opcoes: ["Oxigênio", "Hélio", "Nitrogênio", "Hidrogênio"],
            correta: 0
        }
    ]
};

let disciplinaAtual = "";
let numeroQuestao = 0;
let pontuacao = 0;

function iniciarTeste(disciplina) {
    disciplinaAtual = disciplina;
    numeroQuestao = 0;
    pontuacao = 0;

    document.getElementById("inicio").classList.add("oculto");
    document.getElementById("resultado").classList.add("oculto");
    document.getElementById("teste").classList.remove("oculto");

    document.getElementById("tituloTeste").textContent =
        "Simulado de " + disciplina;

    mostrarQuestao();
}

function mostrarQuestao() {
    const lista = perguntas[disciplinaAtual];
    const atual = lista[numeroQuestao];

    document.getElementById("questao").textContent =
        `${numeroQuestao + 1}. ${atual.pergunta}`;

    const opcoes = document.getElementById("opcoes");
    opcoes.innerHTML = "";

    atual.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement("button");

        botao.textContent = opcao;

        botao.onclick = function () {
            responder(indice);
        };

        opcoes.appendChild(botao);
    });

    document.getElementById("proxima").style.display = "none";
}

function responder(indice) {
    const atual = perguntas[disciplinaAtual][numeroQuestao];

    if (indice === atual.correta) {
        pontuacao++;
        alert("✅ Resposta correta!");
    } else {
        alert(
            "❌ Resposta errada! A resposta correta é: " +
            atual.opcoes[atual.correta]
        );
    }

    document.getElementById("proxima").style.display = "block";

    const botoes = document.querySelectorAll("#opcoes button");

    botoes.forEach(botao => {
        botao.disabled = true;
    });
}

function proximaQuestao() {
    numeroQuestao++;

    if (numeroQuestao < perguntas[disciplinaAtual].length) {
        mostrarQuestao();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    document.getElementById("teste").classList.add("oculto");
    document.getElementById("resultado").classList.remove("oculto");

    const total = perguntas[disciplinaAtual].length;
    const porcentagem = Math.round((pontuacao / total) * 100);

    document.getElementById("pontuacao").textContent =
        `Você acertou ${pontuacao} de ${total} questões (${porcentagem}%).`;
}

function voltarInicio() {
    document.getElementById("resultado").classList.add("oculto");
    document.getElementById("inicio").classList.remove("oculto");
}
