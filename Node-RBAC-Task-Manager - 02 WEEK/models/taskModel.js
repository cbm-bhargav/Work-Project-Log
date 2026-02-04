import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { STATUS } from "../constants/status.js";

const Task = sequelize.define(
    "Task",
    {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(Object.values(STATUS)),
            defaultValue: "pending",
            allowNull: false
        },
        assigned_to: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        created_by: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
    },
    {
        tableName: "tasks",
        timestamps: true
    }
)

Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: assigned_to})
    Task.belongsTo(models.User, { foreignKey: created_by})
}

export default Task;