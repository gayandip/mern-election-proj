import mongoose, {Schema} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

const candidateSchema = new Schema(
    {
        fullName: {
            type: Schema.Types.ObjectId,
            ref: "Card"
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: "Card"
        },
        constituencyType: {
            type: String,
            required: true
        },
        constituencyName: {
            type: String,
            required: true
        },
        image: {
            type: Schema.Types.ObjectId,
            ref: "Card"
        },
        netWorth: {
            type: String,
            required: true
        },
        gender: {
            type: Schema.Types.ObjectId,
            ref: "Card"
        },
        party: {
            type: String,
            required: true
        },
        partyRegDoc: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: "processing"
        },
        votes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Card"
            }
        ]
    },
    
    {
        timestamps: true
    }
)

candidateSchema.plugin(aggregatePaginate);

export const Candidate = mongoose.model("Candidate",candidateSchema)