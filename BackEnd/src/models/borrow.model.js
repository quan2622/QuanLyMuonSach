const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    maDocGia: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true},
    maSach: { type: mongoose.Schema.Types.ObjectId, ref: "Book", require: true },
    maNhanVien: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
    ngayMuon: Date,
    ngayTra: Date,
    soLuongMuon: { type: Number, default: 1 },
    trangThai: { type: String, default: "waiting" },
    // waiting, borrowed, return
  },
  {
    timestamps: true,
  }
);

const BookBorrow = mongoose.model("BookBorrow", borrowSchema, "THEODOIMUONSACH");

module.exports = BookBorrow;
