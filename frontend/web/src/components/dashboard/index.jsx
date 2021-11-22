import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
// import { useSelector } from "react-redux";
import axios from "../../shared/axios";
import { truncate } from "../../shared/truncate";
import { Button, Badge } from "react-bootstrap";

import CongratulationsModal from "./modal";
import Program from "./program";

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
  const [examTypes, setExamTypes] = useState([]);
  const [pastExams, setPastExams] = useState([]);
  const [progress, setProgress] = useState(0);
  const [pastExamNames, setPastExamNames] = useState([]);
  // const [pastExamTypes, setPastExamTypes] = useState([]);
  const [zoomLink, setZoomLink] = useState([]);
  const [fullName, setFullName] = useState("");

  const { i18n } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    const currentEmail = localStorage.getItem("currentEmail");

    const fetchCurrentExamData = async () => {
      var currentExamList = [];
      var currentExamNameList = [];
      let currentExamTypeList = [];
      let currenZoomLink = [];
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
        currentExamTypeList.push(res.data.exam_set_type);
        currenZoomLink.push(res.data.additional_instruction);
      }
      setExamNames(currentExamNameList);
      setExamTypes(currentExamTypeList);
      setZoomLink(currenZoomLink);
    };
    const fetchPastExamData = async () => {
      var pastExamList = [];
      var pastExamNameList = [];
      let pastExamTypeList = [];
      let progressCounter = 0;
      await axios.get(`student/${currentEmail}/past-exams`).then((response) => {
        console.log(response, "response current exams of a student");
        pastExamList = response.data;
      });
      setPastExams(pastExamList);

      for (let i = 0; i < pastExamList.length; i++) {
        const examSetId = pastExamList[i].exam_set_id;
        if (pastExamList[i].student_mark >= 7) progressCounter += 20;
        const res = await axios.get(`exam-set/${examSetId}`);
        // TODO: should we check for response status?
        console.log(res.data, "res data from loop");
        pastExamNameList.push(res.data.name);
        pastExamTypeList.push(res.data.exam_set_type);
      }
      setPastExamNames(pastExamNameList);
      setProgress(progressCounter);
    };

    if (isLogged) {
      axios.get(`student/${currentEmail}`).then((response) => {
        console.log(response.data, "student");
        // TODO: check 'validated_by_admin' value
        if (response.data.validated_by_admin === false) {
          history.push("/awaiting-admin-approval");
        }
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
      fetchPastExamData();
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
            {currentExams.length ? (
              <div className="inner__wrapper inner__wrapper--top--program">
                <Program progress={progress}></Program>
              </div>
            ) : (
              <div className="inner__wrapper inner__wrapper--top">
                <img src={progressImage} alt="progress" id="img--progress" />
                <p className="p__text">
                  <Trans key="img-2" i18nKey="static.img-text-2">
                    Your program and progress will appear here
                  </Trans>
                </p>
              </div>
            )}
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
              <div className="container__overflow">
                {currentExams.length ? (
                  <>
                    {currentExams.map((exam, i) => {
                      console.log(examTypes[i], "exam types");
                      if (examTypes[i] === "MCQ exam") {
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
                      } else if (examTypes[i] === "Open-question exam") {
                        console.log(zoomLink, "zoom link");
                        return (
                          <div key={i} className="exams__container">
                            <div className="exams__wrapper--left">
                              <h6>
                                {courseName} - {examNames[i]}
                              </h6>
                              <p>Limit: {exam.closed_at}</p>
                            </div>
                            <div className="exams__wrapper--right">
                              <a
                                href={zoomLink[i]}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button variant="primary">Go to zoom</Button>
                              </a>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </>
                ) : (
                  <p className="p__text">
                    <Trans
                      key="third-card-text"
                      i18nKey="static.third-card-text"
                    >
                      Your upcoming exam sessions will be added here
                    </Trans>
                  </p>
                )}
              </div>
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
              <div className="container__overflow">
                {pastExams.length ? (
                  <>
                    {pastExams.map((exam, i) => {
                      if (exam.student_mark !== null) {
                        return (
                          <div key={i} className="past-exams__container">
                            <div className="exams__wrapper--left">
                              <h6>{pastExamNames[i]}</h6>
                            </div>
                            <p>{truncate(exam.taken_at, 17)}</p>
                            <div className="exams__wrapper--right">
                              {exam.student_mark <= 6 ? (
                                <Button variant="outline-danger w-100 mx-0 px-0 py-1">
                                  Failed
                                </Button>
                              ) : (
                                <Button variant="outline-success w-100 mx-0 px-0 py-1">
                                  Passed
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div key={i} className="past-exams__container">
                            <div className="exams__wrapper--left">
                              <h6>{pastExamNames[i]}</h6>
                            </div>
                            <p>{truncate(exam.taken_at, 17)}</p>
                            <div className="exams__wrapper--right ">
                              <Badge bg="warning">Grading in progress</Badge>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </>
                ) : (
                  <p className="p__text">
                    <Trans
                      key="third-card-text"
                      i18nKey="static.third-card-text"
                    >
                      Your grades for your past exams will be added here
                    </Trans>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
