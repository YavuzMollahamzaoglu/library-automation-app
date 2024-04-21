import './App.css';
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import HomePage from './Homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </div>
  );
}

export default App;



