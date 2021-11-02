import React from "react";

import "./_nav.scss";
import icon from "../../assets/dashboard/favicon.png";
import demo from "../../assets/dashboard/face_demo.png";
import { useSelector } from "react-redux";

const Nav = () => {
  // TO DO: get this information from shared state
  // const userIsLoggedIn = false;

  const user = useSelector((state) => state.user.value);

  return (
    <div className="nav__container">
      <div className="wrapper--left">
        <img id="nav__logo" src={icon} alt="logo" />
      </div>
      {user &&
        <div className="wrapper--middle">
          <a href="#" tabIndex="1">
            Overview
          </a>
          <a href="#" tabIndex="2">
            Messages
          </a>
          <a href="#" tabIndex="3">
            Exams
          </a>
        </div>
      }
      {user &&
        <div className="wrapper--right">
          <img id="nav__img--circle" src={demo} alt="profile" />
        </div>
      }
    </div>
  );
}

export default Nav;
