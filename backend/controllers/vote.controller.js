import { Candidate } from "../models/candidate.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js"
import { asyncExe } from "../utils/asyncExecute.js";
import { Vote } from "../models/vote.model.js"
import mongoose from "mongoose";
import { Votecount } from "../models/info.models.js";


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

const castVote = asyncExe(async (req, res) => {
    
    if (!(req.user.cardId)) {
        throw new apiError(403, "you do not have a voter card, create card first")
    }

    if (!(req.user.cardId.status == "verified")) {
        throw new apiError(403, "your card is not verified")
    }

    const {type, votingTo, constituency} = req.body
    const voter = req.user.cardId._id

    const pastHistory = await Vote.find(
        {
            $and: [{voter: voter}, {electionType:type}]
        }
    )
    if (pastHistory.length > 0) {
        throw new apiError(403, "you already casted your vote")
    }

    const vote = await Vote.create({
        voter: voter,
        votedTo: votingTo,
        electionType: type,
        constituency: constituency
    })
    await vote.save()

    const castedVote = await Vote.findById(vote._id)
    if (!castedVote) {
        throw new apiError(403, "vote casting error")
    }

    res.status(200).json(
        new ApiResponse(201,castedVote,"success")
    )
})

const getResult = asyncExe(async (req, res) => {
    const election = req.params.election
    const result = await Votecount.find({electionType: election})
    if (result.length == 0) {
        return res.status(401).json({message: "no result found"})
    }

    return res.status(200).json({message: "success", result: result})
})

export{
    getCandidatesToVote,
    castVote,
    getResult
}