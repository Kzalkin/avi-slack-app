import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Nav.scss";
import useDataContext from "../../hooks/useDataContext";

function Nav() {
  const { getChannels, getMessageList, resetSenderList } = useDataContext();
  const navigate = useNavigate();

  const logout = () => {

    getChannels([]);
    getMessageList([]);
    resetSenderList();
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="nav-container">
      <div className="center-nav">
        <input
          type="search"
          className="search"
          placeholder={`Search 'channel-name'`}
        />
      </div>
      <i className="fa-solid fa-circle-user" />
      <i className="fa-solid fa-right-from-bracket" onClick={logout} />
    </nav>
  );
}

export default Nav;
