import React from "react";
import { useSelector } from "react-redux";
import { Trans } from "react-i18next";

import "./_nav.scss";
import icon from "../../assets/dashboard/favicon.png";
import demo from "../../assets/dashboard/face_demo.png";

const Nav = () => {
  // TO DO: get this information from shared state
  // const userIsLoggedIn = false;

  const user = useSelector((state) => state.user.value);

  return (
    <div className="nav__container">
      <div className="wrapper--left">
        <img id="nav__logo" src={icon} alt="logo" />
      </div>
      {user && (
        <div className="wrapper--middle">
          <a href="/home">
            <Trans key="link-1" i18nKey="static.link-1">
              Overview
            </Trans>
          </a>
          <a href="/home">
            <Trans key="link-1" i18nKey="static.link-2">
              Messages
            </Trans>
          </a>
          <a href="/home">
            <Trans key="link-1" i18nKey="static.link-3">
              Exams
            </Trans>
          </a>
        </div>
      )}
      {user && (
        <div className="wrapper--right">
          <img id="nav__img--circle" src={demo} alt="profile" />
        </div>
      )}
    </div>
  );
};

export default Nav;
