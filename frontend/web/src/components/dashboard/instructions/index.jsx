import React from 'react'
import {Button} from 'react-bootstrap';  
import './_instructions.scss' 
import clock from "../../../assets/instructions/clock.svg"

const Instructions = () => {
    return (
        <div className="instructions__container">
        <div className="instructions__wrapper instructions__wrapper--left">
            <h4>
               Welcome to your Global Health MCQ assessment 
            </h4>
            <p>You’re about to start your Global Health MCQ. Please read carefully the instructions and we wish you good luck!</p>
            <div className="instructions__buttons">
            <Button variant="outline-primary">Cancel</Button>
            <Button variant="primary">Start exam</Button>
            </div>
        </div>
        <div className="instructions__wrapper instructions__wrapper--right">
            <div className="instruction__first">
                <div className="instruction__inner">
                <img src={clock} alt="clock"/>
                <div>
                    <h6>Completion time</h6>
                </div>
                </div>
            </div>
            <div className="instruction__second">
            <div className="instruction__inner"></div>
            </div>
            <div className="instruction__third">
            <div className="instruction__inner"></div>
            </div>
            <div className="instruction__fourth">
            <div className="instruction__inner"></div>
            </div>
            <div className="instruction__fifth">
            <div className="instruction__inner"></div>
            </div>
        </div>
        </div>
    )
}

export default Instructions
