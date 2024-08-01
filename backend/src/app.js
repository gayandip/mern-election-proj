import express from "express"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import { userRouter } from "../routes/user.routes.js"
import { adminRouter } from "../routes/admin.routes.js"

app.use("/users", userRouter)
app.use("/admins", adminRouter)

export { app }