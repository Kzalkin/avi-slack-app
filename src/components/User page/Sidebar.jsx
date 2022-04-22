import React from "react";
import "../../assets/styles/Sidebar.scss";
import useDataContext from "../../hooks/useDataContext";
import SidebarDropdown from "./SidebarDropdown";

function Sidebar() {
  const { userChannels, senderList } = useDataContext();
  const user = JSON.parse(localStorage.getItem("User"));

  const image = "https://avatars.dicebear.com/api/micah/";

  return (
    <aside className="sidebar-container">
      <div className="channel-title-container">
        <img src={`${image}baby-${user.email}.svg`} alt="avatar" className="image" />
        <h3 className="title">{user.email}</h3>
      </div>
      <SidebarDropdown title={"Channels"} data={userChannels} />
      <SidebarDropdown title={"Direct messages"} data={senderList} />
    </aside>
  );
}

export default Sidebar;
