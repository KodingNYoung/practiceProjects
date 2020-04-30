// book constructor
function Book(title, author, isbn){
    this.title = title,
    this.author = author,
    this.isbn = isbn;
}

// UI constructor
function UI(){}

// add book to table method
UI.prototype.addBookToTable= function (book){
    // get the table body
    const tbody = document.getElementById("table-body");
    
    // create table row element
    const row = document.createElement("tr");
    
    // structure it's inner HTML
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a class="red" href="#">X</a></td>
    `;

    // append row to table body
    tbody.appendChild(row);
}
// clear the field 
UI.prototype.clearFields= function (){
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}
// show alerts
UI.prototype.showAlert = function (message, className){
    // grab parent and form
    const container = document.querySelector(".container"),
          form = document.querySelector("#form-container");
       
    // create div for message
    const alertDiv = document.createElement("div");

    // add classes
    alertDiv.className = `alert ${className}`;
    
    // insert text
    alertDiv.textContent = message;

    // append it to the parent
    container.insertBefore(alertDiv, form);

    // remove div after 3 secs
    setTimeout(function(){
        alertDiv.remove()
    }, 3000);
}
// remove element
UI.prototype.removeElement = function (target){
    if (target.className === "red" && (confirm("Are you sure?"))){
        target.parentElement.parentElement.remove();

        // delete from LS
        store.deleteBook(target.parentElement.previousElementSibling.textContent);
        
        // show alert
        this.showAlert("Book removed!", "success");
    }else{
        return
    }
}

// storage constructor
function Store(){}

// instantiate the Store constructor
const store = new Store();

// get book from LS
Store.prototype.getBooks = function(){
    let books;
    // get book from LS
    if (localStorage.getItem("books") === null){
        books = [];
    }else{
        books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
}

// display on load
Store.prototype.displayBooks = function(){
    // get book
    let books = store.getBooks();

    books.forEach(function(book){
        // create a UI object
        const ui = new UI();
        
        // add book to table
        ui.addBookToTable(book);
    })
}


// add book
Store.prototype.addBook = function(book){
    // get book
    let books = store.getBooks();

    // push the new book
    books.push(book);

    // save books to LS
    localStorage.setItem("books",JSON.stringify(books));
}
// delete book
Store.prototype.deleteBook = function (isbn){
    // get book
    let books = store.getBooks();

    books.forEach(function(book,index){
        if(book.isbn === isbn){
            books.splice(index,1);
        }
    })
    // save books to LS
    localStorage.setItem("books",JSON.stringify(books));
}

// add event listeners
// to document on load
document.addEventListener("DOMContentLoaded", store.displayBooks)
// to the form for submission
document.getElementById("form-container").addEventListener("submit",function(e){
    // get the input values
    const title = document.getElementById("title").value,
          author = document.getElementById("author").value,
          isbn = document.getElementById("isbn").value;

    // create a Book object with this values
    const book = new Book(title,author,isbn);

    // create a UI object
    const ui = new UI();
    

    if (title === "" || author === "" || isbn=== ""){
        // show alert
         ui.showAlert("Fill all fields!", "error");       
    }else{
        // show alert
        ui.showAlert("Book added!", "success");
        // add book to table
        ui.addBookToTable(book);

        // add book object to LS
        store.addBook(book);

        // clear the input field
        ui.clearFields();
    }
    

    e.preventDefault();
})

// to the delete for delete
document.querySelector("#table-body").addEventListener("click",function(e){
    // get the clicked entity
    const target = e.target;
    
    // instantiate ui
    const ui = new UI();
    
    // remove element
    ui.removeElement(target);
})