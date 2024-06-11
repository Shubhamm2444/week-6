const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB database (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define book schema
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

const Book = mongoose.model('Book', BookSchema);

// Middleware for parsing request body (mandatory for POST and PUT requests)
app.use(bodyParser.json());

// API endpoint to add a book (POST request)
app.post('/api/books', async (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newBook = await new Book({ title, author }).save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API endpoint to delete a book by ID (DELETE request)
app.delete('/api/books/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API endpoint to update a book by ID (PUT request)
app.put('/api/books/:id', async (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }

  const update = { title, author };

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, update, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));


** Explanation:
Dependencies: The code uses express, mongoose, and body-parser.
Database Connection: Establishes connection to a MongoDB database named "library". Replace the connection string with your actual database details.
Book Schema: Defines the model for Book documents with properties title and author.
Middleware: The bodyParser.json() middleware is used to parse JSON data from the request body.
API Endpoints:
POST /api/books: This endpoint allows adding a new book. It expects a JSON body containing title and author. It validates the request data and saves the new book to the database.
**DELETE /api/books/:id
