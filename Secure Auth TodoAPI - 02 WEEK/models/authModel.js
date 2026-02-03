import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Auth = sequelize.define(
    "Auth",
    {
        userId:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        username:{
            type: DataTypes.STRING(155),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "auth",
        timestamps: true
    }
)

export default Auth;