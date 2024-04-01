import React, { useState } from 'react';
import axios from 'axios';

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
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
};

export default RequestForm;