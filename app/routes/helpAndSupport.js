const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})


const {
  fetchAuctionTickets,
  fetchBidderTickets,
  statusUpdate
} = require('../controllers/helpAndSupport')

// const {
//     validatePostContent
// } = require('../controllers/addContent/validator')

/*
 * Admin routes
 */


router.post(
  '/fetchAuctionTickets',
  requireAuth,
  //validatePostContent,
  trimRequest.all,
  fetchAuctionTickets
)

router.post(
  '/fetchBidderTickets',
  requireAuth,
  //validatePostContent,
  trimRequest.all,
  fetchBidderTickets
)

router.post(
  '/statusUpdate',
  requireAuth,
  //validatePostContent,
  trimRequest.all,
 statusUpdate)
 
module.exports = router
