import { asyncExe } from "../utils/asyncExecute.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {Card} from "../models/card.model.js"
import { User } from "../models/user.model.js";

const createCard = asyncExe(async (req, res) => {
    const {name, add, asscon, parcon, gen, dob, aadhar} = req.body

    if ([name, add, asscon, parcon, gen, dob, aadhar].some((field) => field?.trim() === "")) {
        throw new apiError(402, "empty any one of card field")
    }

    const existedCard = await Card.findOne({aadhar})
    if (existedCard) {
        throw new apiError(403, "you already have a voter card")
    }

    const imgUrl = await req.files?.image[0]?.path 

    const card = Card.create({
        fullName: name,
        address: add,
        assemblyConstituency: asscon,
        parlamentConstituency: parcon,
        aadhar: aadhar,
        image: imgUrl,
        gender: gen,
        dateOfBirth: dob
    })
})

export {createCard}