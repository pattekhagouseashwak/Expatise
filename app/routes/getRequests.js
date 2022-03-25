const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
    getRequests,
    createGetRequest
} = require('../controllers/getRequests')

const{
  validateGenerateMypassOrRequest
} = require('../controllers/getPasses');


router.get(
  '/getRequests',
  trimRequest.all,
  requireAuth,
  getRequests
)

router.post(
  '/createGetRequest',
  trimRequest.all,
  requireAuth,
  validateGenerateMypassOrRequest,
  createGetRequest
)


module.exports = router
