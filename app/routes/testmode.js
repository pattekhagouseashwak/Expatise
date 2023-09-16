const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const {getTestQuestionsToPratices,getTestResponse,
      addTestResponse,evaluteTestResponse} = require('../controllers/testmode')

/**routes*/

/**fetch Test Questions To Pratices**/
router.get(
  '/practicesquestions',
  trimRequest.all,
  getTestQuestionsToPratices
)

/**Add Test Response**/
router.post(
  '/storeresponse',
  trimRequest.all,
  addTestResponse
)

/**Get Test Response by id**/
router.get(
  '/storeresponse/:id',
  trimRequest.all,
  getTestResponse
)

/**Add Test Response**/
router.post(
  '/testmode/evaluteTestResponse',
  trimRequest.all,
  evaluteTestResponse
)

module.exports = router