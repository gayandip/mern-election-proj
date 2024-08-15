import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import { showMyConstituencyResult } from "../controllers/candidate.controller.js";

const candidateRouter = Router()

candidateRouter.route("/get/ongoing/constituency/result/").get(verifyJWT, showMyConstituencyResult)

export { candidateRouter }