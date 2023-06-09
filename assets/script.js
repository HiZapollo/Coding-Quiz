// import elements
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

// attach answer box
var answerAttachmentElement = document.createElement('h1');
answerAttachmentElement.setAttribute('id', 'answer-attachment');
questionBoxElement.appendChild(answerAttachmentElement);

// variables
var timer;
var timerCount;
var stopTimer = false;
var questionIndex = 0;
var highScores = [];

// all questions and answers
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

// starts the timer and shows the first question
function startButton() {
    timerCount = 100;
    startTimer();

    showQuestion();
}

// hides all elements, shows the first question
function showQuestion() {
    paragraphElement.style.display = 'none';
    startButtonElement.style.display = 'none';
    questionBoxElement.style.textAlign = 'left';
    questionElement.style.display = 'inline-block';
    var currentQuestion = questions[questionIndex];
    questionElement.textContent = currentQuestion.question;
    answerBoxElement.style.display = "block";
    answerBoxElement.textContent = '';
    for (var i = 0; i < currentQuestion.answers.length; i++) { // creates the buttons for each answer
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

// checks if the answer is correct or not, also determines if the answer is the last one
function checkAnswer(event) {
    answerAttachmentElement.style.display = 'block';
    if (event.target.textContent === questions[questionIndex].correctAnswer) {
        answerAttachmentElement.textContent = 'Correct!';
    } else {
        timerCount = timerCount - 10;
        answerAttachmentElement.textContent = 'Wrong!';
    }
    if (questionIndex < questions.length -1 ) {
        questionIndex++;
        showQuestion();
    } else { //stops timer if on last question
        stopTimer = true;
    }
    hideAttachment();
}

// hides the attachment after 1 second
function hideAttachment() {
    setTimeout(function() {
        answerAttachmentElement.style.display = 'none';
    }, 1000);
}

// starts the timer, goes until 0 or the last question is answered
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

// stops the timer, remembers the scores in the local storage
function allDone() {
    clearInterval(timer);
    rememberHighScores();

    // removes answer elements, centers the rest and shows the final score
    answerBoxElement.style.display = 'none';
    paragraphElement.style.display = 'block';
    questionBoxElement.style.textAlign = 'center';
    questionElement.textContent = 'All Done!';
    paragraphElement.textContent = 'Your score is '+timerCount+'.';
    formElement.style.display = 'block';// attaches the form
}

// submits the score amd name and adds it to the local storage
formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    var name = formInput.value.trim();
    var score = timerCount;
    if(formInput.value === '') {
        alert('Please enter your initials!');
    } else if (formInput.value.length > 3) {
        alert('Please enter your initials with no more than 3 characters!');
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

//stores the local storage in a temporary array so its not overwritten when a new user is added to the local storage
function rememberHighScores() {
    var rememberedScores = JSON.parse(localStorage.getItem('user'));
    if (rememberedScores!== null) {
        highScores = rememberedScores;
    } 
}


// shows the list of high scores when link is clicked
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
    answerBoxElement.style.display = 'none';

    //show the list and add the scores to it
    containerElement.style.display = 'block';
    questionElement.textContent = 'High Scores';
    questionBoxElement.style.textAlign = 'center';
    for (var i = 0; i < highScores.length; i++) { //for each score, make a list and append it
        var liElement = document.createElement('li');
        liElement.textContent =(i+1)+'. '+ highScores[i].name + ' - '+ highScores[i].score;
        scoreListElement.appendChild(liElement);
    }
    //make back button
    var backBtnElement = document.createElement('button');
    backBtnElement.setAttribute('class', 'scoreboardBtn');
    backBtnElement.textContent = 'Go Back';
    
    //make clear button
    var clearBtnElement = document.createElement('button');
    clearBtnElement.setAttribute('class', 'scoreboardBtn');
    clearBtnElement.textContent = 'Clear';

    //append and add event listeners to both buttons
    scoreListElement.appendChild(backBtnElement);
    scoreListElement.appendChild(clearBtnElement);
    backBtnElement.addEventListener('click', backBtn);
    clearBtnElement.addEventListener('click', clearBtn);
}

// reloads the page
function backBtn() {
    location.reload();
}

// clears the local storage and reloads the page
function clearBtn() {
    localStorage.clear();
    location.reload();
}

startButtonElement.addEventListener('click', startButton);
