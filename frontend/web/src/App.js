import './scss/styles.scss';
import React, {useState} from "react";
// import { useSelector } from "react-redux";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import LoginScreen from "./components/login/";
import Signup from "./components/signup/";
import ForgotPasswordScreen from "./components/forgot-password/";
import Dashboard from "./components/dashboard/";
import Instructions from "./components/dashboard/instructions";
import Nav from "./components/navigation-bar";
import MCQScreen from "./components/mcq-screen";

function App() {
    // const user = useSelector((state) => state.user.value);
    const [userIsLoggedIn] = useState(localStorage.getItem('isLogged') === 'true');

    return (
        <div id='app'>
            <header>
                <Nav />
            </header>
            <main>
                <Switch>
                    <Route path='/' exact>
                        {/*TODO: check if user is logged in or not*/}
                        {userIsLoggedIn && (
                            <Redirect to='/home' />
                        )}
                        {!userIsLoggedIn && (
                            <Redirect to='/login' />
                        )}
                    </Route>
                    <Route path="/login">
                        {userIsLoggedIn && (
                            <Redirect to='/home' />
                        )}
                        {!userIsLoggedIn && (
                            <LoginScreen/>
                        )}
                    </Route>
                    <Route path="/signup" exact>
                        <Signup />
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPasswordScreen/>
                    </Route>
                    <Route path="/home">
                        {userIsLoggedIn && (
                            <Dashboard/>
                        )}
                        {!userIsLoggedIn && (
                            <Redirect to='/login' />
                        )}
                    </Route>
                    <Route path="/instructions">
                        <Instructions/>
                    </Route>
                    <Route path="/exam/mcq">
                        <MCQScreen/>
                    </Route>
                </Switch>
            </main>
        </div>
    )
}

export default App;
