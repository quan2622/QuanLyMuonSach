const express = require('express')
const multer = require('multer')
const upload = multer()
const router = express.Router()

const bookController = require('../../controllers/admin/book.controller')
const uploadCloud = require("../../Middleware/uploadCloud");

router
  .route('/')
  .get(bookController.getAll)
  .post(
    upload.single('anhBia'),
    uploadCloud.upload,
    bookController.create
  )
  .delete(bookController.deleteAll)

router
  .route('/:id')
  .delete(bookController.deleteOne)
  .put(
    upload.single('anhBia'),
    uploadCloud.upload,
    bookController.updateOne
  )

module.exports = router
