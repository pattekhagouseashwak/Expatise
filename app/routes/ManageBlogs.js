const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
    session: false
})


const { createBanner, fetchBanner, deleteBanner,
    createType, editType, deleteType, fetchType,
    createCategory, fetchCategory, editCategory, deleteCategory,
    createBlog, fetchBlog, editBlog, deleteBlog ,fetchBlogRequest} = require('../controllers/ManageBlogs')

// const {
//     validatePostContent
// } = require('../controllers/addContent/validator')

/** Blog APIS routes **/


router.post(
    '/createBanner',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    createBanner)

router.get(
    '/fetchBanner',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    fetchBanner)

router.delete(
    '/deleteBanner',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    deleteBanner)

/**Type section router */

router.post(
    '/createType',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    createType)

router.put('/editType',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    editType)

router.get(
    '/fetchType',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    fetchType)

router.delete(
    '/deleteType',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    deleteType)

/**Category Routes */

router.post(
    '/createCategory',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    createCategory)

router.put('/editCategory',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    editCategory)

router.get(
    '/fetchCategory',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    fetchCategory)

router.delete(
    '/deleteCategory',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    deleteCategory)

/** Blog Routes */

router.post(
    '/createBlog',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    createBlog)

router.put(
    '/editBlog',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    editBlog)

router.post(
    '/fetchBlog',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    fetchBlog)

router.post(
    '/fetchBlogRequest',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    fetchBlogRequest)


router.delete(
    '/deleteBlog',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    deleteBlog)

module.exports = router