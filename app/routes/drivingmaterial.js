const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const {
  postTestQuestions,
  getTestQuestions,
  removeTestQuestion,
  searchTestQuestion
} = require('../controllers/drivingmaterial')

/**routes*/

/**add driving Material details**/
router.post(
  '/drivingQuestion/add',
  trimRequest.all,
  postTestQuestions
)

/**get driving Material details**/
router.get(
  '/drivingQuestion',
  trimRequest.all,
  getTestQuestions
)

/**delete driving Material names by id**/
router.delete(
  '/drivingQuestion/remove/:id',
  trimRequest.all,
  removeTestQuestion
)

/**search Test Questions**/
router.get(
  '/searchQuestion',
  trimRequest.all,
  searchTestQuestion
)
module.exports = router