import React from 'react'
import "./css/login.css";
import "./images/bg1.jpg";
export default function Login() {
    // const signUpButton = document.getElementById('signUp');
    // const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    // signUpButton.addEventListener('click', () => {
    // container.classList.add("right-panel-active");
    // });
    function handleSignUp(){
        container.classList.add("right-panel-active");
    }
    function handleSignIn(){
        container.classList.remove("right-panel-active");
    }
    // signInButton.addEventListener('click', () => { 
    // container.classList.remove("right-panel-active");
    // });
    return (
        <>
            {/* <div className="main-block">
                <h1>Registration</h1>
                <form action="/">
                    <hr></hr>
                    <div className="account-type">
                        <input type="radio" value="none" id="radioOne" name="account" checked />
                        <label for="radioOne" className="radio">Personal</label>
                        <input type="radio" value="none" id="radioTwo" name="account" />
                        <label for="radioTwo" className="radio">Company</label>
                    </div>
                    <hr></hr>
                    <label id="icon" for="name"><i className="fas fa-envelope"></i></label>
                    <input type="text" name="name" id="name" placeholder="Email" required />
                    <label id="icon" for="name"><i className="fas fa-user"></i></label>
                    <input type="text" name="name" id="name" placeholder="Name" required />
                    <label id="icon" for="name"><i className="fas fa-unlock-alt"></i></label>
                    <input type="password" name="name" id="name" placeholder="Password" required />
                    <hr></hr>
                    <div className="gender">
                        <input type="radio" value="none" id="male" name="gender" checked />
                        <label for="male" className="radio">Male</label>
                        <input type="radio" value="none" id="female" name="gender" />
                        <label for="female" className="radio">Female</label>
                    </div>
                    <hr></hr>
                    <div className="btn-block">
                        <p>By clicking Register, you agree on our <a href="https://www.w3docs.com/privacy-policy">Privacy Policy for W3Docs</a>.</p>
                        <button type="submit" href="/">Submit</button>
                    </div>
                </form>
            </div> */}
            <h2>Welcome to Graffiti-Web</h2>
            <dIv className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="/signup" method="post">
                        <h1>Create Account</h1>
                        <input type="email" placeholder="Email" name="email" />
                        <input type="password" placeholder="Password" name="password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="/login" method="post">
                        <h1>Sign in</h1>
                        <input type="email" placeholder="email" name="email" />
                        <input type="password" placeholder="Password" name="password" />
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick = {handleSignIn}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your artistic journey with us</p>
                            <button className="ghost" id="signUp" onClick = {handleSignUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </dIv>
        </>
    )
}
