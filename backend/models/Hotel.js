const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    hotelId: {
      type: String,
      required: true,
      unique: true,
    },
    hotelName: String,
    hotelAddress: String,
    hotelTelNo: String,
    hotelType: String,
    hotelCategory: String,
    tourArea: String,
    hotelCapacity: Number,
    roomPrice: Number,
    roomDescription: String,
    images: [String],
    amenities: Object,
    accessibility: Object,
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
