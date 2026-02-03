import express from "express";
import authRoutes from "./routes/authRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"

const app = express()

app.use(express.json())

app.use("/api/user",authRoutes)
app.use("/api/todos",todoRoutes)

export default app;