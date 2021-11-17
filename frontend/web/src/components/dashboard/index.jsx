import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import axios from "../../shared/axios";
import { Button } from "react-bootstrap";

import CongratulationsModal from "./modal";

import "./_dashboard.scss";
import updatesImage from "../../assets/dashboard/updates.svg";
import progressImage from "../../assets/dashboard/progress.svg";
import { Trans, useTranslation } from "react-i18next";

const Dashboard = () => {
  // const user = useSelector((state) => state.user.value);
  // eslint-disable-next-line
  const [firstLogin, setFirstLogin] = useState(true);
  const [currentExams, setCurrentExams] = useState([]);
  const [courseName, setCourseName] = useState([]);
  const [examNames, setExamNames] = useState([]);
  const [fullName, setFullName] = useState("");

  const { i18n } = useTranslation();

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    const currentEmail = localStorage.getItem("currentEmail");

    const fetchCurrentExamData = async () => {
      var currentExamList = [];
      var currentExamNameList = [];
      await axios
        .get(`student/${currentEmail}/current-exams`)
        .then((response) => {
          console.log(response, "response current exams of a student");
          currentExamList = response.data;
        });
      setCurrentExams(currentExamList);
      for (let i = 0; i < currentExamList.length; i++) {
        const examSetId = currentExamList[i].exam_set_id;
        const res = await axios.get(`exam-set/${examSetId}`);
        // TODO: should we check for response status?
        console.log(res.data, "res data from loop");
        currentExamNameList.push(res.data.name);
      }
      setExamNames(currentExamNameList);
    };

    if (isLogged) {
      axios.get(`student/${currentEmail}`).then((response) => {
        console.log(response.data, "student");
        setFullName(response.data.full_name);
        setFirstLogin(response.data.first_query_done);
        setCourseName(response.data.course_name);
        if (response.data.language === "Français")
          localStorage.setItem("i18nextLng", "fr");
        else if (response.data.language === "Arabic")
          localStorage.setItem("i18nextLng", "ar");
        else localStorage.setItem("i18nextLng", "en");
        const lng = localStorage.getItem("i18nextLng");
        i18n.changeLanguage(lng);
      });

      fetchCurrentExamData();
    }
  }, []);

  const handleButton = (examSet, exam) => {
    localStorage.setItem("examId", exam);
    localStorage.setItem("id", examSet);
  };

  return (
    <div className="container-fluid" style={{ padding: 0 }}>
      <div className="dash__container">
        <div className="section section--top">
          <div className="column--left column-top">
            <h3 className="title">
              <Trans key="sub-1" i18nKey="static.subtitle-1">
                Your latest updates
              </Trans>
            </h3>
            <div className="inner__wrapper inner__wrapper--top">
              <img src={updatesImage} alt="updates" id="img--updates" />
              <p className="p__text">
                <Trans key="img-1" i18nKey="static.img-text-1">
                  You&apos;re all caught up!
                </Trans>
              </p>
            </div>
          </div>
          <div className="column--right column-top">
            <h3 className="title">
              <Trans key="sub-2" i18nKey="static.subtitle-2">
                Your program
              </Trans>
            </h3>
            <div className="inner__wrapper inner__wrapper--top">
              <img src={progressImage} alt="progress" id="img--progress" />
              <p className="p__text">
                <Trans key="img-2" i18nKey="static.img-text-2">
                  Your program and progress will appear here
                </Trans>
              </p>
            </div>
          </div>
        </div>
        {firstLogin ? (
          <></>
        ) : (
          <CongratulationsModal
            fullName={fullName}
            className="congratulations__modal"
          ></CongratulationsModal>
        )}
        <div className="section section--bottom">
          <div className="column--left column-bottom">
            <h3 className="title">
              <Trans key="sub-3" i18nKey="static.subtitle-3">
                Your exam status
              </Trans>
            </h3>
            <div className="inner__wrapper inner__wrapper--bottom">
              <h5 className="h5__line line">
                <Trans key="inntert-title-1" i18nKey="static.inner-title-1">
                  Upcoming exams
                </Trans>
              </h5>
              {currentExams.length ? (
                <>
                  {currentExams.map((exam, i) => {
                    localStorage.setItem("examId", exam.exam_set_id);
                    localStorage.setItem("id", exam.id);
                    return (
                      <div key={i} className="exams__container">
                        <div className="exams__wrapper--left">
                          <h6>
                            {courseName} - {examNames[i]}
                          </h6>
                          <p>Limit: {exam.closed_at}</p>
                        </div>
                        <div className="exams__wrapper--right">
                          <Link
                            to={{
                              pathname: "/instructions",
                            }}
                          >
                            <Button
                              variant="primary"
                              onClick={() =>
                                handleButton(exam.exam_set_id, exam.id)
                              }
                            >
                              Start exam
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <p className="p__text">
                  <Trans key="third-card-text" i18nKey="static.third-card-text">
                    Your upcoming exam sessions will be added here
                  </Trans>
                </p>
              )}
            </div>
          </div>
          <div className="column--right column-bottom" id="column--notitle">
            <div className="inner__wrapper inner__wrapper--bottom">
              <div className="inner__nav line">
                <h5 className="h5__line">
                  <Trans key="inntert-title-2" i18nKey="static.inner-title-2">
                    Past exams
                  </Trans>
                </h5>
                <div className="nav__pastexams">
                  <a href="/">
                    <Trans
                      key="section-1"
                      i18nKey="static.fourth-card-section-1"
                    >
                      Completion date
                    </Trans>
                  </a>
                  <a href="/">
                    <Trans
                      key="section-2"
                      i18nKey="static.fourth-card-section-2"
                    >
                      Status
                    </Trans>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
