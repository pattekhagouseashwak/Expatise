const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const {
  postbookmarkQuestions,
  getbookmarkQuestions,
  removebookmarkQuestion
} = require('../controllers/drivingmaterial')

/**bookmark routes*/

/**add driving Material details**/
router.post('/bookmark/add',
  trimRequest.all,
  postbookmarkQuestions
)

/**get driving Material details**/
router.get('/bookmark',
  trimRequest.all,
  getbookmarkQuestions
)

/**delete driving Material names by id**/
router.delete(
  '/bookmark/remove/:id',
  trimRequest.all,
  removebookmarkQuestion
)

module.exports = router