const md5 = require("md5");
const jwt = require("jsonwebtoken");
const staffModel = require("../models/staff.model")
const userModel = require("../models/user.model");


class authService {
  async signIn(data) {
    const soDienThoai = data.soDienThoai;
    const matKhau = data.passWord;

    const user = await staffModel.findOne({ soDienThoai: soDienThoai });

    if (!user) {
      return { message: "Tài khoản không tồn tại" };
    }

    if (md5(matKhau) != user.passWord) {
      return { message: "Sai mật khẩu" };
    }

    const { passWord, ...infoUser } = user._doc;

    const token = jwt.sign(infoUser, process.env.SECRET_KEY, { expiresIn: "1h" });
    console.log('token được tạo: ' + token);

    return {
      accountInfo: infoUser,
      token: token,
      message: "Đăng nhập thành công"
    }
  }
  
  async signInUser(data) {
    const soDienThoai = data.soDienThoai;
    const matKhau = data.passWord;

    const user = await userModel.findOne({ dienThoai: soDienThoai });
    
    if (!user) {
      return { message: "Tài khoản không tồn tại" };
    }
    if (md5(matKhau) != user.passWord) {
      return { message: "Sai mật khẩu" };
    }

    const { passWord, ...infoUser } = user._doc;

    const token = jwt.sign(infoUser, process.env.SECRET_KEY, { expiresIn: "1h" });
    console.log('token được tạo: ' + token);

    return {
      accountInfo: infoUser,
      token: token,
      message: "Đăng nhập thành công"
    }
  }
}

module.exports = new authService;
