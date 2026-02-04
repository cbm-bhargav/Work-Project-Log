import Task from "../models/taskModel.js"
import User from "../models/userModel.js"
import { STATUS } from "../constants/status.js"
import { ROLES } from "../constants/roles.js"

export const getAllTask = async (req, res) => {
    try {
        const { id, role } = req.user
        let where
        if(role === ROLES.ADMIN){
            where = {}
        }else if(role === ROLES.MANAGER){
            where = {created_by: id}
        }else if(role === ROLES.USER){
            where = {assigned_to: id}
        }else{
            return res.status(403).json({message: "Unauthorized ! Access denied"})
        }
        const tasks = await Task.findAll({ where })
        res.status(200).json({
            tasks,
            Total_task: tasks.length
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getTask = async (req, res) => {
    try {
        const { id, role } = req.user
        let where
        if(role === ROLES.ADMIN){
            where = { id: req.params.id}
        }else if(role === ROLES.MANAGER){
            where = { id: req.params.id, created_by: id}
        }else if(role === ROLES.USER){
            where = { id: req.params.id, assigned_to: id}
        }else{
            return res.status(403).json({message: "Unauthorized ! Access denied"})
        }
        const task = await Task.findOne({ where })
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({
            task
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const createTask = async (req, res) => {
    try {
        const {title, description, assigned_to} = req.body
        const managerId = req.user.id
        if(!title || !description || !assigned_to){
            return res.status(400).json({
                message: "title, description and assigned_to are mandetory fields to create task"
            })
        }
        const user = await User.findOne(assigned_to);
        if (!user || user.role !== "user") {
            return res.status(400).json({ message: "Invalid user to assign task" });
        }
        await Task.create({
            title,
            description,
            assigned_to: user.id,
            created_by: managerId
        })
        res.status(201).json({
            message: "task created successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const manageTask = async (req, res) => {
    try {
        const {title, description, assigned_to, status} = req.body
        const task = await Task.findOne({ where: {id: req.params.id, created_by: req.user.id}});
        if (!task) {
            return res.status(400).json({ message: "Task not found" });
        }
        if(assigned_to){
            const user = await User.findOne(assigned_to);
            if (!user || user.role !== "user") {
                return res.status(400).json({ message: "Invalid user to assign task" });
            }
        }
        if(status && !Object.values(STATUS).includes(status)){
            return res.status(400).json({ message: "Invalid status" });
        }
        await task.update({
            title: title ?? task.title,
            description: description ?? task.descriptione,
            status: status ?? task.status,
            assigned_to: assigned_to ?? task.assigned_to
        })
        res.status(200).json({
            message: "task updated successfully"
        })
    } catch (error) { 
        res.status(500).json({
            message: error.message
        })
    }
}

export const changeStatus = async (req, res) => {
    try {
        const {status} = req.body
        if(!status || (status && !Object.values(STATUS).includes(status))){
            return res.status(400).json({ message: "Invalid status" });
        }
        const task = await Task.findOne({ where: {id: req.params.id, assigned_to: req.user.id}})
        if(!task){
            return res.status(404).json({
                message:  "task Not Found"
            })
        }
        task.status = status
        await task.save()
        res.status(200).json({
            message: "Task status updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}