import React, { useRef, Component, createRef, useEffect, useState } from "react";
import axios from "axios";
import { Link, BrowserRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Landing from "./landing";
import "./loginForm.css";
import history from '../history';
import Field from './field';
import { browserHistory } from 'react-router';
//Imports sufficent libaries. 
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { link } from '@mui/material/Link';
import { Alert, Typography } from "@mui/material";
import { useContext } from "react";
import { useLocation, useNavigate, useHistory } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../App";
import { render } from "react-dom";



function ForgotPassword(props) {

    let emailRef = createRef();
    const [email, setEmail] = useState("");
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

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

    const labelStyle = {
        margin: '10px 0 5px 0',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '15px',
    };

    const inputStyle = {
        margin: '5px 0 10px 0',
        padding: '5px',
        border: '1px solid #bfbfbf',
        borderRadius: '3px',
        boxSizing: 'border-box',
        width: '100%'
    };
    const handleSubmit = e => {
        e.preventDefault();

        const userData = {

            email: email,

        };
        axios.post("https://http-login-validation-rychlik.onrender.com:3001/forgot", userData)
            .then(function (response) {
                console.log('Turtle tester who is getting fired Thurday', response.data);
                alert('Please check your email to verify your account');
                window.location.replace("https://http-login-validation-rychlik.onrender.com:3000");
                return response.data;
            })

            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("server responded");
                } else if (error.request) {
                    console.log("network error");
                } else {
                    console.log(error);
                }
            });
    };
    return (

        <div className="Forgot">
            <div>
                <h1>Please enter the email <br></br>associated with your account.</h1>
            </div>
            <div>

                <form style={formStyle} onSubmit={handleSubmit} >

                    <label style={labelStyle} htmlFor="email">Email: </label>
                    <input style={inputStyle}
                        type="email"
                        value={email}
                        placeholder="enter an email"
                        onChange={handleChangeEmail} />

                   
                    <button style={submitStyle} type="submit">Submit</button>

                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;