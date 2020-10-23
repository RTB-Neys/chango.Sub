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

// Generate function for Quiz, Questions and results 

function renderQuestion() {

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
    renderQuestion();

	if (availableQuestions.length === 0) {
		localStorage.setItem('mostRecentScore', score);

		return window.location.assign('/end.html');
    }
    
}
function checkAnswer(event) {
    var target = event.target;

    if (target.matches("li")){
        var selectedChoice = event.target.textContent; 

        if(selectedChoice === questions[questionIndex].answer) {
            correctCount++;
            questionResultEl.textContent = "Correct";
        } else {
            correctCount --;
            questionResultEl.textContent = "Wrong";
        }
    }

    setTimeout (nextQuestion, 2000);

}

optionListEl.addEventListener("click", checkAnswer);

renderQuestion();

// Generate time to countdown the end of quiz 

// Generate local storage for HIghScore