import Auth from "../models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.userId, 
            email: user.email
        }, 
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )
}

const normalizeEmail = (email) => {
    return email.toLowerCase();
}

export const registerUser = async(req, res) => {
    try{
        const { username, email, password } = req.body;

        if (!username || !email || !password){
            return res.status(400).json({
                message: "All fields are mandatory to register as new user"
            })
        }

        const normalizedEmail = normalizeEmail(email)

        const existingUser = await Auth.findOne({ where: {email: normalizedEmail}})

        if (existingUser){
            return res.status(409).json({
                message: "email is already registered"
            })
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user = await Auth.create({
            username,
            email: normalizedEmail,
            password: hashPassword
        })

        const token = generateToken(user);

        res.status(201).json({
            message: "User registration successful",
            token,
            user: {
                userId: user.userId,
                username: user.username,
                email: user.email
            }
        });

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

export const loginUser = async(req, res) => {
    try{
        const { email, password } = req.body;

        if (!email || !password){
            return res.status(400).json({
                message: "All credentials are mandatory for login"
            })
        }

        const normalizedEmail = normalizeEmail(email)

        const user = await Auth.findOne({ where: {email: normalizedEmail}})

        if (!user){
            return res.status(401).json({
                message: "Invalid credential"
            })
        }

        const isMatch  = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message: "Invalid credential"
            })
        }

        const token = generateToken(user)

        res.status(200).json({
            message: "User login successful",
            token
        })

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}