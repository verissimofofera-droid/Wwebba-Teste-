<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Wwebba Teste — plataforma de estudos, simulados, revisão e assistência inteligente.">
<meta name="theme-color" content="#0f172a">
<title>Wwebba Teste</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="header">
  <a class="logo" href="#inicio" aria-label="Wwebba Teste"><span>Wwebba</span> Teste</a>
  <button class="menu-btn" id="menuBtn" aria-label="Abrir menu">☰</button>
  <nav id="mainNav">
    <a href="#inicio">Início</a>
    <a href="#categorias">Categorias</a>
    <a href="#ia">Wwebba IA</a>
    <button class="nav-btn" id="historicoBtn">📊 Histórico</button>
  </nav>
</header>

<main>
<section id="inicio" class="hero">
  <div class="hero-content">
    <div class="badge">🇦🇴 Educação • Ciências • Preparação para exames</div>
    <h1>Aprenda. Pratique. <span>Domine.</span></h1>
    <p>Simulados, revisão detalhada e assistência inteligente numa única plataforma.</p>
    <div class="hero-buttons">
      <a href="#categorias" class="btn primary">🚀 Começar a estudar</a>
      <a href="#ia" class="btn secondary">🤖 Experimentar Wwebba IA</a>
    </div>
    <div class="trust-row">
      <span>✓ Sem conta</span><span>✓ Funciona no celular</span><span>✓ Resultado detalhado</span>
    </div>
  </div>
</section>

<section id="categorias" class="section">
  <div class="section-title">
    <span class="eyebrow">BIBLIOTECA</span>
    <h2>Escolha uma área</h2>
    <p>Selecione uma disciplina, nível e conteúdo para iniciar.</p>
  </div>
  <div class="search-wrap">
    <input id="buscaDisciplinas" type="search" placeholder="🔎 Pesquisar disciplina ou área...">
  </div>
  <div id="categoriasGrid" class="categories-grid"></div>
</section>

<section id="ia" class="ia-section">
  <div class="ia-content">
    <div class="ia-icon">🤖</div>
    <span class="eyebrow">ASSISTENTE DE ESTUDO</span>
    <h2>Wwebba IA</h2>
    <p>Explique conceitos, resolva exercícios, gere questões e revise conteúdos. A versão offline usa uma base educacional local; a ligação a um modelo generativo real exige uma API/backend.</p>
    <div class="ia-features">
      <div>📖 <strong>Explicar conteúdos</strong></div>
      <div>🧮 <strong>Resolver exercícios</strong></div>
      <div>📝 <strong>Criar questões</strong></div>
      <div>💡 <strong>Explicar erros</strong></div>
      <div>🎯 <strong>Preparar exames</strong></div>
    </div>
    <button class="btn primary" id="iaBtn">Abrir Wwebba IA</button>
  </div>
</section>
</main>

<footer class="footer">
  <div class="logo"><span>Wwebba</span> Teste</div>
  <p>Plataforma de estudos, simulados e preparação académica.</p>
  <p class="copyright">© 2026 Wwebba Teste</p>
</footer>

<div id="quizArea"></div>
<div id="modalArea"></div>
<script src="app.js"></script>
</body>
</html>
