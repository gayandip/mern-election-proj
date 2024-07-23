import mongoose from "mongoose"
import { DB_NAME } from "../src/constants.js"

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
        console.log("Database connected");
    } catch (err) {
        console.log("Database connection error",err);
        process.exit(1);
    }
}
export {connectDB}