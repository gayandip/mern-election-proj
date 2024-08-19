import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../context/login.context";
import CheckLogin from "../../hooks/CheckLogin";
import Error from "../others/Error"

function Dashboard() {
  const [existingAdmin, setExistingAdmin] = useState(false)
  const { login, setLogin } = useLogin();

  const getlogin = async () => {
    const { loggedin, user } = await CheckLogin();
    if (loggedin != login) {
      setLogin(loggedin);
    }

    if (user.adminId) {
      setExistingAdmin(true)
    }
  };

  useEffect(() => {
    getlogin();
  });

  return (login && existingAdmin) ? (
    <>
      <div className="h-screen">
        <div className="m-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link className="btn btn-neutral m-5">View Admins</Link>
          <Link className="btn btn-neutral m-5">View Cards</Link>
          <Link className="btn btn-neutral m-5">View Candidates</Link>
          <Link to="" className="btn btn-neutral m-5">
            Count Votes
          </Link>
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
