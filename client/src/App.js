import React, { createContext,useState  } from 'react';
import Form from './Components/loginForm';
import Register from './Components/register';
import Forgot from './Components/forgotPassword';
import Landing from './Components/landing';
import Verifyemail from './Components/verifyEmail';
import Verifyforgot from './Components/verifyForgot';
import Text from './Components/text';
import Reset from './Components/resetPassword';
import ReactDOM from "react-dom";
//import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
export const UserContext = createContext();



function App() {
  const [account, setAccount] = useState({ loggedIn: false });
   
  const handleSubmit = data => {
    const json = JSON.stringify(data, null, 4);
    console.clear();
    console.log('login', json);
  };
  return (
    <div className='App'>
      <UserContext.Provider value={{ account, setAccount }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Form />} />
          <Route exact path="/login" element={<Form />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgot" element={<Forgot />}/>
          <Route exact path="/landing" element={<Landing />}/>
          <Route exact path="/verification/" element={<Verifyemail />}/>
          <Route exact path="/verifyforgot" element={<Verifyforgot />}/>
          <Route exact path="/reset" element={<Reset />}/>
          //this part to be precise
          
        </Routes>
      </Router>
      </UserContext.Provider>
    </div >

  );
}

export default App;