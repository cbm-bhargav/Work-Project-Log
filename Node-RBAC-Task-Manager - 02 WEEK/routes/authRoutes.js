import express from 'express'
import { login, me } from '../controllers/authController.js'
import authentication from '../middlewares/authMiddleware.js'

const routes = express.Router()

routes.post("/login", login)
routes.get("/me", authentication, me)

export default routes