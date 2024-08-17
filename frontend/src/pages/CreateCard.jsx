import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast";

function CreateCard() {
  const [card, setCard] = useState(
    {
      name: "",
      add: "",
      asscon: "",
      parcon: "",
      gen: "",
      dob: "",
      aadhar: "",
      image: "",
      docs: ""
    }
  )

  const navigate = useNavigate()

  const getInput = (e) => {

    if (e.target.name == "image" || e.target.name == "docs") {
      setCard({...card, [e.target.name]:e.target.files[0]})
    }
    else {
      setCard({...card, [e.target.name]:e.target.value})
    }
  }

  const create = async () => {
    
    const values = Object.values(card)
    
    if (values.some((field) => typeof(field) == "object" ? field.name.trim() === "" : field.trim() === "" )) {
      toast.error("empty fields")
      return
    }

    if (!(card.image.name.includes("jpeg") || card.image.name.includes("jpg"))) {
      toast.error("incorrect image format")
    }

    if (!(card.docs.name.includes("pdf"))) {
      toast.error("not a pdf file")
    }
    
    try {
      await axios.post("http://localhost:5001/users/createcard", card, {withCredentials: true, headers: {"Content-Type":"multipart/form-data"}})
      .then((res) => {
        toast.success("card created, verification under process")
        navigate("/users/dashboard")
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
              Create your card here !!
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
                value={card.name}
                onChange={getInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                name="add"
                required
                value={card.add}
                onChange={getInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Assembly Constituency
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                name="asscon"
                required
                value={card.asscon}
                onChange={getInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Parliament  Constituency
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                name="parcon"
                required
                value={card.parcon}
                onChange={getInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
              </label>
              <select name="gen" required onChange={getInput} className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Date of Birth
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="date"
                name="dob"
                required
                onChange={getInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Aadhar Number
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                name="aadhar"
                required
                value={card.aadhar}
                onChange={getInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
              Your Image
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="file"
                name="image"
                accept="image/*"
                required
                onChange={getInput}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
               Aadhar Scanned pdf
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="file"
                name="docs"
                accept=".pdf"
                required
                onChange={getInput}
              />
            </div>
            <div className="mt-8">
              <button
                onClick={create}
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                Create Card
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link to="/" className="text-xs text-blue-600 uppercase">
                Go To Home
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateCard;
