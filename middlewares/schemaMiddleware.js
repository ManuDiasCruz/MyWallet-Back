import joi from "joi"

export async function validateTransaction(req, res, next){
    const transactionSchema = joi.object({
        description: joi.string().required(),
        value: joi.number().required(),
        type: joi.valid('credit', 'debt').required()
    })

    const transaction = req.body
    const {error} = transactionSchema.validate(transaction)
    if (error) return res.sendStatus(422) // unprocessable entity

    res.locals.transaction = transaction

    next()
}

export async function validateRegister(req, res, next){
    console.log("Entrei em Validate Register")
    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        repeatPassword: joi.ref('password')
    })
    const {name, email, password, repeatPassword} = req.body
    console.log("Schema Validate Register ", req.body)
    const {error} = userSchema.validate({name, email, password, repeatPassword})
    if (error) return res.sendStatus(422) // unprocessable entity
    next()
}

export async function validateUser(req, res, next){
    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })
    const {email, password} = req.body
    const {error} = userSchema.validate({email, password})
    if (error) return res.sendStatus(422) // unprocessable entity

    next()
}