import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

const authentication = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        if(!authorization || !authorization.startsWith("Bearer ")){
            return res.status(400).json({ message: "Token Not Found"})
        }
        const token = authorization.split(" ")[1]
        if(!token){
            return res.status(401).json({ message: "Unauthorized"})
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findByPk(decode.id, {
            attributes: ["id", "name", "email", "role"]
        })
        if(!user){
            return res.status(400).json({ message: "User Not Found"})
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}

export default authentication