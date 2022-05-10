import {Router} from "express"

import {signUp, signIn, signOut} from "../controllers/authentController.js"
import {validateRegister, validateUser} from "../middlewares/schemaMiddleware.js"

const authentRouter = Router()

authentRouter.post("/sing-up", validateRegister, signUp)
authentRouter.post("/sign-in", validateUser, signIn)
authentRouter.post("/sign-out", signOut)

export default authentRouter