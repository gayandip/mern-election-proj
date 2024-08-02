import { asyncExe } from "../utils/asyncExecute.js";
import {apiError} from "../utils/apiError.js"
import {Candidate} from "../models/candidate.model.js"
import {Card} from "../models/card.model.js"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerCandidate = asyncExe(async (req,res) => {
    
    if (req.user.candidateId) {
        throw new apiError(403, "you are already a candidate")
    }

    const card = await Card.findById(req.user.cardId)
    if (!(card.status == "verified")) {
        throw new apiError(403, "your voter card is not verified")
    }
    
    const {constiType, constiName, networth, party} = req.body
    const docUrl = req.files?.partydoc[0]?.path

    if([constiType, constiName, networth, party, docUrl].some((field) => field?.trim() === "" )){
        throw new apiError(403, "empty any one of candidate field")
    }

    const existCandidates = await Candidate.find({constituencyName: constiName})
    if (existCandidates.some((obj) => obj.party == party)) {
        throw new apiError(403, "already a candidate exists in this constituency with same party")
    }

    const details = {
        name: card.fullName,
        address: card.address,
        gender: card.gender,
        image: card.image
    }

    const candidate = await Candidate.create({
        details: details,
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

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                candidateId: createdCandidate._id
            },
        },
        {
            new: true
        }
    ).select("-password -refreshToken").populate("cardId candidateId")

    res.status(200).json(
        new ApiResponse(200, user, "Candidate created successfully")
    )

    candidate.save()
})

export {registerCandidate}