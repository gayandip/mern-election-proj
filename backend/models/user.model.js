import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
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
        address: {
            type: String,
            required: true
        },
        constituency: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        adhaar: {
            type: String,
            required: true
        },
        fatherName: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: String,
            required: true
        },
        cardId: {
            type: String,
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

userSchema.pre("save", function(next) {
    if(!(this.cardId  == "")) return next();

    str =""
    function gen() {
        str1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        str2 = "123456789"
        
        for (let i = 0; i < 7; i++) {
             if (i<3) {
                let p = Math.round(Math.random()*26)
                str += str1[p]
            } else {
                let p = Math.round(Math.random()*9)
                str += str2[p]
            }
        }
    }

    gen()
    
    this.cardId = str;
    next()
})

userSchema.methods.checkPassword = async function(password){
    await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User",userSchema)