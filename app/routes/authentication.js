const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const {
  mobileOTP,
  verifyOtp,
  registerBidder,
  registerAuctioneer,
  verifyEmailAuctioneer,
  verifyEmailBidder,
  loginAuctioneer,
  loginBidder,
  logout
} = require('../controllers/authentication')

const {
  validateMobileNumber,
  validateVerifyOTP,
  validateRegister,
  validateBidderRegister,
  validateLogin
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
  validateBidderRegister,
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

router.post(
  '/loginAuctioneer',
  trimRequest.all,
  validateLogin,
  loginAuctioneer
)

router.post(
  '/loginBidder',
  trimRequest.all,
  validateLogin,
  loginBidder
)

router.post(
  '/logout',
  requireAuth,
  trimRequest.all,
  logout
)

module.exports = router