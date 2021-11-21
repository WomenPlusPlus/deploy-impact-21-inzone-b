import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Trans } from "react-i18next";

import "./_nav.scss";
// import icon from "../../assets/dashboard/favicon.png";
import demo from "../../assets/header/user.svg";
import { NavDropdown } from "react-bootstrap";
// import { useHistory } from "react-router-dom";

import logo from "../../assets/header/logo.svg";

const Nav = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();

  const user = useSelector((state) => state.user.value);
  // const userIsLoggedIn = useSelector((state) => state.user.value.email !== "");

  const [userIsLoggedIn] = useState(localStorage.getItem('isLogged') === 'true');

  const logOutHandler = () => {
    localStorage.setItem("currentEmail", "");
    localStorage.setItem("isLogged", 'false');
    window.location.href = "/login";
  };

  return (
    <div className="nav__container">
      <div className="wrapper--left">
        <Link to='/'>
          <img id="nav__logo" src={logo} alt="logo" />
        </Link>
      </div>
      {userIsLoggedIn === true && (
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
      {userIsLoggedIn === true && (
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
            {/* <NavDropdown.Item eventKey={1.1} href="/profile">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item divider="true" /> */}
            {/* TODO: fix this color hack */}
            <NavDropdown.Item disabled="true" style={{color: '#655E5D'}}>
              <span>Hi, {user.email}</span>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey={1.3}>
              <i className="fa fa-sign-out"></i>
              <span id="logout" onClick={logOutHandler}>
                Logout
              </span>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      )}
    </div>
  );
};

export default Nav;
