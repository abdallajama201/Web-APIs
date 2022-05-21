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

const options1 = ["boolean", "object", "number", "string"];
const question1 = new Question("What data types can local storage accept?", options1, "string");
questionList.push(question1);

const options2 = ["x", "x", "x", "x"];
const question2 = new Question("x", options2, "string");
questionList.push(question2);

let optionList = [];
let currentQues = 0;
let score = 0;



function init() {
    start.addEventListener("click", questionLoop);
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

function endOfQuiz() {
    title.textContent = "All done."
    for(let i = 0; i < questionList[0].options.length; i++) {
        optionList[i].remove();
    }
    
    function clearAnswer() {
        answer.textContent = "";
    }
    setTimeout(clearAnswer, 3000);
    content.setAttribute("style", "display: visible");
    content.textContent = `Your final score is ${score}`;
}

init();

