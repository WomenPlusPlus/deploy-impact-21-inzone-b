import "../../scss/custom.scss";
import "./mcq-screen.scss";
import React, { useEffect, useState } from "react";
import Question from "./question";
import QuestionProgressBar from "./question-progress-bar";
import { Button, Modal } from "react-bootstrap";
import axios from "../../shared/axios";
import { useHistory, useLocation } from "react-router";

const MCQScreen = () => {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [examData, setExamData] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const { id } = location.examSet;
  const examId = localStorage.getItem("examId");

  useEffect(() => {
    axios.get("exam-questions").then((response) => {
      const currentExamSet = response.data.filter((el) => {
        return el.exam_set_id === id;
      });
      console.log(response, "response");
      console.log(currentExamSet, "current exam set filtered by id");
      setQuestions(currentExamSet);
      setExamData(currentExamSet);
    });
  }, []);

  // eslint-disable-next-line
  const [chosenAnswers, setChosenAnswers] = useState([]);
  console.log("choosen answers", chosenAnswers);
  const [currentChosenAnswer, setCurrentChosenAnswer] = useState("");

  const chooseAnswerHandler = (label) => {
    console.log(label);
    setCurrentChosenAnswer({
      question_id: examData[currentQuestionNumber].id,
      exam_id: Number(examId),
      answer_indexes: [Number(label)],
      answer_texts: [examData[currentQuestionNumber].possible_answers[label]],
    });
  };

  const nextQuestion = () => {
    console.log(currentChosenAnswer.answer_indexes, "current chosen ");
    setChosenAnswers((prevState) => {
      return [...prevState, { ...currentChosenAnswer }];
    });
    setCurrentQuestionNumber((prevState) => {
      return prevState + 1;
    });
    setCurrentChosenAnswer((prevState) => {
      return "";
    });
  };

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  // submit questions on handleclosemodal
  const handleCloseModal = (e) => {
    console.log(chosenAnswers, "chosenAnsers ----------");
    axios.post(`exam/${examId}/student-answers`, chosenAnswers);
    history.push("/home");
    setShowSubmitModal(false);
  };
  const handleShowModal = () => {
    setShowSubmitModal(true);
  };

  const showSubmitScreen = () => {
    console.log(currentChosenAnswer, "current chosen ");
    setChosenAnswers((prevState) => {
      return [...prevState, { ...currentChosenAnswer }];
    });
    handleShowModal();
  };

  return (
    <div className="mcq-screen">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {questions.length > 0 && (
              <div className="question-wrapper">
                <QuestionProgressBar
                  currentQuestionNumber={currentQuestionNumber}
                  questionsNumber={questions.length}
                />
                <Question
                  questionData={questions[currentQuestionNumber]}
                  currentQuestionNumber={currentQuestionNumber}
                  chooseAnswerHandler={chooseAnswerHandler}
                  currentChosenAnswer={currentChosenAnswer.answer_indexes}
                />
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            {currentQuestionNumber < questions.length - 1 && (
              <button
                className="btn btn-primary my-3"
                disabled={currentChosenAnswer === ""}
                onClick={nextQuestion}
              >
                Next
              </button>
            )}
            {currentQuestionNumber === questions.length - 1 && (
              <button
                className="btn btn-primary my-3"
                disabled={currentChosenAnswer === ""}
                onClick={showSubmitScreen}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal show={showSubmitModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>You have completed your MCQ exam!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          All your answers have been saved (even when you were offline). Make
          sure you have internet connection and submit your exam to finish.
        </Modal.Body>
        {/* {chosenAnswers} */}
        <Modal.Footer>
          {/* TODO: send data to backend */}
          <Button variant="primary" onClick={handleCloseModal}>
            Submit exam
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MCQScreen;
