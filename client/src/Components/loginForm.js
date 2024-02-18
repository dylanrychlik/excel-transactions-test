import React, { useRef, Component, createRef, useEffect, useState } from "react";
import axios from "axios";
import { Link, BrowserRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Register from "./register";
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
import { useLocation , useNavigate,useHistory } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../App";




function Form(props) {

    const errRef = useRef();
    const { account, setAccount } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const [loginStatus, setLoginStatus] = useState("");
    const [post, setPost] = React.useState(null);
    const [isOpen, setOpen] = useState(false);
    const useAuth = () => {
        const { user } = useContext(UserContext);
        return user && user.loggedIn;
    };

    const ProtectedRoutes = () => {
        const location = useLocation();
        const isAuth = useAuth();
        return isAuth ? (
            <Outlet />
        ) : (
            <Navigate to="/" replace state={{ from: location }} />
        );
    };
    const [allValues, setText] = useState({
        text1: 'Login Validation System:',
        text2: 'A react and node js templete',
        text3: 'of a standard login validation system.',
    });

    //axios.defaults.withCredentials = true;
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };
    

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
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


   
        useEffect(() => {
          axios.get("https://login-validation-rychlik.onrender.com:3001/login")
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
            });
        }, []);
    
      
        const handleSubmit = (event) => {
            event.preventDefault(); // Prevent default form submission behavior
    
             const user = {
                  username: username,
                  password: password
             };
    
            axios.post("https://http-login-validation-rychlik:3306/login", user)
                .then(function (response) {
                    console.log('Authentication data: ', response.data);
                    if (response.data === 'login successful') {
                        alert('Login successful');
                        window.location.replace("https://http-login-validation-rychlik.onrender.com/landing");

                        // Redirect or perform any necessary action upon successful login
                    } else if (response.data === 'Invalid username or password') {
                        alert('Invalid username or password.');
                    }
                })
                .catch((error) => {
                    console.log("Error: ", error);
                    console.log("Boo: ", user);

                    // Handle error appropriately
                });
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
    function isEmptyObject(obj) {
        return !Object.keys(obj).length;
    }

    return (
        <nav
            className="navbar is-primary"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="container">

                <h1>
                    {allValues.text1}
                    <br></br>
                    {allValues.text2}
                    <br></br>
                    {allValues.text3}
                </h1>




                <div className="navbar-brand">
                    <a
                        role="button"
                        className={`navbar-burger burger ${isOpen && "is-active"}`}
                        aria-label="menu"
                        aria-expanded="false"
                        onClick={() => setOpen(!isOpen)}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div className="login">
                    <form style={formStyle} onSubmit={handleSubmit} to="/landing">
                        <label style={labelStyle} htmlFor="username">Email: </label>

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

                        <button style={submitStyle} type="submit" onSubmit={() => {


                        }}>Sign In</button>







                        <div className={`navbar-menu ${isOpen && "is-active"}`}>
                            <div className="navbar-start">

                                <NavLink className="navbar-item" to="/">
                                </NavLink>

                                <NavLink
                                    className={(navData) => (navData.isActive ? "active-style" : 'none')}
                                    to="/register"
                                    element={<Register />}
                                >
                                    <h4>New to Login Validation? Sign up here</h4>
                                </NavLink>

                                <NavLink
                                    className={(navData) => (navData.isActive ? "active-style" : 'none')}
                                    to="/forgot"
                                    element={<Forgot />}
                                    onClick={() => setText("Reset your password")}
                                >
                                    <h4> Forgot password? Reset it now</h4>
                                </NavLink>
                            </div>


                        </div>

                    </form>
                </div>
                <h1>{loginStatus}</h1>
            </div>

        </nav>
    );
};
export default Form;

