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
  generateMypass,
  validateGenerateMypassOrRequest
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
  validateGenerateMypassOrRequest,
  generateMypass
)


module.exports = router
