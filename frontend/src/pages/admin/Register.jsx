import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../context/login.context";
import CheckLogin from "../../hooks/CheckLogin";
import toast from "react-hot-toast";
import Error from "../others/Error";
import axios from "axios";

function Register() {
  let admin = {
    name: "",
    id: "",
  };

  const [existingAdmin, setExistingAdmin] = useState(false);
  const navigate = useNavigate();

  const { login, setLogin, userData, setUserData } = useLogin();

  const getlogin = async () => {
    const { loggedin, user } = await CheckLogin();
    if (loggedin != login) {
      setLogin(loggedin);
    }
    
    if (user.adminId && existingAdmin == false) {
      setExistingAdmin(true);
    }
  };

  useEffect(() => {
    getlogin();
  });

  const getInput = (e) => {
    admin[e.target.name] = e.target.value;
  };

  const create = async () => {
    const values = Object.values(admin);

    if (values.some((field) => field.trim() === "")) {
      toast.error("empty fields");
      return;
    }

    try {
      await axios
        .post("http://localhost:5001/users/request/adminaccess", admin, {
          withCredentials: true,
        })
        .then((res) => {
          setUserData(res.data.data);
          admin = {};
          toast.success("register success, verification under process");
          navigate("/users/dashboard");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (err) {
      toast.error("failed, please try again");
    }
  };

  if (!login) {
    return <Error message="you are not looged in" />;
  }

  if (existingAdmin) {
    return <Error message="you are already an admin" />;
  }
  return (
    <>
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-[23rem]">
          <div className="w-full p-8">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              ElectionBits
            </h2>
            <p className="text-xl text-gray-600 text-center">
              Register yourself as an Admin here !!
            </p>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                required
                name="name"
                onChange={getInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Unique Govt. Job ID
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                name="id"
                required
                onChange={getInput}
              />
            </div>
            <div className="mt-8">
              <button
                onClick={create}
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                Register
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link
                to="/users/dashboard"
                className="text-xs text-blue-600 uppercase"
              >
                Go Back to dashboard
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
