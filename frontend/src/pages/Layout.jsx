import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import CheckLogin from "../hooks/CheckLogin.js";
import { LoginProvider } from "../context/login.context.js";

function Layout() {
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState({email: ""});
  const location = useLocation();

  const getUser = async () => {
    const { loggedin, user, err } = await CheckLogin();
    if (loggedin != login) {
      setLogin(loggedin);
    }
    if (loggedin && (userData.email != user.email)) {
      setUserData(user)
    }
  };

  useEffect(() => {
    getUser();
  }, [login, userData]);

  return (
    <>
      <LoginProvider value={{ login, setLogin, userData, setUserData }}>
        <Navbar />
        {location.pathname == "/" ? (
          <h1 className="h-screen flex items-center justify-center from-neutral-600 font-extrabold text-5xl">Welcome</h1>
        ) : (
          <div className="lg:grid lg:grid-cols-10">
            <div className="md:col-span-1"></div>
            <div className="md:col-span-8">
              <Outlet />
            </div>
            <div className="md:col-span-1"></div>
          </div>
        )}
      </LoginProvider>
    </>
  );
}

export default Layout;
