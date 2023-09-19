const questions = [
    {
        question: "Question 1: What does 'HTML' stand for?",
        options: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hypertext Main Language", "Hypertext Master Language"],
        correctAnswer: "Hypertext Markup Language"
    },
    {
        question: "Question 2: What does 'CSS' stand for?",
        options: ["Color Cascade Sheet", "Cascading Solid Sheet", "Cascading Style Sheet", "Color Style Sheet"],
        correctAnswer: "Cascading Style Sheet"
    },
    {
        question: "Question 3: How does Javascript relate to Java?",
        options: ["They both use functions", "It doesn't", "Together they made minecraft", "Javascript is derived from Java"],
        correctAnswer: "It doesn't"
    },
    {
        question: "Question 4: What is the HTML tag used to create a line break?",
        options: ["<skip>", "<b>", "<br>", "<space>"],
        correctAnswer: "<br>"
    },
    {
        question: "Question 5: What is the purpose of the <head> element?",
        options: ["Contains the data for the nav bar", "Contains the metadata about the HTML", "Contains the content for the header", "Contains the body content"],
        correctAnswer: "Contains the metadata about the HTML"
    },
    {
        question: "Question 6: How do you center an element horizontally in CSS?",
        options: ["margin: 0;", "padding: 0;", "margin: horizontal;", "margin: 0 auto;"],
        correctAnswer: "margin: 0 auto;"
    },
    {
        question: "Question 7: Which is the CSS selector for ID",
        options: ["#", ".", "class", "id="],
        correctAnswer: "#"
    },
    {
        question: "Question 8: What does 'undefined' mean in the console?",
        options: ["A variable that has been assigned a value but not delcared", "A variable that has been declared but doesn't have a value", "There is a syntax error", "There is a typo in the script"],
        correctAnswer: "A variable that has been declared but doesn't have a value"
    },
    {
        question: "Question 9: What is the purpose of 'return'?",
        options: ["Refreshes the function", "Declares a variable", "Sets a global function", "Specifies a value that a function returns"],
        correctAnswer: "Specifies a value that a function returns"
    },
    {
        question: "Question 10: Bonus! What is the widely used terminal for git commands on windows called",
        options: ["Git", "GitParty", "GitBash", "GitCommand"],
        correctAnswer: "GitBash"
    },
];

let currentQuestionIndex = 0;
let timer;
let timeLeft = 30; 
const timeToAdd = 10; 
const timeToSubtract = 10;

function startQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    const startButton = document.getElementById("start-button");
    startButton.style.display = "none";
    showQuestion();
    timer = setInterval(updateTimer, 1000);
}

function showQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const currentQuestion = questions[currentQuestionIndex];
    
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.addEventListener("click", checkAnswer);
        optionsElement.appendChild(optionButton);
    });
}

function checkAnswer(event) {
    const selectedOption = event.target.textContent;
    const currentQuestion = questions[currentQuestionIndex];
    
    if (selectedOption === currentQuestion.correctAnswer) {
        // logic for correct answers here
        alert("Correct!");
        timeLeft += timeToAdd; 
    } else {
        // logic for incorrect answers here
        alert("Incorrect!");
        timeLeft -= timeToSubtract
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        // Quiz is finished
        clearInterval(timer);
        alert("Quiz finished!");
        showLeaderboard();
    }
}

function updateTimer() {
    const timerElement = document.getElementById("timer");
    if (timeLeft > 0) {
        timeLeft--;
        timerElement.textContent = timeLeft;
    } else {
        // Time is up
        clearInterval(timer);
        alert("Time's up!");
        showLeaderboard();
    }
}

// Function to display the leaderboard
function showLeaderboard() {
    const leaderboard = document.getElementById("leaderboard");
    leaderboard.style.display = "block";
    
    const scoresList = document.getElementById("scores");
    scoresList.innerHTML = "";
    
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.forEach((score) => {
        const listItem = document.createElement("li");
        listItem.textContent = score.initials + " - " + score.score;
        scoresList.appendChild(listItem);
    });
    
    document.getElementById("submit-score").addEventListener("click", submitScore);
}

// Function to submit the score
function submitScore() {
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value;
    if (initials) {
        const score = timeLeft; // Use the remaining time as the score
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push({ initials, score });
        highScores.sort((a, b) => b.score - a.score); 
        localStorage.setItem("highScores", JSON.stringify(highScores));
        showLeaderboard(); 
    }
}

document.getElementById("start-button").addEventListener("click", startQuiz);