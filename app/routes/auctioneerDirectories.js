const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
    auctionGroupByStates,
    calender,
    validateGroupByState,
    validateCalenderRequest
} = require('../controllers/auctioneerDirectories')

router.post(
  '/auctionGroupByStates',
  trimRequest.all,
  validateGroupByState,
  auctionGroupByStates)

router.post(
  '/calender',
  trimRequest.all,
  validateCalenderRequest,
  calender)

module.exports = router