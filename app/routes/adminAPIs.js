const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../middleware/utils/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const {getProfileList} = require('../controllers/profile');

const {getAnnouncement, editAnnouncement, deleteAnnouncement,
       createAnnouncement, getAnnouncementList} = require('../controllers/announcement')

const {
  postTestQuestions,
  removeTestQuestion
} = require('../controllers/drivingmaterial')

const {postSurvey,removeSurvey,getSurveyList,getStoreSurveyResponse} = require('../controllers/survey')

/** ADMIN Profile routes*/

router.get(
  '/profiles',
  trimRequest.all,
  requireAuth,
  getProfileList
)

/**add driving Material details**/
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

/**post Survey**/
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
  //requireAuth,
  getStoreSurveyResponse)

module.exports = router