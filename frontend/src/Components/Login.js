import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./css/login.css";
import "./images/bg1.jpg";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate,createSearchParams } from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameSignUp, setUsernameSignUp] = useState("");
    const [passwordSignUp, setPasswordSignUp] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [fullName, setfullName] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [dutyStatus, setDutyStatus] = useState("");
    const [open, setOpen] = useState(false);

     useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
        signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
        });
         signInButton.addEventListener('click', () => { 
        container.classList.remove("right-panel-active");
        });
    });

      const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch("http://127.0.0.1:5000/loginData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
               localStorage.setItem("access_token", data.access_token);
              console.log("Token---:", localStorage.getItem("access_token"));
              setLoggedIn(true);
            } else {
              setDutyStatus("Invalid Credentials!");
              setOpen(true);
            }
          })
          .catch((error) => console.error("Error:", error));
      };

      const handleSignUp = (event) => {
        event.preventDefault();
    
        fetch("http://127.0.0.1:5000/SignUpData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usernameSignUp, passwordSignUp, fullName,phoneNo }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
             localStorage.setItem("access_token", data.access_token);
              console.log("Token---:", localStorage.getItem("access_token"));}
              setLoggedIn(true);
          })
          .catch((error) => console.error("Error:", error));
      };

      if (loggedIn) {
        console.log("Login state true ===> ", loggedIn);
        return navigate("/home");
      }
    
      const handleClose = () => {
        setOpen(false);
        setDutyStatus("");
      };
    return (
        <>
            <h2>Dynamic Event Scheduler</h2>
            <div className="container" id="container" >
                <div className="form-container sign-up-container">
                    <form>
                        <h1>Create Account</h1>
                        <input type="email" placeholder="Email" name="email" onChange={(e) => setUsernameSignUp(e.target.value)} required   />
                        <input type="text" placeholder="FullName" name="FullName" onChange={(e) => setfullName(e.target.value)} required  />
                        <input type="password" placeholder="Password" name="passwordSignup" onChange={(e) => setPasswordSignUp(e.target.value)} required   />
                        <input type="text" placeholder="Phone No" name="phoneNo" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required    />
                        <button onClick = {handleSignUp}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Sign in</h1>
                        <input type="email" placeholder="Email" name="username" onChange={(e) => setUsername(e.target.value)} required   />
                        <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} required   />
                        <button onClick = {handleSubmit}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start organizing your events.</p>
                            <button className="ghost" id="signUp" >Sign Up</button>
                        </div>
                    </div>
                </div>
                <Dialog open={open} onClose={handleClose}>
                <DialogTitle>LOGIN STATUS</DialogTitle>
                <DialogContent>{dutyStatus}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
                </Dialog>
            </div>
        </>
    )
}
