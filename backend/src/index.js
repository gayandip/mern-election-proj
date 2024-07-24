import dotenv from "dotenv"
import { connectDB } from "../database/index.js";
import { app } from "./app.js";

dotenv.config();


connectDB()
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`server is running at http://localhost:${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("db connection error occured",err);
})