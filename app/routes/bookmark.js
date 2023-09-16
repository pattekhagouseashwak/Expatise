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

/**add bookmark details**/
router.post('/bookmark/add',
  trimRequest.all,
  postbookmarkQuestions
)

/**get bookmark details**/
router.get('/bookmark',
  trimRequest.all,
  getbookmarkQuestions
)

/**delete bookmark by id**/
router.delete(
  '/bookmark/remove/:id',
  trimRequest.all,
  removebookmarkQuestion
)

module.exports = router