import db from "./../db.js"

export async function addTransaction(req, res){
    try {
        const {user, transaction} = res.locals
        transaction.value = Number(transaction.value)
        await db.collection("transactions").insertOne({...transaction, userId: user._id})
        res.sendStatus(201)
    } catch (error) {
        console.log("Error creating new transaction.", error)
        res.status(500).send("Error creating new transaction.")
    }
}

export async function getTransactions(req, res){
    try {
        const {user} = res.locals
        const transactions = await db.collection("transactions").find({userId: user._id}).toArray()
        transactions.forEach(transaction => delete transaction.userId)
        res.send(transactions)
    } catch (error) {
        console.log("Error getting transactions.")
        res.status(500).send("Error getting transactions.")
    }
}