// ==========================================================
// WWEBBA TESTE — V5 FINAL OFFLINE
// Simulados + banco multidisciplinar + histórico + Wwebba IA
// ==========================================================

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

const disciplinas = {
  "Matemática": {icon:"➗", desc:"Aritmética, álgebra, geometria, funções e cálculo.", niveis:["7.ª Classe","8.ª Classe","9.ª Classe","10.ª Classe","11.ª Classe","12.ª Classe","Universidade"]},
  "Física": {icon:"⚡", desc:"Mecânica, energia, ondas, eletricidade e termodinâmica.", niveis:["7.ª Classe","8.ª Classe","9.ª Classe","10.ª Classe","11.ª Classe","12.ª Classe","Universidade"]},
  "Química": {icon:"⚗️", desc:"Matéria, estrutura atómica, reações, equilíbrio e orgânica.", niveis:["7.ª Classe","8.ª Classe","9.ª Classe","10.ª Classe","11.ª Classe","12.ª Classe","Universidade"]},
  "Biologia": {icon:"🧬", desc:"Célula, genética, evolução, fisiologia e ecologia.", niveis:["7.ª Classe","8.ª Classe","9.ª Classe","10.ª Classe","11.ª Classe","12.ª Classe","Universidade"]},
  "História de Angola": {icon:"📜", desc:"História, independência, sociedade e património angolano.", niveis:["Geral","Preparação para exames"]},
  "Organização política e administrativa": {icon:"🏛️", desc:"Estado, território, órgãos e organização administrativa.", niveis:["Geral","Preparação para concursos"]},
  "Administração Pública": {icon:"📋", desc:"Princípios, administração, ética e serviço público.", niveis:["Geral","Preparação para concursos"]},
  "Ministério do Interior": {icon:"🛡️", desc:"Conhecimentos institucionais e cidadania ligados à área.", niveis:["Geral","Preparação para concursos"]},
  "Patriotismo e cidadania": {icon:"🇦🇴", desc:"Cidadania, direitos, deveres e valores nacionais.", niveis:["Geral","Preparação para concursos"]},
  "Didática Geral": {icon:"📚", desc:"Ensino, aprendizagem, planejamento e avaliação.", niveis:["Geral","Preparação para exames"]},
  "Metodologia de Ensino": {icon:"👨🏾‍🏫", desc:"Métodos, estratégias e organização do ensino.", niveis:["Geral","Preparação para exames"]},
  "Didática de Química": {icon:"⚗️", desc:"Ensino de Química, experimentação e avaliação.", niveis:["Geral","Preparação para exames"]},
  "Pedagogia": {icon:"🎓", desc:"Educação, formação humana e teorias pedagógicas.", niveis:["Geral","Preparação para exames"]},
  "Avaliação da aprendizagem": {icon:"✅", desc:"Avaliação diagnóstica, formativa, sumativa e instrumentos.", niveis:["Geral","Preparação para exames"]}
};

const banco = {
  "Química":{"7.ª Classe":{
    "Introdução à Química":[
      q("Qual é o objeto fundamental de estudo da Química?",["Apenas os seres vivos","A matéria, suas propriedades e transformações","Somente os astros","Apenas os movimentos dos corpos"],1,"A Química estuda a matéria, sua composição, estrutura, propriedades e transformações.","facil"),
      q("Qual das opções representa uma propriedade da matéria?",["Massa","Democracia","Velocidade da luz","Temperatura do Sol"],0,"A massa é uma propriedade geral da matéria.","facil")],
    "Matéria e suas propriedades":[
      q("Qual estado físico possui volume definido, mas assume a forma do recipiente?",["Sólido","Líquido","Gasoso","Plasma"],1,"O líquido tem volume definido, mas não possui forma própria.","facil"),
      q("Em qual estado físico as partículas apresentam maior liberdade de movimento?",["Sólido","Líquido","Gasoso","Sólido e líquido"],2,"No estado gasoso, as partículas estão mais afastadas e têm maior liberdade de movimento.","facil")]
  }}
};

// Questões-base multidisciplinares. O motor também gera variações matemáticas/quantitativas.
const seeds = [
  ["Física","Grandezas físicas","Qual unidade do SI mede a força?",["Joule","Newton","Watt","Pascal"],1,"A força é medida em newtons (N) no SI.","facil"],
  ["Física","Grandezas físicas","Qual é a unidade SI de energia?",["Newton","Joule","Ampere","Kelvin"],1,"A unidade SI de energia é o joule (J).","facil"],
  ["Física","Movimento","A velocidade média é calculada por:",["tempo/distância","distância/tempo","massa/tempo","força/distância"],1,"A velocidade média é a razão entre a distância percorrida e o intervalo de tempo.","facil"],
  ["Química","Estrutura atómica","Qual partícula possui carga elétrica negativa?",["Protão","Neutrão","Eletrão","Núcleo"],2,"O eletrão possui carga elétrica negativa.","facil"],
  ["Química","Tabela periódica","Elementos do mesmo grupo da Tabela Periódica tendem a apresentar:",["O mesmo número de massa","Propriedades químicas relacionadas","Sempre a mesma massa","Sempre o mesmo número de neutrões"],1,"Elementos do mesmo grupo apresentam configurações de valência relacionadas e, por isso, propriedades químicas semelhantes.","medio"],
  ["Química","Reações químicas","Uma reação de combustão geralmente envolve:",["Oxigénio como reagente","Ausência total de energia","Somente água","Somente metais"],0,"Na combustão, uma substância reage com um oxidante, frequentemente o oxigénio, liberando energia.","facil"],
  ["Biologia","Citologia","Qual é a unidade estrutural e funcional básica dos seres vivos?",["Átomo","Célula","Tecido","Órgão"],1,"A célula é considerada a unidade estrutural e funcional básica dos seres vivos.","facil"],
  ["Biologia","Genética","Qual molécula armazena a informação genética na maioria dos seres vivos?",["ATP","DNA","Água","Glicose"],1,"O DNA é a principal molécula de armazenamento da informação genética na maioria dos organismos.","facil"],
  ["Biologia","Ecologia","O conjunto de organismos da mesma espécie que vive numa área é chamado:",["Ecossistema","Comunidade","População","Biosfera"],2,"População é o conjunto de indivíduos da mesma espécie numa determinada área e período.","facil"],
  ["Matemática","Aritmética","Quanto é 15 + 27?",["32","40","42","45"],2,"15 + 27 = 42.","facil"],
  ["Matemática","Aritmética","Quanto é 9 × 8?",["63","72","81","88"],1,"9 × 8 = 72.","facil"],
  ["Matemática","Álgebra","Se 2x + 6 = 14, qual é o valor de x?",["2","3","4","5"],2,"2x = 8, portanto x = 4.","facil"],
  ["Matemática","Geometria","A soma dos ângulos internos de um triângulo é:",["90°","180°","270°","360°"],1,"A soma dos ângulos internos de qualquer triângulo euclidiano é 180°.","facil"],
  ["Didática Geral","Planejamento","Qual elemento define aquilo que se pretende alcançar no processo de ensino?",["Objetivo","Carteira","Intervalo","Uniforme"],0,"Os objetivos expressam as aprendizagens ou resultados que se pretende alcançar.","facil"],
  ["Didática Geral","Avaliação","A avaliação diagnóstica é utilizada principalmente para:",["Identificar conhecimentos e dificuldades iniciais","Dar apenas a nota final","Substituir o ensino","Eliminar exercícios"],0,"A avaliação diagnóstica procura identificar conhecimentos prévios, necessidades e dificuldades antes ou no início de uma intervenção pedagógica.","medio"],
  ["Metodologia de Ensino","Métodos","Uma metodologia ativa tende a colocar o estudante:",["Apenas como espectador","Como participante ativo da aprendizagem","Fora do processo","Sem tarefas"],1,"Metodologias ativas valorizam participação, resolução de problemas, colaboração e autonomia do estudante.","medio"],
  ["Pedagogia","Aprendizagem","A aprendizagem pode ser entendida como:",["Processo de construção/desenvolvimento de conhecimentos e competências","Somente memorização mecânica","Apenas presença física","Somente avaliação"],0,"Aprendizagem envolve mudanças relativamente duradouras em conhecimentos, habilidades, atitudes ou comportamentos, por processos educativos e/ou experiência.","medio"],
  ["Avaliação da aprendizagem","Avaliação formativa","A avaliação formativa ocorre principalmente para:",["Acompanhar e melhorar a aprendizagem durante o processo","Somente classificar no final","Substituir objetivos","Eliminar feedback"],0,"A avaliação formativa fornece evidências durante o processo para orientar feedback e ajustes no ensino e na aprendizagem.","medio"],
  ["Patriotismo e cidadania","Cidadania","Cidadania envolve, entre outros aspetos:",["Direitos, deveres e participação na vida social","Somente direitos","Somente deveres","Ausência de responsabilidades"],0,"Cidadania envolve direitos, deveres, responsabilidades e participação na sociedade, conforme o ordenamento jurídico.","facil"],
  ["História de Angola","Independência","Em que data Angola proclamou a independência nacional?",["4 de Fevereiro de 1961","11 de Novembro de 1975","17 de Setembro de 1975","25 de Abril de 1974"],1,"Angola proclamou a independência em 11 de Novembro de 1975.","facil"],
  ["Organização política e administrativa","Estado","A Constituição é:",["A lei fundamental do Estado","Um regulamento escolar","Um contrato privado","Uma disciplina"],0,"A Constituição é a lei fundamental do Estado e estabelece princípios, direitos, deveres e organização dos poderes públicos.","medio"],
  ["Administração Pública","Princípios","A atuação administrativa deve observar:",["Legalidade e interesse público","Somente interesse privado","Ausência de regras","Apenas opinião pessoal"],0,"A Administração Pública está vinculada à Constituição, à lei e ao interesse público, entre outros princípios aplicáveis.","medio"],
  ["Ministério do Interior","Segurança","A segurança pública, em termos gerais, visa:",["Proteger pessoas, direitos e a ordem pública dentro das competências legais","Substituir todos os tribunais","Eliminar direitos","Atuar sem lei"],0,"A segurança pública visa proteger pessoas e bens e preservar a ordem e a segurança, dentro das competências e limites legais.","medio"],
  ["Didática de Química","Experimentação","Uma atividade experimental de Química deve priorizar:",["Segurança, objetivo claro, procedimento e análise dos resultados","Improvisação sem proteção","Mistura de substâncias desconhecidas","Ausência de registo"],0,"A experimentação didática deve ter objetivos claros, segurança, procedimento adequado, observação/registo e interpretação dos resultados.","medio"]
];
for(const s of seeds){const [d,c,p,a,r,e,dif]=s; if(!banco[d]) banco[d]={}; if(!banco[d]["Geral"]) banco[d]["Geral"]={}; if(!banco[d]["Geral"][c]) banco[d]["Geral"][c]=[]; banco[d]["Geral"][c].push(q(p,a,r,e,dif));}

function q(pergunta, alternativas, correta, explicacao, dificuldade="medio", fonte="Conhecimento científico/educacional consolidado"){
  return {pergunta,alternativas,correta,explicacao,dificuldade,fonte};
}

// Geradores: aumentam muito a variedade de questões sem inventar gabaritos.
function gerarMatematica(n=60){
  const arr=[]; for(let i=0;i<n;i++){
    const type=i%4;
    if(type===0){let a=5+(i*7)%40,b=3+(i*11)%30;arr.push(q(`Calcule: ${a} + ${b}.`,[String(a+b-2),String(a+b),String(a+b+2),String(a+b+5)],1,`${a} + ${b} = ${a+b}.`,"facil","Aritmética")); }
    if(type===1){let a=3+(i*5)%12,b=2+(i*3)%10;let x=a*b;arr.push(q(`Qual é o resultado de ${a} × ${b}?`,[String(x-1),String(x),String(x+1),String(x+10)],1,`${a} × ${b} = ${x}.`,"facil","Aritmética")); }
    if(type===2){let x=2+(i%9), b=3+(i%7), c=x+b;arr.push(q(`Resolva: x + ${b} = ${c}.`,[String(x-1),String(x),String(x+1),String(c)],1,`Subtraindo ${b} dos dois membros: x = ${c} − ${b} = ${x}.`,"facil","Álgebra")); }
    if(type===3){let a=2+(i%8),b=3+(i%7),area=a*b;arr.push(q(`Um retângulo tem comprimento ${a} cm e largura ${b} cm. Qual é a área?`,[`${area-2} cm²`,`${area} cm²`,`${area+2} cm²`,`${a+b} cm²`],1,`Área = comprimento × largura = ${a} × ${b} = ${area} cm².`,"medio","Geometria")); }
  } return arr;
}
function gerarCiencias(){
  return [
    ["Física","Energia","Qual unidade do SI mede potência?",["Joule","Watt","Newton","Ohm"],1,"A potência é medida em watt (W)."],
    ["Física","Eletricidade","A unidade SI da corrente elétrica é:",["Volt","Ohm","Ampere","Watt"],2,"A corrente elétrica é medida em ampere (A)."],
    ["Química","Mol","A quantidade de matéria no SI é expressa em:",["mol","kg","L","Pa"],0,"A unidade SI da quantidade de matéria é o mol."],
    ["Química","pH","Uma solução com pH inferior a 7, em condições usuais, é classificada como:",["Ácida","Básica","Neutra","Metálica"],0,"Em escala aquosa usual, pH < 7 indica meio ácido."],
    ["Biologia","Fisiologia","Qual sistema é responsável pelas trocas gasosas entre o organismo e o ambiente?",["Digestivo","Respiratório","Esquelético","Endócrino"],1,"O sistema respiratório participa das trocas de oxigénio e dióxido de carbono."],
    ["Biologia","Evolução","A seleção natural foi proposta de forma central na teoria evolutiva associada a:",["Darwin","Newton","Mendeleev","Pasteur"],0,"Charles Darwin e Alfred Russel Wallace desenvolveram independentemente ideias centrais sobre seleção natural."]
  ].map(x=>{let[d,c,p,a,r,e]=x;return [d,c,q(p,a,r,e,"medio")]});
}
for(const x of gerarCiencias()){const[d,c,qq]=x;if(!banco[d]["Geral"])banco[d]["Geral"]={};if(!banco[d]["Geral"][c])banco[d]["Geral"][c]=[];banco[d]["Geral"][c].push(qq);}
if(!banco["Matemática"]) banco["Matemática"]={}; banco["Matemática"]["Geral"]={"Aritmética":gerarMatematica(80),...(banco["Matemática"]["Geral"]||{})};

// replicar bancos gerais para níveis de estudo onde ainda não há conteúdo, preservando questões.
for(const d of Object.keys(disciplinas)){
  if(!banco[d]) banco[d]={};
  for(const n of disciplinas[d].niveis){
    if(!banco[d][n]){
      banco[d][n]=JSON.parse(JSON.stringify(banco[d]["Geral"]||{
        "Fundamentos":[q(`Questão demonstrativa de ${d}: selecione a alternativa que melhor representa o conceito estudado.`,["Afirmação correta","Afirmação incorreta","Não relacionado","Nenhuma das anteriores"],0,`Esta questão é um ponto de partida introdutório para ${d}.`,"facil")]
      }));
    }
  }
}

let disciplinaAtual="",nivelAtual="",conteudoAtual="",questoesAtuais=[],indiceQuestao=0,pontuacao=0,historicoRespostas=[],quantidadeAtual=10,dificuldadeAtual="todas";

function mostrarCategorias(filtro=""){
  const grid=$("#categoriasGrid"); if(!grid)return;
  const f=filtro.toLowerCase();
  grid.innerHTML=Object.entries(disciplinas).filter(([d,v])=>(d+" "+v.desc).toLowerCase().includes(f)).map(([d,v])=>`
    <button class="category-card" onclick="selecionarDisciplina('${esc(d)}')">
      <div class="icon">${v.icon}</div><h3>${esc(d)}</h3><p>${esc(v.desc)}</p>
    </button>`).join("") || `<div class="empty">Nenhuma área encontrada.</div>`;
}
mostrarCategorias();
$("#buscaDisciplinas")?.addEventListener("input",e=>mostrarCategorias(e.target.value));

const menuBtn=$("#menuBtn"),mainNav=$("#mainNav");
menuBtn?.addEventListener("click",()=>mainNav.classList.toggle("active"));
$$("nav a").forEach(a=>a.addEventListener("click",()=>mainNav.classList.remove("active")));

function selecionarDisciplina(d){disciplinaAtual=d;nivelAtual="";conteudoAtual="";$("#quizArea").style.display="block";mostrarNiveis();$("#quizArea").scrollIntoView({behavior:"smooth"});}
function mostrarNiveis(){
 const niveis=disciplinas[disciplinaAtual].niveis;
 $("#quizArea").innerHTML=`<div class="quiz-container selection-container"><div class="selection-icon">${disciplinas[disciplinaAtual].icon}</div><span class="quiz-label">${esc(disciplinaAtual)}</span><h2>Escolha o nível</h2><p class="selection-description">Selecione o seu nível de estudo.</p><div class="nivel-grid">${niveis.map(n=>`<button class="nivel-btn" onclick="selecionarNivel('${esc(n)}')"><span>🎓</span><span>${esc(n)}</span><small>Ver conteúdos</small></button>`).join("")}</div><button class="btn secondary" onclick="fecharSelecao()">← Voltar</button></div>`;
}
function selecionarNivel(n){nivelAtual=n;mostrarConteudos();}
function mostrarConteudos(){
 const dados=banco[disciplinaAtual]?.[nivelAtual]||{};
 const cs=Object.keys(dados);
 $("#quizArea").innerHTML=`<div class="quiz-container selection-container"><div class="selection-icon">📖</div><span class="quiz-label">${esc(disciplinaAtual)} · ${esc(nivelAtual)}</span><h2>Conteúdos</h2><p class="selection-description">Escolha o conteúdo para praticar.</p><div class="conteudo-list">${cs.map(c=>`<button class="conteudo-item" onclick="selecionarConteudo('${esc(c)}')"><div class="conteudo-item-icon">📘</div><div class="conteudo-item-text"><strong>${esc(c)}</strong><small>${dados[c].length} questões disponíveis</small></div><span class="arrow">→</span></button>`).join("")}</div><button class="btn secondary" onclick="mostrarNiveis()">← Voltar</button></div>`;
}
function selecionarConteudo(c){conteudoAtual=c;mostrarConfiguracao();}
function mostrarConfiguracao(){
 const bancoC=banco[disciplinaAtual]?.[nivelAtual]?.[conteudoAtual]||[];
 const max=Math.min(Math.max(bancoC.length,5),50);
 const opts=[5,10,15,20,30,40,50].filter(x=>x<=max); if(!opts.length)opts.push(bancoC.length);
 $("#quizArea").innerHTML=`<div class="quiz-container selection-container"><div class="selection-icon">⚙️</div><span class="quiz-label">CONFIGURAR SIMULADO</span><h2>${esc(conteudoAtual)}</h2><p class="selection-description">${esc(disciplinaAtual)} · ${esc(nivelAtual)} · ${bancoC.length} questões</p><div class="config-box"><label for="quantidadeQuestoes">Número de questões</label><select id="quantidadeQuestoes">${opts.map(x=>`<option value="${x}">${x} questões</option>`).join("")}</select><label for="dificuldade">Dificuldade</label><select id="dificuldade"><option value="todas">Todas</option><option value="facil">Fácil</option><option value="medio">Médio</option><option value="dificil">Difícil</option></select></div><button class="btn primary" onclick="iniciarSimulado()">🚀 Iniciar simulado</button><br><br><button class="btn secondary" onclick="mostrarConteudos()">← Voltar</button></div>`;
}
function iniciarSimulado(refazer=false){
 let quantidade,dif;
 if(refazer){quantidade=quantidadeAtual;dif=dificuldadeAtual}else{quantidade=Number($("#quantidadeQuestoes")?.value)||5;dif=$("#dificuldade")?.value||"todas";quantidadeAtual=quantidade;dificuldadeAtual=dif;}
 let arr=[...(banco[disciplinaAtual]?.[nivelAtual]?.[conteudoAtual]||[])];
 if(dif!=="todas"){const f=arr.filter(x=>x.dificuldade===dif);if(f.length)arr=f;}
 arr.sort(()=>Math.random()-.5);questoesAtuais=arr.slice(0,Math.min(quantidade,arr.length));indiceQuestao=0;pontuacao=0;historicoRespostas=[];mostrarQuestao();
}
function mostrarQuestao(){
 const qn=questoesAtuais[indiceQuestao],total=questoesAtuais.length,n=indiceQuestao+1;
 if(!qn){mostrarResultado();return}
 $("#quizArea").innerHTML=`<div class="quiz-container"><div class="quiz-top"><div><span class="quiz-label">${esc(disciplinaAtual)}</span><h3>Questão ${n} <span>/ ${total}</span></h3></div><div class="quiz-score">${pontuacao} ponto${pontuacao!==1?"s":""}</div></div><div class="quiz-progress"><div style="width:${n/total*100}%"></div></div><div class="question-box"><p class="question-number">${esc(nivelAtual)} · ${esc(conteudoAtual)} · ${esc(qn.dificuldade)}</p><h2>${esc(qn.pergunta)}</h2></div><div class="alternativas">${qn.alternativas.map((a,i)=>`<button class="alternativa" onclick="responder(${i})"><span>${String.fromCharCode(65+i)}</span><strong>${esc(a)}</strong></button>`).join("")}</div><div id="feedback"></div></div>`;
}
function responder(escolhida){
 const qn=questoesAtuais[indiceQuestao];if(!qn)return;
 const botoes=$$(".alternativa");botoes.forEach(b=>b.disabled=true);
 const certo=escolhida===qn.correta;if(certo){pontuacao++;botoes[escolhida]?.classList.add("certa")}else{botoes[escolhida]?.classList.add("errada");botoes[qn.correta]?.classList.add("certa")}
 historicoRespostas.push({numero:indiceQuestao+1,pergunta:qn.pergunta,respostaEscolhida:escolhida,textoRespostaEscolhida:qn.alternativas[escolhida],respostaCorreta:qn.correta,textoRespostaCorreta:qn.alternativas[qn.correta],acertou:certo,explicacao:qn.explicacao});
 const fb=$("#feedback");fb.innerHTML=`<div class="feedback ${certo?"certo":"errado"}"><strong>${certo?"✅ Resposta correta!":"❌ Resposta incorreta!"}</strong><p>${certo?esc(qn.explicacao):`Resposta correta: <strong>${esc(qn.alternativas[qn.correta])}</strong><br><br>${esc(qn.explicacao)}`}</p></div><button class="btn primary next-btn" onclick="proximaQuestao()">${indiceQuestao<questoesAtuais.length-1?"Próxima questão →":"Ver resultado"}</button>`;
}
function proximaQuestao(){indiceQuestao++;if(indiceQuestao<questoesAtuais.length)mostrarQuestao();else mostrarResultado();}
function mostrarResultado(){
 const total=questoesAtuais.length;if(!total)return;
 const erros=total-pontuacao,pct=Math.round(pontuacao/total*100);
 const mensagem=pct>=90?"🏆 Excelente desempenho!":pct>=70?"👏 Muito bom desempenho!":pct>=50?"📚 Bom desempenho. Continue praticando!":"💪 Continue estudando. Você consegue!";
 const revisao=historicoRespostas.map(i=>`<div class="revisao-item ${i.acertou?"revisao-certa":"revisao-errada"}"><strong>${i.acertou?"✅":"❌"} Questão ${i.numero}</strong><div><strong>${esc(i.pergunta)}</strong></div><div class="revisao-resposta">${i.acertou?"✅":"❌"} <strong>Sua resposta:</strong> ${esc(i.textoRespostaEscolhida)}</div><div class="revisao-correta">✅ <strong>Resposta correta:</strong> ${esc(i.textoRespostaCorreta)}</div><div class="revisao-explicacao"><strong>💡 Explicação:</strong><p>${esc(i.explicacao)}</p></div></div>`).join("");
 salvarHistorico({data:new Date().toLocaleString("pt-AO"),disciplina:disciplinaAtual,nivel:nivelAtual,conteudo:conteudoAtual,pontuacao,total,pct});
 $("#quizArea").innerHTML=`<div class="quiz-container resultado"><div class="resultado-icon">🏆</div><span class="quiz-label">RESULTADO FINAL</span><h2>Simulado concluído</h2><div class="pontuacao">${pontuacao}/${total}</div><p class="percentagem">${pct}%</p><h3>${mensagem}</h3><div class="resultado-resumo"><div class="resultado-card"><span>📊</span><strong>${pontuacao}/${total}</strong><small>Pontuação</small></div><div class="resultado-card"><span>✅</span><strong>${pontuacao}</strong><small>Acertos</small></div><div class="resultado-card"><span>❌</span><strong>${erros}</strong><small>Erros</small></div><div class="resultado-card"><span>🎯</span><strong>${pct}%</strong><small>Aproveitamento</small></div></div><div class="revisao-container"><h3>📝 Revisão das respostas</h3><div class="revisao-lista">${revisao||'<div class="empty">Sem respostas registadas.</div>'}</div></div><button class="btn primary" onclick="iniciarSimulado(true)">🔄 Refazer</button><br><br><button class="btn secondary" onclick="mostrarConfiguracao()">⚙️ Alterar configuração</button><br><br><button class="btn secondary" onclick="mostrarConteudos()">📖 Outro conteúdo</button><br><br><button class="btn secondary" onclick="mostrarNiveis()">🎓 Outro nível</button></div>`;
}
function fecharSelecao(){$("#quizArea").style.display="none";$("#categorias")?.scrollIntoView({behavior:"smooth"});}

function salvarHistorico(item){const h=JSON.parse(localStorage.getItem("wwebba_historico")||"[]");h.unshift(item);localStorage.setItem("wwebba_historico",JSON.stringify(h.slice(0,50)));}
function abrirHistorico(){
 const h=JSON.parse(localStorage.getItem("wwebba_historico")||"[]");
 abrirModal(`<div class="modal-head"><h2>📊 Histórico de simulados</h2><button class="close" onclick="fecharModal()">×</button></div>${h.length?h.map(x=>`<div class="history-item"><strong>${esc(x.disciplina)} · ${esc(x.nivel)}</strong><br>${esc(x.conteudo)}<br><span>${x.pontuacao}/${x.total} — ${x.pct}% · ${esc(x.data)}</span></div>`).join(""):'<div class="empty">Ainda não existem simulados concluídos.</div>')}<button class="btn secondary" onclick="localStorage.removeItem('wwebba_historico');fecharModal()">🗑️ Limpar histórico</button>`);
}
$("#historicoBtn")?.addEventListener("click",abrirHistorico);

function abrirModal(conteudo){$("#modalArea").innerHTML=`<div class="modal-backdrop" onclick="if(event.target===this)fecharModal()"><div class="modal">${conteudo}</div></div>`}
function fecharModal(){$("#modalArea").innerHTML=""}

// ---------------- WWEBBA IA OFFLINE ----------------
function iaResposta(texto){
 const t=texto.toLowerCase();
 if(t.includes("olá")||t.includes("ola")||t.includes("oi"))return "Olá! Sou a Wwebba IA. Posso explicar conceitos, resolver exercícios passo a passo e criar questões. Qual é o assunto?";
 if(t.includes("fotossíntese"))return "A fotossíntese é o processo pelo qual organismos fotossintéticos usam energia luminosa para produzir matéria orgânica a partir de CO₂ e água, liberando O₂ em organismos oxigénicos. Em termos simplificados: 6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂.";
 if(t.includes("átomo")||t.includes("atomo"))return "O átomo é a unidade básica da matéria química. Possui um núcleo com protões e neutrões e uma região onde se encontram eletrões. O número de protões determina o número atómico do elemento.";
 if(t.includes("newton")||t.includes("força"))return "Na mecânica clássica, a segunda lei de Newton relaciona força resultante, massa e aceleração: F = m·a. A força resultante é medida em newtons (N).";
 if(t.includes("equilíbrio")||t.includes("equilibrio"))return "Em equilíbrio químico, as velocidades das reações direta e inversa são iguais. Isso não significa que as concentrações sejam necessariamente iguais; significa que permanecem aproximadamente constantes enquanto as condições se mantêm.";
 if(t.includes("derivada"))return "A derivada de uma função descreve a sua taxa de variação instantânea. Geometricamente, corresponde à inclinação da reta tangente ao gráfico num ponto.";
 if(t.includes("didática")||t.includes("didatica"))return "A Didática estuda e orienta os processos de ensino e aprendizagem. O planejamento didático articula objetivos, conteúdos, métodos, recursos e avaliação de forma coerente.";
 if(t.includes("cria")&&t.includes("quest"))return "Exemplo: Qual é a unidade SI de força? A) Joule B) Newton C) Watt D) Pascal. Resposta: B. Explicação: o newton é a unidade SI de força.";
 if(/[0-9]/.test(t)&&(/[+\-*x×]/.test(t)))return resolverConta(texto);
 return "Posso trabalhar melhor quando você indica o tema. Experimente perguntar: “Explique equilíbrio químico”, “O que é uma célula?”, “Resolva 25 × 4” ou “Crie uma questão de Física”.";
}
function resolverConta(s){
 const m=s.match(/(-?\d+(?:[.,]\d+)?)\s*([+*×x\-\/])\s*(-?\d+(?:[.,]\d+)?)/i);
 if(!m)return "Envie uma conta simples, por exemplo: 25 × 4.";
 const a=Number(m[1].replace(",",".")),b=Number(m[3].replace(",","."));
 const op=m[2];let r=op==="+"?a+b:op==="-"?a-b:op==="/"?(b===0?null:a/b):a*b;
 return r===null?"Não é possível dividir por zero.":`Vamos passo a passo: ${a} ${op} ${b} = ${r}.`;
}
function abrirIA(){
 abrirModal(`<div class="modal-head"><h2>🤖 Wwebba IA</h2><button class="close" onclick="fecharModal()">×</button></div><p>Assistente educacional offline. Para respostas abertas no nível de um modelo generativo, será necessária uma API/backend de IA.</p><div class="ia-chat"><div id="iaMessages" class="ia-messages"><div class="msg ai">Olá! Sou a Wwebba IA. Como posso ajudar nos teus estudos?</div></div><div class="quick-prompts"><button onclick="iaEnviar('Explique o conceito de célula.')">Célula</button><button onclick="iaEnviar('Explique equilíbrio químico.')">Equilíbrio</button><button onclick="iaEnviar('Resolva 25 × 4')">Matemática</button><button onclick="iaEnviar('Crie uma questão de Física.')">Criar questão</button></div><div class="ia-row"><input id="iaInput" class="ia-chat-input" placeholder="Digite a sua pergunta..."><button class="btn primary" onclick="iaEnviar()">Enviar</button></div></div>`);
}
function iaEnviar(pre){
 const input=$("#iaInput"),text=pre||input?.value.trim();if(!text)return;
 const box=$("#iaMessages");box.innerHTML+=`<div class="msg user">${esc(text)}</div>`;if(input)input.value="";
 setTimeout(()=>{box.innerHTML+=`<div class="msg ai">${esc(iaResposta(text))}</div>`;box.scrollTop=box.scrollHeight},250);
}
$("#iaBtn")?.addEventListener("click",abrirIA);
window.selecionarDisciplina=selecionarDisciplina;window.selecionarNivel=selecionarNivel;window.selecionarConteudo=selecionarConteudo;window.iniciarSimulado=iniciarSimulado;window.responder=responder;window.proximaQuestao=proximaQuestao;window.mostrarConfiguracao=mostrarConfiguracao;window.mostrarConteudos=mostrarConteudos;window.mostrarNiveis=mostrarNiveis;window.mostrarResultado=mostrarResultado;window.fecharSelecao=fecharSelecao;window.abrirHistorico=abrirHistorico;window.fecharModal=fecharModal;window.iaEnviar=iaEnviar;
console.log("🔥 Wwebba Teste V5 carregado.");
