const bookService = require("../../services/book.service");
const ApiError = require("../../api-error");
class bookController {
  // GET admin/book
  async getAll(req, res, next) {
    let data = [];
    
    try {
      const { tenSach } = req.query;
      if (tenSach) {
        data = await bookService.getByName(name);
      } else {
        data = await bookService.getAll();
      }
    } catch (error) {
      return next(new ApiError(500, "Không thể truy xuất dữ liệu"));
    }

    return res.send(data);
  }

  // POST admin/book
  async create(req, res, next) {
    if(!req.body.tenSach) {
      return next(new ApiError(400, "Ten khong duoc bo trong"));
    }

    try {
      console.log("du lieu truyen vao", req.body);
      const data = await bookService.create(req.body);
      return res.json(data);
    } catch (error) {
      console.log(error.message);
      return next(new ApiError(500, "Lỗi trong quá trình thêm sách"));
    }
  }
  
  // DELETE admin/book
  deleteAll(req, res) {
    res.send({ message: "delete" });
  }

  // PUT admin/book/:id
  updateOne(req, res) {
    res.send({ message: "updateOne" });
  }

  // DELETE admin/book/:id
  deleteOne(req, res) {
    res.send({ message: "deleteOne" });
  }
}

module.exports = new bookController();
