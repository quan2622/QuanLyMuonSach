const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema(
  {
    tenNXB: String,
    diaChi: String,
  },
  {
    timestamps: true,
    collection: "NHAXUATBAN",
  }
);

const Publisher = mongoose.model("Publisher", publisherSchema);

module.exports = Publisher;
