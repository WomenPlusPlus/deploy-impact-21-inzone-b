import React from "react";

// import "../../scss/dashboard/_nav.scss";
import "./_nav.scss";
import icon from "../../assets/dashboard/favicon.png";
import demo from "../../assets/dashboard/face_demo.png";

const Nav = () => {
  return (
    <div className="nav__container">
      <div className="wrapper--left">
        <img id="nav__logo" src={icon} alt="logo" />
      </div>
      <div className="wrapper--middle">
        <a href="#" tabindex="1">
          Overview
        </a>
        <a href="#" tabindex="2">
          Messages
        </a>
        <a href="#" tabindex="3">
          Exams
        </a>
      </div>
      <div className="wrapper--right">
        <img id="nav__img--circle" src={demo} alt="profile" />
      </div>
    </div>
  );
};

export default Nav;
