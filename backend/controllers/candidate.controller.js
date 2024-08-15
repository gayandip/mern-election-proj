import { asyncExe } from "../utils/asyncExecute.js";
import {apiError} from "../utils/apiError.js"
import {Candidate} from "../models/candidate.model.js"
import {Card} from "../models/card.model.js"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { unlinkFile } from "../utils/unlinkFile.js";
import { Vote } from "../models/vote.model.js"
import mongoose from "mongoose";

const registerCandidate = asyncExe(async (req,res) => {
    
    const {constiType, constiName, networth, party} = req.body
    const docUrl = req.files?.partydoc[0]?.path

    if([constiType, constiName, networth, party].some((field) => field?.trim() === "" )){
        unlinkFile(docUrl)
        throw new apiError(403, "empty any one of candidate field")
    }

    if (!docUrl) {
        throw new apiError(403, "empty file")
    }

    if (!(req.user.cardId)) {
        unlinkFile(docUrl)
        throw new apiError(403, "you do not have a voter card, create card first")
    }

    if (req.user.candidateId) {
        unlinkFile(docUrl)
        throw new apiError(403, "you are already a candidate")
    }

    const card = await Card.findById(req.user.cardId)
    if (!(card.status == "verified")) {
        unlinkFile(docUrl)
        throw new apiError(403, "your voter card is not verified")
    }

    const existCandidates = await Candidate.find({constituencyName: constiName})
    if (existCandidates.some((obj) => obj.party == party)) {
        unlinkFile(docUrl)
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
        unlinkFile(docUrl)
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

const showMyConstituencyResult = asyncExe(async (req, res) => {
    const user = req.user
    if (!user.candidateId) {
        throw new apiError(503, "you are not a candidate")
    }

    await user.populate("candidateId")
    if (!(user.candidateId.status === "verified")) {
        throw new apiError(503, "you are not a verified candidate")
    }

    const candidates = await Candidate.find(
        {
            $and: [ { constituencyName:user.candidateId.constituencyName }, { status: "verified"} ]
        }
    )

    candidates.map(async (candidate) => {

        const vote = await Vote.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(candidate._id)
                }
            },
            {
                $count: "votes"
            }
        ])

        candidate.totalVotes = vote.votes
    })

    res.status(200).json(
        new ApiResponse(200,candidates,"vote count success")
    )

})

export {
    registerCandidate,
    showMyConstituencyResult
}