import express from "express"
import { saveProduct, getProducts, getProductById } from "../controllers/productController.js"
import { saveTransactions, getTransactions, getTransactionById, updateStatusTransactions } from "../controllers/transactionController.js"
import { catchAsync } from "../utils/catch-async.js"
import { getSamples, getSampleById, saveSample } from "../controllers/sampleController.js"
import { registerUser, loginUser, logoutUser } from "../controllers/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";


const apiRouter = new express.Router()

//register
apiRouter.post('/api/register', registerUser)

//login
apiRouter.post('/api/login',loginUser);

//transactions
apiRouter.post('/api/create/transactions', catchAsync(saveTransactions))
apiRouter.get('/api/transactions', getTransactions)
apiRouter.get('/api/transactions/:id', getTransactionById)
apiRouter.put('/api/update/transactions/:id', catchAsync(updateStatusTransactions))

//sample
apiRouter.get('/api/samples', getSamples)
apiRouter.get('/api/samples/:id', getSampleById)
apiRouter.post('/api/create/samples', saveSample)

// products
apiRouter.post('/api/create/products', saveProduct)
apiRouter.get('/api/products', getProducts)
apiRouter.get('/api/products/:id', getProductById)

//logout
apiRouter.delete('/api/logout', authMiddleware, logoutUser);

export {
    apiRouter
}