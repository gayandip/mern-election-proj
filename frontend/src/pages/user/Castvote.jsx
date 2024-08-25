import React, { useState } from "react";
import CandidateCard from "../../components/CandidateCard";
import toast from "react-hot-toast";
import { useLogin } from "../../context/login.context";
import axios from "axios";

function Castvote() {
  const [candidatedata, setcandidatedata] = useState([]);
  const { userData, setUserData } = useLogin();

  const getCandidates = async (e) => {
    const constituency = e.target.name;
    try {
      await axios
        .get(
          `http://localhost:5001/users/vote/get/candidates/${constituency}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status == 200) {
            setcandidatedata(res.data.data);
            setUserData((prev) => prev);
            toast.success("success");
          } else toast.error("failed");
        });
    } catch (error) {
      toast.error("failed, try again");
    }
  };
  return (
    <>
      <div className="h-auto w-auto">
        <div className="m-4 p-2 text-center">
          <button
            name={userData?.cardId?.assemblyConstituency}
            onClick={getCandidates}
            className="bg-blue-400 rounded-md btn text-white m-2 p-2"
          >
            view assembly
          </button>
          <button
            name={userData?.cardId?.parlamentConstituency}
            onClick={getCandidates}
            className="bg-blue-400 rounded-md btn text-white"
          >
            view parliament
          </button>
        </div>
        <div className="m-4 p-2 flex items-center justify-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 ">
            {candidatedata?.map((field) => {
              const { name, address, gender, image } = field.details;
              const {
                party,
                constituencyName,
                constituencyType,
                netWorth,
                _id,
              } = field;
              return (
                <>
                  <div className="m-2 p-1">
                    <CandidateCard
                      name={name}
                      add={address}
                      gen={gender}
                      image={image}
                      party={party}
                      conName={constituencyName}
                      conType={constituencyType}
                      netWorth={netWorth}
                      id={_id}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Castvote;
