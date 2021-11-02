import React from 'react'
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import LoginScreen from "./components/login/";
import Signup from "./components/signup/";
import SetupAccountScreen from "./components/signup/second-step/";
import ForgotPasswordScreen from "./components/forgot-password/";
import Dashboard from "./components/dashboard/";

import './scss/custom.scss';
import Nav from "./components/navigation-bar";

function App() {
    return (
        <div>
            <header>
                <Nav />
            </header>
            <main>
                <Switch>
                    <Route path='/' exact>
                        {/*TO DO: check if user is logged in or not*/}
                        <Redirect to='/login' />
                    </Route>
                    <Route path="/login">
                        <LoginScreen/>
                    </Route>
                    <Route path="/signup" exact>
                        <Signup />
                    </Route>
                    <Route path="/signup/setup-account">
                        <SetupAccountScreen/>
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPasswordScreen/>
                    </Route>
                    <Route path="/home">
                        <Dashboard/>
                    </Route>
                </Switch>
            </main>
        </div>
    )
}

export default App;
