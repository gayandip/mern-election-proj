import mongoose, {Schema} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

const candidateSchema = new Schema(
    {
        fullName: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        constituency: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        image: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        netWorth: {
            type: String,
            required: true
        },
        gender: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        party: {
            type: String,
            required: true
        },
        partyRegDoc: {
            type: String,
            required: true
        },
        votes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    
    {
        timestamps: true
    }
)

candidateSchema.plugin(aggregatePaginate);

export const Candidate = mongoose.model("Candidate",candidateSchema)