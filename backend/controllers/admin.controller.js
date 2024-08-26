import { Admin } from "../models/admin.model.js";
import { Card } from "../models/card.model.js";
import { User } from "../models/user.model.js";
import { Vote } from "../models/vote.model.js";
import { Candidate } from "../models/candidate.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncExe } from "../utils/asyncExecute.js";
import { Votecount } from "../models/info.models.js";

const registerAdmin = asyncExe(async (req,res) => {
    const {name, id} = req.body
    
    if ([name, id].some((field) => field?.trim() === "")) {
        throw new apiError(405, "empty any of admin field")
    }

    if (req.user.adminId) {
        throw new apiError(405, "you are already an admin")
    }

    const exAdmin = await Admin.findOne({jobId: id})
    
    if (exAdmin) {
        throw new apiError(403, "admin already exist")
    }

    const admin = await Admin.create({
        fullName: name,
        jobId: id
    })

    const createdAdmin = await Admin.findById(admin._id)
    if (!createdAdmin) {
        throw new apiError(503, "error while creating admin")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                adminId: createdAdmin._id
            },
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    res.status(201).json(
        new ApiResponse(200, user, "admin created successfully")
    )

    admin.save()
})

const getAdmins = asyncExe(async (req, res) => {
    
    if (!(req.user.adminId.status == "verified" && req.user.adminId.specialPower == "true")) {
        throw new apiError(403, "you do not have access")
    }
    
    let admins = {}

    if (req.params.status == "all") {
        admins = await Admin.find()
    }else{
        admins = await Admin.find({status: req.params.status})
    }

    res.status(200).json(new ApiResponse(200, admins, `admins fetched successfully`))
})

const getCards = asyncExe(async (req, res) => {

    if (!(req.user.adminId.status == "verified")) {
        throw new apiError(403, "you do not have access")
    }
    
    let cards = {}

    if (req.params.status == "all") {
        cards = await Card.find()
    }else{
        cards = await Card.find({status: req.params.status})
    }

    res.status(200).json(new ApiResponse(200, cards, `cards fetched successfully`))
})

const getCandidates = asyncExe(async (req, res) => {
    if (!(req.user.adminId.status == "verified" && req.user.adminId.specialPower == "true")) {
        throw new apiError(403, "you do not have access")
    }
    
    let candidates = {}

    if (req.params.status == "all") {
        candidates = await Candidate.find()
    }else{
        candidates = await Candidate.find({status: req.params.status})
    }

    res.status(200).json(new ApiResponse(200, candidates, "candidates fetched successfully"))
})

const verifyCard = asyncExe(async (req, res) => {
    if (!req.user.adminId) {
        throw new apiError(403, "you do not have access permission")
    }

    if (!(req.user.adminId.status === "verified")) {
        throw new apiError(403, "you are not a verified admin")
    }

    const cardId = req.params.id
    if (!cardId) {
        throw new apiError(403, "please enter a card id")
    }

    const updatedCard = await Card.findByIdAndUpdate(
        cardId,
        {
            status: "verified"
        },
        {
            new: true
        }
    )

    updatedCard.save()

    res.status(200).json({message: "Successfully verified"})
})

const verifyCandidate = asyncExe(async (req, res) => {
    if (!req.user.adminId) {
        throw new apiError(403, "you do not have access permission")
    }

    if (!(req.user.adminId.status == "verified" && req.user.adminId.specialPower == "true")) {
        throw new apiError(403, "you do not have access")
    }

    const candidateId = req.params.id
    if (!candidateId) {
        throw new apiError(403, "please enter a candidate id")
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(
        candidateId,
        {
            status: "verified"
        },
        {
            new: true
        }
    )

    updatedCandidate.save()

    res.status(200).json({message: "Successfully verified"})
})

const verifyAdmin = asyncExe(async (req, res) => {
    if (!(req.user.adminId.status == "verified" && req.user.adminId.specialPower == "true")) {
        throw new apiError(403, "you do not have access")
    }

    const adminId = req.params.id
    if (!adminId) {
        throw new apiError(403, "please enter a admin id")
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
        adminId,
        {
            status: "verified"
        },
        {
            new: true
        }
    )
    updatedAdmin.save()

    res.status(200).json({message: "verified successfully"})
})

const updateAdminPower = asyncExe(async (req, res) => {
    if (!(req.user.adminId.status == "verified" && req.user.adminId.specialPower == "true")) {
        throw new apiError(403, "you do not have access")
    }

    const adminId = req.params.id
    if (!adminId) {
        throw new apiError(403, "please enter a admin id")
    }

    const power = req.params.power
    const updatedAdmin = await Admin.findByIdAndUpdate(
        adminId,
        {
            specialPower: String(power)
        },
        {
            new: true
        }
    )
    updatedAdmin.save()

    res.status(200).json({message: "power updated successfully"})
})

const countVotes = asyncExe(async (req, res) => {
    if (!(req.user.adminId.status == "verified" && req.user.adminId.specialPower == "true")) {
        throw new apiError(403, "you do not have access")
    }

    if (!(req.user.adminId.type == "supreme")) {
        throw new apiError(403, "you are not allowed to do that operation")
    }

    const election = req.params.electionType
    if (!election) {
        throw new apiError(403, "election type or name required")
    }

    const existingrecord = await Votecount.find({electionType: election})
    if (existingrecord.length > 0) {
        return res.status(401).json({message: "already counted"})
    }

    const counted = await Vote.aggregate(
        [
            {
              $match: {
                electionType: election
              }
            },
            {
              $group: {
                _id: "$constituency",
                candidates: {
                  $push: "$votedTo"
                },
                totalvotes: {
                  $sum: 1
                }
              }
            },
            {
              $unwind: "$candidates"
            },
            {
              $group: {
                _id: {
                    constituency: "$_id",
                  candidates: "$candidates"
                },
                count: {
                  $sum: 1
                }
              }
            },
            {
              $group: {
                _id: "$_id.constituency",
                candidates: {
                  $push: {
                    candidate: "$_id.candidates",
                    votes: "$count"
                  }
                },
                totalcandidates: {$sum: 1}
              }
            }
          ]
    )

    const created = await Votecount.create(
        {
            electionType: election,
            details: counted
        }
    )

    if (!created._id) {
        return res.status(502).json({message:"failed"});
    }

    return res.status(200).json({message:"counted success"})

})

export {
    registerAdmin,
    getAdmins,
    getCards,
    getCandidates,
    verifyCard,
    verifyCandidate,
    verifyAdmin,
    updateAdminPower,
    countVotes
}