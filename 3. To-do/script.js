//a to do list 
/*when you enter a list item using the enter key or clicking the add item btn it adds to the list item
-it carries all the icons
    -when the check icon is clicked the strike through style is added to the text
    -when the edit icon is clicked the li element gets edited
    -when the delete icon is the whole list item is deleted
-the clear items btn deletes all li elements*/

//get the required elements
let input = document.querySelector("input");
const addBtn = document.querySelector(".submit-btn");
const list = document.querySelector(".items");
const checkIcons = Array.from(document.querySelectorAll(".fa-check-circle"));
const editIcons = Array.from(document.querySelectorAll(".fa-edit"));
const deleteIcons = Array.from(document.querySelectorAll(".fa-trash-alt"))
const clearBtn = document.querySelector(".clear-btn");

// functions
// add multiple class to an item at once
function addClasses(el,arr){
    for (let i=0; i<arr.length; i++){
        el.classList.add(arr[i]);
    }
}
// append multiple childs
function appendChildren(el,arr){
    for (let i=0; i<arr.length; i++){
        el.appendChild(arr[i]);
    }
}
// create a list item
function createListItem(){
    let listItem= document.createElement("li");
    
    const textDiv = document.createElement("div");
    const text = document.createElement("p");
    const inputVal= document.createTextNode(input.value);

    text.appendChild(inputVal);
    textDiv.appendChild(text);
 

    const iconDiv = document.createElement("div");
    iconDiv.classList.add("icons");

    const checkIcon = document.createElement("i");
    addClasses(checkIcon,["far","fa-check-circle"]);
    const editIcon = document.createElement("i");
    addClasses(editIcon,["far","fa-edit"]);
    const deleteIcon = document.createElement("i");
    addClasses(deleteIcon,["far","fa-trash-alt"]);
    
    appendChildren(iconDiv,[checkIcon,editIcon,deleteIcon]);

    appendChildren(listItem,[textDiv,iconDiv]);

    checkIcons.push(checkIcon);
    editIcons.push(editIcon);
    deleteIcons.push(deleteIcon);
    list.appendChild(listItem);
    input.value = "";

    // run the activate icons function everytime a new element is added
    activateIcons();
}
// when the check item is clicked set a strike through property
function strikeThrough(e){
    let text = e.target.parentElement.previousElementSibling.children[0];
    text.classList.toggle("strike_through");
}
//when the edit icon is clicked, delete the grand parent element of that edit icon and put the text in the p tag into the input box #editting
function edit(e){
    let text = e.target.parentElement.previousElementSibling.children[0];
    const grandParent = e.target.parentElement.parentElement;
    input.value = text.innerText;
    grandParent.remove();
    input.focus();
}
//when the delete icon is clicked, delete grand parent element of the delete icon
function deleteGrandParent(e){
    const grandParent = e.target.parentElement.parentElement;
    grandParent.remove();
    input.focus();
}

// when you click on the clear items btn, delete all li elements under the ul element.
function clearListItems(e){
    let elements = Array.from(e.target.previousElementSibling.children);
    elements.forEach(function(li){
        li.remove();
    })   
}
//functionfor the enter key
function checkKey(key){
    if (input.value!=="" && key.keyCode===13){
        createListItem();
    }
}
// event listeners

// to the "add item" button for click
addBtn.addEventListener("click",function(){
    if (input.value==="") return;
    createListItem();
});
//to the input box for enter key
input.addEventListener("keypress",checkKey)

//function to add event listeners to the check icon, edit icon and delete icon
function activateIcons(){
    // for check icons
    checkIcons.forEach(function(checkIcon){
        checkIcon.addEventListener("click",strikeThrough);
    })  
    editIcons.forEach(function(editIcon){
        editIcon.addEventListener("click", edit);
    })
    deleteIcons.forEach(function(deleteIcon){
        deleteIcon.addEventListener("click", deleteGrandParent);
    })
}
// for the clear button
clearBtn.addEventListener("click", clearListItems)
activateIcons();
