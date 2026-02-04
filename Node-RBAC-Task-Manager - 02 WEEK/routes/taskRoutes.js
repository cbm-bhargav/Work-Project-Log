import express from 'express'
import { changeStatus, createTask, getAllTask, getTask, manageTask } from '../controllers/taskConstroller.js'
import { ROLES } from '../constants/roles.js'
import authorizedRoles from '../middlewares/roleMiddleware.js'
import authentication from '../middlewares/authMiddleware.js'

const routes = express.Router()
routes.use(authentication)

routes.get("/", authorizedRoles(ROLES.ADMIN, ROLES.MANAGER, ROLES.USER), getAllTask)
routes.get("/:id", authorizedRoles(ROLES.ADMIN, ROLES.MANAGER, ROLES.USER), getTask)
routes.post("/", authorizedRoles(ROLES.MANAGER), createTask)
routes.patch("/:id/manage", authorizedRoles(ROLES.MANAGER), manageTask)
routes.patch("/:id/status", authorizedRoles(ROLES.USER), changeStatus)

export default routes