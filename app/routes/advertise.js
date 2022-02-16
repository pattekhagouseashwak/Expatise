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
    editBlogAd
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

router.post(
    '/pastBlogAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    pastBlogAd)

router.post(
    '/pastPrintAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    pastPrintAd)

router.post(
    '/pastVideoAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    pastVideoAd)

router.post(
    '/currentBlogAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    currentBlogAd)

router.post(
    '/currentPrintAd',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    currentPrintAd)

router.post(
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

module.exports = router