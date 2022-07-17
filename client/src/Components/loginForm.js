import React, { useRef,Component, createRef, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Register from "./register";
import Forgot from "./forgotPassword";
import "./loginForm.css";
import history from '../history';
import Field from './field';
//Imports sufficent libaries. 
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { link } from '@mui/material/Link';
import { Alert, Typography } from "@mui/material";





function Form(props) {

    const errRef = useRef();

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

    const [allValues, setText] = useState({
        text1: 'Excel Transaction',
        text2: 'A data manager for your',
        text3: 'Excel transaction sheet',
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
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'Token',
            "Access-Control-Allow-Origin": "*",

        }
    };

    // login the user
    /*const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`http://localhost:3001/login`,  {
            username: username,
            password: password
          })
          .then((response) => {
            setPost(response.data);
          });
    };
    useEffect(() => {
        let test = "";
        axios.get("http://localhost:3001/").then((response) => {
            setPost(response.data);
          });

    }, []);*/
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/login',
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log('poop',JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
           // const accessToken = response?.data?.accessToken;
            //const roles = response?.data?.roles;
           // setAuth({ username, password });
           setUsername('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
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
                    <form style={formStyle} onSubmit={handleSubmit}>
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
                        <button style={submitStyle} type="submit">Submit</button>


                        <div className={`navbar-menu ${isOpen && "is-active"}`}>
                            <div className="navbar-start">

                                <NavLink className="navbar-item" to="/">
                                </NavLink>

                                <NavLink
                                    className={(navData) => (navData.isActive ? "active-style" : 'none')}
                                    to="/register"
                                    element={<Register />}
                                >
                                    <h4>New to Excel transactions? Sign up here</h4>
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

/*const formStyle = {
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

class Form extends React.Component {

    //State object to represent the email and password values. Makes use of states in react.
    state = {
        email: ' ',
        password: ' '
    }

    //Constructor props for email and password. 
    constructor(props) {
        super(props);
        this.email = { email: '' };
        this.password = { password: '' };
        this.loginStatus = { loginStatus: '' };

        this.state = {
            isOpen: false,
            text1: 'Excel Transaction',
            text2: 'A data manager for your',
            text3: 'Excel transaction sheet',
        };


        //this.header = {text1: 'Excel Transaction',  text2: 'A data manager for your',  text3: 'Excel transaction sheet' };


        this.text1 = this.setText1.bind(this);
        this.text2 = this.setText2.bind(this);
        this.text3 = this.setText3.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loginStatus = this.setLoginStatus.bind(this);

    }


    //Functions to set the email and password states when pressing submit button on form. 
    setUsername(e) {
        this.setState({
            email: e.target.value
        });
    }
    setPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    setLoginStatus(e) {
        this.setState({
            loginStatus: e.target.value
        });
    }
    setText1(e) {
        this.setState({
            text1: e.target.value
        });
    }
    setText2(e) {
        this.setState({
            text2: e.target.value
        });
    }
    setText3(e) {
        this.setState({
            text3: e.target.value
        });
    }

    //This function exists to handle the submit button and render the login page. Login page code will need to be added. 
    async handleSubmit() {
        const response = fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }, // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({
                Username: this.state.email,
                Password: this.state.password,

            })
            // return response.body; // parses JSON response into native JavaScript objects
        }).then(response => {
            response.json().then((data) => {

                console.log('Data message',data.message);

                if (data.message == "Invalid username or password") {
                    alert("Invalid username or password");
                } else if (data.message == "login successful") {
                    alert("login successful");
                }

         });
      //'mssg'
      //response.text().then((data) => { let data1 = JSON.parse(data); console.log(data1.message);});
      //'mssg'
});

  }
    render() {

        return (


            <div className="login">
                <div>
                    <Typography variant="h1" gutterBottom
                    > Excel Transactions:
                        <br></br> A data manager for excel transaction sheets
                    </Typography>
                </div>


                <form style={formStyle} onSubmit={this.handleSubmit} >
                    <div className="Login" width="120px">

                        <Typography variant="h3" gutterBottom
                        > Sign in
                        </Typography>
                        <Typography variant="h6" gutterBottom
                            style={{ color: "black" }}> Username or email
                        </Typography>

                        <TextField
                            variant="standard"
                            placeholder="Username"
                            margin="normal"
                            required
                            onChange={this.setUsername.bind(this)}
                            value={this.state.email}
                        />
                        <Typography variant="h6" gutterBottom
                            style={{ color: "black" }}>  Password

                        </Typography>
                        <TextField
                            variant="standard"
                            placeholder="Password"
                            margin="normal"
                            required
                            type="password"
                            onChange={this.setPassword.bind(this)}
                            value={this.state.password}
                        />

                        <div className="Button">
                            <Button style={{ background: "Orange", borderstyle: "solid", color: "Black" }} onClick={this.handleSubmit} >Sign-in</Button>
                        </div>




                        <Link to="/forgot"
                            element={<Forgot />}>
                            {'Forgot password?'}
                        </Link>
                        <br></br>
                        <br></br>
                        <Link to="/register"
                            element={<Register />}>
                            {' New to Excel Transactions? Sign in here'}
                        </Link>


                        <div>

                            
                        </div>



                    </div>

                </form >
            </div >

        );
    }

}


*/