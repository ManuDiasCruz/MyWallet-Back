import {Router} from "express"

import {addTransaction, getTransactions} from "../controllers/transactionController.js"
import {validateToken} from "../middlewares/authentMiddleware.js"
import {validateTransaction} from "../middlewares/schemaMiddleware.js"

const transactionsRouter = Router()

transactionsRouter.use(validateToken)

transactionsRouter.post("/transactions", validateTransaction, addTransaction)
transactionsRouter.get("/transactions", getTransactions)

export default transactionsRouter