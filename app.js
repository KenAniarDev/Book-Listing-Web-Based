// Book Constructor

function Book(title, author, isbn) {
    this.title  = title;
    this.author = author;
    this.isbn   = isbn;
}


// UI Constructor

function UI() {

}

// Add Book To List To Prototype

UI.prototype.addBookToList = function(book) {

    // listUI
    const list = document.getElementById('book-list');

    // Create Element Object
    const row = document.createElement('tr');

    // Insert Cols
    row.innerHTML = `
        <td> ${book.title} </td>
        <td> ${book.author} </td>
        <td> ${book.isbn} </td>
        <td><a href="#" class="delete">X</a></td>
    `;

    // Append Row to List
    list.appendChild(row);
}

// Show Alert 

UI.prototype.showAlert = function(message, className) {
    
    // Create DivAlert
    const div = document.createElement('div');

    // Add className
    div.className = `alert ${className}`;

    // Add Text
    div.appendChild(document.createTextNode(message));

    // Get Parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    // Insert Alert
    container.insertBefore(div, form);

    // Timeout After 3 Seconds
    setTimeout(function() {
        document.querySelector('.alert').remove();
    },3000);
}

// UI Delete Book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete')  {
        target.parentElement.parentElement.remove();
    }
}

// UI Clear Fields to Prototype

UI.prototype.clearFields = function () {

    document.getElementById('title').value  = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value   = '';

}

// Event Listener for Add Book

document.getElementById('book-form').addEventListener('submit', function(e) {

    // Get Form Values
    const title  = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn   = document.getElementById('isbn').value;

    // Instantiate Book      
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(title === '' || author === '' || isbn === '') {
        
        // Error Alert
        ui.showAlert('Please fill in all fields', 'error');

    }else {

        // Add Book To List
        ui.addBookToList(book);

        // Show Success
        ui.showAlert('Book Added', 'success');

        // Clear Fields
        ui.clearFields();

    }

    e.preventDefault();
});

// Event Listener for Delete Book
document.getElementById('book-list').addEventListener('click', function(e) {
    
    // Instantiate UI
    const ui = new UI();

    // Delete Booklist
    ui.deleteBook(e.target);

    // Show Delete
    ui.showAlert('Book Removed!', 'success');
});
