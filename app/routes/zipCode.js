const express = require('express')
const router = express.Router()

const trimRequest = require('trim-request')

const {
  uploadZipcode,
  findLocation
} = require('../controllers/zipCode')

// const {
//   validateMobileNumber,
//   validateVerifyOTP,
//   validateRegister
// } = require('../controllers/Auctioneer/validators')
/*
 * Users routes
 */

/*
 * uploadZipcode route
 */
router.post(
  '/uploadZipcode',
  trimRequest.all,
  uploadZipcode
)


/*
 * findLocation route
 */
router.post(
  '/findLocation',
  trimRequest.all,
  findLocation
)




module.exports = router
