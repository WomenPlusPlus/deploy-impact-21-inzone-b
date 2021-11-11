import './question.scss';
import React from "react";

const Question = (props) => {

  const pickAnswer = (event) => {
    let label = event.target.id ? event.target.id : event.target.parentElement.id;
    props.chooseAnswerHandler(label);
  };

  return (
    <div className='mcq-screen-question'>
      <h4>
          {props.currentQuestionNumber}. {props.questionData.question_content}
      </h4>
      <div className='answers-list'>
        {
          props.questionData.possible_answers.map((answer, index) => (
            <div key={`answer-${answer}`} id={index} className={`answer ${parseInt(props.currentChosenAnswer) === parseInt(index) ? 'active' : ''}`} onClick={pickAnswer}>
                <span className='answer-label'>{index}</span>
              <span className='answer-text'>{answer}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Question;
