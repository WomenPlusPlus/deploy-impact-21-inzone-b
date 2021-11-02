import { Link, useHistory } from "react-router-dom";
import React from "react";

import EntryScreen from "../entry-screen";

const Signup = () => {
  const history = useHistory();

  const [password, setPassword] = React.useState('')

  const [showPasswordInstructions, setPasswordInstructions] =
    React.useState(false);

  const [passwordFieldType, setPasswordFieldType] = React.useState('password')
  const showHidePassword = () => {
    if (passwordFieldType === 'password') {
      setPasswordFieldType('type')
    } else {
      setPasswordFieldType('password')
    }
  }

  const nextStep = () => {
    history.push("/signup/setup-account");
  };

  return (
    <EntryScreen>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h1>Welcome to ExamPortal</h1>
            <form>
              <div className="mb-4">
                <label htmlFor="email-user" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email-user"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className='position-relative d-flex align-items-center'>
                  <input
                    type={passwordFieldType}
                    className="form-control"
                    id="password"
                    onFocus={(e) => {
                      setPasswordInstructions(true);
                    }}
                    onBlur={(e) => {
                      setPasswordInstructions(false);
                    }}
                    value={password}
                    onChange={(event => setPassword(event.target.value))}
                  />
                  <div className='eye-icon position-absolute' onClick={showHidePassword}>
                    <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 4.5C10.2044 4.5 9.44129 4.81607 8.87868 5.37868C8.31607 5.94129 8 6.70435 8 7.5C8 8.29565 8.31607 9.05871 8.87868 9.62132C9.44129 10.1839 10.2044 10.5 11 10.5C11.7956 10.5 12.5587 10.1839 13.1213 9.62132C13.6839 9.05871 14 8.29565 14 7.5C14 6.70435 13.6839 5.94129 13.1213 5.37868C12.5587 4.81607 11.7956 4.5 11 4.5ZM11 12.5C9.67392 12.5 8.40215 11.9732 7.46447 11.0355C6.52678 10.0979 6 8.82608 6 7.5C6 6.17392 6.52678 4.90215 7.46447 3.96447C8.40215 3.02678 9.67392 2.5 11 2.5C12.3261 2.5 13.5979 3.02678 14.5355 3.96447C15.4732 4.90215 16 6.17392 16 7.5C16 8.82608 15.4732 10.0979 14.5355 11.0355C13.5979 11.9732 12.3261 12.5 11 12.5ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0Z" fill="#655E5D"/>
                    </svg>
                  </div>
                </div>

              </div>
              <div
                className={`mb-5 ${
                  showPasswordInstructions ? "d-block" : "d-none"
                }`}
              >
                <div className='d-flex align-items-center'>
                  <div className="form-text">At least 8 characters long</div>
                  {password.length >= 8 &&
                    <div className='password-checkbox'>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.334 7.00019C12.334 8.41468 11.7721 9.77123 10.7719 10.7714C9.77169 11.7716 8.41514 12.3335 7.00065 12.3335C5.58616 12.3335 4.22961 11.7716 3.22941 10.7714C2.22922 9.77123 1.66732 8.41468 1.66732 7.00019C1.66732 5.5857 2.22922 4.22915 3.22941 3.22896C4.22961 2.22876 5.58616 1.66686 7.00065 1.66686C7.50732 1.66686 8.00065 1.74019 8.46732 1.87353L9.51398 0.826859C8.71685 0.49857 7.86274 0.330918 7.00065 0.333526C6.12517 0.333526 5.25827 0.505965 4.44943 0.840996C3.64059 1.17603 2.90566 1.66709 2.28661 2.28615C1.03636 3.53639 0.333984 5.23208 0.333984 7.00019C0.333984 8.7683 1.03636 10.464 2.28661 11.7142C2.90566 12.3333 3.64059 12.8244 4.44943 13.1594C5.25827 13.4944 6.12517 13.6669 7.00065 13.6669C8.76876 13.6669 10.4645 12.9645 11.7147 11.7142C12.9649 10.464 13.6673 8.7683 13.6673 7.00019H12.334ZM4.27398 5.72019L3.33398 6.66686L6.33398 9.66686L13.0007 3.00019L12.0607 2.05353L6.33398 7.78019L4.27398 5.72019Z" fill="#609664"/>
                      </svg>
                    </div>
                  }
                </div>
                <div className='d-flex align-items-center'>
                  <div className="form-text">Contains 1 uppercase character</div>
                  {/[A-Z]/.test(password) &&
                  <div className='password-checkbox'>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.334 7.00019C12.334 8.41468 11.7721 9.77123 10.7719 10.7714C9.77169 11.7716 8.41514 12.3335 7.00065 12.3335C5.58616 12.3335 4.22961 11.7716 3.22941 10.7714C2.22922 9.77123 1.66732 8.41468 1.66732 7.00019C1.66732 5.5857 2.22922 4.22915 3.22941 3.22896C4.22961 2.22876 5.58616 1.66686 7.00065 1.66686C7.50732 1.66686 8.00065 1.74019 8.46732 1.87353L9.51398 0.826859C8.71685 0.49857 7.86274 0.330918 7.00065 0.333526C6.12517 0.333526 5.25827 0.505965 4.44943 0.840996C3.64059 1.17603 2.90566 1.66709 2.28661 2.28615C1.03636 3.53639 0.333984 5.23208 0.333984 7.00019C0.333984 8.7683 1.03636 10.464 2.28661 11.7142C2.90566 12.3333 3.64059 12.8244 4.44943 13.1594C5.25827 13.4944 6.12517 13.6669 7.00065 13.6669C8.76876 13.6669 10.4645 12.9645 11.7147 11.7142C12.9649 10.464 13.6673 8.7683 13.6673 7.00019H12.334ZM4.27398 5.72019L3.33398 6.66686L6.33398 9.66686L13.0007 3.00019L12.0607 2.05353L6.33398 7.78019L4.27398 5.72019Z" fill="#609664"/>
                    </svg>
                  </div>
                  }
                </div>
                <div className='d-flex align-items-center'>
                  <div className="form-text">Contains 1 number or symbol</div>
                  {(password.match(/[0-9]/g) || /[!@#$%^&*(),.?":{}|<>]/g.test(password)) &&
                  <div className='password-checkbox'>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.334 7.00019C12.334 8.41468 11.7721 9.77123 10.7719 10.7714C9.77169 11.7716 8.41514 12.3335 7.00065 12.3335C5.58616 12.3335 4.22961 11.7716 3.22941 10.7714C2.22922 9.77123 1.66732 8.41468 1.66732 7.00019C1.66732 5.5857 2.22922 4.22915 3.22941 3.22896C4.22961 2.22876 5.58616 1.66686 7.00065 1.66686C7.50732 1.66686 8.00065 1.74019 8.46732 1.87353L9.51398 0.826859C8.71685 0.49857 7.86274 0.330918 7.00065 0.333526C6.12517 0.333526 5.25827 0.505965 4.44943 0.840996C3.64059 1.17603 2.90566 1.66709 2.28661 2.28615C1.03636 3.53639 0.333984 5.23208 0.333984 7.00019C0.333984 8.7683 1.03636 10.464 2.28661 11.7142C2.90566 12.3333 3.64059 12.8244 4.44943 13.1594C5.25827 13.4944 6.12517 13.6669 7.00065 13.6669C8.76876 13.6669 10.4645 12.9645 11.7147 11.7142C12.9649 10.464 13.6673 8.7683 13.6673 7.00019H12.334ZM4.27398 5.72019L3.33398 6.66686L6.33398 9.66686L13.0007 3.00019L12.0607 2.05353L6.33398 7.78019L4.27398 5.72019Z" fill="#609664"/>
                    </svg>
                  </div>
                  }
                </div>
              </div>
              <div className="mb-4">
                <div className="form-text">
                  By clicking Sign Up you agree to our
                  <strong>
                    <a href="terms-of-service"> Terms of Service </a>
                  </strong>{" "}
                  &
                  <strong>
                    <a href="privacy-policy"> Privacy Policy </a>
                  </strong>
                </div>
              </div>
              <div className="mb-4">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={nextStep}
                >
                  Sign Up
                </button>
              </div>
              <div>
                <div className="form-text">
                  Already have an account?
                  <strong>
                    <Link to="/login"> Log In </Link>
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

export default Signup;
