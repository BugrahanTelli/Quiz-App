import questions from './question.js';

const answers = document.querySelectorAll(".answer input");
const scoreElement = document.querySelector(".score");
const questionText = document.querySelector(".questionText");
const submitBtn = document.querySelector(".submit");
const resetBtn = document.querySelector(".reset");
const prevBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");

let score = 0;
let currentQuestionIndex = 0;

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    answers.forEach((answer, index) => {
        answer.checked = false;
        answer.nextElementSibling.innerText = currentQuestion.answers[index];
    });
}

function checkAnswer() {
    const selectedAnswer = document.querySelector('input:checked');
    if (selectedAnswer) {
        const selectedAnswerText = selectedAnswer.nextElementSibling.innerText;
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedAnswerText === currentQuestion.correctAnswer) {
            score++;
            goToNextQuestion()
        }
    }
}

function goToNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        alert("Quiz bitti. Tebrikler! Puanınız: " + score);
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function nextQuestion() {
    checkAnswer();
    goToNextQuestion();
    scoreElement.innerText = score;
}

displayQuestion();

submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    checkAnswer();
    scoreElement.innerText = score;
});
resetBtn.addEventListener('click', function () {
    score = 0;
    currentQuestionIndex = 0;
    scoreElement.innerText = score;
    displayQuestion();
})
prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);
