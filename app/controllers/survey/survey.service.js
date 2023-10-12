const { handleError } = require('../../middleware/utils')
const surveys = require('../../models/survey')
const appInfo = require('../../../settings.json')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// To add question into drivingmaterial database.....
const postSurvey = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const questions = req.body.questions;
    const options = req.body.options;
    const isActive = req.body.isActive
    await surveys.create({ title,description,questions,options,isActive})
      .then(() => {
        res.status(200).send({
          status: 200,
          message: "succesfully posted survey."
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

// To fetch survey.....
const getSurvey = async (req, res) => {
  try {
    await surveys.find({isActive:true})
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "survey details.",
          response: data
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

// To remove survey.....
const removeSurvey = async (req, res) => {
  try {
    const id = req.query.id;
    await surveys.findByIdAndDelete({_id:id})
      .then(() => {
        res.status(200).send({
          status:200,
          message:"survey detail removed"
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

// To fetch survey list.....
const getSurveyList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || appInfo.DEFAULTPAGE;
    const itemsPerPage = appInfo.DEFAULT_LISTING_ITEMSPERPAGE;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalItems = await surveys.find().countDocuments();
    const totalpages = Math.ceil(totalItems / itemsPerPage);

    await surveys.find({}).sort({creaatedAt:-1}).skip(startIndex).limit(itemsPerPage)
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "survey list details.",
          response: data,
          page,
          totalpages
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { postSurvey, getSurvey, removeSurvey, getSurveyList}