import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { ROLES } from "../constants/roles.js";

const User = sequelize.define(
    "User",
    {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(99),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(Object.values(ROLES)),
            defaultValue: "user",
            allowNull: false
        }
    },
    {
        tableName: "users",
        timestamps: true
    }
)

User.associate = (models) => {
    User.hasMany(models.Task, { foreignKey: assigned_to});
    User.hasMany(models.Task, { foreignKey: created_by});
}

export default User;