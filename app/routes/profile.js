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
  uploadAuctioneerProfile,
  uploadBidderProfile,
  removeProfilePhoto,
  } = require('../controllers/profile')

const {
  validateBidderEditProfile,
  validateAuctioneerEditProfile,
  validateuploadPhoto
} = require('../controllers/profile/validators')
/*
 * Users routes
 */

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

router.post(
  '/uploadAuctioneerProfile',
  trimRequest.all,
  requireAuth,
  validateuploadPhoto,
  uploadAuctioneerProfile
)

router.post(
  '/uploadBidderProfile',
  trimRequest.all,
  requireAuth,
  validateuploadPhoto,
  uploadBidderProfile
)

router.post(
  '/removeProfilePhoto',
  trimRequest.all,
  requireAuth,
  removeProfilePhoto
)

module.exports = router