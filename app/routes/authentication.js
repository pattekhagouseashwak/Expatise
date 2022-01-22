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
  logout,
  forgotPasswordAuctioneer,
  forgotPasswordBidder,
  verifyForgetPasswordAuctioneer,
  verifyForgetPasswordBidder,
  setNewPassword
} = require('../controllers/authentication')

const {
  validateMobileNumber,
  validateVerifyOTP,
  validateRegister,
  validateBidderRegister,
  validateLogin,
  validateSetPassword
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

router.post(
  '/forgotPasswordBidder',
  trimRequest.all,
  forgotPasswordBidder)
  
router.post(
  '/forgotPasswordAuctioneer',
  trimRequest.all,
  forgotPasswordAuctioneer)

router.get(
    '/verifyForgetPasswordAuctioneer',
    trimRequest.all,
    verifyForgetPasswordAuctioneer)
    
router.get(
    '/verifyForgetPasswordBidder',
    trimRequest.all,
    verifyForgetPasswordBidder)

    router.post(
      '/setNewPassword',
      requireAuth,
      trimRequest.all,
      validateSetPassword,
      setNewPassword
    )

module.exports = router