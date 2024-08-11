import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { showMyConstituencyResult, showMyVotes } from "../controllers/candidate.controller.js";

const candidateRouter = Router()

candidateRouter.route("/get/myvotes").get(verifyJWT, showMyVotes)
candidateRouter.route("/get/result/:constituency").get(verifyJWT, showMyConstituencyResult)

export { candidateRouter }