const ApiError = require("../../api-error");
const borrowService = require("../../services/borrow.service");


class borrowController {
  // POST borrow/create
  async create(req, res, next) {
    try {
      const userId = res.locals.user._id;
      const result = await borrowService.create(userId, req.body);
      return res.json(result);
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, "Lỗi trong quá trình tạo phiếu mượn"));
    }
  }

  // GET borrow/
  async getAll(req, res, next) {
    try {
      const userId = res.locals.user._id;
      const result = await borrowService.getAllForUser(userId);
      return res.json(result);
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, "Lỗi trong quá trình lấy thông tin phiếu mượn"));
    }
  }

  // DELETE borrow/delete/:maPhieuMuon
  async delete(req, res, next) {
    try {
      const result = await borrowService.deleteBorrow(req.params.maPhieuMuon);
      return res.json(result);
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, "Lỗi trong quá trình xóa"));
    }
  }
}

module.exports = new borrowController;
