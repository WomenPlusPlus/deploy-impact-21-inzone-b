import "./scss/styles.scss";
import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "./components/login/";
import Signup from "./components/signup/";
import ForgotPasswordScreen from "./components/forgot-password/";
import Dashboard from "./components/dashboard/";
import Instructions from "./components/dashboard/instructions";
import Nav from "./components/navigation-bar";
import MCQScreen from "./components/mcq-screen";
import UserNotValidated from "./components/user-not-validated";

function App() {
  // const user = useSelector((state) => state.user.value);
  const [userIsLoggedIn] = useState(
    localStorage.getItem("isLogged") === "true",
  );

  return (
    <div id="app">
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" exact>
            {/*TODO: check if user is logged in or not*/}
            {userIsLoggedIn && <Navigate to="/home" />}
            {!userIsLoggedIn && <Navigate to="/login" />}
          </Route>
          <Route path="/login">
            {userIsLoggedIn && <Navigate to="/home" />}
            {!userIsLoggedIn && <LoginScreen />}
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/forgot-password">
            <ForgotPasswordScreen />
          </Route>
          <Route path="/home">
            {userIsLoggedIn && <Dashboard />}
            {!userIsLoggedIn && <Navigate to="/login" />}
          </Route>
          <Route path="/instructions">
            <Instructions />
          </Route>
          <Route path="/exam/mcq">
            <MCQScreen />
          </Route>
          <Route path="/awaiting-admin-approval">
            <UserNotValidated />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
