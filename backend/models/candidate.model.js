import mongoose, {Schema} from "mongoose";

const candidateSchema = new Schema(
    {
        details: Object,
        constituencyType: {
            type: String,
            required: true,
            enum: ["assembly", "parlament"]
        },
        constituencyName: {
            type: String,
            required: true
        },
        netWorth: {
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
            default: "processing",
            enum : ["processing", "verified", "invalid"]
        }
    },
    
    {
        timestamps: true
    }
)

export const Candidate = mongoose.model("Candidate",candidateSchema)