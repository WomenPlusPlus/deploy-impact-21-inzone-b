import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./_program.scss";
import star from "../../../assets/dashboard/star.svg";

const Program = ({ progress }) => {
  return (
    <div className="program__container">
      <div className="program__wrapper--top">
        <h2>Global Health</h2>
        <p>Certificate of Open Studies awarded by the University of Geneva</p>
      </div>
      <div className="program__wrapper--bottom">
        <h5>Your progress</h5>
        <p>You need to complete the final exam to be awared the certificate</p>
        <div className="progressbar__star">
          <ProgressBar now={progress} />
          <img src={star} alt="star" />
        </div>
      </div>
    </div>
  );
};

export default Program;
