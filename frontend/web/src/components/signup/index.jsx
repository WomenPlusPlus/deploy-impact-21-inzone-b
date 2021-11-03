import EntryScreen from "../entry-screen";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../shared/axios";
import FirstStep from "./first-step";
import SecondStep from "./second-step";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [signupStep, setSignupStep] = useState(1)
  const [student, setStudent] = useState({})

  const signUp = async (student) => {
    axios.post("student", student)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          dispatch(
            login({
              email: student.email,
            })
          );
          localStorage.setItem("isLogged", true);
          history.push("/home");
        } else {
          alert("signup was not successful :(");
          console.log("testing");
        }
      });
  }

  const firstStepHandler = (data) => {
    setStudent({
      email: data.email,
      password: data.password
    });
    setSignupStep(2);
  }

  const secondStepHandler = async (data) => {
    // setStudent({
    //   ...student,
    //   full_name: data.name,
    //   course_location: data.location,
    //   course_name: data.course,
    //   language: data.language
    // });
    const s = {
      ...student,
      full_name: data.name,
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
          { signupStep === 1 && <FirstStep
            title="Welcome to ExamPortal"
            onSubmitData={firstStepHandler}
          /> }
          { signupStep === 2 && <SecondStep
            title="Let's set up your account"
            onSubmitData={secondStepHandler}
          /> }
        </div>
      </div>
    </EntryScreen>
  )
}

export default Signup;
