import { asyncExe } from "../utils/asyncExecute.js";
import {apiError} from "../utils/apiError.js"
import {Candidate} from "../models/candidate.model.js"
import { ApiResponse } from "../utils/apiResponse.js";

const registerCandidate = asyncExe(async (req,res) => {
    const {constiType, constiName, networth, party} = req.body
    const docUrl = req.files?.partydoc[0]?.path

    if([constiType, constiName, networth, party,docUrl].some((field) => field?.trim() === "" )){
        throw new apiError(403, "empty any one of candidate field")
    }

    const candidate = await Candidate.create({
        constituencyType: constiType,
        constituencyName: constiName,
        netWorth: networth,
        party: party,
        partyRegDoc: docUrl
    })

    const createdCandidate = await Candidate.findById(candidate._id)
    if (!createdCandidate) {
        throw new apiError(503, "error while creating candidate")
    }

    res.status(200).json(
        new ApiResponse(200, createdCandidate, "Candidate created successfully")
    )

    candidate.save()
})

export {registerCandidate}