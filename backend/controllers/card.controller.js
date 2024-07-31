import { asyncExe } from "../utils/asyncExecute.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {Card} from "../models/card.model.js"
import fs from "fs"

const createCard = asyncExe(async (req, res) => {
    const {name, add, asscon, parcon, gen, dob, aadhar} = req.body
    const imgUrl = req.files?.image[0]?.path
    const docUrl = req.files?.docs[0]?.path

    if ([name, add, asscon, parcon, gen, dob, aadhar].some((field) => field?.trim() === "")) {
        throw new apiError(402, "empty any one of card field")
    }

    const existedCard = await Card.findOne({aadharNumber: aadhar})
    if (existedCard) {
        let arr = [imgUrl, docUrl]
        for (const i of arr) {
            fs.unlink(i, (err) => {
                if (err) {
                    throw new apiError(504, "error deleting files")
                }
            });
        }
        
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
        throw new apiError(502, "error while creating card")
    }

    res.status(201).json(
        new ApiResponse(200, createdCard, "created card successfully")
    )

    card.save()
})

export {createCard}