import React, { useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios"

function Login() {
  const [user, setUser] = useState({email:"", password: ""})

  const getInput = (e) => {
    setUser({...user, [e.target.name]:e.target.value})
  }

  const loginUser = async () => {
    const {email, password} = user
    if (email.trim()==="" || password.trim()==="") {
      
    }
    if (!(email.includes("@"))) {
      
    }
    await axios.post("http://localhost:5001/api/users/login",{email, password}).then((res) => {
      console.log(res.data.data);
      window.alert("Login success")

    }).catch((err) => {
      console.log(err.message);
    })
  };

  return (
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
                value={user.email}
                onChange={getInput}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <Link to="/register" className="text-xs text-gray-500">
                  Forget Password?
                </Link>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                name="password"
                value={user.password}
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
              <Link to="/register" className="text-xs text-blue-600 uppercase">
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
