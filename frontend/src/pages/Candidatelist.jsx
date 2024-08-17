import React, { useState } from 'react';
import {Link} from "react-router-dom";
import "./candidate.css";
function Candidatelist() {
    const [candidates, setCandidates] = useState([
        { name: '', age: '' },
        { name: '', age: '' },
        { name: '', age: '' },
        { name: '', age: '' },
        { name: '', age: '' }
    ]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newCandidates = [...candidates];
        newCandidates[index][name] = value;
        setCandidates(newCandidates);
    };

    return (
        <div>
            <h2>Candidate Table</h2>
            <form>
                {candidates.map((candidate, index) => (
                    <div key={index}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={candidate.name}
                                onChange={e => handleInputChange(index, e)}
                            />
                        </label>
                        <label>
                            Age:
                            <input
                                type="text"
                                name="age"
                                value={candidate.age}
                                onChange={e => handleInputChange(index, e)}
                            />
                        </label>
                    </div>
                ))}
            </form>
        </div>
    )
}

export default Candidatelist