import express, { json } from "express"
import dotenv from "dotenv"
import {MongoClient} from "mongodb"
import joi from "joi"
import cors from "cors"
import {v4 as uuid} from "uuid"
import bcrypt from "bcrypt"

// Internal dependency
import db from "./db.js"
import authentRouter from "./routes/authentRouter.js"
import transactionRouter from "./routes/transactionRouter.js"

dotenv.config()

const app = express()
app.use(json())
app.use(cors())

// Routes
app.use(authentRouter)
app.use(transactionRouter)

const door = process.env.DOOR
app.listen(door, () => {
    console.log(`Server running at door ${door}.`)
})
