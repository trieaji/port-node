import { prismaClient } from "../src/application/database.js";

export const getTestUser = async () => {
    return prismaClient.users.findFirst({
        where: {
            email: "narumi@gmail.com"
        },
        select: {
            email: true,
            password: true,
            token: true
        }
    })
}