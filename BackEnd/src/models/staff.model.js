const mongoose = require("mongoose");
const generate = require("../helper/generate");

const staffSchema = new mongoose.Schema(
  {
    hoTenNV: { type: String, require: true },
    passWord: { type: String, require: true },
    // token: { type: String, default: generate.generateRandomString(20)},
    chucVu: String,
    diaChi: String,
    soDienThoai: { type: String, require: true },
    anhNV: String,
    email: { type: String, require: true },
  },
  {
    timestamps: true,
    collection: "NHANVIEN",
  }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
