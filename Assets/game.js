// Generate quiz variables 

var questions = [
    {
        question: "How do you write 'Hello World' in an alert box?",
        choices: ["msg('Hello World')", "msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');"],
        answer: "alert('Hello World');",
    }, {
        question: "How to empty an array in JavaScript?",
        choices: ["arrayList[]", "arrayList(0)", "arrayList.length=0", "arrayList.len(0)"],
        answer: "arrayList.length=0",
    }, {
        question: "What function to add an element at the begining of an array and one at the end?",
        choices: ["push,unshift", "unshift,push", "first,push", "unshift,last"],
        answer: "unshift,push",
    }, {
        question: "What will this output? var a = [1, 2, 3]; console.log(a[6]);",
        choices: ["undefined", "0", "prints nothing", "Syntax error"],
        answer: "undefined",
    }
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

var questionIndex = 0;
var correctCount = 0;
var intervalId;
var time = 20;

// Generate function for Quiz, Questions and results 

function endQuiz() {
    clearInterval(intervalId);
    var body = document.body;
    body.innerHTML = "Game Over, You scored" + correctCount;

    setTimeout(showHighScore, 2000);
}

window.setTimeout(function(){
    window.location.href = "highscores.html";
}, 12000);

function showHighScore() {
    var name = prompt("What is your name?");

    var user = {
        name: name,
        score: correctCount
    };

    var high_score = localStorage.getItem("scores");
    
    if (!high_score) {
        high_score = [];
    } else {
        high_score = JSON.parse(high_score);
    }

    high_score.push(user);

    high_score.sort(function(a, b){
        return b.score-a.score;
    });

    contentUl = document.createElement("ul");

    for (var i=0; i< high_score.length; i++) {
        var contentLi = document.createElement("li");
        contentLi.textContent = "Name: " + high_score[i].name+ " Score: "+ high_score[i].score;
        contentUl.append(contentLi);
    }

    document.body.append(contentUl);

}

function updateTime() {
    time--;
    if (time ===0) {
        endQuiz();
    }
}

function renderQuestion() {

    if (time === 0) {
        updateTime();
    }

    intervalID = setInterval(updateTime, 1000);

    questionEl.textContent = questions[questionIndex].question;
    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";

    var choices = questions[questionIndex].choices;
    var choicesLength = choices.length;

    for (var i = 0; i<choicesLength; i++) {
        var questionListItem = document.createElement("li");
        questionListItem.textContent = choices[i];
        optionListEl.append(questionListItem);
    }

}

function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
        timer = 0;
    }
    renderQuestion();
    
}
function checkAnswer(event) {
    var target = event.target;

    clearInterval(intervalId);

    if (target.matches("li")){
        var selectedChoice = event.target.textContent; 

        if(selectedChoice === questions[questionIndex].answer) {
            correctCount++;
            questionResultEl.textContent = "Correct";
        } else {
            correctCount --;
            questionResultEl.textContent = "Wrong";
            time -= 2;
        }
    }

    setTimeout (nextQuestion, 2000);

}

renderQuestion();
optionListEl.addEventListener("click", checkAnswer);

