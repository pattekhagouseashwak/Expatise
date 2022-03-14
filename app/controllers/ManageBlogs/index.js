const {createBanner} = require('./createBanner')
const {fetchBanner} = require('./fetchBanners')
const {deleteBanner} = require('./deleteBanner')

const {createType} = require('./createType')
const {fetchType} = require('./fetchType')
const {editType} = require('./editType')
const {deleteType} = require('./deleteType')

const {createCategory} = require('./createCategory')
const {fetchCategory} = require('./fetchCategory')
const {editCategory} = require('./editCategory')
const {deleteCategory} = require('./deleteCategory')

const {createBlog} = require('./createBlog')
const {fetchBlog} = require('./fetchBlog')
const {editBlog} = require('./editBlog')
const {deleteBlog} = require('./deleteBlog')
const{fetchBlogRequest} = require('./fetchBlogRequest')

const {addFeaturedBlog} = require('./addFeaturedBlog')
const {fetchFeaturedBlog} = require('./fetchFeaturedBlog')
const {editFeaturedBlog} = require('./editFeaturedBlog')
const {deleteFeaturedBlog} = require('./deleteFeaturedBlog')


module.exports={createBanner,fetchBanner,deleteBanner,
               createType,editType,deleteType,fetchType,
               createCategory,fetchCategory,editCategory,deleteCategory,
               createBlog,fetchBlog,editBlog,deleteBlog,fetchBlogRequest,
               addFeaturedBlog,editFeaturedBlog,fetchFeaturedBlog,deleteFeaturedBlog};