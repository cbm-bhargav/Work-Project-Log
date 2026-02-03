import jwt from 'jsonwebtoken'
import Auth from '../models/authModel.js'

const authentication = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        if(!authorization || !authorization.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Unauthorize"
            })
        }
        const token = authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({
                message: "Unauthorize ! Token not found"
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Auth.findByPk(decode.id,{
            attributes: ["userId", "username", "email"]
        })
        req.user = user 
        next()
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

export default authentication