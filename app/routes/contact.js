const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
    contactUs,
    gotATip,
    advertiseWithUs,
    createRecommandVideo,
    recommendedVideo
} = require('../controllers/contact')

const {
  validateCreateRecommandVideo
} = require('../controllers/contact/validator')

router.post(
  '/contactUs',
  trimRequest.all,
  requireAuth,
  contactUs
)

router.post(
    '/gotATip',
    trimRequest.all,
    requireAuth,
    gotATip
)

router.post(
    '/advertiseWithUs',
    trimRequest.all,
    requireAuth,
    advertiseWithUs
)

router.post(
  '/createRecommandVideo',
  trimRequest.all,
  requireAuth,
  validateCreateRecommandVideo,
createRecommandVideo)


router.get(
  '/recommendedVideo',
  trimRequest.all,
  requireAuth,
recommendedVideo)

module.exports = router