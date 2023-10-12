const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request');

const {getSurvey} = require('../controllers/survey');

/**routes*/

/**get latest surveydetails**/
router.get(
  '/survey/latest',
  trimRequest.all,
  getSurvey
)

module.exports = router