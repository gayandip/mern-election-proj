import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncExe } from "../utils/asyncExecute.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncExe(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if (!token) {
            throw new apiError(401, "unothorized request")
        }
    
        const info = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(info.id).select("-password -refreshToken")
        if (!user) {
            throw new apiError(401, "invalid access token")
        }
        req.user = user
        next()
    } catch (err) {
        throw new apiError(401, err.message || "invalid access token")
    }
})