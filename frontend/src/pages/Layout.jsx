import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


function Layout() {
  
  return (
    <>
      <Navbar />
      <div>hello</div>
      <Outlet />
    </>
  );
}

export default Layout;
