const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {session: false})
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
const {
  uploadFile,
  removeFile,
  getUrlsFromFolderInS3
  } = require('../controllers/aws.operations')

/*
 * Users routes
 */

router.post(
  '/uploadfile',
  trimRequest.all,
  upload.array('file', 10000),
  uploadFile
)

router.delete(
  '/removefile',
  trimRequest.all,
  removeFile
)

router.get(
  '/getFiles/folder/:folder',
  trimRequest.all,
  getUrlsFromFolderInS3
)

module.exports = router