const question = document.querySelector('#question');
const choices = Array.from(document.querySelector('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
  question: "How do you write 'Hello World' in an alert box?",
  choice1: "msg('Hello World')",
  choice2: "msgBox('Hello World');",
  choice3: "alertBox('Hello World');",
  choice4: "alert('Hello World');",
  answer: 3,
}, {
  question: "How to empty an array in JavaScript?",
  choice1: "arrayList[]",
  choice2: "arrayList(0)",
  choice3: "arrayList.length=0",
  choice4: "arrayList.len(0)",
  answer: 2,
}, {
  question: "What function to add an element at the begining of an array and one at the end?",
  choice1: "push,unshift",
  choice2: "unshift,push",
  choice3: "first,push",
  choice4: "unshift,last",
  answer: 1,
}, {
  question: "What will this output? var a = [1, 2, 3]; console.log(a[6]);",
  choice1: "undefined",
  choice2: "0",
  choice3: "prints nothing",
  choice4: "Syntax error",
  answer: 0,
}, {
  question: "What would following code return? console.log(typeof typeof 1);",
  choice1: "string",
  choice2: "number",
  choice3: "Syntax error",
  choice4: "undefined",
  answer: 0,
}, {
  question: "Which software company developed JavaScript?",
  choice1: "Mozilla",
  choice2: "Netscape",
  choice3: "Sun Microsystems",
  choice4: "Oracle",
  answer: 1,
}, {
  question: "What would be the result of 3+2+'7'?",
  choice1: "327",
  choice2: "12",
  choice3: "14",
  choice4: "57",
  answer: 3,
}, {
  question: "Look at the following selector: $('div'). What does it select?",
  choice1: "The first div element",
  choice2: "The last div element",
  choice3: "All div elements",
  choice4: "Current div element",
  answer: 2,
}, {
  question: "How can a value be appended to an array?",
  choices: "arr(length).value;",
  choice2: "arr[arr.length]=value;",
  choice3: "arr[]=add(value);",
  choice4: "None of these",
  answer: 1
}, {
  question: "What will the code below output to the console? console.log(1 +  +'2' + '2');",
  choice1: "'32'",
  choice2: "'122'",
  choice3: "'13'",
  choice4: "'14'",
  answer: 0,
}]

const SCORE_POINTS = 1;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/highscores.html');
  }

  questionCounter++
  progressText.innerText = `question ${questionCounter} of ${MAX_QUESTIONS}`,
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })
  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
}

choices.forEach(choice => {
  choice.addEventlistener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()




