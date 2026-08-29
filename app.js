const DEFAULT_DATA={
"Química":[
 {q:"Qual é o símbolo químico do oxigénio?",a:["O","Ox","Og","C"],c:0,e:"O é o símbolo químico do oxigénio."},
 {q:"Qual é o número atómico do hidrogénio?",a:["2","1","8","7"],c:1,e:"O hidrogénio possui 1 protão; portanto, número atómico 1."},
 {q:"Qual destas substâncias é uma base?",a:["HCl","NaOH","CO₂","H₂SO₄"],c:1,e:"NaOH é hidróxido de sódio, uma base."}
],
"Matemática":[
 {q:"Quanto é 8 × 7?",a:["54","56","64","48"],c:1,e:"8 × 7 = 56."},
 {q:"Qual é a raiz quadrada de 81?",a:["7","8","9","10"],c:2,e:"9 × 9 = 81."}
],
"Português":[
 {q:"Qual é o plural de 'cidadão'?",a:["cidadões","cidadãos","cidadães","cidadans"],c:1,e:"O plural padrão é 'cidadãos'."}
],
"Biologia":[
 {q:"Qual é a unidade básica dos seres vivos?",a:["Órgão","Tecido","Célula","Sistema"],c:2,e:"A célula é considerada a unidade básica estrutural e funcional dos seres vivos."}
],
"Didática":[
 {q:"Qual é uma função essencial do planejamento didático?",a:["Eliminar a avaliação","Organizar o processo de ensino e aprendizagem","Evitar objetivos","Substituir o professor"],c:1,e:"O planejamento organiza objetivos, conteúdos, métodos, recursos e avaliação."}
]};

let data=JSON.parse(localStorage.getItem("wwebbaData")||"null")||DEFAULT_DATA;
let subject="", questions=[], current=0, answers=[], time=1200, interval=null, finished=false;

const $=id=>document.getElementById(id);
function show(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));$(id).classList.add("active");window.scrollTo(0,0)}
function save(){localStorage.setItem("wwebbaData",JSON.stringify(data))}
function renderSubjects(){
  $("subjects").innerHTML="";
  Object.keys(data).forEach(s=>{
    const b=document.createElement("button");b.className="subject";b.textContent=s;b.onclick=()=>startQuiz(s);$("subjects").appendChild(b)
  })
}
function startQuiz(s){
 subject=s;questions=[...data[s]]; if(!questions.length)return alert("Ainda não há questões nesta disciplina.");
 current=0;answers=Array(questions.length).fill(null);time=Math.max(60,questions.length*60);finished=false;
 $("quizSubject").textContent=subject;$("nextBtn").textContent=questions.length===1?"Finalizar":"Próxima";show("quiz");renderQuestion();startTimer()
}
function renderQuestion(){
 const q=questions[current];$("questionNumber").textContent=`Questão ${current+1} de ${questions.length}`;$("questionText").textContent=q.q;
 $("progressBar").style.width=((current+1)/questions.length*100)+"%";$("answers").innerHTML="";
 q.a.forEach((txt,i)=>{const b=document.createElement("button");b.className="answer"+(answers[current]===i?" selected":"");b.textContent=`${String.fromCharCode(65+i)}) ${txt}`;b.onclick=()=>{answers[current]=i;renderQuestion()};$("answers").appendChild(b)});
 $("prevBtn").disabled=current===0;$("nextBtn").textContent=current===questions.length-1?"Finalizar":"Próxima"
}
function startTimer(){clearInterval(interval);updateTimer();interval=setInterval(()=>{time--;updateTimer();if(time<=0){clearInterval(interval);finishQuiz()}},1000)}
function updateTimer(){let m=Math.floor(time/60),s=time%60;$("timer").textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`}
function finishQuiz(){
 if(finished)return;finished=true;clearInterval(interval);
 let correct=questions.reduce((n,q,i)=>n+(answers[i]===q.c?1:0),0),wrong=questions.length-correct,p=Math.round(correct/questions.length*100);
 $("score").textContent=`${correct}/${questions.length}`;$("correct").textContent=correct;$("wrong").textContent=wrong;$("percent").textContent=p+"%";
 $("resultMessage").textContent=p>=80?"Excelente desempenho!":p>=60?"Bom trabalho! Continue a praticar.":"Continue a estudar e tente novamente.";
 show("result")
}
function review(){
 $("reviewList").innerHTML=questions.map((q,i)=>{
  const ok=answers[i]===q.c;
  return `<div class="reviewItem"><b>${i+1}. ${q.q}</b><p>Você respondeu: <b>${answers[i]===null?"Não respondeu":String.fromCharCode(65+answers[i])+") "+q.a[answers[i]]}</b></p><p class="${ok?"correctText":"wrongText"}">${ok?"✅ Correta":"❌ Incorreta"} — Resposta: ${String.fromCharCode(65+q.c)}) ${q.a[q.c]}</p><p>${q.e||""}</p></div>`
 }).join("");show("review")
}
function populateAdmin(){
 $("newSubject").innerHTML=Object.keys(data).map(s=>`<option>${s}</option>`).join("");
 $("questionAdminList").innerHTML=Object.entries(data).flatMap(([s,arr])=>arr.map((q,i)=>`<div class="adminQuestion"><span><b>${s}</b> — ${q.q}</span><button class="secondary" onclick="removeQuestion('${s.replaceAll("'","\\'")}',${i})">Excluir</button></div>`)).join("")
}
function removeQuestion(s,i){if(confirm("Excluir esta questão?")){data[s].splice(i,1);save();populateAdmin();renderSubjects()}}
$("startBtn").onclick=()=>show("home");
$("homeBtn").onclick=()=>show("home");
$("againBtn").onclick=()=>show("home");
$("reviewBtn").onclick=review;
$("reviewHomeBtn").onclick=()=>show("home");
$("prevBtn").onclick=()=>{if(current>0){current--;renderQuestion()}};
$("nextBtn").onclick=()=>{if(answers[current]===null&&!confirm("Você ainda não respondeu esta questão. Continuar?"))return;if(current<questions.length-1){current++;renderQuestion()}else finishQuiz()};
$("adminBtn").onclick=()=>{show("admin");$("adminArea").classList.add("hidden")};
$("adminLogin").onclick=()=>{if($("adminPass").value==="1234"){$("adminArea").classList.remove("hidden");populateAdmin()}else alert("Senha incorreta.")};
$("addQuestion").onclick=()=>{
 const q=$("newQuestion").value.trim(),s=$("newSubject").value,a=[$("a1").value,$("a2").value,$("a3").value,$("a4").value],c=Number($("correctAnswer").value),e=$("explanation").value.trim();
 if(!q||a.some(x=>!x.trim()))return alert("Preencha a pergunta e as quatro alternativas.");
 data[s].push({q,a,c,e});save();["newQuestion","a1","a2","a3","a4","explanation"].forEach(id=>$(id).value="");populateAdmin();renderSubjects();alert("Questão adicionada com sucesso.")
};
renderSubjects();
