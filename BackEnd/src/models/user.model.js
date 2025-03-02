const mongoose = require("mongoose");
const generate = require("../helper/generate");

const userSchema = new mongoose.Schema(
  {
    hoLot: { type: String, require: true },
    ten: { type: String, require: true },
    ngaySinh: { type: Date, default: Date.now() },
    phai: { type: String, default: "Không rõ" },
    diaChi: { type: String, require: true },
    dienThoai: { type: String, require: true },
    token: { type: String, default: generate.generateRandomString(20) },
    passWord: { type: String, require: true },
  },
  {
    timestamps: true,
    collection: "DOCGIA",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
