import { response } from "express";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";
import { findProductById } from "../services/productService.js";
import { createTransaction, createTransactionItems, findAllTransactions, findTransactionById, findCustomerEmail, findCustomerTransactionEmail, findTransById, updateTransactionStatus } from "../services/transactionService.js";
import { PENDING_PAYMENT } from "../utils/constant.js";
import { reformTransaction } from "../utils/reform-transaction.js";

const saveTransactions = async (req,res,next) => {
    try {
        let {products} = req.body
        let customer_name = req.body
        let customer_email = req.body
        let payment_method = req.body

        let productsFromDB = await findProductById(products)

        if (productsFromDB.length === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Products not found'
            })
        }

        productsFromDB.forEach((prod) => {
            let totalProductInDatabase = prismaClient.products.count({
                where: {
                    id: prod.id
                }
            })
            prod.quantity = totalProductInDatabase.quantity
        })

        let transEmail = await findCustomerEmail(customer_email) //perbaiki lagi supaya data baru yg masuk bisa menambah di db
        let gross_amount = productsFromDB.reduce((acc, prod) => acc + prod.price, 0)

        let createForTransaction = new Promise(resolve => {
            setTimeout(() => {
                createTransaction({
                    gross_amount,
                    customer_name: customer_name.customer_name, 
                    customer_email: customer_email.customer_email, 
                    payment_method: payment_method.payment_method, 
                    snap_token: null,
                    snap_redirect_url: null
                }),
                resolve(('Operation transaction completed successfully!'))
            }, 2000)
        })

        let createForTransactionItem = new Promise(resolve => {
            setTimeout(() => {
                createTransactionItems({
                    products: productsFromDB,
                    users_id: transEmail.id
                })
            }, 3000)
            resolve(('Operation transaction item completed successfully!'))
        })

        await Promise.all([createForTransaction, createForTransactionItem]);

        res.json({
            //id
            status: "success",
            data: {
                id: transEmail.id,
                status: PENDING_PAYMENT,
                customer_name,
                customer_email,
                products: productsFromDB,
                snap_token: null,
                snap_redirect_url: null
            }
        })



    } catch (error) {
        next(error)
    }
}

const getTransactions = async (req,res,next) => {
    try {
        let {status} = req.query
        let result = await findAllTransactions(status)
        // console.log("=== result trans ===")
        // console.log(result)

        let mapResult = result.map(function(e) {
            return e
        })
        // console.log("=== mapResult ===")
        // console.log(mapResult)
        res.json({
            status: "success",
            // data: result.map((transaction) => reformTransaction(transaction))
            data: mapResult
        })
    } catch (error) {
        next(error)
    }
}

const getTransactionById = async (req,res,next) => {
    try {
        // let trans_id = req.params.id
        // console.log("=== trans_id ===")
        // console.log(trans_id)
        const request = req.params.id
        console.log("=== trans_id ===")
        console.log(request)
        const result = await findTransactionById(request)
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

const updateStatusTransactions = async(req,res,next) => {
    try {
        // console.log("=== request ===")
        // console.log(req)
        let transactions_id = req.params.id
        console.log("=== params ===")
        console.log(transactions_id)
        let status = req.body
        status.id = transactions_id
        console.log("=== body ===")
        console.log(status)

        const result = await updateTransactionStatus(status)

        res.json({
            status: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
    
}

export {
    saveTransactions,
    getTransactions,
    getTransactionById,
    updateStatusTransactions
}