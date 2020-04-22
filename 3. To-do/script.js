//a to do list 
/*when you enter a list item using the enter key or clicking the add item btn it adds to the list item
-it carries all the icons
    -when the check icon is clicked the strike through style is added to the text
    -when the edit icon is clicked the li element gets edited
    -when the delete icon is the whole list item is deleted
-the clear items btn deletes all li elements

also as you enter your input, log it to the local storage
when you strikethrough an item it reflects when you reload the page */

// --------------------------------------------
//get the required elements
const input = document.querySelector("input");
const addBtn = document.querySelector(".submit-btn");
const list = document.querySelector(".items");
const clearBtn = document.querySelector(".clear-btn");
const filter = document.querySelector(".filter-list");

//--------------------------------------------
//running event listeners
runEventListeners(); 

// -------------------------------------------
// function for the event listeners
function runEventListeners(){
    // to the document to bring all locally stored items to list
    document.addEventListener("DOMContentLoaded", getTheTodos);
    // to the "add item" button for click
    addBtn.addEventListener("click", createListItem);

    //to the input box for enter key
    input.addEventListener("keypress",checkKey);

    //to the ul element 
    list.addEventListener("click", performAction);

    // to the clear btn
    clearBtn.addEventListener("click", clearListItems);

    // to the filter list
    filter.addEventListener("keyup", search);
}

// -------------------------------------------
// functions

// -------------------------------------------
// to get the todo items from the LS
function getTheTodos(){
    // set a list of to-do items
    let todoItems;
    // check if the todoItems is already in the LS
    if (localStorage.getItem("todoItems") === null){
        // if it is not, make a new array
        todoItems = [];
    }else{
        // if it is, get the array from the LS
        todoItems = JSON.parse(localStorage.getItem("todoItems"));
    }

    // FOR THE LIST ITEMS THAT ARE STRIKED THROUGH!
    // initialize a variable
    let strikens;
    // check if the strikens is already in the LS
    if (localStorage.getItem("strikens") === null){
        // if it is not, make a new array
        strikens = [];
    }else{
        // if it is, get the array from the LS
        strikens = JSON.parse(localStorage.getItem("strikens"));
    }


    // for each element in the todos array, create a new element!
    todoItems.forEach(function(todoItem){
        let listItem= document.createElement("li");
    
        const textDiv = document.createElement("div");
        const text = document.createElement("p");
        const inputVal= document.createTextNode(todoItem);

        text.appendChild(inputVal);
        textDiv.appendChild(text);
    

        const iconDiv = document.createElement("div");
        iconDiv.classList.add("icons");

        const checkIcon = document.createElement("i");
        checkIcon.className = "far fa-check-circle";
    
        const editIcon = document.createElement("i");
        editIcon.className = "far fa-edit";
        
        const deleteIcon = document.createElement("i");
        deleteIcon.className="far fa-trash-alt";

        // check if the particular todo item was striked through before
        if (strikens.includes(todoItem)){
            text.className = "strike_through";
        }
        
        appendChildren(iconDiv,[checkIcon,editIcon,deleteIcon]);

        appendChildren(listItem,[textDiv,iconDiv]);
        list.appendChild(listItem);
    }) 
}
// create a list item
function createListItem(){
    // check if there's anything to add
    if (input.value==="") return;

    // else
    let listItem= document.createElement("li");
    
    const textDiv = document.createElement("div");
    const text = document.createElement("p");
    const inputVal= document.createTextNode(input.value);

    text.appendChild(inputVal);
    textDiv.appendChild(text);
 

    const iconDiv = document.createElement("div");
    iconDiv.classList.add("icons");

    const checkIcon = document.createElement("i");
    checkIcon.className = "far fa-check-circle";
   
    const editIcon = document.createElement("i");
    editIcon.className = "far fa-edit";
    
    const deleteIcon = document.createElement("i");
    deleteIcon.className="far fa-trash-alt";

    
    appendChildren(iconDiv,[checkIcon,editIcon,deleteIcon]);

    appendChildren(listItem,[textDiv,iconDiv]);

    // storage to LS
    storageToLocalStorage(input.value);

    list.appendChild(listItem);
    input.value = "";
}
// append multiple childs
function appendChildren(el,arr){
    arr.forEach(function(item){
        el.appendChild(item)
    })
}
//function for the enter key
function checkKey(key){
    if (key.keyCode===13){
        createListItem();
    }
}
// check which icon was clicked and act
function performAction(e){
    // if it is a check icon
    if (e.target.classList.contains("fa-check-circle")){
        strikeThrough(e);
    }
    // if it is an edit icon
    else if (e.target.classList.contains("fa-edit")){
        edit(e);
    }
    // if it is a delete icon
    else if (e.target.classList.contains("fa-trash-alt")){
        deleteGrandParent(e);
    }
}
//strike through an element
function strikeThrough(e){
    let text = e.target.parentElement.previousElementSibling.children[0];
    text.classList.toggle("strike_through");

    // reflect in LS
    reflectStrikeThroughInLS(e.target.parentElement.previousElementSibling.children[0]);
}
// to reflect the strike through in local storage
function reflectStrikeThroughInLS(text){
    // initialize a variable
     let strikens;
    // check if the strikens is already in the LS
    if (localStorage.getItem("strikens") === null){
        // if it is not, make a new array
        strikens = [];
    }else{
        // if it is, get the array from the LS
        strikens = JSON.parse(localStorage.getItem("strikens"));
    }
    
    if (text.classList.contains("strike_through")){
        // append the name of the striken element to the list
        strikens.push(text.textContent);
    }else{
        strikens.forEach(function(striken, index){
            if (text.textContent===striken){
                strikens.splice(index, 1)
            }
        })
    }

    localStorage.setItem("strikens", JSON.stringify(strikens));
    
}  
//put a text in the input box and delete its grandparent
function edit(e){
    if (input.value === ""){
        let text = e.target.parentElement.previousElementSibling.children[0];   
        input.value = text.textContent;
        // delete grand parent
        const grandParent = e.target.parentElement.parentElement;
        grandParent.remove();
        input.focus();
        // remove from LS
        removeFromLS(e.target.parentElement.parentElement);
        // remove from striken list
        removeStrikenList(e.target.parentElement.parentElement);
    }else{
        alert("Finish the existing entry!");
    }
}
//delete the grandparent
function deleteGrandParent(e){
    if (confirm("Are you sure you want to delete this task?")){
        const grandParent = e.target.parentElement.parentElement;
        grandParent.remove();
        input.focus();

        // remove from LS
        removeFromLS(e.target.parentElement.parentElement);
        // remove from striken list
        removeStrikenList(e.target.parentElement.parentElement);
    }
}
// remove from LS
function removeFromLS(listItem){
    // select the text of the deleted item
    let text = listItem.textContent;
    // initialize a variable
    let todoItems;
    // check if the todoItems is already in the LS
    if (localStorage.getItem("todoItems") === null){
        // if it is not, make a new array
        todoItems = [];
    }else{
        // if it is, get the array from the LS
        todoItems = JSON.parse(localStorage.getItem("todoItems"));
    }

    todoItems.forEach(function(todoItem, index){
        if (text===todoItem){
            todoItems.splice(index, 1)
        }
    })

    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    // console.log(todoItems);
    
}
// remove from striken list
function removeStrikenList(listItem){
    // select the text of the deleted item
    let text = listItem.textContent;
    // initialize a variable
    let strikens;
    // check if the todoItems is already in the LS
    if (localStorage.getItem("strikens") === null){
        // if it is not, make a new array
        striken = [];
    }else{
        // if it is, get the array from the LS
        strikens = JSON.parse(localStorage.getItem("strikens"));
    }

    strikens.forEach(function(striken, index){
        if (text===striken){
            strikens.splice(index, 1)
        }
    })

    localStorage.setItem("strikens", JSON.stringify(strikens));
    // console.log(strikens);
    
}

// clear all the list items
function clearListItems(){
    if (confirm("Are you sure you want to clear tasks?")){
        Array.from(list.children).forEach(function(item){
            item.remove();
        })   

        // clear in LS
        clearinLS();
    }
}
// clear in LS
function clearinLS(){
    localStorage.clear();
}
// the filter search
function search(e){
    let searchInput = e.target.value;
    // get all the list items
    let liTexts = list.querySelectorAll("div p")
    // loop through it and check 
    liTexts.forEach(function(text){
        // get the text of the list items
        textsOfList = text.textContent;
        // checks if the text contains the search input 
        let hasFilter = textsOfList.toLowerCase().includes(searchInput.toLowerCase())
        // if it does
        if (hasFilter){
            text.parentElement.parentElement.style.display ="grid";
        }
        // if it doesn't
        else{
            text.parentElement.parentElement.style.display ="none";
        }
    })
}
// store input to LS
function storageToLocalStorage(inputVal){
    // set a list of to-do items
    let todoItems;
    // check if the todoItems is already in the LS
    if (localStorage.getItem("todoItems") === null){
        // if it is not, make a new array
        todoItems = [];
    }else{
        // if it is, get the array from the LS
        todoItems = JSON.parse(localStorage.getItem("todoItems"));
    }
    
    // append items to the list
    todoItems.push(inputVal);
    // stored to local storage
    localStorage.setItem("todoItems", JSON.stringify(todoItems));

    // console.log(todoItems);
}