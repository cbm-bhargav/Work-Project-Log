import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const seedAdmin = async () => {
  const adminExists = await User.findOne({ where: { role: "admin" } });

  if (!adminExists) {
    await User.create({
      name: "System Admin",
      email: "admin@system.com",
      password: await bcrypt.hash("Admin@123", 10),
      role: "admin"
    });

    console.log("Admin user created");
  }
};

seedAdmin();
