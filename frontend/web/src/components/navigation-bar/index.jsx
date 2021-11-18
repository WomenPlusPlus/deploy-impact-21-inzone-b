import React from "react";
import { useSelector } from "react-redux";
import { Trans } from "react-i18next";

import "./_nav.scss";
import icon from "../../assets/dashboard/favicon.png";
import demo from "../../assets/header/user.svg";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Nav = () => {
  // TO DO: get this information from shared state
  // const userIsLoggedIn = false;

  const user = useSelector((state) => state.user.value);
  const logOutHandler = () => {
    console.log("heeey");
    localStorage.setItem("currentEmail", "");
    localStorage.setItem("isLogged", false);
  };

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
          <NavDropdown
            eventKey={1}
            title={
              <div className="pull-left">
                <img
                  className="thumbnail-image"
                  id="nav__img--circle"
                  src={demo}
                  alt="user pic"
                />

                {user.username}
              </div>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item eventKey={1.1} href="/profile">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item divider />
            <NavDropdown.Item eventKey={1.3}>
              <i className="fa fa-sign-out"></i>
              <Link id="logout" to="/login" onClick={logOutHandler}>
                Logout
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      )}
    </div>
  );
};

export default Nav;
