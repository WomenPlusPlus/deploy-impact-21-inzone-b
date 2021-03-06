import EntryScreen from "../entry-screen";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../shared/axios";
import FirstStep from "./first-step";
import SetupAccount from "./setup-account";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import Student from "./student";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [signupStep, setSignupStep] = useState('first-step')
  const [student, setStudent] = useState({})

  const [showLoginError, setShowLoginError] = useState(false);

  const signUp = async (student) => {
    axios.post("student", student)
      .then((response) => {
        dispatch(
          login({
            email: student.email,
          })
        );
        // we direct to login page after signup successfully
        // so that previously-logged-in user will be reset
        history.push("/login");
      })
      .catch((error) => {
        setShowLoginError(true);
      })
  }

  const firstStepHandler = (data) => {
    setStudent({
      email: data.email,
      password: data.password
    });
    setSignupStep('setup-account');
  }

  const setupAccountHandler = async (data) => {
    setStudent((prevState) => {
      return {
        ...prevState,
        full_name: data.name,
      }
    });
    setSignupStep('student');
  }

  const studentHandler = async (data) => {
    // setStudent((prevState) => {
    //   return {
    //     ...prevState,
    //     course_location: data.location,
    //     course_name: data.course,
    //     language: data.language
    //   }
    // });
    const s = {
      ...student,
      course_location: data.location,
      course_name: data.course,
      language: data.language
    };
    await signUp(s);
  }

  return (
    <EntryScreen>
      <div className="container">
        <div className="row justify-content-center">
          { signupStep === 'first-step' && <FirstStep
            title="Welcome to ExamPortal"
            onSubmitData={firstStepHandler}
          /> }
          { signupStep === 'setup-account' && <SetupAccount
            title="Let's set up your account"
            onSubmitData={setupAccountHandler}
          /> }
          { signupStep === 'student' && <Student
            title="Let's set up your account"
            onSubmitData={studentHandler}
            showLoginError={showLoginError}
          /> }
        </div>
      </div>
    </EntryScreen>
  )
}

export default Signup;
