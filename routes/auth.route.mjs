import { Router } from "express";
import { login, logout, profile, register } from "../controllers/auth.controller.mjs";
import varifytoken from "../midlleware/varifymiddleware.mjs";
import roleMiddleware from "../midlleware/RoleMiddleware.mjs";


const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/profile', varifytoken, roleMiddleware('admin'), profile)


export default authRouter