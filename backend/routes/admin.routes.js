import {Router} from "express"
import { getAdmins, getCards } from "../controllers/admin.controller.js"
import { verifyJWT } from "../middlewares/auth.js"

const adminRouter = Router()

adminRouter.route("/get/requests/:status").get(verifyJWT, getAdmins)
adminRouter.route("/get/cards/:status").get(verifyJWT, getCards)

export {adminRouter}