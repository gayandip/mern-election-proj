import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

const adminSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
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
            default: "processing",
            enum: ["processing", "verified", "invalid"]
        },
        specialPower: {
            type: String,
            default: "false",
            enum: ["true", "false"]
        }
    },

    {
        timestamps: true
    }
)

adminSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

adminSchema.pre("save", function (next) {
    if (this.email.includes("@eci.in") && this.status === "verified") {
        this.flag = "true"
    }
    next()
})

adminSchema.methods.checkPassword = async function(password){
    await bcrypt.compare(password, this.password)
}

export const Admin = mongoose.model("Admin",adminSchema)