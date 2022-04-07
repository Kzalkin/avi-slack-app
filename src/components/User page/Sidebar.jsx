import React from "react";
import "../../assets/styles/Sidebar.scss";
import useDataContext from "../../hooks/useDataContext";
import SidebarDropdown from "./SidebarDropdown";

function Sidebar() {
  const { userChannels } = useDataContext();
  const user = JSON.parse(localStorage.getItem("User"));

  return (
    <aside className="sidebar-container">
      <div className="channel-title-container">
        <h1>{user.id}</h1>
      </div>
      <SidebarDropdown title={"Channels"} data={userChannels} />
    </aside>
  );
}

export default Sidebar;
