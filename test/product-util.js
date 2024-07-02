import { prismaClient } from "../src/application/database.js";

export const getTestProductById = async() => {
    return prismaClient.products.findUnique({
        where: {
            id: 1
        },
        select: {
            id: true,
            name: true,
            price: true,
            image: true
        }
    })
}

export const getTestProduct = async () => {
    return await prismaClient.products.findMany()
}

export const createTestSample = async () => {
    await prismaClient.sample.create({
        data: {
            username: "test",
            city: "test"
        }
    })
}

export const sum = (first,second) => {
    return first + second
}