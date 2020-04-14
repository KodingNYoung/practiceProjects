var count= document.querySelector(".count");
var increase = document.querySelector(".add");
var decrease = document.querySelector(".subtract");
var count_value = Number(count.innerText);

// checks the value oof the count and give the corresponding
//color
function checkValueToColor(countValue, count){
    if (countValue < 0){
        count.style.color ="red";
    }else if (countValue > 0){
        count.style.color ="green";
    }else{
        count.style.color ="black";
    }
}
function checkAndGiveColor(count, count_value){
    count.innerText = count_value;
    checkValueToColor(count.innerText, count);
}
//when the increase button is pressed increase the .count
increase.addEventListener("click", function increaseCount(){
    count_value += 1 ;
    checkAndGiveColor(count, count_value)
})
//when the decrease button is pressed decrease the .count
decrease.addEventListener("click", function decreaseCount(){
    count_value -= 1 ;
    checkAndGiveColor(count, count_value)
})