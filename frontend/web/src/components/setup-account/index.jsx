import React from "react";

function SetupAccountScreen() {
  return (
    <div className="container">
      <div className="row entry-screen">
        <div className="col-lg-6">
          <h1>Let&apos;s set up your account</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                I am a
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected disabled>
                  Select your role
                </option>
                <option value="1">Student</option>
                <option value="2">Admin</option>
                <option value="3">Course coordinator</option>
                <option value="4">Tutor</option>
              </select>
            </div>
            <div className="mb-5">
              <label htmlFor="exampleInputPassword1" className="form-label">
                My course
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected disabled>
                  Select your course
                </option>
                <option value="1">Course 1</option>
                <option value="2">Course 2</option>
                <option value="3">Course 3</option>
              </select>
            </div>
            <div className="mb-5">
              <button type="button" className="btn btn-primary w-100">
                Create my account
              </button>
            </div>
            <div>
              <div className="form-text text-center">
                Cancel account creation
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SetupAccountScreen;
