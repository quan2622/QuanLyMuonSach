const md5 = require("md5");
const staffModel = require("../models/staff.model")

class authService {
  async signIn(data) {
    const soDienThoai = data.soDienThoai;
    const passWord = data.passWord;

    const user = await staffModel.findOne({ soDienThoai: soDienThoai });
    
    if (!user) {
      return { message: "Tài khoản không tồn tại" };
    }
    if (md5(passWord) != user.passWord) {
      return { message: "Sai mật khẩu" };
    }
    return {
      accountInfo: user,
      message: "Đăng nhập thành công"
    }
  }

}

module.exports = new authService;
