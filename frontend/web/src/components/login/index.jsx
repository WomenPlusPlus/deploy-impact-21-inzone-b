import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "../../shared/axios";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import EntryScreen from "../entry-screen";

function LoginScreen(props) {
  // const history = useHistory();

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

  const [showLoginError, setShowLoginError] = useState(false);

  const dispatch = useDispatch();

  const logIn = async (e) => {
    e.preventDefault();
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
          localStorage.setItem("isLogged", 'true');
          localStorage.setItem("currentEmail", username);
          // history.push("/home");
          window.location.href = "/home";
        } else {
          alert("login was not successful :(");
          console.log("testing");
        }
      }).catch((error) => {
        setShowLoginError(true);
    });
  };
  return (
    <EntryScreen>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h1>Welcome to ExamPortal</h1>
            <form onSubmit={logIn}>
              {
                showLoginError &&
                <div className="form-text error d-flex align-items-center mb-4">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_796_3231)">
                      <path d="M9.00001 17.1C9.98511 17.1013 10.9607 16.9079 11.8709 16.5309C12.781 16.1539 13.6076 15.6007 14.3033 14.9032C15.0007 14.2076 15.5539 13.381 15.9309 12.4708C16.3079 11.5607 16.5013 10.5851 16.5 9.6C16.5013 8.6149 16.3078 7.63926 15.9308 6.72916C15.5539 5.81905 15.0007 4.99241 14.3033 4.29675C13.6076 3.59926 12.781 3.04612 11.8709 2.66913C10.9607 2.29214 9.98511 2.09872 9.00001 2.1C8.01491 2.09874 7.03927 2.29217 6.12917 2.66916C5.21906 3.04615 4.39242 3.59927 3.69676 4.29675C2.99928 4.99241 2.44616 5.81905 2.06917 6.72916C1.69218 7.63926 1.49875 8.6149 1.50001 9.6C1.49873 10.5851 1.69215 11.5607 2.06914 12.4708C2.44613 13.381 2.99927 14.2076 3.69676 14.9032C4.39242 15.6007 5.21906 16.1538 6.12917 16.5308C7.03927 16.9078 8.01491 17.1013 9.00001 17.1V17.1Z" stroke="#E55565" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M9 14.475C9.24864 14.475 9.4871 14.3762 9.66291 14.2004C9.83873 14.0246 9.9375 13.7861 9.9375 13.5375C9.9375 13.2889 9.83873 13.0504 9.66291 12.8746C9.4871 12.6988 9.24864 12.6 9 12.6C8.75136 12.6 8.5129 12.6988 8.33709 12.8746C8.16127 13.0504 8.0625 13.2889 8.0625 13.5375C8.0625 13.7861 8.16127 14.0246 8.33709 14.2004C8.5129 14.3762 8.75136 14.475 9 14.475Z" fill="#E55565"/>
                      <path d="M9 5.10001V11.1" stroke="#E55565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_796_3231">
                        <rect width="18" height="18" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="ms-1">Email or password does not match an ExamPortal account.</span>
                </div>
              }
              <div className="mb-4">
                <label htmlFor="user-email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${showLoginError ? 'is-invalid' : ''}`}
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
                    className={`form-control ${showLoginError ? 'is-invalid' : ''}`}
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
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={!username || !password}
                >
                  Log In
                </button>
              </div>
              <div className="mb-4">
                <div className="form-text">Don’t have an account?
                  <strong>
                    <Link to="/signup"> Sign Up </Link>
                  </strong>
                </div>
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
