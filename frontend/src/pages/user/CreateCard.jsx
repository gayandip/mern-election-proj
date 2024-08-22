import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useLogin } from "../../context/login.context";
import Error from "../others/Error";
import CheckLogin from "../../hooks/CheckLogin";

function CreateCard() {

  let card = {
    name: "",
    add: "",
    asscon: "",
    parcon: "",
    gen: "",
    dob: "",
    aadhar: "",
    image: { name: "" },
    docs: { name: "" },
  };
  const [existingCard, setExistingCard] = useState(false)
  const navigate = useNavigate();

  const { login, setLogin, setUserData } = useLogin();

  const getlogin = async () => {
    const { loggedin, user } = await CheckLogin();
    if (loggedin != login) {
      setLogin(loggedin);
    }
    
    if (user.cardId  && (existingCard == false)) {
      setExistingCard(true)
    }
  };

  useEffect(() => {
    getlogin();
  });

  const getInput = (e) => {
    if (e.target.name == "image" || e.target.name == "docs") {
      card[e.target.name] = e.target.files[0];
    } else {
      card[e.target.name] = e.target.value;
    }
  };

  const create = async () => {

    const values = Object.values(card);

    if (
      values.some((field) =>
        typeof field == "object"
          ? field.name.trim() === ""
          : field.trim() === ""
      )
    ) {
      toast.error("empty fields");
      return;
    }

    if (
      !(card.image.name.includes("jpeg") || card.image.name.includes("jpg"))
    ) {
      toast.error("incorrect image format");
      return;
    }

    if (!card.docs.name.includes("pdf")) {
      toast.error("not a pdf file");
      return;
    }

    {
      const birth = new Date(card.dob)
      const now = new  Date(Date.now())
      const age = (now.getTime() - birth.getTime())/(1000*60*60*24*365.25)

      if (age<18) {
        toast.error("you are not 18")
        return
      }
    }

    try {
      await axios
        .post("http://localhost:5001/users/createcard", card, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setUserData(res.data.data)
          card = {};
          toast.success("card created, verification under process");
          navigate("/users/dashboard");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (err) {
      toast.error("failed, please try again");
    }
  };

  return login ? (
    existingCard ? (
      <Error message="you already have a card" />
    ) : (
      <>
        <div className="py-16">
          <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-xs md:max-w-md">
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
                  onChange={getInput}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Parliament Constituency
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  name="parcon"
                  required
                  onChange={getInput}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Gender
                </label>
                <select
                  name="gen"
                  required
                  onChange={getInput}
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                >
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
                  accept="image/jpg, image/jpeg"
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
    )
  ) : (
    <Error message="please login" />
  );
}
export default CreateCard;
