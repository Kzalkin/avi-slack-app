import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Nav.scss";

function Nav() {
  const navigate = useNavigate();
  return (
    <nav className="nav-container">
      <div className="center-nav">
        <input
          type="search"
          className="search"
          placeholder={`Search 'channel-name'`}
        />
      </div>
      <i className="fa-solid fa-circle-user"/>
      <i className="fa-solid fa-right-from-bracket" onClick={()=>navigate('/')}/>
    </nav>
  );
}

export default Nav;
