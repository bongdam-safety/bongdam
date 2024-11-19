import './App.css';
import React from 'react';
import { BrowserRouter as Router,Routes ,Route} from'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import KakaoMap from './KakaoMap';
import UpdateRequest from './nav/UpdateRequest';
import Home from './Home';
import Login from './nav/Login';
import Add from './nav/Add';
import RequestPage from './nav/RequestPage';
import { Form } from 'react-bootstrap';
import MainComponent from './MainComponent';
import Admin from './Admin';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path='/RequestPage' element={<RequestPage />}/>
              <Route path="/Add" element={<Add />} />
              <Route path="/map" element={<MainComponent />} />  
      </Routes>
    </div>
    </Router> 

  );
};

export default App;
