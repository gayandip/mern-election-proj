import React, { useEffect, useState } from "react";
import Error from "../others/Error";
import { useLogin } from "../../context/login.context";
import CheckLogin from "../../hooks/CheckLogin";
import { Link } from "react-router-dom";

function Profile() {
  const { login, setLogin, userData, setUserData } = useLogin();

  const getlogin = async () => {
    const { loggedin, user } = await CheckLogin();
    if (loggedin != login) {
      setLogin(loggedin);
    }

    if (loggedin && userData.email != user.email) {
      setUserData(user);
    }
  };

  useEffect(() => {
    getlogin();
  });

  function textComponent(entity, display, link) {
    return (
      <>
        <div className={userData[`${entity}`] ? "flex my-5 py-2" : "hidden"}>
          <h2>
            {display}
            <span
              className={
                userData[`${entity}`]?.status == "verified"
                  ? "bg-green-700 text-white m-2 p-1 rounded-lg"
                  : userData[`${entity}`]?.status == "processing"
                  ? "bg-yellow-600 text-white m-2 p-1 rounded-lg"
                  : "bg-red-600 text-white m-2 p-1 rounded-lg"
              }
            >
              {userData[`${entity}`]?.status}
            </span>
          </h2>
          {entity == "cardId" ? (
            <Link to={link} className="ml-3 text-white">
              View
            </Link>
          ) : (
            <Link to={link} className="ml-3 text-white">
              View Dashboard
            </Link>
          )}
        </div>
      </>
    );
  }

  return login ? (
    <div className="flex flex-col justify-center items-center">
      <div className="h-auto m-7 p-12 w-auto outline-dashed outline-lime-500 outline-2 shadow-2xl">
        <h1 className="m-1 text-center">Welcome !!</h1>
        <h3 className="italic text-blue-100 my-7 text-lg font-semibold">
          Email: {userData.email}
        </h3>
        <h3 className="text-sm">
          A user since {(userData.createdAt?.split("T"))[0]}
        </h3>
        <h3 className="text-sm">
          Last updated at {(userData.updatedAt?.split("T"))[0]}
        </h3>
        <Link to="" className="btn btn-neutral my-7 text-xs">
          Update Email
        </Link>
        <div>{textComponent("cardId", "Card:", "/users/viewcard")}</div>
        <div>
          {textComponent("candidateId", "Candidate:", "/candidates/dashboard")}
        </div>
        <div>{textComponent("adminId", "Admin:", "/admins/dashboard")}</div>
      </div>
    </div>
  ) : (
    <Error message="your are not logged in" />
  );
}

export default Profile;
