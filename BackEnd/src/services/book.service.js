const bookModel = require("../models/book.model");
const publisherModel = require("../models/publisher.model");

class bookService {
  async getAll() {
    return await bookModel.find().sort({soQuyen: "desc"});
  }

  async getByName(name) {
    return await bookModel.find({
      tenSach: new RegExp(name, "i"),
    })
  }

  async create(data) {
    const bookExisted = await bookModel.findOne({
      $or: [{ tenSach: data.tenSach }]
    });
    if (!bookExisted) {
      const newBook = new bookModel(data);
      const saveBook = await newBook.save();
      const Book = await saveBook.populate('maNXB');
      return {
        Newbook: Book,
        message: "Thêm sách thành công",
      };
    }
    return { message: "Sách đã tồn tại" };
  }

  async updateOne(id, data) {
    const bookUpdated = await bookModel.findOneAndUpdate({ _id: id }, data, { new: true, });
    return await bookUpdated.populate("maNXB");
  }

  async deleteOne(id) {
    return await bookModel.findOneAndDelete({ _id: id });
  }

  async deleteAll() {
    const data = await bookModel.deleteMany();
    return data.deletedCount;
  }
}

module.exports = new bookService;