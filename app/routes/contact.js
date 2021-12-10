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
    advertiseWithUs
} = require('../controllers/contact')

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

module.exports = router
