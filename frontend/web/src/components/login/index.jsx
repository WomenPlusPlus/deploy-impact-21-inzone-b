import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import axios from "../../shared/axios";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";

function LoginScreen(props) {
  const history = useHistory();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const logIn = async () => {
    if (username && password) {
      axios
        .post("student/login", {
          email: username,
          password,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            dispatch(
              login({
                email: username,
              })
            );
            localStorage.setItem("isLogged", true);
            history.push("/home");
          } else {
            alert("login was not successful :(");
            console.log("testing");
          }
        });
    } else {
      alert("please fill in username and password");
    }
  };
  return (
    <div className="container">
      <div className="row entry-screen">
        <div className="col-lg-6">
          <h1>Welcome to ExamPortal</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="user-email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="user-email"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="user-password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="user-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Link to="/forgot-password" className="form-text">
                Forgot your password?
              </Link>
            </div>
            <div className="mb-4">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={logIn}
              >
                Log In
              </button>
            </div>
            <div className="mb-4">
              <div className="form-text">Don’t have an account?</div>
            </div>
            <div className="mb-3">
              <Link to="/signup" className="btn btn-outline-primary w-100">
                Sign Up
              </Link>
            </div>
            <div>
              <div className="form-text">
                Our
                <strong>
                  <a href="terms-of-service">Terms of Service</a>
                </strong>{" "}
                &
                <strong>
                  <a href="privacy-policy">Privacy Policy</a>
                </strong>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
