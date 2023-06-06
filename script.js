class BookCollection {
  constructor() {
    this.bookListElement = document.getElementById("bookList");
    this.addBookForm = document.getElementById("addBookForm");
    this.titleInput = document.getElementById("title");
    this.authorInput = document.getElementById("author");
    this.bookCollection = [];
    this.loadFromLocalStorage();
    this.addEventListeners();
    this.renderBookList();
  }

  loadFromLocalStorage() {
    const savedCollection = localStorage.getItem("bookCollection");
    this.bookCollection = savedCollection ? JSON.parse(savedCollection) : [];
  }

  saveToLocalStorage() {
    localStorage.setItem("bookCollection", JSON.stringify(this.bookCollection));
  }

  removeBook(index) {
    this.bookCollection.splice(index, 1);
    this.saveToLocalStorage();
    this.renderBookList();
  }

  renderBookList() {
    this.bookListElement.innerHTML = "";
    this.bookCollection.forEach((book, index) => {
      const li = document.createElement("li");
      li.className = "single-book";
      li.textContent = `${book.title} - ${book.author}`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.className = "remove-btn";
      removeButton.addEventListener("click", () => {
        this.removeBook(index);
      });

      li.appendChild(removeButton);
      this.bookListElement.appendChild(li);
    });
  }

  addBook(title, author) {
    const newBook = { title, author };
    this.bookCollection.push(newBook);
    this.saveToLocalStorage();
    this.renderBookList();
  }

  addEventListeners() {
    this.addBookForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = this.titleInput.value;
      const author = this.authorInput.value;
      this.addBook(title, author);
      this.titleInput.value = "";
      this.authorInput.value = "";
    });
  }
}
BookCollection();
