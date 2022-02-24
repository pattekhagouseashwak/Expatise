const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
    session: false
})


const {
    postPrintAd,
    postBlogAd,
    postVideoAd,
    pastBlogAd,
    pastPrintAd,
    pastVideoAd,
    currentBlogAd,
    currentPrintAd,
    currentVideoAd,
    deleteAd,
    editPrintAd,
    editVideoAd,
    editBlogAd,
    editFeaturedAd,
    postFeaturedAd,
    pastFeaturedAd,
    currentFeaturedAd,
    upcomingVideoAd,
    upcomingPrintAd,
    upcomingFeaturedAd,
    upcomingBlogAd
} = require('../controllers/advertise')

// const {
//     validatePostContent
// } = require('../controllers/addContent/validator')

/** advertise routes **/

router.post(
    '/postPrintAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    postPrintAd)

router.post(
    '/postBlogAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    postBlogAd)

router.post(
    '/postVideoAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    postVideoAd)

router.get(
    '/pastBlogAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    pastBlogAd)

router.get(
    '/pastPrintAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    pastPrintAd)

router.get(
    '/pastVideoAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    pastVideoAd)

router.get(
    '/currentBlogAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    currentBlogAd)

router.get(
    '/currentPrintAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    currentPrintAd)

router.get(
    '/currentVideoAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    currentVideoAd)

router.delete(
    '/deleteAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    deleteAd)

router.post(
    '/editBlogAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    editBlogAd)

router.post(
    '/editPrintAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    editPrintAd)

router.post(
    '/editVideoAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    editVideoAd)

//==================== Featured AD==========

router.post(
    '/editFeaturedAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    editFeaturedAd)

router.post(
    '/postFeaturedAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    postFeaturedAd)

router.get(
    '/pastFeaturedAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    pastFeaturedAd)

router.get(
    '/currentFeaturedAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    currentFeaturedAd)

router.get(
    '/upcomingFeaturedAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    upcomingFeaturedAd)

router.get(
    '/upcomingPrintAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    upcomingPrintAd)

router.get(
    '/upcomingVideoAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    upcomingVideoAd)

router.get(
    '/upcomingBlogAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    upcomingBlogAd)

module.exports = router