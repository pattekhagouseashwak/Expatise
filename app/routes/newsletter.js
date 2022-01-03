const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
  subscribeNewsletter,
  unsubscribeNewsletter
} = require('../controllers/newsletter')

router.post(
  '/subscribeNewsletter',
  trimRequest.all,
  subscribeNewsletter
)

router.post(
    '/unsubscribeNewsletter',
    trimRequest.all,
    unsubscribeNewsletter
)

module.exports = router