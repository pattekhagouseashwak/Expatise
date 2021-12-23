const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
    auctionGroupByStates,
} = require('../controllers/auctioneerDirectories')

// const {
//   validateCreateRecommandVideo
// } = require('../controllers/contact/validator')

router.get(
  '/auctionGroupByStates',
  trimRequest.all,
  //requireAuth,
  auctionGroupByStates
)

module.exports = router