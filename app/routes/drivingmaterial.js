const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const {
  postQuestions,
  getDrivingMaterial,
  removeQuestions
} = require('../controllers/drivingmaterial')

/**routes*/

/**add driving Material details**/
router.post(
  '/drivingQuestion/add',
  trimRequest.all,
  postQuestions
)

/**get driving Material details**/
router.get(
  '/drivingQuestion',
  trimRequest.all,
  getDrivingMaterial
)

/**delete driving Material names by id**/
router.delete(
  '/drivingQuestion/remove/:id',
  trimRequest.all,
  removeQuestions
)
module.exports = router