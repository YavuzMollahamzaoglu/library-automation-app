import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./AddAuthor.css"

const AddAuthor = () => {
  const [authorName, setAuthorName] = useState('');

  const handleInputChange = (e) => {
    setAuthorName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3008/author', { authorName });
      console.log('Author added successfully');
      alert('Author added successfully');
      setAuthorName(''); 
    } catch (error) {
      console.error('Error adding author:', error);
      alert('An error occurred while adding author');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 className='header'>Add Author</h1>
        <TextField
          className='textfield'
          label="Author Name"
          variant="outlined"
          value={authorName}
          onChange={handleInputChange}
          required
        />
      </div>
      <Button className='button' variant="contained" type="submit">Add Author</Button>
    </form>
  );
};

export default AddAuthor;