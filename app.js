// ========================================
// WWEBBA TESTE — SISTEMA PRINCIPAL
// ========================================

// MENU MOBILE
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
        mainNav.classList.toggle("active");
    });
}


// FECHAR MENU AO CLICAR NUM LINK
const navLinks = document.querySelectorAll("#mainNav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("active");
    });
});


// WWEBBA IA
const iaBtn = document.getElementById("iaBtn");

if (iaBtn) {
    iaBtn.addEventListener("click", () => {
        alert(
            "🤖 Wwebba IA\n\n" +
            "O sistema de Inteligência Artificial está em preparação.\n\n" +
            "Em breve poderás:\n" +
            "• Explicar conteúdos\n" +
            "• Criar exercícios\n" +
            "• Corrigir respostas\n" +
            "• Explicar erros\n" +
            "• Preparar exames"
        );
    });
}


// CARTÕES DE CATEGORIAS
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {

        const disciplina = card.querySelector("strong");

        if (disciplina) {
            alert(
                "📚 " + disciplina.textContent +
                "\n\nEsta área será desenvolvida na próxima etapa."
            );
        }

    });
});


// MENSAGEM NO CONSOLE
console.log("Wwebba Teste iniciado com sucesso.");
