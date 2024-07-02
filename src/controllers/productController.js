import { prismaClient } from "../application/database.js";
import { createProduct, findAllProducts, findProductById } from "../services/productService.js";

const saveProduct = async (req,res,next) => {
    try {
        let request = req.body
        const result = await createProduct(request)
        res.status(200).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const getProducts = async (req,res,next) => {
    try {
        const result = await findAllProducts()
        console.log("=== result ===")
        console.log(result)
        res.status(200).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const getProductById = async (req,res,next) => {
    try {
        let request = req.params.id
        const result = await findProductById(request)
        console.log("=== result ===")
        console.log(result)
        res.status(200).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

export {
    saveProduct,
    getProducts,
    getProductById
}