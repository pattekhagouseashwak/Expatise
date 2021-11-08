const express = require('express')
const router = express.Router()

const trimRequest = require('trim-request')

const {
  mobileOTP,
  verifyOtp,
  registerBidder,
  registerAuctioneer,
  verifyEmailAuctioneer,
  verifyEmailBidder
} = require('../controllers/authentication')

const {
  validateMobileNumber,
  validateVerifyOTP,
  validateRegister
} = require('../controllers/authentication/validators')
/*
 * Users routes
 */

/*
 * mobileOTP route
 */
router.post(
  '/mobileOTP',
  trimRequest.all,
  validateMobileNumber,
  mobileOTP
)

/*
 * verifyOtp route
 */
router.post(
  '/verifyOtp',
  trimRequest.all,
  validateVerifyOTP,
  verifyOtp
)

/*
 * register route
 */
router.post(
  '/registerAuctioneer',
  trimRequest.all,
  validateRegister,
  registerAuctioneer
)

router.post(
  '/registerBidder',
  trimRequest.all,
  //validateRegister,
  registerBidder
)

router.get(
  '/verifyAuctioneer',
  trimRequest.all,
  verifyEmailAuctioneer,
)

router.get(
  '/verifyBidder',
  trimRequest.all,
  verifyEmailBidder
)
module.exports = router
