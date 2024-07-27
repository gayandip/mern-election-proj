import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

const adminSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            index: true
        },
        password: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        flag: {
            type: String,
            default: "false"
        },
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
    if (this.email.includes("@eci.in")) {
        this.flag = "true"
    }
    next()
})

adminSchema.methods.checkPassword = async function(password){
    await bcrypt.compare(password, this.password)
}

export const Admin = mongoose.model("Admin",adminSchema)