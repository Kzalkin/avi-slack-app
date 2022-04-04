import React from "react";
import "../../assets/styles/Nav.scss";

function Nav() {
  return (
    <nav className="nav-container">
        <div className="center-nav">

      <input
        type="search"
        className="search"
        placeholder={`Search 'channel-name'`}
      />
        </div>
        <i className="fa-solid fa-circle-user"></i>
    </nav>
  );
}

export default Nav;
