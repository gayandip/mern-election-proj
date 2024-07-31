import { Admin } from "../models/admin.model.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncExe } from "../utils/asyncExecute.js";

const registerAdmin = asyncExe(async (req,res) => {
    const {email, pass, name, id} = req.body
    
    if ([email, pass, name, id].some((field) => field?.trim() === "")) {
        throw new apiError(405, "empty any of admin field")
    }

    const exAdmin = await Admin.findOne({
        $or: [{email: email}, {jobId: id}]
    })
    
    if (exAdmin) {
        throw new apiError(403, "admin already exist")
    }

    const admin = await Admin.create({
        email: email,
        password: pass,
        fullName: name,
        jobId: id
    })

    const createdAdmin = await Admin.findById(admin._id).select("-password")
    if (!createdAdmin) {
        throw new apiError(403, "error while creating admin")
    }

    res.status(201).json(
        new ApiResponse(200, createdAdmin, "admin created successfully")
    )

    admin.save()
})

export {registerAdmin}