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
  createProfile,
  getProfileList,
  lastseenUpdate,
  userDashboard
  } = require('../controllers/profile')

/*
 * Profile routes
 */

router.post(
  '/profile/get',
  trimRequest.all,
  getProfile
)

router.get(
  '/profiles',
  trimRequest.all,
  getProfileList
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

router.put(
  '/profiles/lastseen',
  trimRequest.all,
  lastseenUpdate
)

router.get(
  '/profiles/dasboard',
  trimRequest.all,
  userDashboard
)

module.exports = router