import React from "react";
import { useSelector } from "react-redux";
import Nav from "../navigation-bar";

import "./_dashboard.scss";
import updatesImage from "../../assets/dashboard/updates.svg";
import progressImage from "../../assets/dashboard/progress.svg";

const Dashboard = () => {
  const user = useSelector((state) => state.user.value);
  return (
    <div className="container-fluid" style={{ padding: 0 }}>
      <Nav />
      <div className="dash__container">
        <div className="section section--top">
          <div className="column--left column-top">
            <h3 className="title">Your latest updates {user.email}</h3>
            <div className="inner__wrapper inner__wrapper--top">
              <img src={updatesImage} alt="updates" id="img--updates" />
              <p className="p__text">You&apos;re all caught up!</p>
            </div>
          </div>
          <div className="column--right column-top">
            <h3 className="title">Your program</h3>
            <div className="inner__wrapper inner__wrapper--top">
              <img src={progressImage} alt="progress" id="img--progress" />
              <p className="p__text">
                Your program and progress will appear here
              </p>
            </div>
          </div>
        </div>
        <div className="section section--bottom">
          <div className="column--left column-bottom">
            <h3 className="title">Your exam status</h3>
            <div className="inner__wrapper inner__wrapper--bottom">
              <h5 className="h5__line line">Upcoming exams</h5>
              <p className="p__text">
                Your upcoming exam sessions will be added here
              </p>
            </div>
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
              <p className="p__text">
                Your grades for your past exams will be added here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
