import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
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
        userType: {
            type: String,
            default: "user"
        }
    },
    
    {
        timestamps: true
    }
)

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})



userSchema.methods.checkPassword = async function(password){
    await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User",userSchema)