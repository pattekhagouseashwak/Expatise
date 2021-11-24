const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const {
  myProfile,
  editProfile
} = require('../controllers/profile')

const {
  validateEditProfile
} = require('../controllers/profile/validators')
/*
 * Users routes
 */


router.get(
  '/myProfile',
  trimRequest.all,
  requireAuth,
  myProfile
)

router.post(
  '/editProfile',
  trimRequest.all,
  requireAuth,
  validateEditProfile,
  editProfile
)

module.exports = router
