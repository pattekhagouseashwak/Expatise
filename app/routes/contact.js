const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
    contactUs,
    gotATip,
    advertiseWithUs,
    createRecommandVideo,
    recommendedVideo,
    requestACallback,
    getRequestACallbackDetails,
    writeToUs,
    dashboardAdvert,
    getWriteToUsDetails,
    hostingServices,
    webDevServices,
    gotQuestionRelatedToAuctionLaw,
    replyComment
} = require('../controllers/contact')

const {
  validateCreateRecommandVideo,
  validateData_gotQuestion,
  validateData
} = require('../controllers/contact/validator')

router.post('/contactUs',
  trimRequest.all,
  //requireAuth,
  contactUs
)

router.post('/gotATip',
    trimRequest.all,
    //requireAuth,
    gotATip
)

router.post('/advertiseWithUs',
    trimRequest.all,
    //requireAuth,
    advertiseWithUs
)

router.post('/createRecommandVideo',
  trimRequest.all,
  requireAuth,
  validateCreateRecommandVideo,
  createRecommandVideo)

router.get('/recommendedVideo',
  trimRequest.all,
  //requireAuth,
recommendedVideo)

router.post('/requestACallback',
  trimRequest.all,
  requireAuth,
  requestACallback
)

router.get('/getRequestACallbackDetails',
  trimRequest.all,
  requireAuth,
  getRequestACallbackDetails
)


router.post('/writeToUs',
  trimRequest.all,
  requireAuth,
  writeToUs
)

router.get('/dashboardAdverts',
  trimRequest.all,
  dashboardAdvert
)

router.get('/getWriteToUsDetails',
  trimRequest.all,
  requireAuth,
  getWriteToUsDetails
)

router.post('/hostingServices',
  trimRequest.all,
  validateData,
  hostingServices
)

router.post('/webDevServices',
  trimRequest.all,
  validateData,
  webDevServices
)

router.post('/gotQuestionRelatedToAuctionLaw',
  trimRequest.all,
  validateData_gotQuestion,
  gotQuestionRelatedToAuctionLaw
)

router.post('/reply',
  trimRequest.all,
  requireAuth,
  replyComment)

module.exports = router