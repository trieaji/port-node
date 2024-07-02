import { prismaClient } from "../application/database.js";
import { validateGetSample, validateSample, validateUsername } from "../validation/sampleValidation.js";
import { validation } from "../validation/validation.js";

const findAllSamples = async (request) => {
    console.log("=== request luur ===")
    console.log(request)
    const dataValidationUsername = validation(validateUsername, request)
    console.log("=== validate luur ===")
    console.log(dataValidationUsername)

    const samples = await prismaClient.sample.findFirst({
        where: {
            username: dataValidationUsername.username
        },
        select: {
            username: true,
            city: true
        }
    })
    // const samples = await prismaClient.sample.findMany()
    console.log("=== sample ===")
    console.log(samples)

    if(!samples) {
        throw new ResponseError(404, "User is not found oke")
    }

    return samples
}

const findSampleById = async (request) => {
    console.log('=== request ===')
    console.log(request)

    const mySample = validation(validateGetSample, request)

    const dataSamples = await prismaClient.sample.findUnique({
        where: {
            id: mySample
        },
        select: {
            id: true,
            username: true,
            city: true
        }
    })

    if(!dataSamples) {
        throw new ResponseError(404, "transaction is not found");
    }

    return dataSamples
}

const createSample = async(request) => {
    const mySample = validation(validateSample, request)

    const dataSample = prismaClient.sample.create({
        data: mySample,
        select: {
            username: true,
            city: true
        }
    })

    return dataSample
}

export {
    findAllSamples,
    findSampleById,
    createSample
}