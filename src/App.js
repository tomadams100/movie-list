import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home'
import Layout from './components/Layout';
import About from './components/About';
import All_Movies from './components/All_Movies';
import My_Movies from './components/My_Movies';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
     <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/all-movies" element={<All_Movies />} />
          <Route path="/my-movies" element={<My_Movies />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
