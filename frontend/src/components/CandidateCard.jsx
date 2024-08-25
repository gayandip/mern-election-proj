import React from "react";
import toast from "react-hot-toast";
import axios from "axios";

function CandidateCard({
  name,
  add,
  gen,
  image,
  party,
  conName,
  conType,
  netWorth,
  id,
}) {
  const voteCandidate = async (e) => {
    const id = e.target.id;
    try {
      await axios
        .post(
          "http://localhost:5001/users/vote/cast",
          { type: "gce", votingTo: id },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status == 200) {
            toast.success("voted");
          } else toast.error("voting failed");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    } catch (err) {
      toast.error("failed, try again");
    }
  };
  return (
    <>
      <div className="card bg-base-100 w-80 shadow-xl outline-dashed outline-lime-300">
        <div className="avatar m-auto">
          <div className="w-32 rounded">
            <img src={image} />
          </div>
        </div>
        <div className="card-body">
          <h2 className="card-title">
            {name}
            <div className="badge badge-secondary">{party}</div>
          </h2>
          <p>{gen}</p>
          <p>{`networth: ${netWorth}`}</p>
          <p>{add}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">{conType}</div>
            <div className="badge badge-outline">{conName}</div>
          </div>
          <div>
            <button
              id={id}
              onClick={voteCandidate}
              className="bg-blue-700 font-semibold text-white rounded-md m-2 px-4  py-2 btn"
            >
              vote
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateCard;
