const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {session: false})

const trimRequest = require('trim-request')

const {getTestQuestionsToPratices,getTestResponse,
      addTestResponse,evaluteTestResponse,mistakeTest,personalstatistics,
      fetchCommonTest,removemistakequestion,reviewMistakeTest,testStatistics} = require('../controllers/testmode');

/**routes*/

/**fetch Test Questions To Pratices**/
router.get(
  '/testquestions',
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

/**Get mistakeTest by id**/
router.get(
  '/mistakeTest',
  trimRequest.all,
  mistakeTest
)

/**Get mistakeTest by id**/
router.get(
  '/review/mistakequestions',
  trimRequest.all,
  reviewMistakeTest
)

/**Get mistakeTest by id**/
router.get(
  '/CommonTest',
  trimRequest.all,
  fetchCommonTest
)

router.delete(
  '/remove/mistakequestion',
  trimRequest.all,
  removemistakequestion
)

/**Get personalstatistics by id**/
router.post(
  '/personalstatistics',
  trimRequest.all,
  personalstatistics
)

/**fetch Test Questions To Pratices**/
router.get(
  '/testStatistics',
  trimRequest.all,
  testStatistics
)
module.exports = router