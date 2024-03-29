const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const {getCoupons, getCouponsById } = require('../controllers/coupons')

/**coupon routes*/

/**get coupons details by id**/
router.get('/coupons/id/:id',
  trimRequest.all,
  getCouponsById
)

/**get all coupons details**/
router.get('/coupons/allcoupons',
  trimRequest.all,
  getCoupons
)

module.exports = router