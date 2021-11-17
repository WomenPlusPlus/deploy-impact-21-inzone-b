import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../shared/axios";

function SetupAccount(props) {
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");

  const [roleTypes, setRoleTypes] = React.useState([]);

  useEffect(() => {
    axios.get('role-types').then((response) => {
      setRoleTypes(response.data);
    });
  }, []);

  const createAccount = () => {
    props.onSubmitData({
      name,
      role,
    });
  };

  return (
    <div className="col-lg-6">
      <h1>{props.title}</h1>
      <form>
        {
          props.showLoginError &&
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
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="form-label">
            I am a
          </label>
          <select
            id="role"
            className="form-select"
            onChange={(event) => {
              setRole(event.target.value);
            }}
            defaultValue={0}
          >
            <option value={0} disabled>
              Select your role
            </option>
            {roleTypes.map(({ id, role_type }, index) => (
              <option key={id} value={id}>
                {role_type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={createAccount}
            disabled={name === '' || role === ''}
          >
            Create my account
          </button>
        </div>
        <div className="text-center">
          <Link to="/login" className="form-text">
            Cancel account creation
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SetupAccount;
