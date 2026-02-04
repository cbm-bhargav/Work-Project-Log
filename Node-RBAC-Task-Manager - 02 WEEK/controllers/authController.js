import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const generateToken = (user) => {
    try {
        return jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"})
    } catch (error) {
        console.log({ message: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({ message: "Email and Password are required for login"})
        }
        const user = await User.findOne({ where: {email}})
        if(!user){
            return res.status(401).json({ message: "Invalid email ! User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({ message: "Invalid credential ! Unauthorized"})
        }
        const token = generateToken(user)
        res.status(200).json({
            message: "User Login Successful",
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const me = async (req, res) => {
    try {
        const { id } = req.user
        const user = await User.findByPk(id)
        if(!user){
            return res.status(400).json({ message: "User Not Found"})
        }
        res.status(200).json({
            current_user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}