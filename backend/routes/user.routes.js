import {Router} from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/user.controller.js";
import { createCard } from "../controllers/card.controller.js";
import { upload } from "../middlewares/multer.js";
import { registerCandidate } from "../controllers/candidate.controller.js";
import { verifyJWT } from "../middlewares/auth.js";


const userRouter = Router()

userRouter.route("/register").post(registerUser)

userRouter.route("/login").post(loginUser)

userRouter.route("/logout").post(verifyJWT, logoutUser)

userRouter.route("/createcard").post(
    upload.fields([
        {
            name: "image",
            maxCount: 1
        },
        {
            name: "docs",
            maxCount: 1
        }
    ]),
    createCard
)

userRouter.route("/candidate/register").post(
    upload.fields([
        {
            name: "partydoc",
            maxCount:1
        }
    ]),
    registerCandidate
)

export {userRouter}