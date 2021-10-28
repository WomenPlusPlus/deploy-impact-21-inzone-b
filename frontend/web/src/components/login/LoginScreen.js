import "./LoginScreen.scss"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

function LoginScreen(props) {
    let match = useRouteMatch();

    return (
        <div className="row entry-screen">
            <div className="col-lg-6">
                <h1>Welcome to ExamPortal</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-4">
                        <Link to={`/forgot-password`} className="form-text">Forgot your password?</Link>
                    </div>
                    <div className="mb-4">
                        <button type="button" className="btn btn-primary w-100">Log In</button>
                    </div>
                    <div className="mb-4">
                        <div className="form-text">Don’t have an account?</div>
                    </div>
                    <div className="mb-3">
                        <Link to={`/signup`} className="btn btn-outline-primary w-100">Sign Up</Link>
                    </div>
                    <div>
                        <div className="form-text">Our <strong><a href="terms-of-service">Terms of Service</a></strong> & <strong><a href="privacy-policy">Privacy Policy</a></strong></div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginScreen;
