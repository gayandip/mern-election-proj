import { asyncExe } from "../utils/asyncExecute.js";

const registerUser = asyncExe(async (req, res) => {
    res.status(200).json({
        message: "registered"
    })
})

export {registerUser}