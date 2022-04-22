import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Nav.scss";
import useDataContext from "../../hooks/useDataContext";

function Nav() {
  const { resetChannels, resetSenderList } = useDataContext();
  const user = JSON.parse(localStorage.getItem("User"))
  const navigate = useNavigate();

  const logout = () => {
    resetChannels();
    resetSenderList();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="nav-container">
      <div className="center-nav">
        <input
          type="search"
          className="search"
          placeholder={`Search ${user.email}`}
        />
      </div>
      <i className="fa-solid fa-circle-user" />
      <i className="fa-solid fa-right-from-bracket" onClick={logout} />
    </nav>
  );
}

export default Nav;
