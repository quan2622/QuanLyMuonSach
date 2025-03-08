const md5 = require("md5");
const userModel = require("../models/user.model");

class userService {
  async create(data) {
    const SDTexist = await userModel.findOne({ dienThoai: data.dienThoai });
    if (SDTexist) {
      return {
        message: "Số điện thoại đã được sử dụng",
        status: false,
      };
    }
    data.passWord = md5(data.passWord);
    const record = new userModel(data);
    const newAccount = await record.save();
    return {
      accountId: newAccount._id,
      status: true,
      message: "Tạo tài khoản đọc giả thành công"
    }
  }
}

module.exports = new userService;
