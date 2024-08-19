import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useLogin } from "../../context/login.context";
import Error from "../others/Error";
import CheckLogin from "../../hooks/CheckLogin";

function Login() {
  let user = {email: "", password: ""}
  const navigate = useNavigate();
  const { login, setLogin } = useLogin();

  const getlogin = async () => {
    const {loggedin, user} = await CheckLogin()
    if (loggedin != login) {
      setLogin(loggedin)
    }
  }
  
   useEffect(() => {
    getlogin()
   })

  const getInput = (e) => {
    user[e.target.name] = e.target.value
  };

  const loginUser = async () => {
    const { email, password } = user;
    if (email.trim() === "" || password.trim() === "") {
      toast.error("empty fields");
      return;
    }
    if (!email.includes("@")) {
      toast.error("not a proper email");
      return;
    }

    try {
      await axios.post("http://localhost:5001/users/login", user, { withCredentials: true })
        .then((res) => {
          user = {}
          toast.success("Login successful");
          setLogin(true);
          navigate("/users/dashboard");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (err) {
      toast.error("login failed, please try again!!");
    }
  };

  return login ? (
    <Error message="already logged in" />
  ) : (
    <>
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto  max-w-xs md:max-w-sm">
          <div className="w-full p-8">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              ElectionBits
            </h2>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
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
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <Link to="" className="text-xs text-gray-500">
                  Forget Password?
                </Link>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                name="password"
                onChange={getInput}
              />
            </div>
            <div className="mt-8">
              <button
                onClick={loginUser}
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                Login
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link
                to="/users/register"
                className="text-xs text-blue-600 uppercase"
              >
                sign up
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
