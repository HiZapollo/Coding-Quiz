var timerElement = document.querySelector('#timer');
var startButtonElement = document.querySelector('#start-button');
var questionElement = document.querySelector('#questions');
var paragraphElement = document.querySelector('#paragraph');
var questionBoxElement = document.querySelector('#question-box');
var answerBoxElement = document.querySelector('.answers-box');
var formElement = document.querySelector('#form');
var formInput = document.querySelector('#name');
var scoreListElement = document.querySelector('#scores');
var scoreLinkElement = document.querySelector('#highscore');
var timerTxtElement = document.querySelector('#timer-txt');
var containerElement = document.querySelector('.container');

var answerAttachmentElement = document.createElement('h1');
answerAttachmentElement.setAttribute('id', 'answer-attachment');
questionBoxElement.appendChild(answerAttachmentElement);

var timer;
var timerCount;
var stopTimer = false;
var questionIndex = 0;
var highScores = [];

var questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
        correctAnswer: '3. alerts'
    },
    {
        question:'The condition in an if / else statement is enclosed within _____.',
        answers: ['1. quotes', '2. curly brackets', '3. parentheses', '4. square brackets'],
        correctAnswer: '3. parentheses'
    },
    {
        question:'Arrays in JavaScript can be used to store _____.',
        answers: ['1. numbers and strings', '2. other arrays', '3. booleans', '4. all of the above'],
        correctAnswer: '4. all of the above'
    },
    {
        question:'String values must be enclosed within _____ when being assigned to variables.',
        answers: ['1. commas', '2. curly brackets', '3. quotes', '4. parentheses'],
        correctAnswer: '3. quotes'
    },
    {
        question:'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: ['1. JavaScript', '2.terminal/bash', '3. for loops', '4. console.log'],
        correctAnswer: '4. console.log'
    }
]


function startButton() {
    timerCount = 100;
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
    answerBoxElement.style.display = "block";
    answerBoxElement.textContent = '';
    for (var i = 0; i < currentQuestion.answers.length; i++) {
        var answerElement = document.createElement('button');
        answerElement.textContent = currentQuestion.answers[i];
        answerElement.setAttribute('class', 'answer');
        answerElement.setAttribute('data-index', i);
        answerElement.addEventListener('click', checkAnswer);
        answerElement.style.display = 'block';
        answerElement.style.minWidth = '13rem';
        answerBoxElement.appendChild(answerElement);
    }
}

function checkAnswer(event) {
    answerAttachmentElement.style.display = 'block';
    if (event.target.textContent === questions[questionIndex].correctAnswer) {
        console.log('correct');
        answerAttachmentElement.textContent = 'Correct!';
    } else {
        console.log('wrong');
        timerCount = timerCount - 10;
        answerAttachmentElement.textContent = 'Wrong!';
    }
    if (questionIndex < questions.length -1 ) {
        questionIndex++;
        showQuestion();
    } else {
        stopTimer = true;
    }
    hideAttachment();
}

function hideAttachment() {
    setTimeout(function() {
        answerAttachmentElement.style.display = 'none';
    }, 1000);
}

function startTimer() {
    timer = setInterval(function() {
        timerElement.textContent = timerCount;
        if (timerCount <= 0) {
            timerCount = 100;
            allDone();
        } else if (stopTimer) {
            allDone();
        } else {
            timerCount--;
        }
            
      }, 1000);
}

function allDone() {
    console.log('all done');
    clearInterval(timer);
    rememberHighScores();
    answerBoxElement.style.display = 'none';
    paragraphElement.style.display = 'block';
    questionBoxElement.style.textAlign = 'center';
    questionElement.textContent = 'All Done!';
    paragraphElement.textContent = 'Your score is '+timerCount+'.';
    formElement.style.display = 'block';
}

formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('form submitted');
    var name = formInput.value.trim();
    var score = timerCount;
    if(formInput.value === '') {
        alert('Please enter your name!');
    } else {
        var user = {
            name: name,
            score: score
        }
        highScores.push(user);
        var stringUserObject = JSON.stringify(highScores);
        localStorage.setItem('user', stringUserObject);
        showHighScores();
    }
});

function rememberHighScores() {
    rememberedScores = JSON.parse(localStorage.getItem('user'));
    if (rememberedScores!== null) {
        highScores = rememberedScores;
    }
}

scoreLinkElement.addEventListener('click', function(event) {
    event.preventDefault();
    showHighScores();
});

function showHighScores() {
    rememberHighScores();
    //sort high scores by least to highest score
    highScores.sort(function(a, b) {
        return b.score - a.score;
    });

    //get rid of all other elements
    paragraphElement.style.display = 'none';
    startButtonElement.style.display = 'none';
    scoreLinkElement.style.display = 'none';
    timerTxtElement.style.display = 'none';
    formElement.style.display = 'none';

    //show the list and add the scores to it
    containerElement.style.display = 'block';
    questionElement.textContent = 'High Scores';
    for (var i = 0; i < highScores.length; i++) {
        var liElement = document.createElement('li');
        liElement.textContent =(i+1)+'. '+ highScores[i].name + ' - '+ highScores[i].score;
        scoreListElement.appendChild(liElement);
    }
    var backBtnElement = document.createElement('button');
    backBtnElement.setAttribute('class', 'scoreboardBtn');
    backBtnElement.textContent = 'Go Back';
    var clearBtnElement = document.createElement('button');
    clearBtnElement.setAttribute('class', 'scoreboardBtn');
    clearBtnElement.textContent = 'Clear';
    scoreListElement.appendChild(backBtnElement);
    scoreListElement.appendChild(clearBtnElement);
    backBtnElement.addEventListener('click', backBtn);
    clearBtnElement.addEventListener('click', clearBtn);
}

function backBtn() {
    location.reload();
}

function clearBtn() {
    localStorage.clear();
    location.reload();
}

startButtonElement.addEventListener('click', startButton);
