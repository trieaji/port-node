import Joi from "joi";
// import { CANCELED, PAID, PENDING_PAYMENT } from "../utils/constant.js";
import { transactions_status } from "@prisma/client";

const TransStat = {
    CANCELED: 'CANCELED',
    PAID: 'PAID',
    PENDING_PAYMENT: 'PENDING_PAYMENT'
}
Object.freeze(TransStat)

const validateTransactionStatus = Joi.object().keys({
    id: Joi.number().positive().required(),
    payment_method: Joi.string().min(3).required(),
    status: Joi.string().valid(...Object.values(TransStat)),
    transactions_status: Joi.string().valid(...Object.values(TransStat))
})

// const validateTransactionStatus = Joi.object({
//     id: Joi.number().positive().required(),
//     payment_method: Joi.string().min(3).required(),
//     status: Joi.string().valid([CANCELED, PAID, PENDING_PAYMENT]),
//     transactions_status: Joi.string().valid(CANCELED, PAID, PENDING_PAYMENT)
// })

const validateTransaction = Joi.object({
    // products: Joi.string().max(100).required(),
    customer_name: Joi.string().min(3).required(),
    customer_email: Joi.string().email().required(),
    payment_method: Joi.string().min(3).required(),
    gross_amount: Joi.number().required(),
    snap_token: Joi.any().allow(null),
    snap_redirect_url: Joi.any().allow(null)
})

const validateTransactionEmail = Joi.object({
    products: Joi.number().positive().required(),
    customer_name: Joi.string().min(3).required(),
    customer_email: Joi.string().email().required(),
    payment_method: Joi.string().min(3).required()
})

const validateGetTransaction = Joi.number().positive().required();

export {
    validateTransaction,
    validateTransactionStatus,
    validateTransactionEmail,
    validateGetTransaction
}