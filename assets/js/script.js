let scores = document.querySelector("#scores");
let timer = document.querySelector("#timer");
let container = document.querySelector("#container");
let title = document.querySelector("#title");
let content = document.querySelector("#content");
let start = document.querySelector("#start");
let answer = document.querySelector("#answer");

// Structure of questions
class Question {
    constructor(question, options, answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
}

let questionList = [];

// All Questions formatted and filled put into questionList array
const options1 = ["1. boolean", "2. object", "3. number", "4. string"];
const question1 = new Question("What data types can local storage accept?", options1, "4. string");
questionList.push(question1);

const options2 = ["x", "x", "x", "x"];
const question2 = new Question("x", options2, "string");
questionList.push(question2);

// Variables for question loop functions
let optionList = [];
let currentQues = 0;
let score = 0;
let isQuizOngoing = false;

let leaderboard = [];
let initials = "";

// Init function that makes view scores and start quiz clickable
function init() {
    start.addEventListener("click", questionLoop);
    scores.addEventListener("click", showScores);
}

// Makes elements before the quiz started invisible and creates option buttons
function questionLoop () {
    isQuizOngoing = true;
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


// Checks if you are the last question
// Either goes to next question or end of quiz
function nextQuestion(event) {
    isCorrect(event);
    if(currentQues < questionList.length) {
        changeQuestion();
    } else {
        endOfQuiz();
    }
}


// Checks if you are on the first question 
// if not it checks the answer from the previous question is correct
function isCorrect(event) {
    if(event !== undefined) {
        if(event.currentTarget.textContent === questionList[currentQues - 1].answer) {
            answer.textContent = "Correct";
            score += 5;
        } else {
            answer.textContent = "Incorrect";
        }
    }
}

// Changes the title to the next question
// Changes the options for each button
function changeQuestion() {
    title.textContent = questionList[currentQues].question;
    for(let i = 0; i < questionList[currentQues].options.length; i++) {
        optionList[i].textContent = questionList[currentQues].options[i];        
        optionList[i].addEventListener("click", nextQuestion);
    }
    currentQues++;
}

// Changes title to All Done, clears options and displays score
// Sets current question and score to zero and creates input fields
function endOfQuiz() {
    title.textContent = "All Done.";
    clearOptions();
    setTimeout(function () {answer.textContent = ""}, 3500);
    content.setAttribute("style", "display: visible");
    content.textContent = `Your final score is ${score}`;
    currentQues = 0;
    score = 0;
    inputFields();
}

//Removes option buttons and empties array they were in
function clearOptions() {
    for(let i = 0; i < questionList[0].options.length; i++) {
        optionList[i].remove();
    }
    optionList = [];
}

// Creates the form for entering initials
// Listens for click on submit 
function inputFields() {
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

// Prevents entry field from reloading page
function stopReload(event) {
    if(event.key === "Enter") {
        event.preventDefault();
    }
}

// Prevents submit from reloading page
// Checks if initials are in a valid format
// Lets program now quiz is over and removes the form
// Saves the score
function addScore(event) {
    if(event !== undefined) {
        event.preventDefault();
    }
    let id = document.getElementById("initials");
    if(id.value.length > 3 || id.value.length === 0) {
        invalidInput();
        return;
    }
    isQuizOngoing = false;
    document.getElementById("form").remove();
    saveScore(id);
}

// Chacks if there are any scores saved locally
// If there are is populates them in an array
// Adds the score to the array and updates local storage
function saveScore(id) {
    if(localStorage.getItem("leaderboard") !== null) {
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    }
    leaderboard.push(id.value + ' ' + score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    showScores();    
}

// If an incorrect input is given a message is displayed
// Sets the submit button to listen for click
function invalidInput() {
    answer.textContent = "Initials must be entered and three characters or less";
    setTimeout(clearAnswer, 3500);
    let submit = document.getElementById("submit");
    submit.addEventListener("click", addScore);
}

// Checks if quiz is ongoing to prevent being able to check scores during quiz
// Changes title, writes scores and creates buttons for navigation
function showScores() {
    if(!isQuizOngoing) {
        title.textContent = "High Scores";
        // Hides start quiz button if view high scores is clicked at beginning
        start.setAttribute("style", "display: none");
        writeScores();
        createEndButtons();
    }
}

// Empties content box and formats for list
// Chacks if any scores are stored
// If there are they areput into an array
// the contents of the array are printed through a loop
function writeScores() {
    content.textContent = "";
    content.setAttribute("style", "white-space: pre-wrap");
    if(localStorage.getItem("leaderboard") !== null) {
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    }
    for(let i = 0; i < leaderboard.length; i++) {
        content.textContent += leaderboard[i] + '\n';
    }
}

// Checks to see if the buttons have been created already
// creates the buttons and sets listeners for a click
function createEndButtons() {
    if(!document.getElementById("restart")) {
        let restartVar = document.createElement("button");
        container.appendChild(restartVar);
        restartVar.textContent = "Go Back";
        restartVar.setAttribute("id", "restart");
        
        let clearScoresVar = document.createElement("button");
        container.appendChild(clearScoresVar);
        clearScoresVar.textContent = "Clear High Scores";
        clearScoresVar.setAttribute("id", "clearScores");
        
        restartVar.addEventListener("click", restart);
        clearScoresVar.addEventListener("click", clearScores)
    }
}

// Removes the current buttons on the screen
// Sets the title and content to original
// Makes start button visible and runs init function
function restart() {
    document.getElementById("restart").remove();
    document.getElementById("clearScores").remove();
    title.textContent = "Coding Quiz Challenge";
    content.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by reducing it by ten seconds";
    start.setAttribute("style", "display: visible");
    init();
}

// Clears local storage and array holding scores
// Erases content area
function clearScores() {
    localStorage.clear();
    content.textContent = "";
    leaderboard = [];
}

init();


