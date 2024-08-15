let quizData =[
    {
        question:" What is the captial of Italy ?",
        options : ["Rome", "Berlin", "Madrid", "Paris"],
        answer:" Rome"
    },
    {
        question:"Which Planet is Known as Red Planet",
        options:["venus" , "Mars"," jupiter", "sun"],
        answer:"Mars"
    },
    {
        question:"Which is the largest mammal in the world",
        options:["Elephant" , "Blue whale"," Giraffe", "tiger"],
        answer:"Blue whale"
    },
    {
        question:"In which year did Christopher Columbus reach Americas",
        options:["1492" , "1520"," 1607", "1620"],
        answer:"1492"
    },
    {
        question:"Who wrote Remeo and juilet",
        options: ["Charles Dickens","William Shakespeare","Jane Austin","Mark Twain"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the largest ocean on Earth",
        options: ["Atlantic Ocean","Indian Ocean","Southern Ocean","Pacific Ocean"],
        answer: "Pacific Ocean"
    }
];

let currentQuestionIndex =0;
let userAnswer=[];
let timeLeft = 59;
//variable define
const questionContainer= document.getElementById("Question-container");
const optionsContainer= document.getElementById("Options-container");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const ScoreContainer = document.getElementById("score-container");
const timmerDisplay= document.getElementById("timer");
//functions defines
nextButton.addEventListener("click",loadNextQuestion);
submitButton,addEventListener("click",ShowQuizResults);

  displayQuestion(); //display function called
    startTimer();    // timer function called
// function to update the time in the timer
  function updateTimer(){   
    if(timeLeft>0){
        const seconds = timeLeft;
        const displaySeconds = seconds<10 ? `0${seconds}`: seconds;         // variable to append the 0(zero) in the begning of the number
        timmerDisplay.textContent = displaySeconds;
        timeLeft--;
    }
    else{
        timmerDisplay.textContent="!!!";
        ShowQuizResults();
    }
  }
  // function to start the timer
  function startTimer(){
    updateTimer();
    timer =setInterval(updateTimer,1000);
  }

  function loadNextQuestion(){
    if(currentQuestionIndex < quizData.length-1){
        currentQuestionIndex++;
        displayQuestion();
    }
    else{
        ShowQuizResults();
    }
  }
  

  function selectAnswer(answer){
    const optionButton=document.querySelectorAll(".quiz-option");
    optionButton.forEach((button)=>button.classList.remove("selected"));
    const selectedOption= optionsContainer.querySelector(
        `.quiz-option[data-option="${answer}"]`
    );
    selectedOption.classList.add("selected");
    userAnswer[currentQuestionIndex]=answer;
  }

function displayQuestion(){
    const currentQuestion =quizData[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";
    const optionLetter=["A","B","C","D"]; 

    currentQuestion.options.forEach((option,index)=>{
        const optionContainer = document.createElement("div");
        optionContainer.classList.add("quiz-card");

        const optionLabel = document.createElement("span");
        optionLabel.classList.add("option-label");
        optionLabel.textContent = optionLetter[index];
        optionContainer.append(optionLabel);

        const optionButton= document.createElement("button");
        optionButton.classList.add("quiz-option");
        optionButton.textContent = option;
        
        optionButton.setAttribute("data-option" , option);
        optionContainer.addEventListener("click",()=>selectAnswer(option));

        optionContainer.appendChild(optionButton);
        optionsContainer.appendChild(optionContainer);
    });
}

function evaluateUserAnswer(){
    let score = 0;
    quizData.forEach((question,index)=>{
        if(userAnswer[index]===question.answer){
            score+= 10;
        }
    });
    return score
}

function ShowQuizResults(){
    const userScore = evaluateUserAnswer();
    ScoreContainer.textContent=`your score : ${userScore} out of ${quizData.length*10}`;
}
