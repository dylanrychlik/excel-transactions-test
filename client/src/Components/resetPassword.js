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



function ResetPassword(props) {

    let emailRef = createRef();
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const handleChangeNewPassword = (event) => {
        setNewPassword(event.target.value);
    };

    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const [user, setUser] = useState({

        newpassword: '',
        confirmpassword: '',
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

    const test = () => {
        console.log('new', newpassword);
        console.log('confirm', confirmpassword);
        if (newpassword !== confirmpassword){
            alert('Passwords do not match');
        } else {
            alert('Password updated successfully');
            window.location.replace("http://localhost:3000/");
        }
    }

    const handleSubmit = e => {

        e.preventDefault();
        test();
        const userData = {


            newpassword: newpassword,
            confirmpassword: confirmpassword,

        };

        axios.post("https://excel-transaction-test.herokuapp.com/reset", userData)
            .then(function (response) {
                console.log('Turtle tester who is getting fired Thurday', response.data);
                window.location.replace("https://excel-transaction-test.herokuapp.com/");
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

        <div className="ResetPassword">
            <div>
                <h1>Please enter the a new password <br></br>associated with your account.</h1>
            </div>
            <div>

                <form style={formStyle} onSubmit={handleSubmit} >

                    <label style={labelStyle} htmlFor="newpassword">New Password: </label>
                    <input style={inputStyle}
                        type="password"
                        value={newpassword}
                        placeholder="enter a new password"
                        onChange={handleChangeNewPassword} />
                    <label style={labelStyle} htmlFor="confirmpassword">Confirm Password: </label>
                    <input style={inputStyle}
                        type="password"
                        value={confirmpassword}
                        placeholder="enter a confirm password"
                        onChange={handleChangeConfirmPassword} />



                    <button style={submitStyle} type="submit">Submit</button>

                </form>
            </div>
        </div>
    );
};

export default ResetPassword;