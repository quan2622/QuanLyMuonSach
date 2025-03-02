const md5 = require("md5");
const userModel = require("../models/user.model");

class userService {
  async create(data) {
    const SDTexist = await userModel.findOne({ dienThoai: data.dienThoai });
    if (SDTexist) {
      return { message: "Số điện thoại đã được sử dụng" };
    }
    data.passWord = md5(data.passWord);
    const record = new userModel(data);
    const newAccount = await record.save();
    return {
      accountInfo: newAccount,
      message: "Tạo tài khoản đọc giả thành công"
    }
  }
}

module.exports = new userService;
