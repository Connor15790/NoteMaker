import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { useState } from 'react';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import PrivateRoute from './components/PrivateRoutes';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <Alert alert={alert} />
          <Routes>
            <Route exact path='/login' element={<Login showAlert={showAlert} mode={mode} />} />
            <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />

            <Route element={<PrivateRoute />}>
              <Route exact path='/' element={<Home showAlert={showAlert} mode={mode} />} />
              <Route exact path='/about' element={<About mode={mode} />} />
            </Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
