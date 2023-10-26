const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const {postTransaction, getTransactionByUserId } = require('../controllers/transaction')

/******* transaction routes*/

/**post transaction details **/
router.post('/transaction/add',
  trimRequest.all,
  postTransaction
)

/**get transaction details by user id**/
router.get('/transaction/userid/:id',
  trimRequest.all,
  getTransactionByUserId
)

module.exports = router