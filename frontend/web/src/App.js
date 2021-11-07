import './scss/styles.scss';
import React from 'react'
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
    return (
        <div id='app'>
            <header>
                <Nav />
            </header>
            <main>
                <Switch>
                    <Route path='/' exact>
                        {/*TODO: check if user is logged in or not*/}
                        <Redirect to='/login' />
                    </Route>
                    <Route path="/login">
                        <LoginScreen/>
                    </Route>
                    <Route path="/signup" exact>
                        <Signup />
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPasswordScreen/>
                    </Route>
                    <Route path="/home">
                        <Dashboard/>
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
