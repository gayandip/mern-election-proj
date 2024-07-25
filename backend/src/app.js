import express from "express"

const app = express()

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

// routes import
import { router } from "../routes/user.routes.js"

app.use("/users", router)

export { app }