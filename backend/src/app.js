import express from "express"

const app = express()

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

// routes import
import { userRouter, adminRouter } from "../routes/user.routes.js"

app.use("/users", userRouter)
app.use("/admin", adminRouter)

export { app }