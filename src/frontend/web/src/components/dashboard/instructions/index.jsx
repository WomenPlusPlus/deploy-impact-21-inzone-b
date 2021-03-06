import React, { useState, useEffect } from "react";
import axios from "../../../shared/axios";
import { Button } from "react-bootstrap";
import "./_instructions.scss";
import clock from "../../../assets/instructions/clock.svg";
import check from "../../../assets/instructions/check.svg";
import question from "../../../assets/instructions/question.svg";
import warning from "../../../assets/instructions/warning.svg";
import windowsvg from "../../../assets/instructions/window.svg";
import { Link } from "react-router-dom";

const Instructions = () => {
  const [timeLimit, setTimeLimit] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState([]);
  const [examName, setExamName] = useState([]);
  // const location = useLocation();
  // const { id } = location.examSet;
  // const { examId } = location.examId;
  const id = localStorage.getItem("id");
  const examId = localStorage.getItem("examId");

  useEffect(() => {
    const currentEmail = localStorage.getItem("currentEmail");
    // localStorage.setItem("examId", examId);

    if (currentEmail) {
      axios.get(`exam/${examId}`).then((response) => {
        setTimeLimit(response.data.duration_in_minutes);
      });
      axios.get(`exam-set/${id}/number-of-questions`).then((response) => {
        console.log(
          response.data,
          "get number of questions of an exam set by id"
        );
        setNumberOfQuestions(response.data.number_of_questions);
      });
      axios.get(`exam-set/${id}`).then((response) => {
        console.log(response.data, "response an exam set by id");
        setExamName(response.data.name);
      });
    }
  }, []);
  return (
    <div className="instructions__container">
      <div className="instructions__wrapper instructions__wrapper--left">
        <h4 className="instructions__title">Welcome to your {examName}</h4>
        <p className="instructions__text">
          You’re about to start your {examName}. Please read carefully the
          instructions and we wish you good luck!
        </p>
        <div className="instructions__buttons">
          <Link to="/home">
            <Button className="instructions__cancel" variant="outline-primary">
              Cancel
            </Button>
          </Link>
          <Link
            to={{
              pathname: "/exam/mcq",
              examSet: {
                id: id,
              },
            }}
          >
            <Button variant="primary">Start exam</Button>
          </Link>
        </div>
      </div>
      <div className="instructions__wrapper instructions__wrapper--right">
        <div className="instruction__first">
          <div className="instruction__inner">
            <img className="instruction__img" src={clock} alt="clock" />
            <div>
              <h6>Completion time</h6>
              <p>
                You have <b>{timeLimit}</b> minutes to complete the exam. The
                counter starts as soon as you click on Start Exam.
              </p>
            </div>
          </div>
        </div>
        <div className="instruction__second">
          <div className="instruction__inner">
            <img className="instruction__img" src={check} alt="check" />
            <div>
              <h6>Multiple Choice Questions</h6>
              <p>
                This is a multiple choice question assessment. You will be
                presented a number of answers but only 1 is correct.
              </p>
            </div>
          </div>
        </div>
        <div className="instruction__third">
          <div className="instruction__inner">
            <img className="instruction__img" src={question} alt="question" />
            <div>
              <h6>Total number of questions</h6>
              <p>
                You have a total of <b>{numberOfQuestions}</b> question(s) to
                answer.
              </p>
            </div>
          </div>
        </div>
        <div className="instruction__fourth">
          <div className="instruction__inner">
            <img className="instruction__img" src={windowsvg} alt="window" />
            <div>
              <h6>Exam Mode</h6>
              <p>
                During the exam mode, you are not allowed to leave the current
                tab nor to open other windows, tabs, files. All your answers are
                automatically saved, even when your internet connection is weak
                or offline.
              </p>
            </div>
          </div>
        </div>
        <div className="instruction__fifth">
          <div className="instruction__inner">
            <img className="instruction__img" src={warning} alt="warning" />
            <div>
              <h6>General rules</h6>
              <p>
                This is an individual exam. Once you start, you may not: talk to
                other students; use your phones; communicate digitally and there
                are no breaks. Not following these rules will automatically
                invalidate your assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
