const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const {getProfileList,getProfileGraph, getProfileCountByDate} = require('../controllers/profile');

const {getAnnouncement, editAnnouncement, deleteAnnouncement,
       createAnnouncement, getAnnouncementList} = require('../controllers/announcement');

const {postTestQuestions,removeTestQuestion} = require('../controllers/drivingmaterial');

const {postSurvey,removeSurvey,getSurveyList,
      getStoreSurveyResponse,getStoreSurveyResponseByID} = require('../controllers/survey');


const { addPricePlans, updatePricePlansById,
        removePricePlans, getPricePlans } = require('../controllers/priceplans');

const { addCoupons, updateCoupons, removeCoupons,
       getCoupons, getCouponsById } = require('../controllers/coupons')

const {getTransaction,getTransactionCountByDate} = require('../controllers/transaction')


/** ADMIN Profile routes*/

router.get(
  '/profiles',
  trimRequest.all,
  requireAuth,
  getProfileList
)

router.post(
  '/profiles/graph',
  trimRequest.all,
  //requireAuth,
  getProfileGraph
)

router.post(
  '/profiles/count',
  trimRequest.all,
  requireAuth,
  getProfileCountByDate
)
/**********************************add driving Material details**/
router.post(
  '/drivingQuestion/add',
  trimRequest.all,
  requireAuth,
  postTestQuestions
)

/**delete driving Material names by id**/
router.delete(
  '/drivingQuestion/remove/:id',
  trimRequest.all,
  requireAuth,
  removeTestQuestion
)

/**************************************************announcement routes*/

router.get(
  '/announcement',
  trimRequest.all,
  requireAuth,
  getAnnouncement
)

router.get(
  '/announcement/list',
  trimRequest.all,
  requireAuth,
  getAnnouncementList
)

router.put(
  '/announcement/update',
  trimRequest.all,
  requireAuth,
  editAnnouncement
)

router.post(
  '/announcement/create',
  trimRequest.all,
  requireAuth,
  createAnnouncement
)

router.delete(
  '/announcement/remove',
  trimRequest.all,
  requireAuth,
  deleteAnnouncement
)

/************************************************post Survey**/
router.post(
  '/survey/post',
  trimRequest.all,
  requireAuth,
  postSurvey
)


/**delete Survey**/
router.delete(
  '/survey/remove',
  trimRequest.all,
  requireAuth,
  removeSurvey
)


/**get Survey list**/
router.get(
  '/survey/list',
  trimRequest.all,
  requireAuth,
  getSurveyList)


/**get Survey list**/
router.get(
  '/survey/listStoreResponse',
  trimRequest.all,
  requireAuth,
  getStoreSurveyResponse)


/**get Survey By User ID**/
router.get(
  '/survey/userResponse',
  trimRequest.all,
  //requireAuth,
  getStoreSurveyResponseByID)
  

/**************************************************priceplans routes*/

/**add priceplans details**/
router.post('/priceplans/add',
trimRequest.all,
requireAuth,
addPricePlans
)

/**add priceplans details**/
router.put('/priceplans/update',
trimRequest.all,
requireAuth,
updatePricePlansById
)

/**get all priceplans details**/
router.get('/priceplans/all',
trimRequest.all,
requireAuth,
getPricePlans
)

/**delete priceplans names by id**/
router.delete(
  '/priceplans/remove/:id',
  trimRequest.all,
  requireAuth,
  removePricePlans
)

/****************************************coupon routes*/

/**add coupons details**/
router.post('/coupons/add',
trimRequest.all,
//requireAuth,
addCoupons
)

/**add coupons details**/
router.put('/coupons/update',
trimRequest.all,
//requireAuth,
updateCoupons
)

/**get coupons details by id**/
router.get('/coupons/id/:id',
trimRequest.all,
//requireAuth,
getCouponsById
)

/**get all coupons details**/
router.get('/coupons/details',
trimRequest.all,
//requireAuth,
getCoupons
)

/**delete coupons names by id**/
router.delete(
'/coupons/remove/:id',
trimRequest.all,
//requireAuth,
removeCoupons
)

/************************************ transaction routes*/

/**get all transaction details**/
router.get('/transaction/details',
  trimRequest.all,
  requireAuth,
  getTransaction
)

router.post('/transaction/sales',
  trimRequest.all,
  requireAuth,
  getTransactionCountByDate
)

module.exports = router