var quizArea = document.querySelector("#questionsArea")
var quizStart = document.querySelector("#start-btn")


var quizQuestion = [
    {
        question: "Q1: Who discovered Brazil?",
        answers: {
            a: "Christopher Columbus",
            b: "Vasco da Gama",
            c: "Pedro Alvares Cabral",
            d: "Bill Clinton"
        },
        correctAnswer: "c"
    },
    {
        question: "Q2: Which month does the Carnaval takes place?",
        answers: {
            a: "January",
            b: "December",
            c: "July",
            d: "February"
        },
        correctAnswer: "d"
    },
    {
        question: "Q3: Who is the current president of Brazil?",
        answers: {
            a: "Lula",
            b: "Bolsonaro",
            c: "Dilma",
            d: "Ciro Gomes"
        },
        correctAnswer: "b"
    },
    {
        question: "Which language is spoken in Brazil?",
        answers: {
            a: "Portuguese",
            b: "Brazilian",
            c: "Spanish",
            d: "Arabic"
        },
        correctAnswer: "a"
    },
    {
        question: "How many world cups does Brazil has?",
        answers: {
            a: "6",
            b: "5",
            c: "3",
            d: "7"
        },
        correctAnswer: "b"
    }
];



var currentQuestion = 0;
var timerLength = 55;
var highScores = [];
var gameOver = false;

// Create elements and give classes 
var questionContainer = document.createElement("div");
questionContainer.className = "questionBox";
var questionEl = document.createElement("h2");
var answerList = document.createElement("div");
answerList.setAttribute("id", "buttonlist");

// answers
var answer1 = document.createElement("button");
answer1.className = "answerBtn";
answer1.setAttribute("answerData", "a");
var answer2 = document.createElement("button");
answer2.className = "answerBtn";
answer2.setAttribute("answerData", "b");
var answer3 = document.createElement("button");
answer3.className = "answerBtn";
answer3.setAttribute("answerData", "c");
var answer4 = document.createElement("button");
answer4.className = "answerBtn";
answer4.setAttribute("answerData", "d");


answerList.appendChild(answer1);
answerList.appendChild(answer2);
answerList.appendChild(answer3);
answerList.appendChild(answer4);
questionContainer.appendChild(questionEl);
questionContainer.appendChild(answerList);

var timer;
function timer() {
    timer = setInterval(function () {
        if (!gameOver) {
            timerLength--;
            document.querySelector("#timer").textContent = timerLength;

            if (timerLength < 30) {
                document.getElementById("timer").style.color = "red";
            }

            if (timerLength <= 0) {
                gameOver = true;
                endGame();
            }
        }
    }, 1000);
}


function endGame() {
    questionContainer.remove();
    clearInterval(timer);

    if (timerLength < 0) {
        timerLength = 0;
    };

    // generating elements 
    var scoreContainer = document.createElement("div");
    scoreContainer.setAttribute("id", "savescoreBox");
    var scoreTitle = document.createElement("h2");
    scoreTitle.textContent = "Your score is ";
    scoreTitle.setAttribute("id", "scoreTitle")
    var score = document.createElement("span");
    score.textContent = timerLength;
    var scoreForm = document.createElement("form");
    var userLabel = document.createElement("label");
    userLabel.textContent = "Your name:  ";
    userLabel.setAttribute("id", "userLabel");
    var userName = document.createElement("input");
    userName.setAttribute("type", "text");
    userName.setAttribute("id", "userName")
    var saveButton = document.createElement("input");
    saveButton.setAttribute("type", "submit")
    saveButton.setAttribute("id", "savescoreBtn")
    // generate div
    scoreForm.appendChild(userLabel);
    scoreForm.appendChild(userName);
    scoreForm.appendChild(saveButton);
    scoreTitle.appendChild(score);
    scoreContainer.appendChild(scoreTitle);
    scoreContainer.appendChild(scoreForm);
    // show div
    quizArea.appendChild(scoreContainer);

    scoreForm.addEventListener("submit", saveScores);
}


// saving to localstorage
function saveScores(event) {
    event.preventDefault();

    var checkList = localStorage.getItem("highScores");
    var savedScores = timerLength;
    var savedNames = document.getElementById("userName").value;

    if (checkList === null) {

        var scoreObj = JSON.stringify([{ name: savedNames, score: savedScores }]);
        var highScores = localStorage.setItem("highScores", scoreObj);

    } else {

        checkList = JSON.parse(checkList);
        console.log(checkList)
        checkList.push({ name: savedNames, score: savedScores });
        localStorage.setItem("highScores", JSON.stringify(checkList));

    }

    document.getElementById("userName").value = "";
    document.location.href = "./index.html"
}


function rightAnswer() {

    var userAnswer = this.getAttribute("answerData")

    if (userAnswer === quizQuestion[currentQuestion].correctAnswer) {
    }
    else {
        timerLength = timerLength - 10;
    }
    if (currentQuestion === quizQuestion.length - 1) {
        gameOver = true;
        endGame();
    }
    else {
        currentQuestion++;
        promptQuestions();
    }
}

function promptQuestions() {
    quizStart.remove();
    if (timerLength === 55) {
        timer();
    }

    questionEl.textContent = quizQuestion[currentQuestion].question;
    answer1.textContent = quizQuestion[currentQuestion].answers.a;
    answer2.textContent = quizQuestion[currentQuestion].answers.b;
    answer3.textContent = quizQuestion[currentQuestion].answers.c;
    answer4.textContent = quizQuestion[currentQuestion].answers.d;

    quizArea.appendChild(questionContainer);

    document.querySelectorAll(".answerBtn").forEach((Element) => {
        Element.addEventListener("click", rightAnswer);
    });
}

var scoreList = document.getElementById("highscoresList");

function generateHs() {
    var checkList = localStorage.getItem("highscoresList");
    if (checkList === null) {
        console.log("empty");
    } else {
        var highScores = JSON.parse(checkList);


        for (i = 0; i < highScores.length; i++) {
            var savedHighScores = highScores[i].score;
            var username = highScores[i].name;

            var scoreListItem = document.createElement("p");
            scoreListItem.textContent = username + ": " + savedHighScores;

            scoreList.appendChild(scoreListItem);
        }
    }
}


quizStart.addEventListener("click", promptQuestions);