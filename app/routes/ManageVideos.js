const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
    session: false
})

const {createVideo,fetchVideos,editVideo,deleteVideo,fetchVideosRequest} = require('../controllers/ManageVideos')

// const {
//     validatePostContent
// } = require('../controllers/addContent/validator')

/** Videos APIS routes **/


router.post(
    '/createVideo',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    createVideo)

router.put(
    '/editVideo',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    editVideo)

router.get(
    '/fetchVideos',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    fetchVideos)

router.post(
    '/fetchVideosRequest',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    fetchVideosRequest)


router.delete(
    '/deleteVideo',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    deleteVideo)

module.exports = router