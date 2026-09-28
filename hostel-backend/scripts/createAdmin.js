require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createOrResetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE);

    console.log("MongoDB connected");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    let admin = await User.findOne({
      email: "govindjee725@gmail.com"
    });

    if (admin) {
      admin.password = hashedPassword;
      admin.role = "admin";
      admin.name = "Admin";

      await admin.save();

      console.log("✅ Existing admin password reset");
    } else {
      admin = await User.create({
        name: "Admin",
        email: "govindjee725@gmail.com",
        password: hashedPassword,
        role: "admin"
      });

      console.log("✅ New admin created");
    }

    console.log("Email:", admin.email);
    console.log("Role:", admin.role);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

createOrResetAdmin();