// Retrieve saved book collection from localStorage, if available
const savedCollection = localStorage.getItem("bookCollection");
let bookCollection = savedCollection ? JSON.parse(savedCollection) : [];

// Function to render the book list
function renderBookList() {
    const bookListElement = document.getElementById("bookList");
    bookListElement.innerHTML = "";

    bookCollection.forEach((book, index) => {
        const li = document.createElement("li");
        li.textContent = `${book.title} - ${book.author}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            removeBook(index);
        });

        li.appendChild(removeButton);
        bookListElement.appendChild(li);
    });
}

// Function to add a new book to the collection
function addBook(title, author) {
    const newBook = { title, author };
    bookCollection.push(newBook);
    localStorage.setItem("bookCollection", JSON.stringify(bookCollection));
    renderBookList();
}

// Function to remove a book from the collection
function removeBook(index) {
    bookCollection.splice(index, 1);
    localStorage.setItem("bookCollection", JSON.stringify(bookCollection));
    renderBookList();
}

// Event handler for the form submission
document
    .getElementById("addBookForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const titleInput = document.getElementById("title");
        const authorInput = document.getElementById("author");
        const title = titleInput.value;
        const author = authorInput.value;

        addBook(title, author);

        // Reset form inputs
        titleInput.value = "";
        authorInput.value = "";
    });

renderBookList(); // Initial rendering
