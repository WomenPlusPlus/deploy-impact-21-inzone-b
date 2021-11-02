import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import axios from "../../shared/axios";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import EntryScreen from "../entry-screen";

function LoginScreen(props) {
  const history = useHistory();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [passwordFieldType, setPasswordFieldType] = React.useState('password')
  const showHidePassword = () => {
    if (passwordFieldType === 'password') {
      setPasswordFieldType('type')
    } else {
      setPasswordFieldType('password')
    }
  }

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
    <EntryScreen>
      <div className="container">
        <div className="row justify-content-center">
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
                <div className='position-relative d-flex align-items-center'>
                  <input
                    type={passwordFieldType}
                    className="form-control"
                    id="user-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className='eye-icon position-absolute' onClick={showHidePassword}>
                    <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z" fill="#655E5D"/>
                    </svg>
                  </div>
                </div>
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
                    <a href="terms-of-service"> Terms of Service </a>
                  </strong>{" "}
                  &
                  <strong>
                    <a href="privacy-policy"> Privacy Policy </a>
                  </strong>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </EntryScreen>
  );
}

export default LoginScreen;
