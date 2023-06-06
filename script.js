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
