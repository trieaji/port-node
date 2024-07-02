import { register, login, logout } from "../services/userService.js";

const registerUser = async (req,res,next) => {
    try {
        let request = req.body
        const result = await register(request)
        res.status(200).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req,res,next) => {
    try {
        let request = req.body
        const result = await login(request)
        res.status(200).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

const logoutUser = async (req,res,next) => {
    try {
        let request = req.body
        console.log("=== request ===")
        console.log(request)
        const result = await logout(request)
        res.status(200).json({
            data:result
        })
    } catch (error) {
        next(error)
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
}