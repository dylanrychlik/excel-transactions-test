import React, { Component, createRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import Field from './field';


function register({ onSubmit }) {
    let nameRef = createRef();
    let emailRef = createRef();
    let usernameRef = createRef();
    let passwordRef = createRef();

    const formStyle = {
        margin: 'auto',
        padding: '10px',
        border: '1px solid #c9c9c9',
        borderRadius: '5px',
        background: '#f5f5f5',
        position: 'absolute',
        overflow: 'auto',
        top: '40%',
        left: '50%',
        transform: 'translate(-50 %, -50 %)',
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
            myname: nameRef.current.value,
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        onSubmit(data);
    };
    return (
        <div className="register">
            <div>
                <h1>Please fill the following <br></br>information to create an account</h1>
            </div>
            <div>
                <form style={formStyle} onSubmit={handleSubmit} >
                    <Field ref={nameRef} label="Name:" type="text" />
                    <Field ref={emailRef} label="Email:" type="text" />
                    <Field ref={usernameRef} label="Username:" type="text" />
                    <Field ref={passwordRef} label="Password:" type="password" />
                    <div>
                        <button style={submitStyle} type="submit">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default register;