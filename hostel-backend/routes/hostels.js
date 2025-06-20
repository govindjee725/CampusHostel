const express = require('express');
const router = express.Router();
const Hostel = require('../models/Hostel');
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

// ✅ Upload hostel with image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, location, rating, reviews, discount } = req.body;
    const hostel = new Hostel({
      name,
      location,
      rating,
      reviews,
      discount,
      image: req.file.path,
    });
    await hostel.save();
    res.status(201).json(hostel);
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
});

// ✅ Get all or filtered hostels
router.get('/', async (req, res) => {
  try {
    const { location } = req.query;
    const query = location ? { location: { $regex: location, $options: 'i' } } : {};
    const hostels = await Hostel.find(query);
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// ✅ Get by ID
router.get("/:id", async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) return res.status(404).json({ error: "Not found" });
    res.json(hostel);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Search by location
router.post("/search", async (req, res) => {
  try {
    const { location } = req.body;
    const results = await Hostel.find({ location: { $regex: location, $options: "i" } });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
});

module.exports = router;
