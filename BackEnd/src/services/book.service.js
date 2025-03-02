const bookModel = require("../models/book.model");
const publisherModel = require("../models/publisher.model");

class bookService {
  async getAll() {
    const data = await bookModel.find({});
    return await data.toArray();
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
    console.log("Ton tai " + bookExisted);
    if (!bookExisted) {
      const newBook = new bookModel(data);
      const saveBook = await newBook.save();
      // console.log(saveBook);
      console.log("********************");
      const Sach = await saveBook.populate('maNXB');
      console.log(Sach);
      console.log("********************");
      return {
        Newbook: Sach,
        message: "Thêm sách thành công",
      };
    }
    return { message: "Thêm sách thất bại" };
  }
}

module.exports = new bookService;