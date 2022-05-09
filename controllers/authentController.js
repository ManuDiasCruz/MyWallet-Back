import joi from "joi"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

import db from "./../db.js"

export async function signUp(req, res){
    const {username, email, password, repeatedPassword} = req.body

    try {
        // There is already a registered user with this email
        const user = await db.collection("users").findOne({email})
		if (user) return res.status(409).send(`There is already a user with this ${email}.`)

        // Inserting the user
        const SALT = 10
        const encryptedPassword = bcrypt.hashSync(password, SALT)
        await db.collection("users").insertOne({username, email, password: encryptedPassword})
        res.sendStatus(201)
    } catch (error) {
        console.log("Error creating user.", error)
        res.status(500).send("Error creatig user.")
    }
}

export async function signIn(req, res){
    const {email, password} = req.body

    try {
        const user = await db.collection("users").findOne({email})
        if (!user) return res.senStatus(404)
        if (user && bcrypt.compareSync(password, user.password)){
            const token = uuid()
            await db.collection("sessions").insertOne({userId:user._id, token})
            res.send(token)
        } else {
            res.senStatus(404)
        }
    } catch (error) {
        console.log("Error logging in user.", error)
        res.status(500).send("Error logging in user.")
    }
}