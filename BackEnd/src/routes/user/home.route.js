const express = require("express");
const router = express.Router();

const bookController = require("../../controllers/user/home.controller");

router.route("/")
  .get(bookController.getAll)

module.exports = router;