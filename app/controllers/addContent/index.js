const { postContent } = require('./postContent')
const {fetchBanner} = require('./fetchBanners')
const {fetchBlog} = require('./fetchBlog')
const{fetchCategoryBasedBlog} = require('./fetchCategoryBasedBlog')
const{fetchFeaturedBlog} = require('./fetchFeaturedBlog')

module.exports = {postContent,fetchBlog,fetchBanner,fetchCategoryBasedBlog,fetchFeaturedBlog}