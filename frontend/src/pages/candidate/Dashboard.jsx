import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../context/login.context";
import CheckLogin from "../../hooks/CheckLogin";
import Error from "../others/Error";

function Dashboard() {
  const [existingCandidate, setEeistingCandidate] = useState(false);
  const { login, setLogin } = useLogin();

  const getlogin = async () => {
    const { loggedin, user } = await CheckLogin();
    
    if (loggedin != login) {
      setLogin(loggedin);
    }

    if (user.candidateId && (existingCandidate == false)) {
      setEeistingCandidate(true)
    }
  };

  useEffect(() => {
    getlogin();
  });

  return (login && existingCandidate) ? (
    <>
      <div className="h-screen">
        <div className="m-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link className="btn btn-neutral m-5">Ongoing Election result</Link>
          <Link className="btn btn-neutral m-5">Other Election result</Link>
        </div>
      </div>
    </>
  ) : login ? (
    <Error message="you are not a candidate" />
  ) : (
    <Error message="please login" />
  );
}

export default Dashboard;
