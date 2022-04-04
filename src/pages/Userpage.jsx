import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/User page/Nav";
import Sidebar from "../components/User page/Sidebar";
import '../assets/styles/Userpage.scss'

function Userpage() {
  return (
    <>
      <Nav />
      <div className="center-screen">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default Userpage;
