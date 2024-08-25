import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useLogin } from "../context/login.context";
import CheckLogin from "../hooks/CheckLogin";
import Error from "../pages/others/Error";
import { Link } from "react-router-dom";

function CardTable() {
  const [existingAdmin, setExistingAdmin] = useState(false);
  const [tableData, setTableData] = useState([]);

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

  const getcards = async (e) => {
    try {
      const type = e.target.name;
      await axios
        .get(`http://localhost:5001/admins/get/cards/${type}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status == 200) {
            setTableData(res.data.data);
            setUserData((prev) => prev);
            document.getElementById("table").classList.remove("hidden");
            toast.success("success");
          } else toast.error("failed");
        });
    } catch (err) {
      toast.error("failed, try again");
    }
  };

  const verifyCard = async (e) => {
    const id = e.target.id;
    try {
      await axios
        .post(
          `http://localhost:5001/admins/verify/card/${id}`,
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status == 200) {
            setTableData(res.data.data);
            setUserData((prev) => prev);
            document.getElementById("table").classList.remove("hidden");
            toast.success("success");
          } else toast.error("failed");
        });
    } catch (err) {
      toast.error("failed, try again");
    }
  };

  if (!login) {
    return <Error message="you are not logged in" />;
  }
  if (!existingAdmin) {
    return <Error message="you are not an admin" />;
  }
  // if (!(userData.adminId.status == "verified")) {
  //     return <Error message="you are no a verified admin"/>
  // }

  return (
    <>
      <div className="h-auto w-auto m-auto p-4">
        <div className="grid grid-cols-3 gap-4 mb-4 lg:max-w-[50%]">
          <button
            name="processing"
            onClick={getcards}
            className="bg-blue-600 btn text-white"
          >
            processing
          </button>
          <button
            name="verified"
            onClick={getcards}
            className="bg-blue-600 btn text-white"
          >
            verified
          </button>
          <button
            name="invalid"
            onClick={getcards}
            className="bg-blue-600 btn text-white"
          >
            invalid
          </button>
        </div>

        <div id="table" className="relative overflow-x-auto hidden text-sm">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Aadhar No.
                </th>
                <th scope="col" className="px-6 py-3">
                  DOB
                </th>
                <th scope="col" className="px-6 py-3">
                  Assembly
                </th>
                <th scope="col" className="px-6 py-3">
                  Parliament
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((field) => {
                return (
                  <>
                    <tr
                      key={field._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td key={field.fullName} className="px-6 py-4">
                        {field.fullName}
                      </td>
                      <td key={field.gender} className="px-6 py-4">
                        {field.gender}
                      </td>
                      <td key={field.address} className="px-6 py-4">
                        {field.address}
                      </td>
                      <td key={field.aadharNumber} className="px-6 py-4">
                        {field.aadharNumber}
                      </td>
                      <td key={field.dateOfBirth} className="px-6 py-4">
                        {field.dateOfBirth}
                      </td>
                      <td
                        key={field.assemblyConstituency}
                        className="px-6 py-4"
                      >
                        {field.assemblyConstituency}
                      </td>
                      <td
                        key={field.parlamentConstituency}
                        className="px-6 py-4"
                      >
                        {field.parlamentConstituency}
                      </td>
                      <td key={field.status} className="px-6 py-4">
                        {field.status}
                      </td>
                      <td key="btn" className="px-6 py-4">
                        {field.status == "verified" ? (
                          ""
                        ) : (
                          <Link
                            onClick={verifyCard}
                            id={field._id}
                            className="text-green-500 font-bold"
                          >
                            Verify
                          </Link>
                        )}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CardTable;
