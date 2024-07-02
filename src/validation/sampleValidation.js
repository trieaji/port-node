import Joi from "joi";

const validateGetSample = Joi.number().positive().required();

const validateSample = Joi.object({
    username: Joi.string().max(100).required(),
    city: Joi.string().max(100).required(),
})

const validateUsername = Joi.object({
    username: Joi.string().max(100).required()
})

export {
    validateGetSample,
    validateSample,
    validateUsername
}