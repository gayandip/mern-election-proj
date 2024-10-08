import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useLogin } from "../../context/login.context";
import CheckLogin from "../../hooks/CheckLogin";
import Error from "../others/Error";

function Register() {

  let userData = {email: "", password: ""}
  const navigate = useNavigate();

  const { login, setLogin } = useLogin();

  const getlogin = async () => {
    const {loggedin, user} = await CheckLogin();
    if (loggedin != login) {
      setLogin(loggedin);
    }
  };

  useEffect(() => {
    getlogin();
  });

  const getInput = (e) => {
    userData[e.target.name] = e.target.value
  };

  const registerUser = async () => {
    const { email, password } = userData;
    
    if (email.trim() === "" || password.trim() === "") {
      toast.error("empty fields");
      return;
    }
    if (!email.includes("@")) {
      toast.error("not a proper email");
      return;
    }

    try {
      await axios.post("http://localhost:5001/users/register", userData)
        .then((res) => {
          userData = {}
          toast.success("Register Success, Login now");
          navigate("/users/login");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (err) {
      toast.error(" registration failed, please try again")
    }
  };

  return login ? (
    <Error message="You are already logged in" />
  ) : (
    <>
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-xs md:max-w-sm">
          <div className="w-full p-8">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              ElectionBits
            </h2>
            <p className="text-xl text-gray-600 text-center">
              Create new Account
            </p>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                name="email"
                onChange={getInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                name="password"
                onChange={getInput}
              />
            </div>
            <div className="mt-8">
              <button
                onClick={registerUser}
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                Register
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link to="/users/login" className="text-xs text-blue-600 uppercase">
                sign in
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Register;
