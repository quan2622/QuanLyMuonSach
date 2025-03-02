const bookService = require("../../services/book.service");
const ApiError = require("../../api-error");
class homeController {
  // GET /home
  async getAll(req, res, next) {
    let data = [];
    
    try {
      const { bookName } = req.query;
      if (bookName) {
        data = await bookService.getByName(bookName);
      } else {
        data = await bookService.getAll();
      }
      return res.send(data);
    } catch (error) {
      return next(new ApiError(500, "Không thể truy xuất dữ liệu"));
    }
  }
}

module.exports = new homeController;
