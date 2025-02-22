const quizContainer = document.getElementById("quiz");
const questionsContainer = document.getElementById("questions");
const questionElement = document.getElementById("question");
const questionNumberElement = document.getElementById("question-number");
const quizProgressBar = document.getElementById("quiz-progress-bar");
const answerElements = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;
let questions = [];

// ดึงคำถามจาก HTML
document.querySelectorAll(".question").forEach((q) => {
  questions.push({
    question: q.dataset.question,
    a: q.dataset.a,
    b: q.dataset.b,
    c: q.dataset.c,
    d: q.dataset.d,
    correct: q.dataset.correct,
  });
});

const deselectAnswers = () => {
  answerElements.forEach((answer) => (answer.checked = false));
};

const getSelected = () => {
  let answer;
  answerElements.forEach((answerElement) => {
    if (answerElement.checked) answer = answerElement.id;
  });
  return answer;
};

const loadQuiz = () => {
  deselectAnswers();
  const currentQuizData = questions[currentQuiz];
  questionElement.innerText = currentQuizData.question;
  questionNumberElement.innerText = `คำถามที่: ${currentQuiz + 1} จาก ${questions.length}`;

  const progressPercentage = ((currentQuiz + 1) / questions.length) * 100;
  quizProgressBar.style.width = `${progressPercentage}%`;

  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
};

loadQuiz();

submitButton.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer === questions[currentQuiz].correct) score++;
    currentQuiz++;
    if (currentQuiz < questions.length) loadQuiz();
    else {
      quizContainer.innerHTML = `
        <h2>คุณทำได้ ${score}/${questions.length} คะแนน จากคำถามทั้งหมด</h2>
        <div class="final-buttons">
          <button onclick="history.go(0)">ลองอีกครั้ง</button>
          <button onclick="location.href='quiz.html'">แบบทดสอบอื่น</button>
        </div>
      `;
    }
  }
});
