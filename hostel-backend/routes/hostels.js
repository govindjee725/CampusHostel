const express = require("express");
const router = express.Router();

const Hostel = require("../models/Hostel");
const multer = require("multer");
const imagekit = require("../config/imagekit");

// Store uploaded files temporarily in memory
const upload = multer({
  storage: multer.memoryStorage()
});


// =====================================================
// 1. Upload Hostel + Multiple Images
// =====================================================

router.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
    const {
      name,
      location,
      rating,
      reviews,
      beds,
      bathrooms,
      guests,
      price,
      description
    } = req.body;

    // Validate images
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one image is required"
      });
    }

    // Upload images to ImageKit
    const imageUrls = [];

    for (const file of req.files) {
      const result = await imagekit.files.upload({
        file: file.buffer,
        fileName: file.originalname,
        folder: "/hostels"
      });

      imageUrls.push(result.url);
    }

    // Convert description if sent as JSON string
    let descriptionArray = [];

    if (description) {
      try {
        descriptionArray = JSON.parse(description);
      } catch {
        descriptionArray = [description];
      }
    }

    // Create hostel
    const hostel = new Hostel({
      name,
      location,
      rating,
      reviews,
      beds,
      bathrooms,
      guests,
      price,
      description: descriptionArray,
      images: imageUrls
    });

    await hostel.save();

    res.status(201).json({
      message: "Hostel uploaded successfully",
      hostel
    });

  } catch (error) {
    console.error("Upload failed:", error);

    res.status(500).json({
      message: "Upload failed",
      error: error.message
    });
  }
});


// =====================================================
// 2. Get All / Filtered Hostels
// =====================================================

router.get("/", async (req, res) => {
  try {
    const { location } = req.query;

    const query = location
      ? {
          location: {
            $regex: location,
            $options: "i"
          }
        }
      : {};

    const hostels = await Hostel.find(query);

    res.json({
      success: true,
      count: hostels.length,
      data: hostels
    });

  } catch (error) {
    console.error("Get hostels error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
});


// =====================================================
// 3. Get Hostel By ID
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found"
      });
    }

    res.json({
      success: true,
      data: hostel
    });

  } catch (error) {
    console.error("Get hostel error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
});


// =====================================================
// 4. Search Hostel By Location
// =====================================================

router.post("/search", async (req, res) => {
  try {
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({
        message: "Location is required"
      });
    }

    const results = await Hostel.find({
      location: {
        $regex: location,
        $options: "i"
      }
    });

    res.json({
      success: true,
      count: results.length,
      data: results
    });

  } catch (error) {
    console.error("Search failed:", error);

    res.status(500).json({
      message: "Search failed",
      error: error.message
    });
  }
});


module.exports = router;