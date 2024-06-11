const books = [
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
  { title: "Pride and Prejudice", author: "Jane Austen" },
  { title: "To Kill a Mockingbird", author: "Harper Lee" }
];

function searchBooks() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const results = document.getElementById("results");
  results.innerHTML = "";

  for (const book of books) {
    if (book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm)) {
      const result = document.createElement("p");
      result.textContent = `${book.title} by ${book.author}`;
      results.appendChild(result);
    }
  }

  if (results.innerHTML === "") {
    results.innerHTML = "No results found.";
  }
}


These are just basic examples, and you can extend them with additional features like:

User accounts and login systems
Borrowing and returning functionality
Adding different book categories
Implementing a database to store book information
