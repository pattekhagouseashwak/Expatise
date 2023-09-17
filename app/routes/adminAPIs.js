const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const {getProfileList} = require('../controllers/profile');

const {
  postTestQuestions,
  removeTestQuestion
} = require('../controllers/drivingmaterial')

/** ADMIN Profile routes*/

router.get(
  '/profiles',
  trimRequest.all,
  requireAuth,
  getProfileList
)

/**add driving Material details**/
router.post(
  '/drivingQuestion/add',
  trimRequest.all,
  requireAuth,
  postTestQuestions
)

/**delete driving Material names by id**/
router.delete(
  '/drivingQuestion/remove/:id',
  trimRequest.all,
  requireAuth,
  removeTestQuestion
)

module.exports = router