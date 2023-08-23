const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const {
  addCategoryNames,
  getCategoryNames,
  removeCategoryNames
} = require('../controllers/category')

/**routes*/

// add category names
router.post(
  '/categorydetails/addcategoryname',
  trimRequest.all,
  addCategoryNames
)

// get category details....
router.get(
  '/categorydetails/getdetails',
  trimRequest.all,
  getCategoryNames
)

// delete category names by id ....
router.delete(
  '/categorydetails/removecategory/:id',
  trimRequest.all,
  removeCategoryNames
)
module.exports = router