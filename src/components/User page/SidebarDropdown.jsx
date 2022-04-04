import React from "react";
import { Link } from "react-router-dom";

function SidebarDropdown() {
  return (
    <div className="dropdown-container">
      <h4>Channels</h4>
      <div className="dropdown-item-list">
        <Link to="/userpage/channel1">Channel 1</Link>
        <Link to="/userpage/channel2">Channel 2</Link>
      </div>
    </div>
  );
}

export default SidebarDropdown;
