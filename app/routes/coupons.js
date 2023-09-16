const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const { addCoupons, updateCoupons, removeCoupons,
        getCoupons, getCouponsById } = require('../controllers/coupons')

/**coupon routes*/

/**add coupons details**/
router.post('/coupons/add',
  trimRequest.all,
  addCoupons
)

/**add coupons details**/
router.put('/coupons/update',
  trimRequest.all,
  updateCoupons
)

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

/**delete coupons names by id**/
router.delete(
  '/coupons/remove/:id',
  trimRequest.all,
  removeCoupons
)

module.exports = router