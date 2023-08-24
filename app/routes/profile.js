const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const {
  getProfile,
  editProfile,
  createProfile
  } = require('../controllers/profile')

/*
 * Profile routes
 */

router.get(
  '/profile/get',
  trimRequest.all,
  getProfile
)

router.put(
  '/profile/update',
  trimRequest.all,
  editProfile
)

router.post(
  '/profile/create',
  trimRequest.all,
  createProfile
)

module.exports = router