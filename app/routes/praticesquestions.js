const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const {getTestQuestionsToPratices} = require('../controllers/praticesquestions')

/**routes*/

/**get Test Questions To Pratices**/
router.get(
  '/practicesquestions',
  trimRequest.all,
  getTestQuestionsToPratices
)

module.exports = router