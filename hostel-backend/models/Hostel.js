const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 0
    },
    reviews: {
      type: Number,
      default: 0
    },
    beds: Number,
    bathrooms: Number,
    guests: Number,
    price: {
      type: Number,
      required: true
    },
    description: {
      type: [String],
      default: []
    },
    images: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hostel", hostelSchema);
