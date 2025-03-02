const express = require("express");
const router = express.Router();

const bookController = require("../../controllers/admin/book.controller");

router.route("/")
  .get(bookController.getAll)
  .post(bookController.create)
  .delete(bookController.deleteAll)

router.route("/:id")
  .delete(bookController.deleteOne)
  .put(bookController.updateOne)

module.exports = router;