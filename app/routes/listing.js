const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
    session: false
})


const {
    fetchLiveListing,
    fetchUnPublishedListing,
    fetchPastListing,
    fetchSingleAuctionList,
    bidRequest,
    downladBidRequest,
    editAuctionListing,
    deleteListedItem,
    editUnpublishedListing
} = require('../controllers/listing')

// const {
//     validatePostContent
// } = require('../controllers/addContent/validator')

/*
 * Admin routes
 */


router.post(
    '/fetchLiveListing',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    fetchLiveListing)

router.post(
    '/fetchUnPublishedListing',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    fetchUnPublishedListing)

router.post(
    '/fetchPastListing',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    fetchPastListing)

router.post(
    '/fetchSingleAuctionList',
    //requireAuth,
    //validatePostContent,
    trimRequest.all,
    fetchSingleAuctionList)

router.post(
        '/bidRequestedByAdmin',
        //requireAuth,
        //validatePostContent,
        trimRequest.all,
        bidRequest)

router.post(
            '/downladBidRequestByAdmin',
            //requireAuth,
            //validatePostContent,
            trimRequest.all,
            downladBidRequest)

router.post('/editAuctionListingByAdmin',
            //requireAuth,
            //validatePostContent,
            trimRequest.all,
            editAuctionListing)

router.post('/deleteListedItemByAdmin',
            //requireAuth,
            //validatePostContent,
            trimRequest.all,
            deleteListedItem)

router.post('/editUnpublishedListingByAdmin',
            //requireAuth,
            //validatePostContent,
            trimRequest.all,
            editUnpublishedListing)

module.exports = router