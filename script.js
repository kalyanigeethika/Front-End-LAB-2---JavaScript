const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice"));
const progress = document.getElementById("progress");
const scoreText = document.getElementById("score");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
      question: "Inside which HTML element do we put the JavaScript??",
      choice1: "<script>",
      choice2: "<javascript>",
      choice3: "<js>",
      choice4: "<scripting>",
      answer: 1
    },
    {
      question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choice1: "<script href='xxx.js'>",
      choice2: "<script name='xxx.js'>",
      choice3: "<script src='xxx.js'>",
      choice4: "<script file='xxx.js'>",
      answer: 3
    },
    {
      question: "How do you write 'Hello World' in an alert box?",
      choice1: "msgBox('Hello World');",
      choice2: "alertBox('Hello World');",
      choice3: "msg('Hello World');",
      choice4: "alert('Hello World');",
      answer: 4
    },    
    {
        question: "How to write an IF statement in JavaScript?",
        choice1: "if i = 5 then",
        choice2: "if i == 5 then",
        choice3: "if (i == 5)",
        choice4: "if i = 5",
        answer: 3
    },   
    {
        question: "How do you create a function in JavaScript?",
        choice1: "function myFunction()", 
        choice2:"function:myFunction()",
        choice3:"function = myFunction()",
        choice4:"function func = myFunction()",
        answer: 1
    },       
    {
        question: "How does a FOR loop start?",
        choice1: "for (i = 0; i &lt;= 5)", 
		choice2:"for (i = 0; i &lt;= 5; i++)",
		choice3:"for i = 1 to 5",
		choice4:"for (i &lt;= 5; i++)",
        answer: 2
    },       
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        choice1: "rnd(7.25)", 
		choice2:"Math.round(7.25)",
		choice3:"Math.rnd(7.25)",
		choice4:"round(7.25)",
        answer: 2
    },       
    {
        question: "How do you find the number with the highest value of x and y?",
        choice1: "Math.max(x, y)", 
		choice2:"Math.ceil(x, y)",
		choice3:"top(x, y)",
		choice4:"ceil(x, y)",
        answer: 1
    },       
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choice1: "onchange", 
		choice2:"onclick",
		choice3:"onmouseclick",
		choice4:"onmouseover",
        answer: 2
    },       
    {
        question: "Which operator is used to assign a value to a variable?",
        choice1: "*", 
		choice2:"-",
		choice3:"=",
		choice4:"x",
        answer: 3
    }
  ];

  //CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
  questionCounter++;
  progress.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startQuiz();