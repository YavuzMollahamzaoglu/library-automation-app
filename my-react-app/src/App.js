import './App.css';
import react from 'react';
import LoginForm from './Components/Assets/LoginForm/LoginForm';
import RequestForm from './Components/RequestForm/RequestForm';
import AddBook from './Components/RequestForm/AddBook';
import AddAuthor from './Components/RequestForm/AddAuthor';

function App() {
  return (
    <div className="App">
      <AddAuthor></AddAuthor>
    </div>
  );
}

export default App;
