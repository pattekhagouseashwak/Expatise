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
  statusUpdate,
  fetchComments,
  replyComment,
  createAuctioneerAndBidderFAQ,
  fetchAuctioneerAndBidderFAQ,
  editAuctioneerAndBidderFAQ,
  editListingPolicy,
  createListingPolicy,
  fetchListingPolicy,
  inquery,
  deleteAuctioneerAndBidderFAQ,
  deleteListingPolicy
} = require('../controllers/helpAndSupport')

// const {
//     validatePostContent
// } = require('../controllers/addContent/validator')

/** help and support routes **/


router.post(
  '/fetchAuctionTickets',
  //requireAuth,
  //validatePostContent,
  trimRequest.all,
  fetchAuctionTickets)

router.post(
  '/fetchBidderTickets',
  //requireAuth,
  //validatePostContent,
  trimRequest.all,
  fetchBidderTickets)

router.post(
  '/statusUpdate',
  //requireAuth,
  //validatePostContent,
  trimRequest.all,
  statusUpdate)

router.post(
  '/fetchComments',
  //requireAuth,
  trimRequest.all,
  fetchComments)

router.post(
  '/replyComment',
  //requireAuth,
  trimRequest.all,
  replyComment)

router.post(
  '/createAuctioneerAndBidderFAQ',
  //requireAuth,
  trimRequest.all,
  createAuctioneerAndBidderFAQ)

router.post(
  '/fetchAuctioneerAndBidderFAQ',
  //requireAuth,
  trimRequest.all,
  fetchAuctioneerAndBidderFAQ)

router.post(
  '/editAuctioneerAndBidderFAQ',
  //requireAuth,
  trimRequest.all,
  editAuctioneerAndBidderFAQ)

router.post(
  '/editListingPolicy',
  //requireAuth,
  trimRequest.all,
  editListingPolicy)

router.post(
  '/createListingPolicy',
  //requireAuth,
  trimRequest.all,
  createListingPolicy)

router.post(
  '/fetchListingPolicy',
  //requireAuth,
  trimRequest.all,
  fetchListingPolicy)

router.post(
  '/inquery',
  //requireAuth,
  trimRequest.all,
  inquery)

router.delete(
  '/deleteAuctioneerAndBidderFAQ',
  //requireAuth,
  trimRequest.all,
  deleteAuctioneerAndBidderFAQ)

  router.delete(
    '/deleteListingPolicy',
    //requireAuth,
    trimRequest.all,
    deleteListingPolicy)

module.exports = router