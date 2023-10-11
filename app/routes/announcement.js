const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const { getAnnouncement, editAnnouncement, deleteAnnouncement,
        createAnnouncement, getAnnouncementList} = require('../controllers/announcement')

/*
 * Announcement routes
 */

router.get(
  '/announcement',
  trimRequest.all,
  getAnnouncement
)

router.get(
  '/announcement/list',
  trimRequest.all,
  requireAuth,
  getAnnouncementList
)

router.put(
  '/announcement/update',
  trimRequest.all,
  editAnnouncement
)

router.post(
  '/announcement/create',
  trimRequest.all,
  createAnnouncement
)

router.delete(
  '/announcement/remove',
  trimRequest.all,
  deleteAnnouncement
)

module.exports = router