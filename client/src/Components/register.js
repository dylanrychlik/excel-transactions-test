import React, { useRef, Component, createRef, useEffect, useState } from "react";
import axios from "axios";
import { Link, BrowserRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Forgot from "./forgotPassword";
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



function Register(props) {
    const errRef = useRef();
    // const { account, setAccount } = useContext(UserContext);
    //const navigate = useNavigate();
    //  const location = useLocation();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
    });
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
    //axios.defaults.withCredentials = true;
    const handleChangeFirstname = (event) => {
        setFirstname(event.target.value);
    };
    //axios.defaults.withCredentials = true;
    const handleChangeLastname = (event) => {
        setLastname(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    //axios.defaults.withCredentials = true;
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password
        };
        axios.post("http://login_validation_rychlik.com:3001/register", userData)
            .then(function (response) {
                console.log('Turtle tester who is getting fired Thurday',response.data);
                alert('Please check your email to verify your account');
                window.location.replace("http://login_validation_rychlik.com:3000");
                return response.data;
            })

            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("server responded");
                    console.log("Test",userData);
                } else if (error.request) {
                    console.log("network error");
                } else {
                    console.log(error);
                }
            });
    }
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
    function isEmptyObject(obj) {
        return !Object.keys(obj).length;
    }

    return (
        <div className="register">
            <div>
                <h1>Please fill the following <br></br>information to create an account</h1>
            </div>
            <div>
                <form style={formStyle} onSubmit={handleSubmit} >
                    <label style={labelStyle} htmlFor="firstname">First Name: </label>

                    <input style={inputStyle}
                        type="text"
                        value={firstname}
                        placeholder="enter a name"
                        onChange={handleChangeFirstname} />
                    <label style={labelStyle} htmlFor="lastname">Last Name: </label>

                    <input style={inputStyle}
                        type="text"
                        value={lastname}
                        placeholder="enter a name"
                        onChange={handleChangeLastname} />
                    <label style={labelStyle} htmlFor="email">Email: </label>
                    <input style={inputStyle}
                        type="email"
                        value={email}
                        placeholder="enter an email"
                        onChange={handleChangeEmail} />

                    <label style={labelStyle} htmlFor="username">Username: </label>

                    <input style={inputStyle}
                        type="text"
                        value={username}
                        placeholder="enter a username"
                        onChange={handleChangeUsername} />
                    <label style={labelStyle} htmlFor="password">Password: </label>
                    <input style={inputStyle}
                        type="password"
                        value={password}
                        placeholder="enter a password"
                        onChange={handleChangePassword} />



                    <div>
                        <button style={submitStyle} type="submit">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Register;