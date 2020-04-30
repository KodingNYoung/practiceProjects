//create Book class
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
} 

// create UI class
class UI{
    // create a table row and insert book
    createTableRow(book){
        // create tr element
        const tr = document.createElement("tr");

        // insert texts
        tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="red">X</a></td>`

        // append to the table body
        document.getElementById("table-body").appendChild(tr);
    }

    // clear the fields
    clearInput(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }
    // show alert
    showAlert(message, className){
        // create div for the message
        const alertDiv = document.createElement("div");

        // add classes
        alertDiv.className = `alert ${className}`;
        
        // append text
        alertDiv.appendChild(document.createTextNode(message));
        // get parent and sibling
        
        const container = document.querySelector(".container"),
              form = document.querySelector("#form-container");
        
        // insert alert in parent above sibling
        container.insertBefore(alertDiv, form);
        
        // remove div after 3 secs
        setTimeout(function(){
            alertDiv.remove()
        },3000);
    }

    deleteRow(target){
        if(target.className === "red" && confirm("Are you sure?")){
            // remove grand parent
            target.parentNode.parentNode.remove();
        }
    }
}


// add event listeners
// to the form for submit
document.getElementById("form-container").addEventListener("submit", function(e){
    // remove alert message
    if(document.querySelector(".alert")){
    document.querySelector(".alert").remove();
    }

    // get form values
    const title = document.getElementById("title").value,
          author = document.getElementById("author").value,
          isbn = document.getElementById("isbn").value;
    
    // create a Book object with form values as parameters
    const book = new Book(title, author, isbn);

    // create an instance of the UI class
    const ui = new UI();

    if (title ==="" || author ==="" || isbn ===""){
        // show error message
        ui.showAlert("Please, fill all fields.","error");
    }else{
        // create a table row and insert book
        ui.createTableRow(book);

        // clear input fields
        ui.clearInput();

        // show success message
        ui.showAlert("Book added!","success");
    }


    e.preventDefault();
})

// to the table body for delete action
document.getElementById("table-body").addEventListener("click", function(e){
    const target = e.target;

    // instantiate UI
    const ui = new UI();

    // delete row
    ui.deleteRow(target);

    // show success message
    ui.showAlert('Book deleted!','success');

    e.preventDefault();
});
