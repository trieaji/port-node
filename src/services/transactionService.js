import { transactions_status } from "@prisma/client";
import { prismaClient } from "../application/database.js";
import { PENDING_PAYMENT } from "../utils/constant.js";
import { validateTransaction, validateTransactionStatus, validateGetTransaction, validateTransactionEmail } from "../validation/transactionValidation.js";
import { validation } from "../validation/validation.js";
import { ResponseError } from "../error/responseError.js";
import { request } from "express";

const createTransaction = async (request) => {
    console.log("=== request trans service ===")
    console.log(request)
    const myTransaction = validation(validateTransaction, request)
    console.log("=== ini myTransaction ===")
    console.log(myTransaction)

    const dataTransaction = prismaClient.transactions.create({
        data: {
            total: request.gross_amount,
            status: PENDING_PAYMENT,
            customer_name: myTransaction.customer_name,
            customer_email: myTransaction.customer_email,
            payment_method: myTransaction.payment_method,
            snap_token: request.snap_token,
            snap_redirect_url: request.snap_redirect_url
        },
        select: {
            id: true,
            total: true,
            status: true,
            customer_name: true,
            customer_email: true,
            payment_method: true,
            snap_token: true,
            snap_redirect_url: true
        }
    })

    return dataTransaction
}

const createTransactionItems = async (request) => {
    // let checkData = request.products
    let checkTransId = await request.users_id//pakek ini
    // console.log("=== transid from trans item ===")
    // console.log(transactions_id)
    // const myTransactionItems = validation(validateTransactionStatus, request)
    // let products = myTransactionItems.products
    // let transactions_id = myTransactionItems.transactions_id
    // let prod = products.map((product) =>  {
    //     return product
    // })

    let newProd = request.products.map(item => {
        return item
    }) //pakek ini

    // console.log("=== newArray ===")
    // console.log(newProd[0].name)

    // return prismaClient.transactions_item.createMany({
    //     data:request.products.map((item) => {
    //         product_id: item.id,
    //         products_name: item.name,
    //     })
    // })

    let dataTransactionItems = await prismaClient.transactions_item.createMany({
        data: {
            users_id: checkTransId,
            products_id: newProd[0].id,
            products_name: newProd[0].name,
            price: newProd[0].price,
            quantity: 50
        }
    }) //pakek ini

    // console.log("=== dataTransactionItems ===")
    // console.log(dataTransactionItems)
    return dataTransactionItems //pakek ini
}

const findCustomerEmail = async (request) => {
    
    const myTrans = validation(validateTransactionEmail, request)
    

    const dataTrans = await prismaClient.users.findFirst({
        where:{
            email: myTrans.customer_email
        },
        select: {
            id: true,
            email: true
        }
    })

    if(dataTrans === null) {
        throw new ResponseError(401, "sign up your email please!!!");
    }

    return dataTrans
}

const findCustomerTransactionEmail = async (request) => {
    console.log("=== findEMail ===")
    console.log(request)
    const myTrans = validation(validateTransactionEmail, request)
    console.log("=== myTrans ===")
    console.log(myTrans)

    const dataTrans = await prismaClient.transactions.findFirst({
        where:{
            customer_email: myTrans.customer_email
        },
        select: {
            id: true,
            customer_email: true
        }
    })

    console.log("=== dataTrans njiiir ===")
    console.log(dataTrans)

    return dataTrans
}

const findAllTransactions = async (status) => {
    let where = {}
    if (status) {
        where = {
            status
        }
    }

    const dataAllTransactions = prismaClient.transactions.findMany({
        where,
        // include: {
        //     transactions_item : {
        //         include: {
        //             products: {
        //                 select: {
        //                     id: true,
        //                     name: true,
        //                     price: true,
        //                     image: true
        //                 }
        //             }
        //         }
        //     }
        // }
        select: {
            id: true,
            total: true,
            status: true,
            customer_name: true,
            customer_email: true,
            snap_token: true,
            snap_redirect_url: true,
            payment_method: true
        }
    })

    return dataAllTransactions
}

const findTransById = async (request) => {
    const myTrans = validation(validateGetTransaction, request)

    const dataTrans = await prismaClient.transactions.findMany({
        where: {
            id: myTrans
        },
        include: {
            transactions_item : {
                include: {
                    products: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            image: true
                        }
                    }
                }
            }
        }
    })

    if(!dataTrans) {
        throw new ResponseError(404, "Trans is not found");
    }
    return dataTrans
}

const findTransactionById = async (transactions_id) => {
    console.log('=== find ===')
    console.log(transactions_id)

    const myTransaction = validation(validateGetTransaction, transactions_id)
    console.log("=== findMyTransId ===")
    console.log(myTransaction)

    const dataTransactions = await prismaClient.transactions.findUnique({
        where: {
            id: myTransaction
        },
        select: {
            id: true,
            total: true,
            status: true,
            customer_name: true,
            customer_email: true,
            snap_token: true,
            snap_redirect_url: true,
            payment_method: true
        }
        // relationLoadStrategy: 'join',
        // include: {
        //     transactions_item: {
        //         include: {
        //             products: true
        //         }
        //     }
        // }
        // include: {
        //     transactions_item: {
        //         include: {
        //             products: {
        //                 select: {
        //                     id: true,
        //                     name: true,
        //                     price: true,
        //                     image: true
        //                 }
        //             }
        //         }
        //     }
        // }
    })

    console.log("=== dataTransaction suweek ===")
    console.log(dataTransactions)

    if(!dataTransactions) {
        throw new ResponseError(404, "transaction is not found");
    }

    return dataTransactions
}

const updateTransactionStatus = async (request) => {
    console.log("=== request serv ===")
    console.log(request)
    const myTransactionStatus = validation(validateTransactionStatus, request)
    console.log("=== mytrans status ===")
    console.log(myTransactionStatus)

    const dataTransactionStatus = await prismaClient.transactions.update({
        where: {
            id: myTransactionStatus.id
        },
        data: {
            status: 'CANCELLED',
            payment_method: myTransactionStatus.payment_method
        }
    })
    console.log("=== datatransactionsstatus ===")
    console.log(dataTransactionStatus)

    return dataTransactionStatus
}

export {
    createTransaction,
    createTransactionItems,
    findAllTransactions,
    findTransactionById,
    findTransById,
    findCustomerEmail,
    findCustomerTransactionEmail,
    updateTransactionStatus
}