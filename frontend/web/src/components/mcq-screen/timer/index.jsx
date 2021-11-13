import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../../../shared/axios'

const Timer = ({id}) => {
    const [ minutes, setMinutes ] = useState(0);
    const [ seconds, setSeconds ] = useState(0);

    const currentEmail = localStorage.getItem("currentEmail");

    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });
    useEffect(() => {
        axios.get(`student/${currentEmail}/current-exams`).then((response) => {
        const currentExamSet = response.data.filter((el) => {
            return el.exam_set_id === id;
        });
        console.log(response, "response student");
        console.log(currentExamSet, 'minutess')
        setMinutes(currentExamSet[0].duration_in_minutes);
        })
    }, [])

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? null
            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

export default Timer;