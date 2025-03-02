const ApiError = require("../../api-error");
const userService = require("../../services/user.service");

class userController {
  async create(req, res, next) {
    if (!req.body.hoLot) return next(new ApiError(400, "Vui lòng nhập tên lót"));
    if (!req.body.ten) return next(new ApiError(400, "Vui lòng nhập tên"));
    if (!req.body.diaChi) return next(new ApiError(400, "Vui lòng nhập địa chỉ"));
    if (!req.body.dienThoai) return next(new ApiError(400, "Vui lòng nhập số điện thoại"));
    if (!req.body.passWord) return next(new ApiError(400, "Vui lòng nhập mật khẩu"));

    try {
      const data = await userService.create(req.body);
      return res.json(data);
    } catch (error) {
      return next(new ApiError(500, "Lỗi trong quá trình tạo tài khoản"));
    }
  }
}

module.exports = new userController;
