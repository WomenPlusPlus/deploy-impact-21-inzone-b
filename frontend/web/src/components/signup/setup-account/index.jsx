import React from "react";
import { Link } from "react-router-dom";
import EntryScreen from "../../entry-screen";

function SetupAccountScreen() {
  const [role, setRole] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [course, setCourse] = React.useState('')
  const [setLanguage] = React.useState('')

  return (
    <EntryScreen>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h1>Let&apos;s set up your account</h1>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="form-label">
                  I am a
                </label>
                <select
                  id="role"
                  className="form-select"
                  onChange={(event) => {setRole(event.target.value)}}
                >
                  <option selected disabled>
                    Select your role
                  </option>
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="course-coordinator">Course coordinator</option>
                  <option value="tutor">Tutor</option>
                  <option value="professor">Professor</option>
                </select>
              </div>
              { role === 'student' &&
              <div className="mb-4">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <select
                  id="location"
                  className="form-select"
                  onChange={(event) => {setLocation(event.target.value)}}
                >
                  <option selected disabled>
                    Select your location
                  </option>
                  <option value="azraq">Azraq</option>
                  <option value="kakuma">Kakuma</option>
                </select>
              </div>
              }
              { location !== '' &&
              <div className="mb-4">
                <label htmlFor="course" className="form-label">
                  My course
                </label>
                <select
                  id="course"
                  className="form-select"
                  onChange={(event) => {setCourse(event.target.value)}}
                >
                  <option selected disabled>
                    Select your course
                  </option>
                  <option value="1">Course 1</option>
                  <option value="2">Course 2</option>
                  <option value="3">Course 3</option>
                </select>
              </div>
              }
              { course !== '' &&
              <div className="mb-5">
                <label htmlFor="language" className="form-label">
                  Language
                </label>
                <select
                  id="language"
                  className="form-select"
                  onChange={(event) => {setLanguage(event.target.value)}}
                >
                  <option selected disabled>
                    Select language
                  </option>
                  <option value="en">English</option>
                </select>
              </div>
              }
              <div className="mb-5">
                <button type="button" className="btn btn-primary w-100">
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
        </div>
      </div>
    </EntryScreen>
  );
}

export default SetupAccountScreen;
