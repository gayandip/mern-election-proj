import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  const list = (
    <>
      <div className="hidden md:block md:bg-base-200 md:h-screen md:col-span-1">
        <div className="collapse collapse-plus text-lg rounded-none">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title">
            Dashboards
          </div>
          <div className="collapse-content mt-[-10px]">
            <p className="mx-3 mb-3 cursor-pointer"><Link to="/users/dashboard">User</Link></p>
            <p className="mx-3 mb-3 cursor-pointer"><Link to="/candidates/dashboard">Candidate</Link></p>
            <p className="mx-3 mb-3 cursor-pointer"><Link to="/admins/dashboard">Admin</Link></p>
          </div>
        </div>
      </div>
      
    </>
  );

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5">
        {list}
        <div className="md:col-span-4 col-span-5">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
