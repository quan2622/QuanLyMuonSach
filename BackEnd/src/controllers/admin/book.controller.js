const bookService = require("../../services/book.service");
const ApiError = require("../../api-error");
class bookController {
  // GET admin/book
  async getAll(req, res, next) {
    let data = [];
    
    try {
      const { bookName } = req.query;
      if (bookName) {
        data = await bookService.getByName(bookName);
      } else {
        data = await bookService.getAll();
      }
      return res.json(data);
    } catch (error) {
      return next(new ApiError(500, "Không thể truy xuất dữ liệu"));
    }
  }

  // POST admin/book
  async create(req, res, next) {
    if(!req.body.tenSach) {
      return next(new ApiError(400, "Ten khong duoc bo trong"));
    }
    try {
      const data = await bookService.create(req.body);
      return res.json(data);
    } catch (error) {
      console.log(error.message);
      return next(new ApiError(500, "Lỗi trong quá trình thêm sách"));
    }
  }
  
  // PUT admin/book/:id
  async updateOne(req, res, next) {
    if (!req.body) {
      return next(new ApiError(400, "Thông tin cập nhật không thể bỏ trống"));
    }
    try {
      console.log(req.body);
      const data = await bookService.updateOne(req.params.id, req.body)
      if (!data) return next(new ApiError(404, "Không tìm thấy sách cần cập nhật"));
      return res.json(data);
    } catch (error) {
      return next(new ApiError(500, "Lỗi trong quá trình chỉnh sửa thông tin sách"));
    }
    
  }
  
  // DELETE admin/book/:id
  async deleteOne(req, res) {
    try {
      const data = await bookService.deleteOne(req.params.id);
      if (!data) return next(new ApiError(404, "Không tìm thấy sách cần xóa"));
      return res.send({ message: "Xóa thông tin sách thành công" });
    } catch (error) {
      return next(new ApiError(500, `Không thể xóa sách có id = ${req.params.id}`));
    }
  }
  
  // DELETE admin/book
  async deleteAll(req, res, next) {
    try {
      const data = await bookService.deleteAll();
      if (data == 0) return res.send({ message: "Dữ liệu sách trống" });
      return res.send({message: `Đã xóa ${data} quyển sách`})
    } catch (error) {
      return next(new ApiError(500, "Lỗi trong quá trình xóa sách"));
    }
  }
}

module.exports = new bookController();
