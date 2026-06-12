let current = 0;
let answers = [];
let selected = null;
let time = 300;
let timerStarted = false;

function startTest() {
document.getElementById("startScreen").style.display = "none";
document.getElementById("testScreen").style.display = "block";

document.getElementById("bgMusic").volume = 0.3;
document.getElementById("bgMusic").play();

loadQuestion();

if (!timerStarted) {
startTimer();
timerStarted = true;
}
}

/* TIMER */
function startTimer() {
let t = setInterval(() => {
if (time <= 0) {
clearInterval(t);
showResult();
return;
}

let m = Math.floor(time / 60);
let s = time % 60;

document.getElementById("timer").innerText =
`${m}:${s < 10 ? "0" + s : s}`;

time--;
}, 1000);
}

/* LOAD QUESTION */
function loadQuestion() {
selected = null;

let q = questions[current];

document.getElementById("qNum").innerText = current + 1;
document.getElementById("questionBox").innerText = q.q;

let optBox = document.getElementById("options");
optBox.innerHTML = "";

q.options.forEach(opt => {
let btn = document.createElement("button");
btn.innerText = opt;

btn.onclick = function () {
selected = opt;

/* reset all */
document.querySelectorAll("#options button").forEach(b => {
b.style.background = "#eee";
b.style.color = "#000";
});

/* highlight selected */
btn.style.background = "#4CAF50";
btn.style.color = "white";
};

optBox.appendChild(btn);
});
}

/* NEXT */
function nextQuestion() {
if (!selected) {
alert("Please select an answer");
return;
}

answers.push(questions[current].map[selected]);

current++;

document.getElementById("progressBar").style.width =
(current / questions.length) * 100 + "%";

if (current < questions.length) {
loadQuestion();
} else {
showResult();
}
}

/* RESULT */
function showResult() {
document.getElementById("testScreen").style.display = "none";
document.getElementById("resultScreen").style.display = "block";

let score = 80 + Math.floor(Math.random() * 10);

document.getElementById("score").innerHTML =
`<h2>Overall Score: ${score}/90</h2>`;

document.getElementById("loading").innerText =
"Analyzing response patterns...";

setTimeout(showMessage, 2500);
}

/* FINAL MESSAGE */
function showMessage() {

document.getElementById("loading").style.display = "none";

let msg = `
Kadhi kadhi vatta ki aapan khup door aahot...

Pan mara dil ma tu roj astos ❤️

Aapan veglya bhashat bolto...
Gujarati + Marathi mix...

Pan feelings same aahet ❤️

Distance khup ahe...
Pan connection majboot aahe.

He test grammar sathi navhta...

He fakt ek excuse hota...

Tula kahi sangaycha hota...

Tu khup special aahes ❤️
`;

typeWriter(msg);
}

/* TYPEWRITER */
function typeWriter(text) {
let i = 0;
let el = document.getElementById("finalMessage");

el.innerHTML = "";

let interval = setInterval(() => {
el.innerHTML += text.charAt(i);
i++;

if (i >= text.length) {
clearInterval(interval);
}
}, 35);
}
