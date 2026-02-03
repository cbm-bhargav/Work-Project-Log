import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Todo = sequelize.define(
    "Todo",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("pending", "inprogress", "completed"),
            defaultValue: "pending",
            allowNull: false
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    },
    {
        tableName: "todo",
        timestamps: true
    }
)

export default Todo;