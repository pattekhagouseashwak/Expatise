const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {session: false})
const trimRequest = require('trim-request');

const {loginService,logout,storeLoginInfo} = require('../controllers/authentication');
const {validateLogin} = require('../controllers/authentication/validators');

/** authenticate routes */

router.post(
  '/generate',
  trimRequest.all,
  validateLogin,
  storeLoginInfo
)

router.post(
  '/login',
  trimRequest.all,
  validateLogin,
  loginService
)

router.post(
  '/logout',
  requireAuth,
  trimRequest.all,
  logout
)

module.exports = router