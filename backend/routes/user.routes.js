import {Router} from "express";
import { loginUser, registerUser, logoutUser, getCurrentUser } from "../controllers/user.controller.js";
import { createCard } from "../controllers/card.controller.js";
import { upload } from "../middlewares/multer.js";
import { registerCandidate } from "../controllers/candidate.controller.js";
import { verifyJWT } from "../middlewares/auth.js";
import { registerAdmin } from "../controllers/admin.controller.js";
import { getCandidatesToVote, castVote, getResult } from "../controllers/vote.controller.js";

const userRouter = Router()

userRouter.route("/register").post(registerUser)

userRouter.route("/login").post(loginUser)

userRouter.route("/logout").post(verifyJWT, logoutUser)
userRouter.route("/get/current/loggedin").get(verifyJWT, getCurrentUser)

userRouter.route("/createcard").post(
    verifyJWT,
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
    verifyJWT,
    upload.fields([
        {
            name: "partydoc",
            maxCount:1
        }
    ]),
    registerCandidate
)

userRouter.route("/request/adminaccess").post(verifyJWT, registerAdmin)
userRouter.route("/vote/get/candidates/:constituency").get(verifyJWT, getCandidatesToVote)
userRouter.route("/vote/cast").post(verifyJWT, castVote)
userRouter.route("/get/result/:election").get(getResult)

export {userRouter}