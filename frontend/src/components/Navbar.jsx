import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLogin } from "../context/login.context.js";
import Navitem from "./Navitem.jsx";

function Navbar() {
  const { login, setLogin } = useLogin();

  const logout = async () => {
    try {
      await axios.post("http://localhost:5001/users/logout", {}, { withCredentials: true })
        .then((res) => {
          if (res.status == 200) {
            toast.success("Logout success");
            setLogin(false);
          }
        })
        .catch((err) => {
          toast.error("logout failed");
        });
    } catch (err) {
      toast.error("logout failed");
    }
  };

  const navList = (
    <>
      <li>
        <Navitem text="Home" link="/" />
      </li>
      <li>
        <Navitem text="Dashboard" link="/users/dashboard" />
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
              className="menu menu-sm dropdown-content bg-base-100 z-[1] mt-3 w-52 p-2 shadow"
            >
              {navList}
            </ul>
          </div>
          <p className="m-2 p-2 text-xl md:text-2xl font-bold">ElectionBits</p>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">{navList}</ul>
        </div>
        <div className="navbar-end mr-4">
          {login ? (
            <Link to="/" onClick={logout} className="btn">
              Logout
            </Link>
          ) : (
            <Link to="users/login" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
