import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"

// Internal dependency
import authentRouter from "./routes/authentRouter.js"
import transactionRouter from "./routes/transactionRouter.js"

dotenv.config()

const app = express()
app.use(json())
app.use(cors())

// Routes
app.use(authentRouter)
app.use(transactionRouter)

const door = process.env.DOOR || 5000
app.listen(door, () => {
    console.log(`Server running at door ${door}.`)
})
