import mongoose, {Schema} from "mongoose";

const adminSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        jobId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["processing", "verified", "invalid"],
            default: "processing",
        },
        specialPower: {
            type: String,
            enum: ["true", "false"],
            default: "false"
        },
        type: {
            type: String,
            enum: ["normal", "supreme"],
            default: "normal"
        }
    },

    {
        timestamps: true
    }
)

export const Admin = mongoose.model("Admin",adminSchema)