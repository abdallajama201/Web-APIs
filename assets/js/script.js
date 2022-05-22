let scores = document.querySelector("#scores");
let timer = document.querySelector("#timer");
let container = document.querySelector("#container");
let title = document.querySelector("#title");
let content = document.querySelector("#content");
let start = document.querySelector("#start");
let answer = document.querySelector("#answer");

class Question {
    constructor(question, options, answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
}

let questionList = [];

const options1 = ["1. boolean", "2. object", "3. number", "4. string"];
const question1 = new Question("What data types can local storage accept?", options1, "4. string");
questionList.push(question1);

const options2 = ["x", "x", "x", "x"];
const question2 = new Question("x", options2, "string");
questionList.push(question2);

let optionList = [];
let currentQues = 0;
let score = 0;

let leaderboard = [];
let initials = "";


function init() {
    start.addEventListener("click", questionLoop);
    scores.addEventListener("click", showScores);
}

function questionLoop () {
    start.setAttribute("style", "display: none");
    content.setAttribute("style", "display: none");
    let numOfOptions = questionList[0].options.length;
    for(let i = 0; i < numOfOptions; i++) {
        let option = document.createElement("button");
        container.appendChild(option);
        optionList.push(option);
    }
    nextQuestion();
}

function nextQuestion(event) {
    if(event !== undefined) {
        if(event.currentTarget.textContent === questionList[currentQues - 1].answer) {
            answer.textContent = "Correct";
            score += 5;
        } else {
            answer.textContent = "Incorrect";
        }
    }
    if(currentQues < questionList.length) {
        title.textContent = questionList[currentQues].question;
        for(let i = 0; i < questionList[currentQues].options.length; i++) {
            optionList[i].textContent = questionList[currentQues].options[i];        
            optionList[i].addEventListener("click", nextQuestion);
        }
        currentQues++;
    } else {
        endOfQuiz();
    }
}

function stopReload(event) {
    if(event.key === "Enter") {
        event.preventDefault();
    }
}


function showScores() {
    title.textContent = "High Scores";
    content.textContent = "";
    start.setAttribute("style", "display: none");
    content.setAttribute("style", "white-space: pre-wrap");
    if(localStorage.getItem("leaderboard") !== null) {
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    }
    for(let i = 0; i < leaderboard.length; i++) {
        content.textContent += leaderboard[i] + '\n';
    }
    
    let  = document.createElement("button");
    container.appendChild(option);
    optionList.push(option);
    
    console.log(leaderboard);
}
function invalidInput() {
    answer.textContent = "Initials are limited to three characters";
    setTimeout(clearAnswer, 3500);
    let submit = document.getElementById("submit");
    let id = document.getElementById("id");
    submit.addEventListener("click", addScore);
}

function addScore(event) {
    if(event !== undefined) {
        event.preventDefault();
    }
    let id = document.getElementById("initials");
    if(id.value.length > 3) {
        invalidInput();
        return;
    }
    let form = document.getElementById("form");
    form.remove();
    if(localStorage.getItem("leaderboard") !== null) {
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    }
    leaderboard.push(id.value + ' ' + score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    showScores();
}

function clearAnswer() {
    answer.textContent = "";
}

function endOfQuiz() {
    title.textContent = "All done."
    for(let i = 0; i < questionList[0].options.length; i++) {
        optionList[i].remove();
    }
    
    setTimeout(clearAnswer, 3500);
    content.setAttribute("style", "display: visible");
    content.textContent = `Your final score is ${score}`;

    let initialsForm = document.createElement("form");
    container.appendChild(initialsForm);
    initialsForm.setAttribute("id", "form");
    let label = document.createElement("label");
    initialsForm.appendChild(label);
    label.textContent = "Enter initials: "
    let input = document.createElement("input")
    initialsForm.appendChild(input);
    input.setAttribute("id", "initials");
    let submit = document.createElement("button");
    initialsForm.appendChild(submit);
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";


    input.addEventListener("keydown", stopReload);
    submit.addEventListener("click", addScore);

    
}
init();


