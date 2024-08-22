import React, { useEffect } from "react";
import { useLogin } from "../context/login.context";
import CheckLogin from "../hooks/CheckLogin";
import Error from "../pages/others/Error";
import { Link } from "react-router-dom";

function Card() {
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

  if (!login) {
    return <Error message="you are not logged in" />;
  }
  if (!userData.cardId) {
    return <Error message="you dont have a card" />;
  }

  const { _id, aadhar, image, createdAt, updatedat, __v, ...details } =
    userData.cardId;

  const showImage = () => {
    const src = `http://localhost:5001/${String(image)
      .replace(/\\/g, "/")
      .replace("public/", "")}`;

    // local server file path or public url from server
    return (
      <img
        key="image"
        src={src}
        alt="user-image"
        className="w-40 rounded-full"
      />
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center m-auto">
        <img src="" alt="" />
        <div className="h-auto w-[70%] lg:w-[40%] m-7 p-5 outline-dashed outline-lime-500 outline-2 shadow-lg">
          <div>
            {showImage()}

            {Object.keys(details).map((field) => {
              if (field == "assemblyConstituency") {
                return (
                  <h1 key={field} className="my-2">
                    Constituency (assembly): <span>{details[field]}</span>
                  </h1>
                );
              }
              if (field == "parlamentConstituency") {
                return (
                  <h1 key={field} className="my-2">
                    Constituency (parliament): <span>{details[field]}</span>
                  </h1>
                );
              }
              if (field == "updatedAt") {
                return (
                  <h1 key={field} className="my-2">
                    Last updated: <span>{details[field]?.split("T")[0]}</span>
                  </h1>
                );
              }
              if (field == "dateOfBirth") {
                return (
                  <h1 key={field} className="my-2">
                    Date of Birth: <span>{details[field]?.split("T")[0]}</span>
                  </h1>
                );
              }
              return (
                <h1 key={field} className="capitalize my-2">
                  {field}: <span className="normal-case">{details[field]}</span>
                </h1>
              );
            })}
            <Link to="" className="m-2 bg-slate-600 rounded-lg text-white btn">
              Update details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
