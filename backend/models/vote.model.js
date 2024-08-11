import mongoose, {Schema} from "mongoose";
import aggrigate from "mongoose-aggregate-paginate-v2"

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
        electionType: String
    }, 
    
    {
        timestamps: true
    }
)

voteSchema.plugin(aggrigate)
export const Vote = mongoose.model("Vote", voteSchema)