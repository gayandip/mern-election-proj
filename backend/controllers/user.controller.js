import { asyncExe } from "../utils/asyncExecute.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

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

    const exUser = User.findOne({email})
    if (exUser) {
        throw new apiError(401, "user already exist");
    }

    const user = await User.create({
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
        throw new apiError(502, "error while creating user")
    }

    res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )
})

export {registerUser}