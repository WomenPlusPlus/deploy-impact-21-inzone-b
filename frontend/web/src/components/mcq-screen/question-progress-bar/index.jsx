import './question-progress-bar.scss';
import React from "react";


const QuestionProgressBar = (props) => {
  return (
    <div className='mcq-progress'>
      {[...Array(props.questionsNumber).keys()].map((n) => (
        <>
          <span className={props.currentQuestionNumber === n ? 'number active' : 'number'} key={n}>{n+1}</span>
          <span className='bar-line' />
        </>
      ))}
    </div>
  )
}

export default QuestionProgressBar;
