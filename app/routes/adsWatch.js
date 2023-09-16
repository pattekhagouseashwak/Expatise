const express = require('express')
const router = express.Router()
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const trimRequest = require('trim-request')

const { addAdsWatch, updateAdsWatch,
        removeAdsWatch, getAdsWatch, 
        getAdsWatchById } = require('../controllers/adsWatch')

/**adsWatch routes*/

/**add adsWatch details**/
router.post('/adsWatch/add',
  trimRequest.all,
  addAdsWatch
)

/**add adsWatch details**/
router.put('/adsWatch/update',
  trimRequest.all,
  updateAdsWatch
)

/**get adsWatch details by id**/
router.get('/adsWatch/userid/:userid',
  trimRequest.all,
  getAdsWatchById
)

/**get all adsWatch details**/
router.get('/adsWatch',
  trimRequest.all,
  getAdsWatch
)

/**delete adsWatch names by id**/
router.delete(
  '/adsWatch/remove/:id',
  trimRequest.all,
  removeAdsWatch
)

module.exports = router