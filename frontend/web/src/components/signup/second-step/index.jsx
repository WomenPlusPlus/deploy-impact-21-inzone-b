import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "../../../shared/axios"

function SecondStep(props) {
  const [name, setName] = React.useState('')
  const [role, setRole] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [course, setCourse] = React.useState('')
  const [language, setLanguage] = React.useState('')

  const [roleTypes, setRoleTypes] = React.useState([])
  const [courseLocations, setCourseLocations] = React.useState([])
  const [courses, setCourses] = React.useState([])
  const [languages, setLanguages] = React.useState('')

  const fetchRoleTypes = useCallback(async () => {
    try {
      const response = await fetch("https://edunity-backend.azurewebsites.net/role-types")
      if (!response.ok) {
        throw new Error('Could not get role types')
      }
      const data = await response.json()
      setRoleTypes(data);
    } catch (error) {
      console.log(error)
    }
  }, []);

  const fetchCourseLocations = useCallback(async () => {
    try {
      const response = await fetch("https://edunity-backend.azurewebsites.net/course-locations")
      if (!response.ok) {
        throw new Error('Could not get course locations')
      }
      const data = await response.json()
      setCourseLocations(data);
    } catch (error) {
      console.log(error)
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch("https://edunity-backend.azurewebsites.net/courses")
      if (!response.ok) {
        throw new Error('Could not get courses')
      }
      const data = await response.json()
      setCourses(data);
    } catch (error) {
      console.log(error)
    }
  }, []);

  const fetchLanguages = useCallback(async () => {
    try {
      const response = await fetch("https://edunity-backend.azurewebsites.net/supported-languages")
      if (!response.ok) {
        throw new Error('Could not get courses')
      }
      const data = await response.json()
      setLanguages(data);
    } catch (error) {
      console.log(error)
    }
  }, []);

  useEffect(() => {
    console.log(language)
    fetchRoleTypes();
    fetchCourseLocations();
    fetchCourses();
    fetchLanguages()
  }, [fetchRoleTypes, fetchCourseLocations, fetchCourses, fetchLanguages])

  const createAccount = () => {
    props.onSubmitData({
      name,
      role,
      location,
      course,
      language
    })
  }

  return (
    <div className="col-lg-6">
      <h1>{props.title}</h1>
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
            value={name}
            onChange={(event) => {setName(event.target.value)}}
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
            defaultValue={0}
          >
            <option value={0} disabled>
              Select your role
            </option>
            {roleTypes.map(({ id, role_type }, index) => <option key={id} value={id} >{role_type}</option>)}
          </select>
        </div>
        { role === '1' &&
        <div className="mb-4">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <select
            id="location"
            className="form-select"
            onChange={(event) => {setLocation(event.target.value)}}
            defaultValue={0}
          >
            <option value={0} disabled>
              Select your location
            </option>
            {courseLocations.map(({ id, location }) => <option key={id} value={location} >{location}</option>)}
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
            defaultValue={0}
          >
            <option value={0} disabled>
              Select your course
            </option>
            {courses.map(({ id, name }, index) => <option key={id} value={name} >{name}</option>)}
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
            defaultValue={0}
          >
            <option value={0} disabled>
              Select language
            </option>
            {languages.map(({ id, language }, index) => <option key={id} value={language} >{language}</option>)}
          </select>
        </div>
        }
        <div className="mb-5">
          <button type="button" className="btn btn-primary w-100" onClick={createAccount}>
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

export default SecondStep;
