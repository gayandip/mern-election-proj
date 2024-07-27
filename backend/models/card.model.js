import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema(
    {
        email: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        fullName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        assemblyConstituency: {
            type: String,
            required: true
        },
        parlamentConstituency: {
            type: String,
            required: true
        },
        image: {
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
        status: {
            type: String,
            default: "processing"
        },
        cardId: {
            type: String
        }
    },

    {
        timestamps: true
    }
)

cardSchema.pre("save", function(next) {
    if(!(this.status  == "verified")) return next();

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

export const Card = mongoose.model("Card", cardSchema)