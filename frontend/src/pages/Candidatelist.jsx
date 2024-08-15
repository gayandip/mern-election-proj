import React, { useState } from "react";
import './candidate.css';
const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const addCandidate = () => {
    if (name && age) {
      setCandidates([...candidates, { name, age }]);
      setName("");
      setAge("");
    }
  };

  return (
    <div>
      <h2>Candidate List</h2>
      <div>
      <form id="candidate-form" onSubmit={addCandidate}>
      <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="Age">Age:</label>
        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button onClick={addCandidate}>Add Candidate</button>
      </form>
      </div>
      <table  id="candidate-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;

