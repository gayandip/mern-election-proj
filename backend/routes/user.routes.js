import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import { createCard } from "../controllers/card.controller.js";
import { imgUpload } from "../middlewares/multer.js";


const router = Router()

router.route("/register").post(registerUser)
// router.route("/login").get(loginUser)
router.route("/createcard").post(
    imgUpload.fields([
        {
            name: "image",
            maxCount: 1
        }
    ]),
    createCard
)

export {router}