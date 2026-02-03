import express from 'express'
import { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../controller/todoController.js'
import authentication from "../middleware/authentication.js";

const router = express.Router()
router.use(authentication)

router.get("/", getAllTodos)
router.get("/:id", getTodo)
router.post("/", createTodo)
router.patch("/:id", updateTodo)
router.delete("/:id", deleteTodo)

export default router