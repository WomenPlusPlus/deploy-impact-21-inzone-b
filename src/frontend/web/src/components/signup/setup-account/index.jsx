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

  const createAccount = (e) => {
    e.preventDefault();
    props.onSubmitData({
      name,
      role,
    });
  };

  return (
    <div className="col-lg-6">
      <h1>{props.title}</h1>
      <form onSubmit={createAccount}>
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
            type="submit"
            className="btn btn-primary w-100"
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
