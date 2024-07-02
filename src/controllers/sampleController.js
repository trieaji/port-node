import { findAllSamples, findSampleById, createSample } from "../services/sampleService.js";

const getSamples = async (req,res,next) => {
    try {
        let request = req.body
        const result = await findAllSamples(request)
        console.log("=== result sample ===")
        console.log(result)
        res.status(200).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const getSampleById = async (req,res,next) => {
    try {
        // let trans_id = req.params.id
        // console.log("=== trans_id ===")
        // console.log(trans_id)
        const request = req.params.id
        console.log("=== trans_id ===")
        console.log(request)
        const result = await findSampleById(request)
        console.log("=== ada result ===")
        console.log(result)

        // if(!result) {
        //     return res.status(404).json({
        //         status: 'error',
        //         message: 'Transaction not found'
        //     })
        // }

        // res.json({
        //     status: 'success',
        //     data: reformTransaction(result),
        // })

        res.status(200).json({
            data: result
        })

    } catch (error) {
        next(error)
    }
}

const saveSample = async (req,res,next) => {
    try {
        let request = req.body
        const result = await createSample(request)
        res.status(200).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

export {
    getSamples,
    getSampleById,
    saveSample
}