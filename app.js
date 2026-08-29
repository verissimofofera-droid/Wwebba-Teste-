/* ================================
   ALTERNATIVAS DO SIMULADO
   ================================ */

#quizArea {
    padding: 70px 5%;
    background: #f5f7fb;
}

.quiz-container {
    max-width: 850px;
    margin: 0 auto;
    background: #ffffff;
    padding: 35px;
    border-radius: 18px;
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
}

.quiz-header {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    margin-bottom: 15px;
    color: #68758a;
    font-size: 14px;
    font-weight: 600;
}

.quiz-progress {
    width: 100%;
    height: 6px;
    background: #e8edf4;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 30px;
}

.quiz-progress div {
    height: 100%;
    background: #1769e0;
    transition: width 0.3s ease;
}

.quiz-container h2 {
    font-size: 24px;
    line-height: 1.5;
    margin-bottom: 28px;
}


/* ALTERNATIVAS */

.alternativas {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.alternativa {
    width: 100%;
    min-height: 58px;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 14px;

    background: #ffffff;
    border: 1px solid #dfe5ed;
    border-radius: 10px;

    color: #172033;
    font-size: 16px;
    text-align: left;

    cursor: pointer;
    transition: 0.2s ease;
}


/* LETRAS A, B, C, D */

.alternativa span {
    flex-shrink: 0;

    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #cbd3df;
    border-radius: 50%;

    font-size: 13px;
    font-weight: 700;

    color: #536176;
    background: #f8fafc;
}


/* PASSAR O MOUSE */

.alternativa:hover:not(:disabled) {
    border-color: #1769e0;
    background: #f7faff;
}


/* RESPOSTA CORRETA */

.alternativa.certa {
    border-color: #20a464;
    background: #edf9f2;
}

.alternativa.certa span {
    border-color: #20a464;
    color: #20a464;
    background: #ffffff;
}


/* RESPOSTA ERRADA */

.alternativa.errada {
    border-color: #d64545;
    background: #fff1f1;
}

.alternativa.errada span {
    border-color: #d64545;
    color: #d64545;
    background: #ffffff;
}


/* DESATIVAR DEPOIS DA RESPOSTA */

.alternativa:disabled {
    cursor: default;
}


/* FEEDBACK */

.feedback {
    margin-top: 25px;
    padding: 18px;
    border-radius: 12px;
    line-height: 1.6;
}

.feedback.certo {
    background: #edf9f2;
    border: 1px solid #bde8ce;
}

.feedback.errado {
    background: #fff1f1;
    border: 1px solid #f0c2c2;
}

.feedback strong {
    display: block;
    margin-bottom: 6px;
}


/* BOTÃO PRÓXIMA */

.next-btn {
    margin-top: 20px;
}


/* RESULTADO */

.resultado {
    text-align: center;
}

.resultado-icon {
    font-size: 55px;
    margin-bottom: 10px;
}

.pontuacao {
    font-size: 55px;
    font-weight: 800;
    color: #1769e0;
    margin: 15px 0 0;
}

.percentagem {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 15px;
}


/* CELULAR */

@media (max-width: 600px) {

    #quizArea {
        padding: 45px 4%;
    }

    .quiz-container {
        padding: 22px 16px;
        border-radius: 14px;
    }

    .quiz-container h2 {
        font-size: 19px;
    }

    .alternativa {
        min-height: 54px;
        padding: 9px 12px;
        font-size: 15px;
        gap: 11px;
    }

    .alternativa span {
        width: 27px;
        height: 27px;
        font-size: 12px;
    }
}
