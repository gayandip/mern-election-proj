import React from "react";
import {NavLink} from "react-router-dom"

function Navbar() {
  const navList = (
    <>
      <li>
        <NavLink to="/login" className={({isActive}) => `${isActive ? "text-white font-semibold": ""}`}>
          Home
        </NavLink>
      </li>
      <li>
      <NavLink to="/result" className={({isActive}) => `${isActive ? "text-white font-semibold": ""}`}>
          Voting Result
        </NavLink>
      </li>
      <li>
      <NavLink to="/validate/:card" className={({isActive}) => `${isActive ? "text-white font-semibold": ""}`}>
          Validate Card
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar bg-base-100 shadow-md sticky z-50 top-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navList}
            </ul>
          </div>
          <p className="m-2 p-2 text-2xl font-bold">ElectionBits</p>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">{navList}</ul>
        </div>
        <div className="navbar-end mr-4">
          <button className="btn">Login</button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
