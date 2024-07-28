import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            lowecase: true
        },
        password: {
            type: String,
            required: true
        },
        cardId: {
            type: Schema.Types.ObjectId,
            ref: "Card"
        },
        candidateId: {
            type: Schema.Types.ObjectId,
            ref: "Candidate"
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