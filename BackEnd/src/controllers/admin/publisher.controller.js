const publisherService = require("../../services/publisher.service");
const ApiError = require("../../api-error");

class publisherController {
  // GET admin/publisher
  async getAll(req, res, next) {
    let data = [];
    try {
      const { publisher } = req.query
      if (publisher) {
        data = await publisherService.getByName(publisher);
      }
      else {
        data = await publisherService.getAll();
      }
      return res.send(data);
    } catch (error) {
      return next(new ApiError(500, "Lỗi khi thông tin nhà xuất bản"));
    }
  }

  // POST admin/publisher
  async create(req, res, next) {
    if (!req.body.tenNXB) {
      return next(new ApiError(400, "Tên nhà xuất bản không được bỏ trống"));
    }
    try {
      const data = await publisherService.create(req.body);
      return res.json(data);
    } catch (error) {
      return next(new ApiError(500, "Lỗi trong quá trình thêm nhà xuất bản"));
    }
  }

  // PUT admin/publisher/:id
  async updateOne(req, res, next) {
    if (!req.body) {
      return next(new ApiError(400, "Thông tin chỉnh sửa nhà xuất bản không thể để trống"));
    }
    try {
      const data = await publisherService.updateOne(req.params.id, req.body);
      if (!data) return next(new ApiError(404, "Không tìm thấy nhà xuất bản cần cập nhật"));
      return res.json(data);
    } catch (error) {
      return next(new ApiError(500, "Lỗi trong quá trình chỉnh sửa thông tin nhà xuất bản"));
    }
  }

  // DELETE admin/publisher/:id
  async deleteOne(req, res, next) {
    try {
      const data = await publisherService.deleteOne(req.params.id);
      if (!data) return next(new ApiError(404, "Không tìm thấy nhà xuất bản cần xóa"));
      return res.send({message: "Xóa thành công thông tin nhà xuất bản"});
    } catch (error) {
      return next(new ApiError(500, "Lỗi trong quá trình xóa"));
    }
  }

  // DELETE admin/publisher
  async deleteAll(req, res, next) {
    try {
      const data = await publisherService.deleteAll();
      return res.send({ message: `Đã xóa ${data} nhà xuất bản` });
    } catch (error) {
      return next(new ApiError(500, "Lỗi trong quá trình xóa"));
    }
  }
}

module.exports = new publisherController;