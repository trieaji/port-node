import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";
import { registerUserValidation, loginUserValidation, logoutUserValidation } from "../validation/userValidation.js";
import { validation } from "../validation/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (request) => {
    const myUser = validation(registerUserValidation, request)

    const countUser = await prismaClient.users.count({
        where: {
            email: myUser.email
        }
    })

    if (countUser === 1) {
        throw new ResponseError(400, "Email already exists");
    }

    let salt = await bcrypt.genSalt()
    myUser.password = await bcrypt.hash(myUser.password, salt)

    const dataUser = prismaClient.users.create({
        data: myUser,
        select: {
            email: true,
            name: true
        }
    })

    return dataUser
}

const login = async function (request) {
    console.log("=== request login ===")
    console.log(request)
    const myUser = validation(loginUserValidation, request)
    console.log("=== myUser login ===")
    console.log(myUser)
    
    // const findUser = await prismaClient.users.findFirst({
    //     where: {
    //         email: myUser.email
    //     },
    //     select: {
    //         email: true,
    //         password: true,
    //         token: true
    //     }
    // })
    // console.log("=== findUSer wooii ===")
    // console.log(findUser)

    // if(!findUser) {//Kalau usernya tidak ada
    //     throw new ResponseError(401, "Username or password wrong")
    // }

    // const isPasswordValid = await bcrypt.compare(myUser.password, findUser.password)

    // if(!isPasswordValid) {
    //     throw new ResponseError(401, "Username or password wrong luuur")
    // }

    // const generateToken = jwt.sign({email: findUser.email},process.env.JWT_SECRET)
    // const dataUser = await prismaClient.users.updateMany({
    //     data: {
    //         token: generateToken
    //     },
    //     where: {
    //         email: findUser.email
    //     }
    // })

    // let result = []
    // if (dataUser){
    //     result.push({
    //         email: findUser.email,
    //         token: generateToken
    //     })
    // }
    // return result[0]
}

const logout = async (request) => {
    const myUser = validation(logoutUserValidation, request)

    const findUser = await prismaClient.users.findFirst({
        where: {
            email: myUser.email
        },
        select: {
            email: true,
            password: true,
            token: true
        }
    })

    if(!findUser) {//Kalau usernya tidak ada
        throw new ResponseError(401, "Username or password wrong")
    }

    const dataUser = await prismaClient.users.updateMany({
        data: {
            token: null
        },
        where: {
            email: findUser.email
        }
    })

    let result = []
    if (dataUser){
        result.push({
            email: findUser.email,
            token: null
        })
    }
    return result[0]

}

export {
    register,
    login,
    logout
}