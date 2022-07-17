import React, { Component, createRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import './forgotPassword.css';
import Field from './field';


function forgotPassword({ onSubmit }) {
    
    let emailRef = createRef();


    const formStyle = {
        margin: 'auto',
        padding: '10px',
        border: '1px solid #c9c9c9',
        borderRadius: '5px',
        background: '#f5f5f5',
        width: '220px',
        display: 'block'
    };

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
   
   
    const handleSubmit = e => {
        e.preventDefault();
        const data = {

            email: emailRef.current.value,

        };
        onSubmit(data);
    };
    return (
        
        <div className="Forgot">
            <div>
              <h1>Please enter the email <br></br>associated with your account.</h1>
              </div>
              <div>
         
         <form style={formStyle} onSubmit={handleSubmit} >
             
                <Field ref={emailRef} label="Email:" type="text" />

                <button style={submitStyle} type="submit">Submit</button>

                </form>
        </div>
        </div>
    );
};

export default forgotPassword;