import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast";

function Navbar() {
  const [user, setUser] = useState()
  const [loginLogout, setLoginLogout] = useState(<Link  to="users/login" className="btn">Login</Link>)
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await axios.post("http://localhost:5001/users/logout", {}, { withCredentials: true })
      .then((res) => {
        if (res.status == 200) {
          setLoginLogout(<Link  to="/login" className="btn">Login</Link>)
          toast.success("Logout success")
          navigate("/")
        }
      })
      .catch((err) => {
        toast.error("logout failed")
      })
    } catch (err) {
      toast.error("logout failed")
    }
  }

  const getUser = async () => {
    // try {
    //   await axios.get("http://localhost:5001/users/get/current/loggedin", { withCredentials: true })
    //   .then((res) => {
    //     if (res.status == 200) {
    //       setUser(res.data)
    //       setLoginLogout(<Link  to="/" onClick={logout} className="btn">Logout</Link>)
    //     }
    //   })
    // } catch (err) {
    //   console.log(err.message);
    // }
  }

  useEffect(() => {
    getUser()
  }, [user, loginLogout])
  
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
          <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer">
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
            </label>
            </div>

            <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {navList}
    </ul>
  </div>
  </div>
          </div>
          <p className="m-2 p-2 text-xl md:text-2xl font-bold">ElectionBits</p>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">{navList}</ul>
        </div>
        <div className="navbar-end mr-4">
          {loginLogout}
        </div>
      </div>
    </>
  );
}

export default Navbar;
