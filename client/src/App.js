import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Home from './components/Home'
import Layout from './components/Layout';
import About from './components/About';
import All_Movies from './components/All_Movies';
import My_Movies from './components/My_Movies';
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Movie_Details from './components/Movie_Details';
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

function App(props) {
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
          <Route path="/about" element={<About />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/my-movies" element={<My_Movies />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
