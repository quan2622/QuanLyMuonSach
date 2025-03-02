const md5 = require("md5");
const staffModel = require("../models/staff.model")

class staffService {
  async create(data) {
    const SDTexist = await staffModel.findOne({ soDienThoai: data.soDienThoai });
    if (SDTexist) {
      return { message: "Số điện thoại đã được sử dụng" };
    } else {
      data.passWord = md5(data.passWord);
      const record = new staffModel(data);
      const newAccount = await record.save();
      return {
        data: newAccount,
        message: "Tạo tài khoản thành công",
      }
    }
  }
}

module.exports = new staffService;
