const express = require("express");
const router = express.Router();
const Hostel = require("../models/Hostel");
const upload = require("../config/multer");
const imagekit = require("../config/imagekit");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// --------------------
// CREATE hostel
// --------------------
router.post(
  "/",
  auth,
  admin,
  upload.array("images", 5), // max 5 images
  async (req, res) => {
    try {
      const imageUrls = [];

      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await imagekit.upload({
            file: file.buffer,
            fileName: `${Date.now()}-${file.originalname}`,
            folder: "/hostels"
          });

          imageUrls.push(result.url);
        }
      }

      const hostel = new Hostel({
        ...req.body,
        images: imageUrls
      });

      const savedHostel = await hostel.save();
      res.status(201).json(savedHostel);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// --------------------
// GET all hostels (optional location filter)
// --------------------
// GET hostels with pagination & filters
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      location,
      minPrice,
      maxPrice,
      beds,
      sort
    } = req.query;

    const query = {};

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Beds filter
    if (beds) {
      query.beds = Number(beds);
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // default newest
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };

    const skip = (page - 1) * limit;

    const [hostels, total] = await Promise.all([
      Hostel.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit)),
      Hostel.countDocuments(query)
    ]);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      count: hostels.length,
      data: hostels
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --------------------
// GET hostel by ID
// --------------------
router.get("/:id", async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }
    res.json(hostel);
  } catch (err) {
    res.status(400).json({ error: "Invalid hostel ID" });
  }
});

// --------------------
// SEARCH hostel by location (POST)
// --------------------
router.post("/search", async (req, res) => {
  try {
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }

    const results = await Hostel.find({
      location: { $regex: location, $options: "i" }
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
