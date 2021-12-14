const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

 const multer = require("multer");
 var storage = multer.memoryStorage();
 var upload = multer({ storage: storage });

const {
  createListing,
  fetchListing,
  featureAuction,
  downladBidRequest,
  uploadAuctionImage,
  editAuctionListing
} = require('../controllers/auctionListing')

const {
    validateCreateListing
} = require('../controllers/auctionListing/validators')
/*
 * autionlisting routes
 */


router.post(
  '/createListing',
  requireAuth,
  //validateCreateListing,
  upload.array('file', 10000),
  trimRequest.all,
  createListing
)

router.get(
  '/fetchListing',
  requireAuth,
  trimRequest.all,
  fetchListing
)

router.post(
  '/featureAuction',
  requireAuth,
  trimRequest.all,
  featureAuction
)

router.post(
  '/downladBidRequest',
  requireAuth,
  trimRequest.all,
  downladBidRequest
)

router.post(
  '/uploadAuctionImage',
  requireAuth,
  upload.array('file', 10000),
  trimRequest.all,
  uploadAuctionImage
)

router.post(
  '/editAuctionListing',
  requireAuth,
  trimRequest.all,
  editAuctionListing
)

module.exports = router
