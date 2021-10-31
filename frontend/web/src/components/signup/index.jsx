import { Link, useHistory } from "react-router-dom";
import React from "react";

function Index(props) {
    const history = useHistory();

    const [showPasswordInstructions, setPasswordInstructions] = React.useState(false)

    const nextStep = () => {
        history.push("/setup-account");
    }

    return (
        <div className="container">
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
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                onFocus={(e) => {
                                    setPasswordInstructions(true);
                                }}
                                onBlur={(e) => {
                                    setPasswordInstructions(false);
                                }}
                            />
                        </div>
                        <div className={`mb-5 ${showPasswordInstructions? 'd-block' : 'd-none'}`}>
                            <div className="form-text">At least 8 characters long</div>
                            <div className="form-text">Contains 1 uppercase character</div>
                            <div className="form-text">Contains 1 number or symbol</div>
                        </div>
                        <div className="mb-4">
                            <div className="form-text">By clicking Sign Up you agree to our <strong><a href="terms-of-service">Terms of Service</a></strong> & <strong><a href="privacy-policy">Privacy Policy</a></strong></div>
                        </div>
                        <div className="mb-4">
                            <button type="button" className="btn btn-primary w-100" onClick={nextStep}>Sign Up</button>
                        </div>
                        <div>
                            <div className="form-text">
                                Already have an account? <strong><Link to={`/login`}>Log In</Link></strong>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Index;
