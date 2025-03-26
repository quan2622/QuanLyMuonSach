const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    tenSach: { type: String, required: true },
    donGia: { type: String, required: true },
    soQuyen: { type: Number, required: true },
    namXuatBan: { type: Number, required: true },
    anhBia: String,
    tacGia: { type: String, require: true },
    maNXB: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher", required: true},
    soLuongDaMuon: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema, "SACH");

module.exports = Book;
