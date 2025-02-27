const express = require("express");
const router = express.Router();

const bookController = require("../../controllers/admin/book.controller");

router.route("/")
  .get(bookController.getAll)
  .post()

module.exports = router;