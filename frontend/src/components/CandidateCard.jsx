import React from "react";

function CandidateCard({name, add, gen, image, party, conName, conType, netWorth}) {
  return (
    <>
      <div className="card bg-base-100 w-80 shadow-xl">
        <div className="avatar m-auto">
          <div className="w-32 rounded">
            <img src= {image} />
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
        </div>
      </div>
    </>
  );
}

export default CandidateCard;
