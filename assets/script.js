var timerElement = document.querySelector('#timer');
var startButtonElement = document.querySelector('#start-button');
var questionElement = document.querySelector('#questions');
var paragraphElement = document.querySelector('#paragraph');
var questionBoxElement = document.querySelector('#question-box');

var timerCount;
var timer;
var questionIndex = 0;

var questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
        correctAnswer: '3. alerts'
    }
]

/* I need a start button
    - Starts timer
    - Hides the paragraph
    - Align the contents on the left
    - Hides the button
    - Starts the questions and answers
*/

function startButton() {
    timerCount = 60;
    startTimer();

    showQuestion();
}

function showQuestion() {
    paragraphElement.style.display = 'none';
    startButtonElement.style.display = 'none';
    questionBoxElement.style.textAlign = 'left';
    questionElement.style.display = 'inline-block';
    var currentQuestion = questions[questionIndex];
    questionElement.textContent = currentQuestion.question;
    for (var i = 0; i < currentQuestion.answers.length; i++) {
        var answerElement = document.createElement('button');
        answerElement.textContent = currentQuestion.answers[i];
        answerElement.setAttribute('class', 'answer');
        answerElement.setAttribute('data-index', i);
        answerElement.addEventListener('click', checkAnswer);
        answerElement.style.display = 'block';
        answerElement.style.minWidth = '13rem';
        questionElement.appendChild(answerElement);
    }
}

function checkAnswer(event) {
    if (event.target.textContent === questions[questionIndex].correctAnswer) {
        console.log('correct');
    } else {
        console.log('wrong');
        timerCount = timerCount - 10;
    }
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
      }, 1000);
}

startButtonElement.addEventListener('click', startButton);


/* I need questions and answers
    - Each question has 3 wrong and 1 correct answers
    - When clicking the right answer, display 'correct' and move to the next question
    - When clicking the wrong answer, display "wrong", lose 10 seconds, and move to the next question
*/