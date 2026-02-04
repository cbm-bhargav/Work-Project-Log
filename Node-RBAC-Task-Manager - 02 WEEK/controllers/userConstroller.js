import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { Op } from "sequelize";
import { ROLES } from "../constants/roles.js"

export const getAllUsers = async (req, res) => {
    try {
        const { role } = req.user
        let where   
        if(role === ROLES.ADMIN){
            where = {}
        }else if(role === ROLES.MANAGER){
            where = {role: { [Op.ne] : ROLES.ADMIN }}
        }else if(role === ROLES.USER){
            where = {role: ROLES.USER}
        }else{
            res.status(403).json({message: "Unauthorized ! Access denied"})
        }
        const users = await User.findAll({ where , attributes: { exclude: ["password"] }})
        res.status(200).json({
            users,
            Total_user: users.length
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const { role } = req.user
        let condition
        if(role === ROLES.ADMIN){
            condition = {};
        }else if(role === ROLES.MANAGER){
            condition = { role: { [Op.ne] : ROLES.ADMIN }}
        }else if(role === ROLES.USER){
            condition = { role: ROLES.USER }
        }else{
            res.status(403).json({message: "Unauthorized ! Access denied"})
        }
        const user = await User.findOne({ where: {id: req.params.id, condition },  attributes: { exclude: ["password"] }})
        if(!user){
            return res.status(404).json({
                message:  "User Not Found"
            })
        }
        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const createUser = async (req, res) => {
    try {
        const {name, email, password, role} = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                message: "Name, email and password are mandetory fields to create user"
            })
        }
        const existingUser = await User.findOne({where : {email}})
        if(existingUser){
            return res.status(400).json({
                message: "Email is already registered"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })
        res.status(201).json({
            message: "User created successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const {name, email, password, role} = req.body
        if(role && !Object.values(ROLES).includes(role)){
            return res.status(400).json({
                message: "Invalid role"
            })
        }
        const user = await User.findOne({ where: {id: req.params.id}})
        if(!user){
            return res.status(404).json({
                message:  "User Not Found"
            })
        }
        let hashedpassword;
        if (password) {
            hashedpassword = await bcrypt.hash(password, 10);
        }
        await user.update({
            name: name ?? user.name,
            email: email ?? user.email,
            role: role ?? user.role,
            password: hashedpassword ?? user.password
        })
        res.status(200).json({
            message: "User updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: {id: req.params.id}})
        if(!user){
            return res.status(404).json({
                message:  "User Not Found"
            })
        }
        await user.destroy()
        res.status(200).json({ message: "User deleted successfully"})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}