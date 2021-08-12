var score = 0

var startBtnEl = document.querySelector("#start-btn");
var quizEl = document.querySelector("#quizBox");


var questions = [
    {
        question: "Who invented JavaScript?",
        answers: {
            a: "",
            b: "",
            c: "",
            d: ""
        },
        correctAnswer: "c"
    },
    {
        question: "",
        answers: {
            a: "",
            b: "",
            c: "",
            d: ""
        },    
        correctAnswer: "c"
    },
    {
        question: "",
        answers: {
            a: "",
            b: "",
            c: "",
            d: ""
        },    
        correctAnswer: "d"
    },
    {
        question: "",
        answers: {
            a: "",
            b: "",
            c: "",
            d: ""
        },    
        correctAnswer: "a"
    },
    {
        question: "",
        answers: {
            a: "",
            b: "",
            c: "",
            d: ""
        },    
        correctAnswer: "b"
    }
];




startBtnEl.addEventListener("click", function(){
    for (let i = 0; i < questions.length; i++) {
        var questionEl = questions[i]
        var answersEl = answers[i]        
    }

}, false)