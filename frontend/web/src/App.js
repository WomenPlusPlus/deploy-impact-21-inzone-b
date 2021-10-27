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

function App() {
  return (
    <div className="App">

        {/*<div className="container">*/}
        {/*    <LoginScreen />*/}
        {/*</div>*/}

        <Router>
            <div>
                {/*<nav>*/}
                {/*    <ul>*/}
                {/*        <li>*/}
                {/*            <Link to="/">Home</Link>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Link to="/about">About</Link>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Link to="/users">Users</Link>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</nav>*/}

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/login">
                        <LoginScreen />
                    </Route>
                    <Route path="/signup">
                        <SignupScreen />
                    </Route>
                    <Route path="/setup-account">
                        <SetupAccountScreen />
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPasswordScreen />
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;
