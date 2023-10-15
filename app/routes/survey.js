const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request');

const {getSurvey,addStoreSurveyResponse} = require('../controllers/survey');

/**routes*/

/**get latest survey details**/
router.get(
  '/survey/latest',
  trimRequest.all,
  getSurvey
)

router.post(
  '/survey/storeresponse',
  trimRequest.all,
  addStoreSurveyResponse
)

module.exports = router