import {Router} from "express"

import {signUp, signIn} from "../controllers/authentController.js"
import {validateRegister, validateUser} from "../middlewares/schemaMiddleware.js"

const authentRouter = Router()

authentRouter.post("/sing-up", signUp)
authentRouter.post("/sign-in", signIn)

/* authentRouter.post("/sing-up", validateRegister, signUp)
authentRouter.post("/sign-in", validateUser, signIn) */

export default authentRouter;