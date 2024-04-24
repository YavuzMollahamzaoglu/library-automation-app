import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./AddBook.css";

const AddBook = () => {
  const [bookData, setBookData] = useState({
    bookName: '',
    authorId: '',
    body: '',
  });

  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:3008/author');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3008/book', bookData);
      console.log('Book added:', response.data);
      alert('Book added successfully');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('An error occurred while adding book');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 className='header'>Adding books to system</h1>
        <label className='book-label'>Book Name: 
        <TextField id="outlined-basic" label="" variant="outlined" 
          className='textfield-bookName' 
          type="text"
          name="bookName" 
          value={bookData.bookName} 
          onChange={handleInputChange}
          required
        />
        </label>
      </div>
      <div>
        <label className='author-label'>Author:
        <select className="author-dropdown" name="authorId" onChange={handleInputChange} required>
          <option value="">Select an author</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>{author.authorName}</option>
          ))}
        </select>
        </label> 
      </div>
      <div>
        <label className='body-label'>Body:
        <TextField className='textfield-body' multiline rows={4} id="standard-textarea" label="" variant="outlined" 
          type="text" 
          name="body" 
          value={bookData.body} 
          onChange={handleInputChange}
          required
        />
        </label> 
      </div>
      <Button className='add-button' variant="contained" type="submit">Add Book</Button>
    </form>
  );
};

export default AddBook;