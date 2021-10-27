import "./App.css";
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import LoginScreen from "./components/LoginScreen";

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
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;
