const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer"); // ImageKit

// UPDATE PROFILE
router.patch(
  "/profile",
  auth,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const updates = {
        name: req.body.name,
        phone: req.body.phone,
      };

      if (req.file) {
        updates.profileImage = req.file.path;
      }

      const user = await User.findByIdAndUpdate(
        req.user.id,
        updates,
        { new: true }
      );

      res.json(user);
    } catch (err) {
      res.status(400).json({ message: "Profile update failed" });
    }
  }
);

module.exports = router;
