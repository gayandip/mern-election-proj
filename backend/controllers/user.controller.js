import { asyncExe } from "../utils/asyncExecute.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (err) {
        throw new apiError(501, "error wile generating tokens")
    }
}

const registerUser = asyncExe(async (req, res) => {
    // get user details from frontend
    // validate
    // check user already exist or not
    // check for images
    // upload images and files
    // create user database object
    // remove unnessary fields from response and send to frontend
    // check for user response comming or not, means user created or not

    const {email, password} = req.body

    
    if ([email, password].some((field) => field?.trim() === "")) {
        throw new apiError(400, "empty any one of register field")
    }

    const exUser = await User.findOne({email})
    if (exUser) {
        throw new apiError(401, "user already exist");
    }

    const user = await User.create({
        email: email.toLowerCase(),
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new apiError(502, "error while creating user")
    }

    res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )

    user.save()
})

const loginUser = asyncExe(async (req, res) => {
    // take data from frontend
    // find user
    // check password
    // send cookie with access and refresh tokens

    const {email, password} = req.body

    if([email, password].some((field) => field?.trim() === "")){
        throw new apiError(401, "email and password is required")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new apiError(403, "user not exist")
    }

    const validateUser = await user.checkPassword(password)
    if(!validateUser){
        throw new apiError(403, "incorrect password")
    }

    const {accessToken, refreshToken} = await generateTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    if (loggedInUser.cardId) {
        await loggedInUser.populate("cardId")

        if (loggedInUser.candidateId) {
            await loggedInUser.populate("candidateId")
        }
    }

    if (loggedInUser.adminId) {
        await loggedInUser.populate("adminId")
    }

    // cookies
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
        new ApiResponse(200,{
            user: loggedInUser, accessToken, refreshToken
        },
        "logged in successfully"
    )
    )
})

const logoutUser = asyncExe(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: ""
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
        new ApiResponse(200, {}, "logout successfully")
    )
})

const getCurrentUser = asyncExe(async (req, res) => {
    
    return res.status(200).json(new ApiResponse(200, req.user, "user fetched successfully"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
}