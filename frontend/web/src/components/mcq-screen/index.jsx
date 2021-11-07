import '../../scss/custom.scss';
import './mcq-screen.scss';
import React, { useState } from "react";
import Question from "./question";
import QuestionProgressBar from "./question-progress-bar";
import {Button, Modal} from 'react-bootstrap';    

const MCQScreen = () => {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0)
  const [questions] = useState([
    {
      'question': 'What percentage of households globally lack access to basic hand-washing facilities?',
      'questionNo': 1,
      'answers': [
        {
          'label': 'A',
          'text': '20%'
        },
        {
          'label': 'B',
          'text': '30%'
        },
        {
          'label': 'C',
          'text': '50%'
        },
        {
          'label': 'D',
          'text': '60%'
        }
      ]
    },
    {
      'question': 'What is the basic definition of a noncommunicable disease?',
      'questionNo': 2,
      'answers': [
        {
          'label': 'A',
          'text': 'A disease that is relatively uncommon'
        },
        {
          'label': 'B',
          'text': 'A disease for which there is no known cure'
        },
        {
          'label': 'C',
          'text': 'A disease that can be passed from person to person only through close and sustained contact'
        },
        {
          'label': 'D',
          'text': 'A disease that cannot be passed from person to person'
        }
      ]
    }
  ])
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [currentChosenAnswer, setCurrentChosenAnswer] = useState('');

  const chooseAnswerHandler = (label) => {
    setCurrentChosenAnswer(label);
  }

  const nextQuestion = () => {
    setChosenAnswers((prevState) => {
      return [...prevState, currentChosenAnswer];
    });
    setCurrentQuestionNumber((prevState) => {
      return prevState + 1;
    });
    setCurrentChosenAnswer((prevState) => {
      return '';
    })
  }

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const handleCloseModal = () => setShowSubmitModal(false);
  const handleShowModal = () => setShowSubmitModal(true);

  const showSubmitScreen = () => {
    handleShowModal();
  }

  return (
    <div className='mcq-screen'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='question-wrapper'>
              <QuestionProgressBar
                currentQuestionNumber={currentQuestionNumber}
                questionsNumber={questions.length}
              />
              <Question
                questionData={questions[currentQuestionNumber]}
                chooseAnswerHandler={chooseAnswerHandler}
                currentChosenAnswer={currentChosenAnswer}
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 d-flex justify-content-end'>
            {currentQuestionNumber < questions.length - 1 && 
              <button className='btn btn-primary my-3' disabled={currentChosenAnswer === ''} onClick={nextQuestion}>Next</button>
            }
            {currentQuestionNumber === questions.length - 1 && 
              <button className='btn btn-primary my-3' disabled={currentChosenAnswer === ''} onClick={showSubmitScreen}>Next</button>
            }
          </div>
        </div>
      </div>

      <Modal show={showSubmitModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>You have completed your MCQ exam!</Modal.Title>
        </Modal.Header>
        <Modal.Body>All your answers have been saved (even when you were offline). Make sure you have internet connection and submit your exam to finish.</Modal.Body>
        {chosenAnswers}
        <Modal.Footer>
          {/* TODO: send data to backend */}
          <Button variant="primary" onClick={handleCloseModal}>
            Submit exam
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MCQScreen;
