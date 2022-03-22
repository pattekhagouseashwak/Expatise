const { postContent } = require('./postContent')
const {fetchBanner} = require('./fetchBanners')
const {fetchBlog} = require('./fetchBlog')
const{fetchCategoryBasedBlog} = require('./fetchCategoryBasedBlog')
const{fetchFeaturedBlog} = require('./fetchFeaturedBlog')
const {fetchVideos} = require('./fetchVideos')
const {fetchTickers} = require('./fetchTickers')

const{fetchListingPolicy} = require('./fetchListingPolicy')
const{fetchAuctioneerAndBidderFAQ} = require('./fetchAuctioneerAndBidderFAQ')

module.exports = {postContent,fetchBlog,fetchBanner,fetchCategoryBasedBlog,
                 fetchFeaturedBlog,fetchVideos,fetchTickers,fetchListingPolicy,
                 fetchAuctioneerAndBidderFAQ}