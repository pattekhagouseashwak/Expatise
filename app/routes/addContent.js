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
  postContent,
  fetchBanner,
  fetchBlog,
  fetchCategoryBasedBlog,
  fetchFeaturedBlog,
  fetchVideos,
  fetchTickers,
  fetchListingPolicy,
  fetchAuctioneerAndBidderFAQ
} = require('../controllers/addContent')

const {
  validatePostContent
} = require('../controllers/addContent/validator')
/*
 * Users routes
 */

router.post(
  '/addContent',
  requireAuth,
  //validatePostContent,
  upload.array('file', 10000),
  trimRequest.all,
  postContent)

router.get(
  '/Banners',
  fetchBanner)

router.post(
  '/BlogsBasedType&Category',
  trimRequest.all,
  fetchBlog)

router.post(
  '/fetchCategoryBasedBlog',
  trimRequest.all,
  fetchCategoryBasedBlog)

router.get(
  '/FeaturedBlog',
  trimRequest.all,
  fetchFeaturedBlog)

router.get(
  '/Videos',
  trimRequest.all,
  fetchVideos)

router.get(
  '/Tickers',
  trimRequest.all,
  fetchTickers)

router.get(
  '/ListingPolicy',
  trimRequest.all,
  fetchListingPolicy)

router.get(
  '/AuctioneerAndBidderFAQ',
  trimRequest.all,
  fetchAuctioneerAndBidderFAQ)


module.exports = router
