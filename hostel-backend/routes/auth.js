const express = require("express");
const router = express.Router(); // ✅ THIS WAS MISSING
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
router.post("/login", async (req, res) => {
    console.log("🔥 LOGIN HIT");
  console.log("BODY:", req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log("USER FROM DB:", user);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("PASSWORD MATCH:", isMatch);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    role: user.role,
  });
});

module.exports = router;
