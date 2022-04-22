import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Success.scss";

const Success = () => {
  return (
    <div className="success">
      <div className="success-modal">
        <div className="message-container">
          <span className="message">Success!</span>
          <i className="fa-solid fa-circle-check icon" />
        </div>
        <Link to={"/login"} className="link">
          Go to Sign in
        </Link>
      </div>
    </div>
  );
};

export default Success;
