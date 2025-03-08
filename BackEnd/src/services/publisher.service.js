const publisherModel = require("../models/publisher.model");

class publisherService {
  async getAll() {
    return await publisherModel.find();
  }

  async getByName(name) {
    return await publisherModel.find({ tenNXB: new RegExp(name, "i") });
  }

  async create(data) {
    // const publisher = new publisherModel(data);
    const newPublisher = await publisherModel.findOneAndUpdate(
      {tenNXB: data.tenNXB},
      {$set: data},
      {
        upsert: true,
        new: true
      }
    );
    return {
      Publisher: newPublisher,
      status: true,
      message: "Thêm mới thành công",
    }
  }

  async updateOne(id, data) {
    return await publisherModel.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  async deleteOne(id) {
    return await publisherModel.findOneAndDelete({ _id: id });
  }

  async deleteAll() {
    const result = await publisherModel.deleteMany();
    return result.deletedCount;
  }
}

module.exports = new publisherService;
