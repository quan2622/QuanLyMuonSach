const ApiError = require("../../api-error");
const borrowService = require("../../services/borrow.service");

class borrowController {
  async getAll(req, res, next) {
    try {
      // console.log(res.locals.user)
      const result = await borrowService.getAllForAdmin()
      return res.json(result);
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, "Lỗi trong quá trình lấy dữ liệu"));
    }
  }

  async updateStatus(req, res, next) {
    try {
      const maNV = res.locals.user._id;
      const result = await borrowService.updateStatus(maNV, req.body);
      return res.json(result);
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, "Lỗi trong quá trình xử lý"));
    }
  }

  // DELETE admin/borrow/delete/:borrowId
  async deleteBorrow(req, res, next) {
    try {
      const result = await borrowService.deleteBorrow(req.params.borrowId);
      return res.json(result);
    } catch (error) {
      return next(new ApiError(500, "Lỗi trong quá trình xóa phiếu mượn Admin"));
    }
  }
}

module.exports = new borrowController;
