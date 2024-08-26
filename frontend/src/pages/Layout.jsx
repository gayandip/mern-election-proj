import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import CheckLogin from "../hooks/CheckLogin.js";
import { LoginProvider } from "../context/login.context.js";

function Layout() {
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState({ email: "" });
  const location = useLocation();

  const getUser = async () => {
    const { loggedin, user, err } = await CheckLogin();
    if (loggedin != login) {
      setLogin(loggedin);
    }
    if (loggedin && userData.email != user.email) {
      setUserData(user);
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
          <>
            <div className="h-screen text-center md:grid md:grid-cols-2 gap-4">
              <img src="image.png" alt="" className="h-[60%] m-auto" />
              <div className="m-auto">
                <h1 className=" from-neutral-600 font-extrabold text-7xl md:text-9xl text-green-600">
                  Welcome
                </h1>
                <h1 className="font-extrabold text-3xl md:text-3xl text-yellow-400">
                  Vote for your Rights
                </h1>
              </div>
            </div>
          </>
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
