import express from "express"
const GPTrouter = express.Router()

import { auth } from "../middlewares/authMiddleware.js"
import gptController from "../controllers/requestController.js"

//utiliza el middleware para verificar que el usuario haya hecho login
GPTrouter.post("/request", auth, gptController)

export default GPTrouter;