import mongoose, {Schema} from "mongoose";

const voteSchema = new Schema(
    {
        voter: {
            type: Schema.Types.ObjectId,
            ref: "Card"
        },
        votedTo: {
            type: Schema.Types.ObjectId,
            ref: "Candidate"
        },
        electionType: String,
        constituency: String
    }, 
    
    {
        timestamps: true
    }
)

export const Vote = mongoose.model("Vote", voteSchema)