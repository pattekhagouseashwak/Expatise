const { postContent } = require('./postContent')
const {fetchBanner} = require('./fetchBanners')
const {fetchBlog} = require('./fetchBlog')
const{fetchCategoryBasedBlog} = require('./fetchCategoryBasedBlog')
const{fetchFeaturedBlog} = require('./fetchFeaturedBlog')
const {fetchVideos} = require('./fetchVideos')
const {fetchTickers} = require('./fetchTickers')

const{fetchListingPolicy} = require('./fetchListingPolicy')
const{fetchAuctioneerAndBidderFAQ} = require('./fetchAuctioneerAndBidderFAQ')


const { getAboutUs} = require('./about')
const { getDataSecurity} = require('./dataSecurity')
const { getPrivacyPolicy} = require('./privacyPolicy')
const { getTermsAndConditions} = require('./termsAndConditions')
const { getFaq } = require('./faq')
const { fetchPrintAd } = require('./fetchPrintAd')

module.exports = {postContent,fetchBlog,fetchBanner,fetchCategoryBasedBlog,
                 fetchFeaturedBlog,fetchVideos,fetchTickers,fetchListingPolicy,
                 fetchAuctioneerAndBidderFAQ,getAboutUs,getDataSecurity,getPrivacyPolicy,
                 getTermsAndConditions,getFaq,fetchPrintAd}