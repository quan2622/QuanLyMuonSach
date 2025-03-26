const borrowModel = require('../models/borrow.model')
const boookModel = require('../models/book.model')

class borrowService {
  async getAllForAdmin() {
    const record = await borrowModel
      .find()
      .sort({ createdAt: 'desc' })
      .populate("maDocGia", ["hoLot", "ten", "dienThoai"])
      .populate("maSach", ["tenSach", "donGia", "soQuyen", "namXuatBan","anhBia"])
      .populate("maNhanVien", ["hoTenNV", "chucVu", "soDienThoai"]);
    if (!record) return {message: 'Không tìm thấy phiếu mượn nào'}
    return {
      borrowList: record,
      message: 'Lấy dữ liệu thành công',
    }
  }

  async updateStatus(staffId, data) {
    if (data.trangThai == 'borrowed') {
      const record = await borrowModel.findOneAndUpdate(
        {
          _id: data.maPhieuMuon,
        },
        {
          trangThai: data.trangThai,
          ngayMuon: Date.now(),
          maNhanVien: staffId,
        },
        {
          new: true,
        }
      )
      // console.log(record);
      let newRecord = record;
      newRecord = await newRecord.populate('maDocGia', ['hoLot', 'ten', 'dienThoai']);
      newRecord = await newRecord.populate('maSach', ["tenSach", "donGia", "soQuyen", "namXuatBan"]);
      newRecord = await newRecord.populate('maNhanVien', ['hoTenNV', 'chucVu', 'soDienThoai']);

      return {
        dataBorrow: newRecord,
        message: 'Cập nhật thành công',
      }
    } else if (data.trangThai == 'return') {
      const record = await borrowModel.findByIdAndUpdate(
        {
          _id: data.maPhieuMuon,
        },
        {
          maNhanVien: staffId,
          ngayTra: Date.now(),
          trangThai: data.trangThai,
        },
        {new: true}
      )
      let newRecord = record;
      newRecord = await newRecord.populate('maDocGia', ['hoLot', 'ten', 'dienThoai']);
      newRecord = await newRecord.populate('maSach', ["tenSach", "donGia", "soQuyen", "namXuatBan"]);
      newRecord = await newRecord.populate('maNhanVien', ['hoTenNV', 'chucVu', 'soDienThoai']);
      await boookModel.findOneAndUpdate(
        {_id: record.maSach},
        {$inc: {soLuongDaMuon: -record.soLuongMuon}}
      )
      return {
        dataBorrow: newRecord,
        message: 'Trả sách thành công',
      }
    }
  }

  async deleteBorrow(borrowId) {
    const record = await borrowModel.findOneAndDelete({
      _id: borrowId,
      trangThai: { $ne: "borrowed" }
    });

    if (!record) {
      return {
        message: 'Không thể xóa phiếu mượn',
        status: false,
       };
    }

    if (record.trangThai != 'return') {
      await boookModel.findOneAndUpdate(
        { _id: record.maSach },
        { $inc: { soLuongDaMuon: -record.soLuongMuon } }
      );
    }

    return {
      dataBorrow: record,
      status: true,
      message: 'Xóa thành công',
    }
  }

  // Client
  async create(userId, data) {
    const newRecord = new borrowModel({
      maDocGia: userId,
      maSach: data.maSach,
      soLuongMuon: data.soLuongMuon
    });
    await newRecord.save();
    // console.log(newRecord);
    await boookModel.findOneAndUpdate({ _id: newRecord.maSach }, { $inc: { soLuongDaMuon: newRecord.soLuongMuon} });
    return {
      status: true,
      message: "Gửi phiếu mượn thành công",
    }
  }

  async getAllForUser(userId) {
    const record = await borrowModel.find({ maDocGia: userId }).sort({ createdAt: 'desc' }).populate('maSach', ["tenSach", "donGia","namXuatBan","anhBia"]);
    if (!record) return { message: "Không tìm thấy phiếu mượn" };
    return {
      dataBorrow: record,
      message: "Lấy thông tin phiếu mượn thành công"
    }
  }
}

module.exports = new borrowService()
