import mysql from 'mysql2/promise'

const db = await mysql.createPool({
    host:"localhost",
    user:"root",
    password:"NewPassword123",
    database:"company_db",
    waitForConnections:true,
    connectionLimit:10
})

// DATABASE TABLE:
// CREATE TABLE users (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(100) NOT NULL,
//     department VARCHAR(100) NOT NULL
// );

export default db;