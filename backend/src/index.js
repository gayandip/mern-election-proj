import dotenv from "dotenv"
import { connectDB } from "../database/index.js";
import express from "express"

dotenv.config();

const app = express()

connectDB()
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`server is running at http://localhost:${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("db connection error occured",err);
})

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: "true", limit: "16kb"}))
app.use(express.static("public"))