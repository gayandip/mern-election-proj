import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Error from "../others/Error";
import { useLogin } from "../../context/login.context";
import CheckLogin from "../../hooks/CheckLogin";

function Dashboard() {

  const {login, setLogin} = useLogin()
   
  const getlogin = async () => {
    const {loggedin, user} = await CheckLogin()
    if (loggedin != login) {
      setLogin(loggedin)
    }
  }

  useEffect(() => {
    getlogin()
  })

  return login ? (
    <>
      <div className="h-screen">
        <div className="m-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/users/profile" className="btn btn-neutral m-5">View Profile</Link>
          <Link to="/users/viewcard" className="btn btn-neutral m-5">View Card</Link>
          <Link to="/users/createcard" className="btn btn-neutral m-5">
            Create Card
          </Link>
          <Link to="/candidates/register" className="btn btn-neutral m-5">
            Register as a Candidate
          </Link>
          <Link to="/admins/register" className="btn btn-neutral m-5">
            Request Admin Access
          </Link>
          <Link to="" className="btn btn-neutral m-5">
            Cast vote
          </Link>
          <Link to="" className="btn btn-neutral m-5">
            Get result
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-7">
        <div>
        <h2 className="text-center m-4">Candidate section</h2>
        <div className="m-auto flex justify-center">
        <Link to="/candidates/dashboard" className="btn btn-neutral m-5">Candidate Dashboard</Link>
        </div>
        </div>

        <div>
        <h2 className="text-center m-4">Admin section</h2>
        <div className="m-auto flex justify-center">
        <Link to="/admins/dashboard" className="btn btn-neutral m-5">Admin Dashboard</Link>
        </div>
        </div>
        </div>

      </div>
    </>
  ) : (<Error message="please login" />);
}

export default Dashboard;
