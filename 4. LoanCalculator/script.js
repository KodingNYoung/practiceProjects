// get the required elements
const btn = document.querySelector("input[type=button]");


// -------------------------------------------------
// event listeners
// listen for click on the btn
btn.addEventListener("click", function(){
    //hide the results
    document.querySelector(".actual-output").style.display= "none";
   
    // show preloader
    document.querySelector(".preloader").style.display = "block";
    
    setTimeout(calculateLoan, 3000);
});



// functions
// to calculate loan
function calculateLoan(){
    //get all input values
    const amount = document.querySelector("#loan-amount").value;
    const interest = document.querySelector("#Interest").value;
    const timeInYears = document.querySelector("#Years").value;
    // output space
    const monthlyPayment = document.querySelector("#monthly-payment");
    const totalPayment = document.querySelector("#total-payment");
    const totalInterest = document.querySelector("#total-interest");

    // get the principal value, calculated interest as decimal
    const oldPrincipal = parseFloat(amount);
    const nominalInterest = parseFloat(interest)/ 100;
    const interestPerMonth = parseFloat(nominalInterest)/ 12;
    const numberOfMonths = parseFloat(timeInYears) * 12;
    const multiplyingFactor =  Math.pow(1+interestPerMonth, numberOfMonths);

    // compute for monthly payments
    const monthlyPaymentValue =  (oldPrincipal * multiplyingFactor * interestPerMonth)/(multiplyingFactor - 1);

     // hide preloader
     document.querySelector(".preloader").style.display = "none";

    if (isFinite(monthlyPaymentValue)){
        monthlyPayment.value = monthlyPaymentValue.toFixed(2);
        totalPayment.value = (monthlyPaymentValue* numberOfMonths).toFixed(2);
        totalInterest.value = ((monthlyPaymentValue* numberOfMonths)-oldPrincipal).toFixed(2);
        //show the results
        document.querySelector(".actual-output").style.display= "block";
    }else{
        //create error message
        createErrorMessage();
    }

}
// create error message
function createErrorMessage(){
    // create div element
    const errorMessage = document.createElement("div");
    errorMessage.id = "message-div";
    errorMessage.textContent = "Check the numbers and try again!";

    // insert the errormessage before the heading
    document.querySelector(".input-area").insertBefore(errorMessage, document.querySelector(".heading"));


    // remove after 2 secs
    setTimeout(hideErrorMessage, 2000);
}
//hide error message
function hideErrorMessage(){
   document.getElementById("message-div").remove();
}