import React, { Component, createRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import './forgotPassword.css';
import Field from './field';


function landing({ onSubmit }) {
    const submitStyle = {
        margin: '10px 0 0 0',
        padding: '7px 10px',
        border: '1px solid #efffff',
        borderRadius: '3px',
        background: '#3085d6',
        width: '100%',
        fontSize: '15px',
        color: 'white',
        display: 'block'
    };
    const test = () => {
        window.location.replace("https://http-login-validation-rychlik.onrender.com/");
    };

    return (
        
        <div className="Landing">
            <div>
              <h1>Login successful</h1>
              <button style={submitStyle} type="submit" onClick={ test}>Log Out</button>
              </div>
             
      
        </div>
    );
};

export default landing;