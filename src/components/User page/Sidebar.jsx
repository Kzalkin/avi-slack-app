import React from "react";
import "../../assets/styles/Sidebar.scss";
import useDataContext from "../../hooks/useDataContext";
import SidebarDropdown from "./SidebarDropdown";

function Sidebar() {
  const { userChannels, senderList } = useDataContext();
  const user = JSON.parse(localStorage.getItem("User"));

  return (
    <aside className="sidebar-container">
      <div className="channel-title-container">
        <h3>{user.email}</h3>
      </div>
      <SidebarDropdown title={"Channels"} data={userChannels} />
      <SidebarDropdown title={"Direct messages"} data={senderList}/>
    </aside>
  );
}

export default Sidebar;
