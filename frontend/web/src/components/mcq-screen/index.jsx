import "../../scss/custom.scss";
import "./mcq-screen.scss";
import React, { useEffect, useState } from "react";
import Question from "./question";
import QuestionProgressBar from "./question-progress-bar";
import axios from "../../shared/axios";
import { useHistory, useLocation } from "react-router";
import Timer from "./timer";
import McqModal from "./mcq-modal";
import clock from "../../assets/mcq/clock.png";
import congrats from "../../assets/dashboard/celebration.svg";

const MCQScreen = () => {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [examData, setExamData] = useState([]);
  const [isTime, setIsTime] = useState(false);
  // eslint-disable-next-line
  const [isCheating, setIsCheating] = useState(false);
  const [modalTitle, setModalTitle] = useState(
    "You have completed your MCQ exam!"
  );
  const [modalMessage, setModalMessage] = useState(
    "All your answers have been saved (even when you were offline). Make sure you have internet connection and submit your exam to finish."
  );
  const [modalButton, setModalButton] = useState("Submit exam");
  const [modalImage, setModalImage] = useState("");

  const location = useLocation();
  const history = useHistory();
  const { id } = location.examSet;
  const examId = localStorage.getItem("examId");

  const cheatingModal = () => {
    setIsCheating(true);
    setModalTitle("we detected that you cheated");
    setModalImage("");
    setModalMessage(
      "Make sure you submit your exam with an internet connection, otherwise your score will be a 0."
    );
    handleShowModal();
  };
  const onFocus = () => {
    cheatingModal();
  };

  const visibilityChange = () => {
    if (window.visibilityState !== "visible") {
      cheatingModal();
    }
  };

  useEffect(() => {
    if (isTime) {
      setModalTitle("Time's up");
      setModalMessage(
        "Make sure you submit your exam with an internet connection, otherwise your score will be a 0."
      );
      if (modalTitle !== "we detected that you cheated") setModalImage(clock);
      handleShowModal();
    }
    window.addEventListener("focus", onFocus);
    window.addEventListener("visibilitychange", visibilityChange);
    if (isCheating) handleShowModal();
    axios.get(`exam-set/${id}/exam-questions`).then((response) => {
      const currentExamSet = response.data;
      console.log(response, "response");
      console.log(currentExamSet, "current exam set filtered by id");
      setQuestions(currentExamSet);
      setExamData(currentExamSet);
    });
    // notify backend that this exam has started by the student
    axios.put(`exam/${examId}/startExam`).then((response) => {
      console.log(response, "PUT startExam response");
    });
    return () => {
      window.removeEventListener("visibilitychange", visibilityChange);
    };
  }, [isCheating, isTime]);

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
    axios
      .post(`exam/${examId}/student-answers`, chosenAnswers)
      .then(() => {
        history.push("/home");
        setShowSubmitModal(false);
      })

      .catch((error) => {
        setModalButton("Retry");
        return Promise.reject(error);
      });
  };
  const handleShowModal = () => {
    setShowSubmitModal(true);
  };

  const showSubmitScreen = () => {
    console.log(currentChosenAnswer, "current chosen ");
    setChosenAnswers((prevState) => {
      return [...prevState, { ...currentChosenAnswer }];
    });
    setModalImage(congrats);
    handleShowModal();
  };

  return (
    <div className="mcq-screen">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {questions.length > 0 && (
              <div className="question-wrapper">
                {!isCheating ? (
                  <Timer setIsTime={setIsTime} examId={examId}></Timer>
                ) : (
                  <></>
                )}
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
      <McqModal
        showSubmitModal={showSubmitModal}
        handleCloseModal={handleCloseModal}
        modalTitle={modalTitle}
        modalMessage={modalMessage}
        modalButton={modalButton}
        modalImage={modalImage}
      ></McqModal>
    </div>
  );
};

export default MCQScreen;
