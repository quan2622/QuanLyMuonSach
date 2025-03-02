const express = require("express");
const router = express.Router();

const bookController = require("../../controllers/admin/book.controller");

router.route("/")
  .get(bookController.getAll)

module.exports = router;