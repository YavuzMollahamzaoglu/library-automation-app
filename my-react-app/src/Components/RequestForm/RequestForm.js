import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./RequestForm.css";

const RequestForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3008/customer', userData);
      console.log('User added:', response.data);
      alert('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('An error occurred while adding user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 className='header'>Adding users to system</h1>
        <label className='user-label'>Username:</label>
        <TextField id="outlined-basic" label="" variant="outlined" 
          className='textfield-user'
          type="text"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label className='user-label'>Password:</label>
        <TextField className='textfield-password' id="outlined-basic" label="" variant="outlined" 
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label className='user-label'>Email:</label>
        <TextField  className="textfield-email" id="outlined-basic" label="" variant="outlined" 
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <Button className='add-button' variant="contained" type="submit">Add User</Button>
    </form>
  );
};

export default RequestForm;
