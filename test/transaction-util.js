import { prismaClient } from "../src/application/database.js";

export const getTestTransactions = async () => {
    return await prismaClient.transactions.findMany()
}

export const getTestTransactionsById = async() => {
    return prismaClient.transactions.findUnique({
        where: {
            id: 1
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
    })
}

export const updateTransaction = async () => {
    return prismaClient.transactions.update({
        where: {
            id: 24
        },
        data: {
            status: 'CANCELLED',
            payment_method: 'DANA'
        }
    })
}