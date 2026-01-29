import express from 'express'
import dotenv from 'dotenv/config'
import db from './db.js'

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/api/users", async (req, res) => {
    const [users] = await db.query('SELECT * FROM users')
    res.json(users)
});

app.get("/api/users/:id", async (req, res) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE id = ?",
        [req.params.id]
    )
    
    if(rows.length === 0){
        return res.status(404).json({message:`User not found with id = ${req.params.id}`})
    }
    
    return res.json(rows[0]);
});

app.post("/api/users", async (req,res) => {
    const { name, department} = req.body

    if(!name || !department){
        return res.status(404).json({message:'Both user name and department is mandetary to provide'})
    }

    const [result] = await db.query(
        "INSERT INTO users (name,department) VALUES (?, ?)",
        [name, department]
    )

    res.status(200).json({message: 'User added successfully!', userId:result.insertId})
});

app.patch("/api/users/:id", async (req,res) => {
    const fields = []
    const values = []

    if(req.body.name){
        fields.push("name = ?")
        values.push(req.body.name)
    }
    if(req.body.department){
        fields.push("department = ?")
        values.push(req.body.department)
    }

    if(fields.length === 0){
        res.status(400).json({message:"User not found for updation"})
    }

    values.push(req.params.id)

    const [result] = await db.query(
        `UPDATE users SET ${fields.join(" ")} WHERE id = ?`,
        values
    )

    res.json({message: "user updated successfully"})
});

app.delete("/api/users/:id", async (req, res) => {
    const [result] = await db.query(
        "DELETE FROM users WHERE id = ?",
        [req.params.id]
    )

    if(result.affectedRows === 0) {
        return res.status(400).json({'message':'user not found for deletion'})
    }

    res.json({'message':'user deleted successfully!'})
});

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
});