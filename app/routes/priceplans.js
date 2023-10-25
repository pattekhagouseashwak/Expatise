const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const {getPricePlans} = require('../controllers/priceplans')

/**priceplans routes*/

/**get all priceplans details**/
router.get('/priceplans/details',
  trimRequest.all,
  getPricePlans
)

module.exports = router