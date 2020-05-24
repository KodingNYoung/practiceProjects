// get the start quiz button
const startBtn = document.getElementById("start-btn");
// quiz container div
const quizPage = document.getElementById("quiz-container");
// restart quiz button
const restartBtn = document.querySelector(".result-modal button");



//event handler for the start quiz btn
const moveToQuiz = (e) => {
    // move the quiz page back to translate of 0
    quizPage.style.transition = "transform 0.5s ease";
    quizPage.style.transform = "translateX(0)";

    // create a participant object
    const participant = new Participant();

    
    e.preventDefault();
}

// event handler for the quiz page
const handleQuizAction = (e) => {
    // when an option is clicked
    if (e.target.className === "option"){
        // tick that option
        e.target.children[0].checked = true;

        // then analyse answer
        // analyseAnswer(e.target.children[0]);
    }else if (e.target.id === "quit-btn"){
        // if its a quit button return to start up page
        
        quizPage.style.transform = "translateX(-100%)";
    }else if(e.target.id = "next-question-btn"){
        document.querySelector(".result-page").style.display = "flex";

        setTimeout(() => {
            document.querySelector(".result-modal").style.transform = "scale(1)";
        },100)
    }
    console.log(e.target)
}

const goToLandingPage = () => {
    // close modal
    
    document.querySelector(".result-modal").style.transform = "scale(0)";
    setTimeout(() => {
        document.querySelector(".result-page").style.display = "none";
        quizPage.style.transition = "none";
        quizPage.style.transform = "translateX(-100%)";        
    },100)
}

// event listener for the start button
startBtn.addEventListener("click", moveToQuiz);

// eventlistener on the quiz conatiner for all buttons
quizPage.addEventListener("click", handleQuizAction);

// eventlistener for the restart quiz
restartBtn.addEventListener("click", goToLandingPage);

