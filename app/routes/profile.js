const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const {
  bidderProfile,
  auctioneerProfile,
  editBidderProfile,
  editAuctioneerProfile,
  bidHistory
} = require('../controllers/profile')

const {
  validateBidderEditProfile,
  validateAuctioneerEditProfile
} = require('../controllers/profile/validators')
/*
 * Users routes
 */


router.get(
  '/bidHistory',
  trimRequest.all,
  requireAuth,
  bidHistory
)


router.get(
  '/auctioneerProfile',
  trimRequest.all,
  requireAuth,
  auctioneerProfile
)

router.get(
  '/bidderProfile',
  trimRequest.all,
  requireAuth,
  bidderProfile
)

router.post(
  '/editAuctioneerProfile',
  trimRequest.all,
  requireAuth,
  validateAuctioneerEditProfile,
  editAuctioneerProfile
)

router.post(
  '/editBidderProfile',
  trimRequest.all,
  requireAuth,
  validateBidderEditProfile,
  editBidderProfile
)
module.exports = router