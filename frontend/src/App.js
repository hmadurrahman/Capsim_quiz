import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Quiz from './Quiz';
import Report from './Report';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Quiz</NavLink></li>
            <li><NavLink to="/report" className={({ isActive }) => isActive ? 'active' : ''}>Report</NavLink></li>
          </ul>
        </nav>
        <header style={{ textAlign: 'center', margin: '2rem 0 0.5rem 0' }}>
          <h1 style={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: 1 }}>Capsim E-learning Assessment</h1>
        </header>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
