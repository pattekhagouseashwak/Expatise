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
  editAuctionListing,
  searchAuction,
  fetchAuctionByTypeAndState,
  displayListingOverMap,
  fetchSingleAuction,
  unPublished,
  deleteUnPublishedItem,
  removeUnPublishedAndAddListing,
  fetchunPublishedListing,
  fetchType,
  fetchCategory,
  fetchListingByrequestedDate
} = require('../controllers/auctionListing')

const {
  validateCreateListing,
  validateSearchAuction,
  validateAuctionTypeAndState,
  validateFeaturedAuction,
} = require('../controllers/auctionListing/validators')

/*
 * autionlisting routes
 */
router.post(
  '/createListing',
  requireAuth,
  //validateCreateListing,
  //upload.array('file', 10000),
  trimRequest.all,
  createListing)

router.get(
  '/fetchListing',
  requireAuth,
  trimRequest.all,
  fetchListing)

router.post(
  '/featureAuction',
  validateFeaturedAuction,
  trimRequest.all,
  featureAuction)

router.post(
  '/downladBidRequest',
  requireAuth,
  trimRequest.all,
  downladBidRequest)

router.post(
  '/uploadAuctionImage',
  requireAuth,
  upload.array('file', 10000),
  trimRequest.all,
  uploadAuctionImage)

router.post(
  '/editAuctionListing',
  requireAuth,
  trimRequest.all,
  editAuctionListing)

router.post(
  '/searchAuction',
  //requireAuth,
  validateSearchAuction,
  trimRequest.all,
  searchAuction)

router.post(
  '/fetchAuctionByTypeAndState',
  validateAuctionTypeAndState,
  trimRequest.all,
  fetchAuctionByTypeAndState)

router.post(
  '/displayListingOverMap',
  trimRequest.all,
  displayListingOverMap)

router.post(
  '/fetchSingleAuction',
  //requireAuth,
  trimRequest.all,
  fetchSingleAuction)

router.post(
  '/unPublished',
  requireAuth,
  trimRequest.all,
  unPublished)

router.delete(
  '/deleteUnPublishedItem',
  requireAuth,
  trimRequest.all,
  deleteUnPublishedItem)

router.post(
  '/removeUnPublishedAndAddListing',
  requireAuth,
  trimRequest.all,
  removeUnPublishedAndAddListing)

router.get(
  '/fetchunPublishedListing',
  requireAuth,
  trimRequest.all,
  fetchunPublishedListing)

router.get(
    '/Types',
     //requireAuth,
    //validatePostContent,
    trimRequest.all,
    fetchType)

router.get(
      '/Categorys',
      //requireAuth,
      //validatePostContent,
      trimRequest.all,
      fetchCategory)

router.post(
  '/getListingByDate',
  trimRequest.all,
  fetchListingByrequestedDate)

module.exports = router
