import Todo from "../models/todoModel.js";

const validStatus = ["pending", "inprogress", "completed"]

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll({ where: { userId: req.user.userId}})

        res.status(200).json(todos)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.userId}})

        if(!todo){
            return res.status(404).json({
                message: "Todo not found"
            })
        }

        res.status(200).json(todo)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const createTodo = async (req, res) => {
    try {
        const { title, status } = req.body

        if(!title){
            return res.status(400).json({
                message: "Title required to create a todo."
            })
        }

        if(status && !validStatus.includes(status)){
            return res.status(400).json({
                message: "Invalid status value"
            })
        }

        const todo = await Todo.create({
            title,
            status: status ?? "pending",
            userId:  req.user.userId
        })

        res.status(201).json({
            message: "Todo created successfully.",
            todo: todo
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { title, status } = req.body

        if (status && !validStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid status value",
            });
        }

        const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.userId}})

        if(!todo){
            return res.status(404).json({
                message: "Todo not found"
            })
        }

        await todo.update({
            title: title ?? todo.title,
            status: status ?? todo.status
        })

        res.status(200).json({
            message: "Todo updated successfully."
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({ where: { id: req.params.id, userId: req.user.userId}})

        if(!todo){
            return res.status(404).json({
                message: "Todo not found"
            })
        }

        await todo.destroy()

        res.status(204).json()
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}