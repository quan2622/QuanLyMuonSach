const ApiError = require("../../api-error");
const authService = require("../../services/auth.service");

class authController {
  async signIn(req, res, next) {
    if (!req.body) {
      return next(new ApiError(400, "Vui lòng điền thông tin đăng nhập"));
    }

    try {
      const data = await authService.signIn(req.body);
      res.status(200).json(data);
    } catch (error) {
      return next(new ApiError(500, "Lỗi không thể đăng nhập"));
    }
  }

  async signOut(req, res, next) {
    try {
      res.clearCookie("token");
      res.status(200).send({ message: "Đăng xuất thành công" });
    } catch (error) {
      return next(new ApiError(500, "Lỗi xử lý đăng xuất"));
    }
  }
}

module.exports = new authController;
