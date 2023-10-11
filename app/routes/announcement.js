const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const {getAnnouncementList} = require('../controllers/announcement')

/*
 * Announcement routes
 */

router.get(
  '/announcement/details',
  trimRequest.all,
  getAnnouncementList
)
module.exports = router