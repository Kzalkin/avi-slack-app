import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Home.scss";
import Logo from "../components/Logo";
import homeImage from '../assets/img/home-image.png'

function Home() {
  return (
    <div className="home-container">
      <div className="home-body">
        <div className="links">
          <Logo />
          <h1 className="text-header">
            Slack brings the team together wherever you are
          </h1>
          <Link className="link-item" to="/login">
            Sign In to Slack
          </Link>
          <span className="text-footer">
            Is your team new to Slack?
            <Link className="link" to="/register">
              Create an account
            </Link>
          </span>
        </div>
        <div className="image">
          <img
            src={homeImage}
            alt="home image illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
