import './question.scss';
import React from "react";

const Question = (props) => {
  // const [chosenAnswer, setChosenAnswer] = useState();

  const pickAnswer = (event) => {
    let label = event.target.id ? event.target.id : event.target.parentElement.id;

    props.chooseAnswerHandler(label);

    // setChosenAnswer((prevLabel) => {
    //   return label;
    // });
    // console.log(chosenAnswer)
  };

  return (
    <div className='mcq-screen-question'>
      <h4>
        {props.questionData.questionNo}. {props.questionData.question}
      </h4>
      <div className='answers-list'>
        {
          props.questionData.answers.map((answer) => (
            <div key={answer.label} id={answer.label} className={`answer ${props.currentChosenAnswer === answer.label ? 'active' : ''}`} onClick={pickAnswer}>
              <span className='answer-label'>{answer.label}</span>
              <span className='answer-text'>{answer.text}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Question;
