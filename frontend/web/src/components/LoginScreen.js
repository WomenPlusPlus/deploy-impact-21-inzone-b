import "./LoginScreen.scss"
import LoginForm from "./LoginForm";

function LoginScreen(props) {
    return (
        <div className="row LoginScreen">
            <div className="col-lg-6">
                <h1>Welcome to ExamPortal</h1>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginScreen;
