import { Candidate } from "../models/candidate.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncExe } from "../utils/asyncExecute.js";


const getCandidatesToVote = asyncExe(async (req,res) => {

    if (!(req.user.cardId)) {
        throw new apiError(403, "you do not have a voter card, create card first")
    }

    const constituency = req.params.constituency

    const candidates = await Candidate.find({
        $and: [
            {constituencyName: constituency},
            {status: "verified"}
        ]
    })
    if (!candidates) {
        throw new apiError(503, "error finding candidates")
    }

    res.status(200).json(new ApiResponse(200, candidates, "fetched candidate successfully"))
})

export{
    getCandidatesToVote
}