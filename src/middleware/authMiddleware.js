import jwt from 'jsonwebtoken';
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";

const authMiddleware = async (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        throw new ResponseError(401, "Login first to access this resource")
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); //verified token
        console.log("=== verified ===")
        console.log(verified)
        req.user = verified;
        next(); // if token valid go to the next request
    } catch (error) {
        throw new ResponseError(400, "Invalid token")
    }
}

export {
    authMiddleware
}