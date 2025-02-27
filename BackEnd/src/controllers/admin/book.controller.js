
class bookController {
  async getAll(req, res) {
    res.send({ message: "getAll" });
  }
}

module.exports = new bookController();
