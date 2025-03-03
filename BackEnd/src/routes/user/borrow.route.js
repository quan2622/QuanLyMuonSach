const express = require("express");
const router = express.Router();

const borrowController = require("../../controllers/user/borrow.controller");
  
router.get("/", borrowController.getAll);
router.post("/create", borrowController.create);
router.delete("/delete/:maPhieuMuon", borrowController.delete);

module.exports = router;
