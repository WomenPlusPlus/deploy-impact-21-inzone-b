import "./LoginScreen.scss"
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState } from 'react';

// to do: move to shared state
const baseURL = "http://edunity.azurewebsites.net/student/login";

function LoginScreen(props) {
    const history = useHistory();

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const logIn = () => {
        if (username && password) {
            axios.post(baseURL, {
                email: username,
                password: password
            }).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    history.push("/home");
                } else {
                    alert('login was not successful :(')
                }
            });
        } else {
            alert('please fill in username and password')
        }
    }
    return (
        <div className="row entry-screen">
            <div className="col-lg-6">
                <h1>Welcome to ExamPortal</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="user-email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="user-email" onChange={e => setUserName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="user-password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="user-password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <Link to={`/forgot-password`} className="form-text">Forgot your password?</Link>
                    </div>
                    <div className="mb-4">
                        <button type="button" className="btn btn-primary w-100" onClick={logIn}>Log In</button>
                    </div>
                    <div className="mb-4">
                        <div className="form-text">Don’t have an account?</div>
                    </div>
                    <div className="mb-3">
                        <Link to={`/signup`} className="btn btn-outline-primary w-100">Sign Up</Link>
                    </div>
                    <div>
                        <div className="form-text">Our <strong><a href="terms-of-service">Terms of Service</a></strong> & <strong><a href="privacy-policy">Privacy Policy</a></strong></div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginScreen;
