import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ResultTable() {
  const [data, setData] = useState([]);
  const get = async () => {
    try {
      await axios
        .get("http://localhost:5001/users/get/result/gce")
        .then((res) => {
          if (res.status == 200) {
            setData(res.data.result[0]);
          }
        })
        .catch((err) => {
          toast.error("failed");
        });
    } catch (err) {
      toast.error("failed, try again");
    }
  };

  useEffect(() => {
    get();
  }, []);
  return (
    <>
      {data?.details?.map((field) => {
        return (
          <>
            <div className="outline-dashed outline-green-500 outline-2 m-4 p-2">
              <h3>constituency:{field._id}</h3>
              <h3>totalcandidates:{field.totalcandidates}</h3>
              {field?.candidates?.map((fd) => {
                return (
                  <>
                    <h3>candidate: {fd.candidate}</h3>
                    <h3>votes: {fd.votes}</h3>
                  </>
                );
              })}
            </div>
          </>
        );
      })}
    </>
  );
}

export default ResultTable;
