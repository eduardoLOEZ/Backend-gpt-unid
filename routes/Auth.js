import express from "express"
const router = express.Router()

import { Register,Login, LogOut } from "../controllers/AuthController.js"


router.post("/register",Register)
router.post("/login", Login)

router.post("/logout", LogOut)

export default router;