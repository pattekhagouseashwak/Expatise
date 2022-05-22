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
  validateCalenderRequest,
  stateCalender
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

router.post(
  '/statecalender',
  trimRequest.all,
  stateCalender)


module.exports = router