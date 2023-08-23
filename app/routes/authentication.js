const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const {
  registerBidder,
  registerAuctioneer,
  loginAuctioneer,
  loginBidder,
  logout
} = require('../controllers/authentication')

const {
  validateRegister,
  validateBidderRegister,
  validateLogin
} = require('../controllers/authentication/validators')
/**routes*/


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