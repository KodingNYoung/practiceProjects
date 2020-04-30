// game parameters
let max = Math.floor(Math.random()* (100)),
    min = getMinValue(max),
    correctNumber = pickCorrectNumber(),
    guessesRemaining = 3;

// assign min and max 
document.querySelector(".min").textContent= min;
document.querySelector(".max").textContent= max;

// UI variables
const btn = document.getElementById("submit-btn"),
    resultMessage = document.querySelector(".result-message"),
    guessBox= document.getElementById("guess-value");
    game = document.querySelector(".game");

guessBox.focus();
// ------------------------------------------------------
// adding event listener
// to btn
btn.addEventListener("click", checkTheNumberAndGiveResults);
// to the whole game and delegate it to the button with class reload
game.addEventListener("mouseup", function(e){
    if (e.target.className.includes("reload")){
        reloadPage();
    }  
})
guessBox.addEventListener("keyup", function(key){
    if (key.keyCode=== 13){
        checkTheNumberAndGiveResults();
    }
})




// function
function checkTheNumberAndGiveResults(){
    // get the guess
    const userGuess = parseInt(guessBox.value);
    

    // if guess is a number
    if (!(isNaN(userGuess)) && (userGuess<= max) && (userGuess>= min)){
        guessesRemaining -= 1;
        if (userGuess=== correctNumber){
            gameOver(true, "YOU WIN, CONGRATS");
        }else{
            // loss
            // check if the guesses remaining
            if (guessesRemaining === 0){
               gameOver(false,`YOU LOST! The number was ${correctNumber}`);
            }else{
                showMessage(`Wrong guess, you have ${guessesRemaining} guess(es) remaining`,"red");
                guessBox.value ="";
            }
        }
    }else{
        showMessage(`Enter a valid number. Number should be between ${min} and ${max}`, "red")
        guessBox.value ="";        
    }
    guessBox.focus();
}
// game over
function gameOver(win,msg){
    let color;
    win === true? color = 'green': color = 'red';
    // win
    showMessage(msg, color);
    // disable the input box
    guessBox.disabled = true;
    // refill the guesses remaining
    guessesRemaining = 3;
    // change the button to reload button 
    changeButton();
}
// show message
function showMessage(msg, color){
    resultMessage.textContent = msg;
    resultMessage.style.color = color;
    guessBox.style.borderColor = color;
}
// change the button
function changeButton(){
    btn.value = "Reload Game";
    btn.className += "reload ";
}
// reload the page
function reloadPage(){
    document.location.reload();
}
function getMinValue(max){
    let num = Math.floor(Math.random()* (max-5));
    while (max-num > 10 || num < 0){
        num = Math.floor(Math.random()* (max-5));
    }  
    return num;
} 
function pickCorrectNumber(){
    let num;
    num = Math.floor(Math.random()* (max+1));
    while (num < min ){
        num = Math.floor(Math.random()* (max+1));
    }  
    return num;
}
console.log(correctNumber);