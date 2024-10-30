import './App.css';
import React from 'react';
import { BrowserRouter as Router,Routes ,Route} from'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import KakaoMap from './KakaoMap';
import Navbar from './Navbar';
import Home from './Home';
import Login from './nav/Login';
import Add from './nav/Add';
import UpdateRequest from './nav/UpdateRequest';
import { Form } from 'react-bootstrap';
import MainComponent from './MainComponent';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Add" element={<Add />} />
              <Route path="/UpdateRequest" element={<UpdateRequest/>} />
              <Route path="/map" element={<MainComponent />} />  
      </Routes>
    </div>
    </Router> 

  );
};

export default App;
