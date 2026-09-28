require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

mongoose.connect(process.env.MONGOOSE);

(async () => {
  const user = await User.findOne({ email: "govindjee725@gmail.com" });
  console.log("USER:", user);

  const match = await bcrypt.compare("admin123", user.password);
  console.log("MATCH admin123:", match);

  process.exit();
})();
 