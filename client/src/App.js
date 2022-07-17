import React, { Component,useState  } from 'react';
import Form from './Components/loginForm';
import Register from './Components/register';
import Forgot from './Components/forgotPassword';
import Text from './Components/text';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';


function App() {
  /* const appStyle = {
     height: '250px',
       display: 'flex'
   };*/
   
  const handleSubmit = data => {
    const json = JSON.stringify(data, null, 4);
    console.clear();
    console.log('login', json);
  };
  return (
    <div className='App'>
     
      <Router>
        <Routes>
          <Route exact path="/" element={<Form />} />
          <Route exact path="/login" element={<Form />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgot" element={<Forgot />}/>
        </Routes>
      </Router>
    </div >

  );
}

export default App;