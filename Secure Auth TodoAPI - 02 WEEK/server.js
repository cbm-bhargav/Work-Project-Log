import app from "./app.js";
import sequelize from "./config/database.js";

const Port = process.env.PORT || 5000;

const server = async () => {
    try {
    await sequelize.authenticate();
    console.log("Database connected successfully...");

    await sequelize.sync();

    app.listen(Port,() => {
        console.log(`server is running on http://localhost:${Port}`);
    })

    } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1)
    }
}

server()