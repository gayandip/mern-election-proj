import mongoose, {Schema} from "mongoose";

const candidateSchema = new Schema(
    {
        card: {
            type: Schema.Types.ObjectId,
            ref: "Card"
        },
        fullName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
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
            type: String,
            required: true
        },
        netWorth: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
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
        }
    },
    
    {
        timestamps: true
    }
)

export const Candidate = mongoose.model("Candidate",candidateSchema)