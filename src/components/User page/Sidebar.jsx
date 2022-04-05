import React, {useEffect, useState} from "react";
import "../../assets/styles/Sidebar.scss";
import useDataContext from "../../hooks/useDataContext";
import SidebarDropdown from "./SidebarDropdown";
import axios from "../../api/axios";

function Sidebar() {
  const {user, userChannels, headerCreds, getChannels} = useDataContext()
  const CHANNELS_URL = "/channels"

  async function fetchChannels() {
    const resp = await axios.get(CHANNELS_URL, {
      headers: headerCreds(),
    });
    console.log('getChannels', resp.data.data)
    getChannels(resp.data.data);
  }

  useEffect(() => {
    fetchChannels();
  }, []);
  
  return (
    <aside className="sidebar-container">
      <div className="channel-title-container">
        <h1>{user.id}</h1>
      </div>
      <SidebarDropdown title={'Channels'} data={userChannels} onChannelAdd={fetchChannels}/>
    </aside>
  );
}

export default Sidebar;
