import express from 'express'
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/userConstroller.js'
import authentication from '../middlewares/authMiddleware.js'
import authorizedRoles from '../middlewares/roleMiddleware.js'
import { ROLES } from '../constants/roles.js'

const routes = express.Router()
routes.use(authentication)

routes.get("/", authorizedRoles(ROLES.ADMIN, ROLES.MANAGER, ROLES.USER), getAllUsers)
routes.get("/:id", authorizedRoles(ROLES.ADMIN, ROLES.MANAGER, ROLES.USER), getUser)
routes.post("/", authorizedRoles(ROLES.ADMIN), createUser)
routes.patch("/:id", authorizedRoles(ROLES.ADMIN), updateUser)
routes.delete("/:id", authorizedRoles(ROLES.ADMIN), deleteUser)

export default routes