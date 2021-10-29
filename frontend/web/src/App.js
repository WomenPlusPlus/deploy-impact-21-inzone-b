import "./App.css";
import "./scss/shared.scss"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import LoginScreen from "./components/login/LoginScreen";
import SignupScreen from "./components/signup/SignupScreen";
import ForgotPasswordScreen from "./components/forgot-password/ForgotPasswordScreen";
import SetupAccountScreen from "./components/setup-account/SetupAccountScreen";
import Dashboard from "./components/dashboard/";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/signup">
                        <SignupScreen/>
                    </Route>
                    <Route path="/setup-account">
                        <SetupAccountScreen/>
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPasswordScreen/>
                    </Route>
                    <Route path="/home">
                        <Dashboard/>
                    </Route>
                    {/*<Route path="/login">*/}
                    <Route path="/">
                        <LoginScreen/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;
