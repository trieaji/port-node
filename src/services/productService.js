import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";
import { validateProduct, validateGetProduct } from "../validation/productValidation.js";
import { validation } from "../validation/validation.js";

const createProduct = async (request) => {
    const myProduct = validation(validateProduct, request)

    const dataProduct = prismaClient.products.create({
        data: myProduct,
        select: {
            name: true,
            price: true,
            image: true
        }
    })

    return dataProduct

}

const findAllProducts = async () => {
    // console.log("=== request luur ===")
    // console.log(request)
    // const dataValidationProducts = validation(validateGetProduct, request)
    // console.log("=== validate luur ===")
    // console.log(dataValidationProducts)

    // const products = await prismaClient.products.findFirst({
    //     where: {
    //         name: dataValidationProducts
    //     },
    //     select: {
    //         name: true,
    //         price: true,
    //         image: true
    //     }
    // })
    const products = await prismaClient.products.findMany()
    console.log("=== products ===")
    console.log(products)

    if(!products) {
        throw new ResponseError(404, "User is not found oke")
    }

    return products
}

const findProductById = async (request) => {
    console.log("=== findfindaja lhoo ===")
    console.log(request)
    const myProduct = validation(validateGetProduct, request)

    const dataProduct = await prismaClient.products.findMany({
        where: {
            id: myProduct
        },
        select: {
            id: true,
            name: true,
            price: true,
            image: true
        }
    })

    

    console.log("=== req findprodbyid ===")
    console.log(request)

    
    console.log("=== dataproduct ===")
    console.log(dataProduct)

    if(!dataProduct) {
        throw new ResponseError(404, "product is not found");
    }

    return dataProduct
}

export {
    createProduct,
    findAllProducts,
    findProductById
}