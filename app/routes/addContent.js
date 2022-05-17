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
  fetchAuctioneerAndBidderFAQ,
  getAboutUs,
  getDataSecurity,
  getPrivacyPolicy,
  getTermsAndConditions,
  getFaq,
  fetchPrintAd,
  fetchAuctionCategory,
  fetchListingPackages, fetchAdvertisePackages, fetchBoostPackages
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

//===============================

router.get(
  '/AboutUs',
  trimRequest.all,
  getAboutUs)

router.get(
  '/DataSecurity',
  trimRequest.all,
  getDataSecurity)

router.get(
  '/PrivacyPolicy',
  trimRequest.all,
  getPrivacyPolicy)

router.get(
  '/Faq',
  trimRequest.all,
  getFaq)

router.get(
  '/TermsAndConditions',
  trimRequest.all,
  getTermsAndConditions)


router.get(
  '/PrintAd',
  trimRequest.all,
  fetchPrintAd)

router.get(
  '/fetchAuctionCategory',
  trimRequest.all,
  fetchAuctionCategory)

//========================

router.get(
  '/fetchListingPackages',
  trimRequest.all,
  fetchListingPackages)

router.get(
  '/fetchAdvertisePackages',
  trimRequest.all,
  fetchAdvertisePackages)

router.get(
  '/fetchBoostPackages',
  trimRequest.all ,
  fetchBoostPackages)

module.exports = router
