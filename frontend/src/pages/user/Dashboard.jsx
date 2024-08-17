import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      await axios
        .get("http://localhost:5001/users/get/current/loggedin", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status == 200) {
            setUser(true);
          } else setUser(false);
        })
        .catch((err) => {
          setUser(false);
          navigate("/users/login");
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    console.log("called");

    getUser();
  }, [user]);
  console.log(user);

  return user == true ? (
    <>
      <div className="h-screen">
        <div className="m-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link className="btn btn-neutral m-5">View Profile</Link>
          <Link className="btn btn-neutral m-5">View Card</Link>
          <Link to="/users/createcard" className="btn btn-neutral m-5">
            Create Card
          </Link>
          <Link to="" className="btn btn-neutral m-5">
            Register as a Candidate
          </Link>
          <Link to="" className="btn btn-neutral m-5">
            Request Admin Access
          </Link>
          <Link to="" className="btn btn-neutral m-5">
            Cast vote
          </Link>
          <Link to="" className="btn btn-neutral m-5">
            Get Result
          </Link>
        </div>
      </div>
    </>
  ) : (
    <>
      <h2>404</h2>
      <h4>Not found!!!</h4>
    </>
  );
}

export default Dashboard;
