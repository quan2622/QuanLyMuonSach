const express = require("express");
const router = express.Router();

const publisherController = require("../../controllers/admin/publisher.controller");

router.route("/")
  .get(publisherController.getAll)
  .post(publisherController.create)
  .delete(publisherController.deleteAll)
  
  router.route("/:id")
  .put(publisherController.updateOne)
  .delete(publisherController.deleteOne)
  
module.exports = router;