import Auth from "./authModel.js";
import Todo from "./todoModel.js";

Auth.hasMany(Todo, { foreignKey: userId})
Todo.belongsTo(Auth, { foreignKey: userId})