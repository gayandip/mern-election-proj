import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Register() {
  const [candidate, setCandidate] = useState(
    {
      constiType: "",
      constiName: "",
      networth: "",
      party: "",
      partydoc: ""
    }
  )
  const navigate = useNavigate();

  const getInput = (e) => {
    if (e.target.name == "partydoc") {
      setCandidate({...candidate, [e.target.name]:e.target.files[0]})
    }
    else {
      setCandidate({...candidate, [e.target.name]:e.target.value})
    }
  }

  const register = async () => {

    const values = Object.values(candidate)
    
    if (values.some((field) => typeof(field) == "object" ? field.name.trim() === "" : field.trim() === "" )) {
      toast.error("empty fields")
      return
    }

    if (!(candidate.partydoc.name.includes("pdf"))) {
      toast.error("not a pdf file")
      return
    }
    
    try {
      await axios.post("http://localhost:5001/users/candidate/register", candidate, {withCredentials: true, headers: {"Content-Type":"multipart/form-data"}})
      .then((res) => {
        toast.success("registered, verification under process")
        navigate("/")
      }).catch((err) => {
        toast.error(err.response.data.message)
      })
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-xs md:max-w-sm">
          <div className="w-full p-8">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              ElectionBits
            </h2>
            <p className="text-xl text-gray-600 text-center">
              Register as a Candidate !!!
            </p>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Constituency Type
              </label>
              <select name="constiType" onChange={getInput} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none">
                <option value="">Select</option>
                <option value="assembly">Assembly</option>
                <option value="parliament">Parliament</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Constituency Name
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                name="constiName"
                value={candidate.constiName}
                onChange={getInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Networth in Rupees (crore)
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                name="networth"
                value={candidate.networth}
                onChange={getInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Party
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                name="party"
                value={candidate.party}
                onChange={getInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Party Registration Document
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="file"
                name="partydoc"
                accept=".pdf"
                onChange={getInput}
              />
            </div>
            <div className="mt-8">
              <button
                onClick={register}
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
