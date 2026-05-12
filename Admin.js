const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/user.model");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const existingAdmin = await User.findOne({ email: "Admin@gmail.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hash = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Admin",
      email: "Admin@gmail.com",
      password: hash,
      role: "ADMIN"
    });

    console.log("Admin created successfully");
    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createAdmin();
