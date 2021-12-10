const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

 const multer = require("multer");
 var storage = multer.memoryStorage();
 var upload = multer({ storage: storage });

const {
  postContent,
} = require('../controllers/addContent')

const {
    validatePostContent
} = require('../controllers/addContent/validator')
/*
 * Users routes
 */


router.post(
  '/addContent',
  requireAuth,
  //validatePostContent,
  upload.array('file', 10000),
  trimRequest.all,
  postContent
)
module.exports = router
