import React, { useState } from "react";
import "./_updates.scss";
import tasks from "../../../assets/dashboard/tasks.svg";

const Updates = ({
  currentExams,
  pastExams,
  courseName,
  examTypes,
  examNames,
}) => {
  const [latestRead, setLatestRead] = useState([]);
  const handleNotification = (i) => {
    setLatestRead((state) => [...state, i]);
  };
  return (
    <div style={{ width: "100%" }}>
      <div></div>
      {currentExams.length ? (
        <>
          {currentExams.map((exam, i) => {
            return (
              <div
                onClick={() => handleNotification(i)}
                key={i}
                className={
                  "updates__wrapper " +
                  (latestRead[i] === i
                    ? "hide__notification"
                    : "show__notification")
                }
              >
                <div className="updates__container">
                  <div>
                    <img src={tasks} alt="tasks" />
                  </div>
                  <div>
                    <h6>
                      {courseName} - {examNames[i]}
                    </h6>
                    <p>
                      You can now start the {courseName} - {examNames[i]}
                    </p>
                  </div>
                </div>
                <span className="dot"></span>
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
      <div>
        {pastExams.length ? (
          <>
            {pastExams.map((exam, i) => {
              return (
                <div key={i} className="updates__wrapper">
                  <div className="updates__container">
                    <div>
                      <img src={tasks} alt="tasks" />
                    </div>
                    <div>
                      <h6>
                        {courseName} - {examNames[i]}
                      </h6>
                      <p>
                        You have successfully completed the {courseName} -{" "}
                        {examNames[i]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Updates;
