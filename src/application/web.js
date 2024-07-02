import express from "express"
import { errorMiddleware } from "../middleware/errorMiddleware.js"
import { apiRouter } from "../routes/api.js"
import bodyParser from "body-parser"

export const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(apiRouter)

app.use(errorMiddleware)