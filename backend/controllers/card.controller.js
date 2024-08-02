import { asyncExe } from "../utils/asyncExecute.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Card } from "../models/card.model.js"
import { unlinkFile } from "../utils/unlinkFile.js";
import { User } from "../models/user.model.js";

const createCard = asyncExe(async (req, res) => {

    const {name, add, asscon, parcon, gen, dob, aadhar} = req.body
    const imgUrl = req.files?.image[0]?.path
    const docUrl = req.files?.docs[0]?.path

    if(!(imgUrl && docUrl)){
        throw new apiError(403, "empty files field")
    }

    if ([name, add, asscon, parcon, gen, dob, aadhar].some((field) => field?.trim() === "")) {
        unlinkFile(imgUrl)
        unlinkFile(docUrl)
        throw new apiError(402, "empty any one of card field")
    }

    if (req.user.cardId) {
        unlinkFile(imgUrl)
        unlinkFile(docUrl)
        throw new apiError(403, "you already have a voter card")
    }
    
    const existedCard = await Card.findOne({aadharNumber: aadhar})
    if (existedCard) {
        unlinkFile(imgUrl)
        unlinkFile(docUrl)
        throw new apiError(403, "you already have a voter card")
    }

    const card = await Card.create({
        fullName: name,
        address: add,
        assemblyConstituency: asscon,
        parlamentConstituency: parcon,
        aadharNumber: aadhar,
        image: imgUrl,
        aadhar: docUrl,
        gender: gen,
        dateOfBirth: dob
    })

    const createdCard = await Card.findById(card._id)

    if (!createdCard) {
        unlinkFile(imgUrl)
        unlinkFile(docUrl)
        throw new apiError(502, "error while creating card")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                cardId: createdCard._id
            },
        },
        {
            new: true
        }
    ).select("-password -refreshToken").populate("cardId")

    res.status(201).json(
        new ApiResponse(200, user, "created card successfully")
    )

    card.save()
})

export {createCard}