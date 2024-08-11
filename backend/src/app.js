import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors())

// routes import
import { userRouter } from "../routes/user.routes.js"
import { adminRouter } from "../routes/admin.routes.js"
import { candidateRouter } from "../routes/candidate.routes.js"

app.use("/users", userRouter)
app.use("/admins", adminRouter)
app.use("/candidates", candidateRouter)

export { app }