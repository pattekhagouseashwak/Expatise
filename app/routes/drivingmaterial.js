const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const {
  getTestQuestions,
  searchTestQuestion
} = require('../controllers/drivingmaterial')

/**routes*/

/**get driving Material details**/
router.get(
  '/drivingQuestion',
  trimRequest.all,
  getTestQuestions
)

/**search Test Questions**/
router.get(
  '/searchQuestion',
  trimRequest.all,
  searchTestQuestion
)
module.exports = router