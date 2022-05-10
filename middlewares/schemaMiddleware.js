import joi from "joi"

export async function validateTransaction(req, res, next){
    const transactionSchema = joi.object({
        description: joi.string().required(),
        value: joi.number().required(),
        date: joi.date().required(),
        type: joi.valid('credit', 'debt').required()
    })

    const transaction = req.body
    const {error} = transactionSchema.validate(transaction)
    if (error) return res.sendStatus(422)

    res.locals.transaction = transaction

    next()
}

export async function validateRegister(req, res, next){
    const userSchema = joi.object({
        username: joi.string().required(),
        email: joi.email().required(),
        password: joi.string().required(),
        repeatPassword: joi.ref('password')
    })
    const {error} = userSchema.validate(req.body, {abortEarly: false})
    if (error) return res.status(422).send(error.details.maps(detail => detail.message))

    next()
}

export async function validateUser(req, res, next){
    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })
    const {error} = userSchema.validate({email, password})
    if (error) return res.sendStatus(422)

    next()
}