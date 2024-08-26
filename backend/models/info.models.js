import mongoose from "mongoose";

const flexiblevoteSchema = new mongoose.Schema({}, { strict: false });
const Votecount = mongoose.model("Votecount",flexiblevoteSchema)

export {
    Votecount
}