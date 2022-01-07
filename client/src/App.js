import logo from './logo.svg';
import './App.css';
import React from 'react';
import Home from './components/Home'
import Layout from './components/Layout';
import About from './components/About';
import All_Movies from './components/All_Movies';
import My_Movies from './components/My_Movies';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Movie_Details from './components/Movie_Details';
import Signup from './components/Signup';
import Login from './components/Login';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

function App(props) {
const [data, setData] = useState(null)
  return (
    <div className="App">
    <Layout />
     <Routes>
        <Route element={<AnonRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<Movie_Details />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/all-movies" element={<All_Movies />} />
          <Route path="/my-movies" element={<My_Movies />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
