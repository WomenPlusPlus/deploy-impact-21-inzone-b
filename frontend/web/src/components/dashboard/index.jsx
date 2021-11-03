import React, {useState, useEffect} from "react";
// import { useSelector } from "react-redux";
import axios from "../../shared/axios";

import CongratulationsModal from "./modal";

import "./_dashboard.scss";
import updatesImage from "../../assets/dashboard/updates.svg";
import progressImage from "../../assets/dashboard/progress.svg";
import { Trans, useTranslation } from "react-i18next";

const Dashboard = () => {
  // const user = useSelector((state) => state.user.value);
  // eslint-disable-next-line
  const [firstLogin, setFirstLogin] =  useState(true);

  const {i18n} = useTranslation()
  
  useEffect(() => {
    const isLogged = localStorage.getItem('isLogged');
    const currentEmail = localStorage.getItem('currentEmail');
    

    if (isLogged) {
      axios
        .get(`student/${currentEmail}`)
        .then((response) => {
          console.log(response)
        })
        const lng = localStorage.getItem('i18nextLng');
        i18n.changeLanguage(lng)
    }
  }, []);

  return (
    <div className="container-fluid" style={{ padding: 0 }}>
      <div className="dash__container">
        <div className="section section--top">
          <div className="column--left column-top">
            <h3 className="title">
            <Trans key="sub-1" i18nKey="description.subtitle-1">
            Your latest updates
            </Trans>
            </h3>
            <div className="inner__wrapper inner__wrapper--top">
              <img src={updatesImage} alt="updates" id="img--updates" />
              <p className="p__text">You&apos;re all caught up!</p>
            </div>
          </div>
          <div className="column--right column-top">
            <h3 className="title">
            <Trans key="sub-2" i18nKey="description.subtitle-2">
            Your program
            </Trans>
            </h3>
            <div className="inner__wrapper inner__wrapper--top">
              <img src={progressImage} alt="progress" id="img--progress" />
              <p className="p__text">
                Your program and progress will appear here
              </p>
            </div>
          </div>
        </div>
        {firstLogin ? <CongratulationsModal className="congratulations__modal"></CongratulationsModal> : <></>}
        <div className="section section--bottom">
          <div className="column--left column-bottom">
            <h3 className="title">
            <Trans key="sub-3" i18nKey="description.subtitle-3">
            Your exam status
            </Trans>
            </h3>
            <div className="inner__wrapper inner__wrapper--bottom">
              <h5 className="h5__line line">Upcoming exams</h5>
              <p className="p__text">
                Your upcoming exam sessions will be added here
              </p>
            </div>
          </div>
        <div className="column--right column-bottom" id="column--notitle">
          <div className="inner__wrapper inner__wrapper--bottom">
            <div className="inner__nav line">
              <h5 className="h5__line">Post exams</h5>
              <div className="nav__pastexams">
                <a href="/">Completion date</a>
                <a href="/">Status</a>
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
