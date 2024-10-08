// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import VendorDetail from './components/VendorDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendor/:id" element={<VendorDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
