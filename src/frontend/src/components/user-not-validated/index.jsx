import React from "react";
import celebrationImg from "../../assets/dashboard/celebration.svg";


import './user-not-validated.scss';


const UserNotValidated = () => {
    return (
        <div className='user-not-validated'>
            <div className='container'>
                <div className='row justify-content-center my-5'>
                    <div className='col-8 text-center box'>
                        <h1 className='py-5'>Congratulations!</h1>
                        <img
                            src={celebrationImg}
                            alt="your account is waiting admin approval"
                        />
                        <p className='py-5'>
                            You&apos;ve just created your ExamPortal account. We&apos;re now reviewing it and you will receive an email confirmation as soon as it is approved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserNotValidated;