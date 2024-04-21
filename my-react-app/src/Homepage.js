import React from 'react';
import { Route, Routes, NavLink } from "react-router-dom";
import AddBook from './Components/RequestForm/AddBook';
import AddAuthor from './Components/RequestForm/AddAuthor';
import RequestForm from './Components/RequestForm/RequestForm';
import './HomePage.css';
import ListItemButton from '@mui/material/ListItemButton';

const Navbar = () => {
  return (
    <nav className="homepage-nav">
      <h1 className='homepage-title'>Welcome to the Homepage</h1>
      <ul className="homepage-nav-list">
        <ListItemButton><NavLink to="/">Home Page</NavLink></ListItemButton>
        <ListItemButton><NavLink to="/add-book">Add Book</NavLink></ListItemButton>
        <ListItemButton><NavLink to="/add-author">Add Author</NavLink></ListItemButton>
        <ListItemButton><NavLink to="/request-form">Request Form</NavLink></ListItemButton>
      </ul>
    </nav>
  );
};

const HomePage = () => {
  return (
    <div className='homepage-container'>
      
      <Navbar />
      <Routes className="homepage-routes">
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/add-author" element={<AddAuthor />} />
        <Route path="/request-form" element={<RequestForm />} />
      </Routes>
    </div>
  );
};

export default HomePage;