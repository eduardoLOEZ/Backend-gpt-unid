import express from "express"
const GPTrouter = express.Router()

import { auth } from "../middlewares/authMiddleware.js"
import gptController from "../controllers/requestController.js"
import { getUserResponses } from "../controllers/requestController.js"

//utiliza el middleware para verificar que el usuario haya hecho login
GPTrouter.post("/request/:id", auth, gptController)
GPTrouter.get("/responses/:id", auth, getUserResponses)

export default GPTrouter;