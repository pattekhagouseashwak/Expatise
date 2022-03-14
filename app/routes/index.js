const express = require('express')
const router = express.Router()
const fs = require('fs')
const routesPath = `${__dirname}/`
const { removeExtensionFromFile } = require('../middleware/utils')
const { base } = require('../models/Auctioneer')
const baseUr = '/api/'

/*
 * Load routes statically and/or dynamically
 */
// Load Auth route

router.use(baseUr, require('./authentication'))

router.use(baseUr, require('./zipCode'))

router.use(baseUr, require('./profile'))

router.use(baseUr, require('./auctionListing'))

router.use(baseUr, require('./addContent'))

router.use(baseUr, require('./getPasses'))

router.use(baseUr, require('./getRequests'))

router.use(baseUr, require('./contact'))

router.use(baseUr, require('./auctioneerDirectories'))

router.use(baseUr, require('./newsletter'))

router.use(baseUr, require('./helpAndSupport'))

router.use(baseUr, require('./listing'))

router.use(baseUr, require('./advertise'))

router.use(baseUr, require('./ManageBlogs'))

router.use(baseUr, require('./ManageVideos'))

// Loop routes path and loads every file as a route except this file and Auth route
fs.readdirSync(routesPath).filter((file) => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file)
  // Prevents loading of this file and auth file
  return routeFile !== 'index' && routeFile !== 'auth' && file !== '.DS_Store'
    ? router.use(`/${routeFile}`, require(`./${routeFile}`))
    : ''
})

/*
 * Setup routes for index
 */
router.get('/', (req, res) => {
  res.render('index')
})

/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
  res.status(404).json({
      message: 'url_not_found'
  })
})

module.exports = router
