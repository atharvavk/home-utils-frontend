import './App.css';
import Login from './login/login';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './login/protected-routes';
import Geyser from './geyser/geyser';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Geyser />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
