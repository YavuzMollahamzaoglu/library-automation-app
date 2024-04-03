import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./AddBook.css";

const AddBook = () => {
  const [bookData, setBookData] = useState({
    bookName: '',
    body: '',
    author: '',
  });

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
        <label className='book-label'>Book Name:</label> 
        <TextField id="outlined-basic" label="" variant="outlined" 
          className='textfield-bookName' 
          type="text"
          name="bookName" 
          value={bookData.bookName} 
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label className='book-label'>Body:</label> 
        <TextField className='textfield-body' multiline rows={4} id="standard-textarea" label="" variant="outlined" 
          type="text" 
          name="body" 
          value={bookData.body} 
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label className='book-label'>Author:</label> 
        <TextField  className="textfield-author" id="outlined-basic" label="" variant="outlined" 
          type="text" 
          name="author" 
          value={bookData.author} 
          onChange={handleInputChange}
          required
        />
      </div>
      <Button className='add-button' variant="contained" type="submit">Add Book</Button>
    </form>
  );
};

export default AddBook;
