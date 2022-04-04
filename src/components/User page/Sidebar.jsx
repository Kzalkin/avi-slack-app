import React from "react";
import "../../assets/styles/Sidebar.scss";
import SidebarDropdown from "./SidebarDropdown";
function Sidebar() {
  return (
    <aside className="sidebar-container">
      <div className="channel-title-container">
        <h1>Channel Title</h1>
      </div>
      <SidebarDropdown />
    </aside>
  );
}

export default Sidebar;
