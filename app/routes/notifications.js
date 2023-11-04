const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const {getNotificationsByUserid,storeNotificationResponse} = require('../controllers/notifications')

/** Notifications routes*/

/**get all notifications details**/
router.get('/notifications',
  trimRequest.all,
  getNotificationsByUserid
)

/**create notifications response**/
router.post('/notifications/response',
  trimRequest.all,
  storeNotificationResponse
)
module.exports = router