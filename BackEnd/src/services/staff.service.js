const md5 = require("md5");
const staffModel = require("../models/staff.model")

class staffService {
  async create(data) {
    const SDTexist = await staffModel.findOne({ soDienThoai: data.soDienThoai });
    if (SDTexist) {
      return {
        message: "Số điện thoại đã được sử dụng",
        status: false,
      };
    } else {
      data.passWord = md5(data.passWord);
      const record = new staffModel(data);
      const newAccount = await record.save();
      return {
        data: newAccount._id,
        status: true,
        message: "Tạo tài khoản thành công",
      }
    }
  }

  async getData(staffToken) {
    const data = await staffModel.findOne({ token: staffToken });
    return data;
  }
}

module.exports = new staffService;
