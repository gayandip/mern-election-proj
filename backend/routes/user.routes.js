import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import { createCard } from "../controllers/card.controller.js";
import { upload } from "../middlewares/multer.js";
import { registerCandidate } from "../controllers/candidate.controller.js";
import { registerAdmin } from "../controllers/admin.controller.js";


const userRouter = Router()
const adminRouter = Router()

userRouter.route("/register").post(registerUser)
// router.route("/login").get(loginUser)
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

adminRouter.route("/register").post(registerAdmin)

export {
    userRouter,
    adminRouter
}