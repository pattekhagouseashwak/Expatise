const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const {
  getPasses,
  generateMypass
} = require('../controllers/getPasses')


router.get(
  '/getPasses',
  trimRequest.all,
  requireAuth,
  getPasses
)

router.post(
  '/generateMypass',
  trimRequest.all,
  requireAuth,
  generateMypass
)


module.exports = router
