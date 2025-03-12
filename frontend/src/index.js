import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Newtask from './pages/Newtask';
import ThisTask from './pages/ThisTask';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/newtask" element={<Newtask />}/> 
      <Route path="/tasks/:taskID" element={<ThisTask />} />
    </Routes>
  </Router>
);
reportWebVitals();
