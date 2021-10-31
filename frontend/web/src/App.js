import "./App.css";
import "./scss/shared.scss"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import LoginScreen from "./components/login/";
import Index from "./components/signup/";
import ForgotPasswordScreen from "./components/forgot-password/";
import SetupAccountScreen from "./components/setup-account/";
import Dashboard from "./components/dashboard/";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/signup">
                        <Index/>
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
