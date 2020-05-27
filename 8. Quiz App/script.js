// get the start quiz button
const startBtn = document.getElementById("start-btn");
// quiz container div
const quizPage = document.getElementById("quiz-container");
// restart quiz button
const restartBtn = document.querySelector(".result-modal button");

// variables
let quizNumber = 0,
    questions, questionLength, participant;

// function to load all event listeners
const loadListener = () => {   
    // event listener for the start button
    startBtn.addEventListener("click", moveToQuiz);

    // eventlistener on the quiz conatiner for all buttons
    quizPage.addEventListener("click", handleQuizAction);

    // eventlistener for the restart quiz
    restartBtn.addEventListener("click", goToLandingPage);
}

// generate random number
const randomNum = (limit) => {
    let num;

    num = Math.floor(Math.random() * (limit));

    return num
}
const shuffle = (array) => {
    // initialize a variable to the length of the array , a rndom 
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex > 0){
        // get a random index between 0 and that current index
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // swap the values at the indexes
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue; 
    }

    return array;
}
// load the question to DOM
const loadToDOM = (questionOBJ) => {
    // get values
    const instruction = questionOBJ.instruction;
    const question = questionOBJ.question;
    let options = questionOBJ.options;
    
    // increment the quiz number by 1
    quizNumber++;

    // get UI elements
    const instructionUI = document.querySelector("#instructions") ;
    const questionUI = document.querySelector("#question-text");
    const optionsUI = document.querySelectorAll(".option");
    const quizNumberUI = document.querySelector(".questions");
    const questionLengthUI = document.querySelector(".question-length");

    // selecting the options to be displayed
    // get a random number above zero and below thelength of the option array
    let num = Math.ceil(Math.random() * (options.length-1));

    // splice off the option at the index of that number
    options.splice(num, 1);

    // load the instruction, question and options to the DOM
    instructionUI.textContent = instruction;
    questionUI.textContent = question;
    quizNumberUI.textContent = quizNumber;
    questionLengthUI.textContent = questionLength;
    // to load options
    // first shuffle the options
    options = shuffle(options);
    
    // load options in to the DOM
    optionsUI.forEach((optionUI, index) => {
        optionUI.children[0].value = options[index].score;
        optionUI.children[1].textContent = options[index].value;
    })
}


// get the quiz questions and load it into the DOM
const loadQuizQuestions = async () => {
    // get the questions
    const response = await fetch("questions.json");
    questions = await response.json();

    // get a random number
    let num = randomNum(questions.length)

    // question length
    questionLength = questions.length;

    // load question to the DOM
    loadToDOM(questions[num]);
    questions.splice(num, 1);
}
const loadUser = (participant) => {
    document.getElementById("score-num").textContent = participant.score * 10;
}
//event handler for the start quiz btn
const moveToQuiz = (e) => {
    // check the name inputted
    let name;
    if (!document.querySelector("#name").value){
        alert("Please enter a name!");
        return
    }else{
        name = document.querySelector("#name").value;
    }

    // create a participant object
    participant = new Participant(name);

    // make input to be nonthing
    document.querySelector("#name").value = "";

    // move the quiz page back to translate of 0
    quizPage.style.transition = "transform 0.5s ease";
    quizPage.style.transform = "translateX(0)";

    // load quiz to DOM
    loadQuizQuestions();

    // load user to DOM
    loadUser(participant);

}
const loadNextQuiz = () => {
    // reset the colors of the options
    resetColors();
    
    //update score
    loadUser(participant);
    
    //update quiz number, instruction, question, options
    // get a random number
    let num = randomNum(questions.length)


    // load question to the DOM
    loadToDOM(questions[num]);
    questions.splice(num, 1);
    
    
    //check if it's the last quesion and remove the next button
    if (questions.length === 0){
        // display the next question btn to be none
        document.getElementById("next-btn").style.display = "none";
    }
}

// reset the options' colors
const resetColors = () => {
    const optionsUI = document.querySelectorAll(".option");
    
    optionsUI.forEach((optionUI) => {
        optionUI.children[1].classList.remove("green");
        optionUI.children[1].classList.remove("red");
        optionUI.children[1].classList.remove("selected");
        optionUI.children[0].checked = false;

    })
}
// calculate score and update it to the participant
const calculateScoreAndUpdate = () => {
    // get the all the options div, save the checked on and the correct one
    let checkedOption, correctOption;

    const optionsUI = document.querySelectorAll(".option");

    // loop through all the options and get the checked and correct one.
    optionsUI.forEach((optionUI) => {
        if (optionUI.children[0].value === "1") {
            correctOption = optionUI;
        } 
        if(optionUI.children[0].checked === true) {
            checkedOption = optionUI;
        }
    })
    
    // if the checked on is equal to the correct on increase score
    // if not background color = red;
    if (checkedOption === correctOption){
        participant.score += 1;
    }else if(!checkedOption){
        participant.score += 0;
    }else {
        participant.score += 0;
        checkedOption.children[1].classList.add("red");
    }
    correctOption.children[1].classList.add("green");
}
// show result modal
const showResultModal = () => {
    document.querySelector(".result-page").style.display = "flex";

        setTimeout(() => {
            document.querySelector(".result-modal").style.transform = "scale(1)";
        },100)
}

// design modal
const designModal = () => {
    // convert participant's score to percentage
    const scorePercentage = (parseFloat(participant.score) *100)/5
    
    // insert all figures
    document.querySelector(".username").textContent = participant.name.toUpperCase();
    document.querySelector(".userscore").textContent = scorePercentage.toFixed(0) + "%";
    document.querySelector(".quiz-number").textContent = quizNumber + " question(s)";
    document.querySelector(".question-length").textContent = questionLength;
    document.querySelector(".quiz-score").textContent = participant.score;

    // add colors and required gifs
    if (scorePercentage <= 30) {
        document.querySelector(".userscore").parentElement.style.color = "rgb(233, 7, 7)";
        document.querySelector(".quiz-score").style.color = "rgb(233, 7, 7)";
        document.querySelector(".result-modal img").src = "nawa.gif";
    }else if (scorePercentage > 30 && scorePercentage < 80){
        document.querySelector(".userscore").parentElement.style.color = "rgba(1, 1, 59, 0.788)";
        document.querySelector(".quiz-score").style.color = "rgba(1, 1, 59, 0.788)";
        document.querySelector(".result-modal img").src = "youtried.gif";
    }else{
        document.querySelector(".userscore").parentElement.style.color = "green";
        document.querySelector(".quiz-score").style.color = "green";
        document.querySelector(".result-modal img").src = "source.gif";
    }
}

// event handler for the quiz page
const handleQuizAction = (e) => {
    // when an option is clicked
    if (e.target.className === "option"){
        // tick that option
        e.target.children[0].checked = true;

        // add a class of selected to the label of selected one
        e.target.children[1].classList.add("selected");

    }else if (e.target.id === "quit-btn"){
        // if its a quit button return to start up page
        location.reload();
    }else if(e.target.id === "submit-btn"){
        calculateScoreAndUpdate();

        // load score to DOM
        loadUser(participant);
        
        // design modal
        designModal();

        // show result modal
        setTimeout(showResultModal, 500);
        
    }else if(e.target.id === "next-btn"){
        calculateScoreAndUpdate();

        setTimeout(loadNextQuiz, 500);

    }
}

const goToLandingPage = () => {
    // close modal
    
    document.querySelector(".result-modal").style.transform = "scale(0)";
    setTimeout(() => {
        location.reload();        
    },100)
}

loadListener();