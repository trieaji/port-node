import Joi from "joi";

const validateProduct = Joi.object({
    name: Joi.string().max(100).required(),
    price: Joi.required(),
    image: Joi.string().max(100).required(),
})

const validateGetProduct = Joi.number().positive().required();

export {
    validateProduct,
    validateGetProduct
}