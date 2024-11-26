
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Movies from './Components/Movies';
import Signup from './Components/Signup';
import Info from './Components/Info';
import Users from './Components/Users';

function App() {
  return (
    <div className="App">
       <Router>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/movies" element={<Movies/>} />
        <Route path="/info" element={<Info/>} />
        <Route path="/users" element={<Users/>}/>

      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
