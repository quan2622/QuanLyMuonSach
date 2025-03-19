const ApiError = require("../../api-error");
const staffService = require("../../services/staff.service");

class staffController {
  // POST admin/account/
  async getProfile(req, res, next) {
    try {
      const staffToken = req.headers.authorization.split(" ")[1];
      const record = await staffService.getData(staffToken);
      return res.json(record);
    } catch (error) {
      return next(new ApiError(404, "Không tìm thấy tài khoản nhân viên"));
    }
  }


  // POST admin/account
  async create(req, res, next) {
    if (!req.body.hoTenNV) return next(new ApiError(400, "Vui lòng nhập tên NV"));
    if (!req.body.passWord) return next(new ApiError(400, "Vui lòng nhập mật khẩu"));
    if (!req.body.soDienThoai) return next(new ApiError(400, "Vui lòng nhập số điện thoại"));

    try {
      const data = await staffService.create(req.body);
      return res.json(data);
    } catch (error) {
      return next(new ApiError(500, "Lỗi trong quá trình tạo tài khoản"));
    }
  }

  // PUT admin/account/:id
  // async edit(req, res, next) {

  // }
}

module.exports = new staffController;
