import React, { useRef, Component, createRef, useEffect, useState } from "react";
import axios from "axios";
import { Link, BrowserRouter } from 'react-router-dom';
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

import Form from './loginForm';
import { NavLink } from 'react-router-dom';
function VerifyEmail({ onSubmit }) {
   // window.location.replace("http://localhost:3000/");
        //e.preventDefault();
        const [email, setEmail] = useState("");
        const userData = {

           
          email: email,

        };
        axios.get("https://http-login-validation-rychlik.onrender.com:3001/verification/", userData)
        .then(function (response) {
            window.location.replace("https://http-login-validation-rychlik.onrender.com:3000/verifyaccount");
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
    return (
        
        <div className="Forgot">
            <div>
              <h1>Account Verification</h1>
              </div>
              
      
        </div>
    );
};

export default VerifyEmail;