//a calculator
//when you press a button it reflect
//when you press the =,<-,c, and copy button, 
//they carry out the given opeartion

//get the input
//set its initial value to 0
//when you press a button its value replaces the 0 
//and succeeding value fall at the back
const display = document.getElementsByTagName("input")[0];
const buttons = document.querySelector(".buttons");

// setting the initial value of the input to 0


//when you press a button it gets the value from the 
// button and displays it
function getValue(button){
    buttonValue = button.textContent;
    // console.log(buttonValue)
    return buttonValue
}
// function to solve the expression
function solveTheExpression(expression){
    if (expression.includes("*")){
        expression=expression.split("*")
        return Number(expression[0]) * Number(expression[1]);
    }else if (expression.includes("+")){
        expression=expression.split("+")
        return Number(expression[0]) + Number(expression[1]);
    }else if (expression.includes("-")){
        expression=expression.split("-")
        return Number(expression[0]) - Number(expression[1]);
    }else if (expression.includes("/")){
        expression=expression.split("/")
        return Number(expression[0]) / Number(expression[1]);
    }else{
        return expression;
    }
}
// assign what was pressed to an operation
function assignOperation(display, clickedButton, classOfButton){
    if (classOfButton.includes("numbers")){
        display.value += getValue(clickedButton);
    }else if(classOfButton.includes("operators")){
        if(!(display.value.includes("+")||display.value.includes("-")||display.value.includes("*")||display.value.includes("/"))){
            display.value += getValue(clickedButton);
        }else{
            alert("You can't use 2 operators at once, press equal to!");
        }
    }else if (classOfButton.includes("backspace")){
        display.value = display.value.slice(0,-1);
    }else if(classOfButton.includes("clear")){
        display.value="";
    }else if(classOfButton.includes("equal")){
        display.value = solveTheExpression(display.value);
    }else{
        if(!(display.value.includes("+")||display.value.includes("-")||display.value.includes("*")||display.value.includes("/"))){
            display.select();
            display.setSelectionRange(0,9999);
            document.execCommand("copy");
            alert("You have copied the answer!");
        }else{
            alert("Press equal to get your answer!");
        }
    }

}

//add an event listener to the buttons class
// get the target buttons
// select them by class and assign their operation
buttons.addEventListener("click", function(event){
    var clickedButton = event.target.closest("button");
    var classOfButton= Array.from(clickedButton.classList);

    assignOperation(display, clickedButton, classOfButton);
})
