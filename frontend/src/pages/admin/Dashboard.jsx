import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../context/login.context";
import CheckLogin from "../../hooks/CheckLogin";
import Error from "../others/Error";
import axios from "axios";
import toast from "react-hot-toast";

function Dashboard() {
  const [existingAdmin, setExistingAdmin] = useState(false);
  const { login, setLogin, userData, setUserData } = useLogin();

  const getlogin = async () => {
    const { loggedin, user } = await CheckLogin();
    if (loggedin != login) {
      setLogin(loggedin);
    }

    if (user.adminId && existingAdmin == false) {
      setExistingAdmin(true);
    }

    if (loggedin && userData.email != user.email) {
      setUserData(user);
    }
  };

  useEffect(() => {
    getlogin();
  });

  const getPower = () => {
    if (!(userData.adminId.status == "verified")) {
      return <p>you don't have any power, wait till verification</p>;
    }

    if (userData.adminId.type == "normal") {
      if (userData.adminId.specialPower == "true") {
        return <p>You can verify candidates</p>;
      }

      return <p>You can verify cards</p>;
    }

    return <p>You can organise an election and count votes</p>;
  };

  const count = async () => {
    try {
      await axios
        .post(
          "http://localhost:5001/admins/count/votes/gce",
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status == 200) {
            toast.success("success");
          } else toast.error("failed");
        })
        .catch((err) => {
          toast.error("failed");
        });
    } catch (err) {
      toast.error("failed, try again");
    }
  };

  // const getActions = () => {
  //   if (!(userData.adminId.status == "verified")) {
  //     return
  //   }

  //   if (userData.adminId.type == "normal") {
  //     if (userData.adminId.specialPower == "true") {
  //       return <Link className="btn btn-neutral m-5">View Candidates</Link>;
  //     }

  //     return <Link className="btn btn-neutral m-5">View Cards</Link>;
  //   }

  //   return (
  //     <>
  //       <Link to="/admins/view" className="btn btn-neutral m-5">
  //         View Admins
  //       </Link>
  //       <Link to="" className="btn btn-neutral m-5">
  //         Count Votes
  //       </Link>
  //     </>
  //   );
  // };

  const getActions = () => {
    return (
      <>
        <Link to="/admins/view/cards" className="btn btn-neutral m-5">
          View Cards
        </Link>
        <Link className="btn btn-neutral m-5">View Candidates</Link>
        <Link to="/admins/view" className="btn btn-neutral m-5">
          View Admins
        </Link>
        <button onClick={count} className="btn btn-neutral m-5">
          Count Votes
        </button>
      </>
    );
  };

  return login && existingAdmin ? (
    <>
      <div className="h-screen">
        <div className="m-4 p-2">
          <p>
            {userData.adminId.fullName}{" "}
            <span>(ID:{userData.adminId.jobId})</span>{" "}
          </p>
          <p
            className={
              userData.adminId.status == "verified"
                ? "text-green-500"
                : userData.adminId.status == "processing"
                ? "text-yellow-400"
                : "text-red-600"
            }
          >
            {userData.adminId.status}
          </p>
          {getPower()}
        </div>
        <div className="m-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {getActions()}
        </div>
      </div>
    </>
  ) : login ? (
    <Error message="you are not an admin" />
  ) : (
    <Error message="please login" />
  );
}

export default Dashboard;
