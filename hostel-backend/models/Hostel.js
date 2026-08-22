const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    rating: {
      type: Number,
      default: 0
    },

    reviews: {
      type: Number,
      default: 0
    },

    beds: {
      type: Number,
      default: 0
    },

    bathrooms: {
      type: Number,
      default: 0
    },

    guests: {
      type: Number,
      default: 0
    },

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
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Hostel", hostelSchema);