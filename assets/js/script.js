let scores = document.querySelector("#scores");
let timer = document.querySelector("#timer");
let container = document.querySelector("#container");
// let title = document.querySelector("#title");
// let content = document.querySelector("#content");
let answer = document.querySelector("#answer");

class Question {
    constructor(question, options, answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
}

let questionList = [];

let options1 = ["boolean", "object", "number", "string"];
const question1 = new Question("What data types can local storage accept?", options1, "string");
questionList.push(question1);

let options2 = ["x", "x", "x", "x"];
const question2 = new Question("x", options1, "string");
questionList.push(question2);

function init() {
    let title = document.createElement("h1");
    title.textContent = "Coding Quiz Challenge";
    title.setAttribute("id", "title");
    container.appendChild(title);
    let content = document.createElement("content")
    content.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by reducing it by ten seconds";
    content.setAttribute("id","content");
    container.appendChild(content);
    let start = document.createElement("button");
    start.textContent = "Start Quiz";
    start.setAttribute("id", "start")
    content.appendChild(start);
    start.addEventListener("click", questionLoop);
}

function questionLoop () {
    let start = document.querySelector("#start");
    start.setAttribute("display", "invisible");
    
    
    
    for(let i = 0; i < questionList.length; i++) {
        let option1 = document.createElement("button");
        let option2 = document.createElement("button");
        let option3 = document.createElement("button");
        let option4 = document.createElement("button");
        let optionList = [option1, option2, option3, option4];
        let isAnswered = false;
        
        function answerChecker(event) {
            if(event.currentTarget.textContent === questionList[i].answer ) {
                answer.textContent = "Correct";
            }else {
                answer.textContent = "False";
            }  
            isAnswered = true
        } 
        
        content.textContent = questionList[i].question;
        for(let j = 0; j < optionList.length; j++) {
            content.appendChild(optionList[j]);
            optionList[j].textContent = questionList[i].options[j];
        }
        
        for(let i = 0; i < optionList.length; i++) {
            optionList[i].addEventListener("click", answerChecker);
            console.log(optionList);
        }
        if(isAnswered) {
            optionList[0].remove();
            break;
        }
    }
}

init();
console.log()

