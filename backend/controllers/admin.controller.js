import { Admin } from "../models/admin.model.js";
import { Card } from "../models/card.model.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncExe } from "../utils/asyncExecute.js";

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
    ).select("-password -refreshToken").populate("adminId")

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

const getCards= asyncExe(async (req, res) => {
    console.log(req.user.adminId.status);
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

export {
    registerAdmin,
    getAdmins,
    getCards
}