import { Router } from "express"
import { countVotes, getAdmins, getCandidates, getCards, updateAdminPower, verifyAdmin, verifyCandidate, verifyCard } from "../controllers/admin.controller.js"
import { verifyJWT } from "../middlewares/auth.js"

const adminRouter = Router()

adminRouter.route("/get/admins/:status").get(verifyJWT, getAdmins)
adminRouter.route("/get/cards/:status").get(verifyJWT, getCards)
adminRouter.route("/get/candidates/:status").get(verifyJWT, getCandidates)
adminRouter.route("/verify/card/:id").post(verifyJWT, verifyCard)
adminRouter.route("/verify/candidate/:id").post(verifyJWT, verifyCandidate)
adminRouter.route("/verify/admin/:id").post(verifyJWT, verifyAdmin)
adminRouter.route("/update/admin/power/:id/:power").post(verifyJWT, updateAdminPower)
adminRouter.route("/count/votes/:electionType").post(verifyJWT, countVotes)

export { adminRouter }