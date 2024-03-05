let questions = [
    { 
        question: "What is the diffrence between a function and a for loop?",
        choices: ["A. functions do not repeat like for loops", "B. functions do not always execute immidiatly when the Java Script file is ran", "C. for loops do not require a return", "D. for loops can not perfome actions like functions do"],
        correctAnswer: "B"
    },
    { 
        question: "What symbol selects all elements in an html?",
        choices: ["A. @", "B. !", "C. #", "D. *"],
        correctAnswer: "D"
    },
    { 
        question: "What does Display do in a css stylesheet?",
        choices: ["A. returns an error", "B. sets an element as block or inline box", "C. directly changes the overall display of a page", "D. Selects all elements ina display"],
        correctAnswer: "B"
    },
    { 
        question: "which property puts an element in a specific line on an axis?",
        choices: ["A. Align", "B. Box", "C. Set", "D. Axis"],
        correctAnswer: "A"
    },
    { 
        question: "Code structures used to test if an expression returns?",
        choices: ["A. Event Handelers", "B. Arguments", "C. Conditionals", "D. Functions"],
        correctAnswer: "C"
    }
    // more questions here, ran out of questions that wouldn't sound too simple
];

let currentQuestionIndex = 0;
let timer;
let timeLeft = 60;
let score = 0;

const startButton = document.getElementById('startButton');
const quizContainer = document.getElementById('quizContainer');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const submitButton = document.getElementById('submitAnswer');
const timerElement = document.getElementById('timeLeft');
const gameOverContainer = document.getElementById('gameOverContainer');
const saveScoreButton = document.getElementById('saveScore');
const initialsInput = document.getElementById('initials');
const restartButton = document.getElementById('restartButton');

startButton.addEventListener('click', startGame);
submitButton.addEventListener('click', checkAnswer);
saveScoreButton.addEventListener('click', saveScore);
//restartButton.addEventListener('click', startGame);

function startGame() {
    startButton.style.display = 'none';
    quizContainer.style.display = 'block';
    showQuestion();
    startTimer();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = ''; // clears previous choices

    
    currentQuestion.choices.forEach(choice => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.addEventListener('click', function() {
            selectAnswer(choice);
        });// creates buttons for each choice
        choicesElement.appendChild(choiceButton);
    });
}


function selectAnswer(selectedChoice) {
    if (selectedChoice === questions[currentQuestionIndex].correctAnswer) {
        score++;
    } else {
        timeLeft -= 5; // penalty for wrong answers
        if (timeLeft <= 0) {
            endGame();
            return;
        }
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    quizContainer.style.display = 'none';
    gameOverContainer.style.display = 'block';
}

function saveScore() {
    const initials = initialsInput.value.trim();
    console.log("Score Saved: " + initials + " - " + score);
    console.log("All Scores:");
    scores.forEach(entry => {
        console.log(entry.initials + " - " + entry.score);
    });
}

//function restartQuiz() {     
  //  currentQuestionIndex = 0;
  //  score = 0;
  //  timeLeft = 60;
  //  initialsInput.value = ''; 
  //  gameOverContainer.style.display = 'none'; 
  //  startGame(); 
// my attempt at making a restart button but could not get it to initiate upon clicking