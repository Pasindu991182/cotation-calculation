
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';  // Make sure this is included
import backgroundImage from './assets/background.jpg'; // Import image here

function App() {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      {}
    </div>
  );
}

export default App;
