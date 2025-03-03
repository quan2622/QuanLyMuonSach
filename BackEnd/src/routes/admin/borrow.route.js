const express = require("express");
const router = express.Router();

const borrowController = require("../../controllers/admin/borrow.controller");

router
  .get("/", borrowController.getAll)
  .post("/update", borrowController.updateStatus)
  .delete("/delete/:borrowId", borrowController.deleteBorrow);

module.exports = router;
