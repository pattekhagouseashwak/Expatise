const { handleError } = require('../../middleware/utils')
const surveys = require('../../models/survey')
const appInfo = require('../../../settings.json')
const storeSurveyResponses = require('../../models/storeSurveyResponse')
const { response } = require('express')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// To add question into survey database.....
const postSurvey = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const questions = req.body.questions;
    const options = req.body.options;
    const isActive = req.body.isActive;
    await surveys.updateMany({ isActive: false });
    await surveys.create({ title, description, questions, options, isActive })
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "succesfully posted survey.",
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

// To fetch survey.....
const getSurvey = async (req, res) => {
  try {
    let userid = req.query.userid;
    await surveys.find({ isActive: true }).sort({ createdAt: -1 })
      .then(async (data) => {
        if (data) {
          const exist = await storeSurveyResponses.find({ user: userid, survey: data[0]._id }); console.log(exist);
          data = exist.length == 0 ? data : "";
        }
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
    await surveys.findByIdAndDelete({ _id: id })
      .then(() => {
        res.status(200).send({
          status: 200,
          message: "survey detail removed"
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

    await surveys.find({}).sort({ creaatedAt: -1 }).skip(startIndex).limit(itemsPerPage).select('-questions.answer')
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

// To store response database.....
const addStoreSurveyResponse = async (req, res) => {
  try {
    const survey = req.body.survey;
    const user = req.body.user;
    const responses = req.body.responses;

    await storeSurveyResponses.create({ survey, user, responses })
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

// fetch store response database.....
const getStoreSurveyResponse = async (req, res) => {
  try {
    const surveyid = req.query.surveyid
    const page = parseInt(req.query.page) || appInfo.DEFAULTPAGE;
    const itemsPerPage = appInfo.DEFAULT_LISTING_ITEMSPERPAGE;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalItems = await storeSurveyResponses.find().countDocuments();
    const totalpages = Math.ceil(totalItems / itemsPerPage);

    await storeSurveyResponses.find({ survey: surveyid }).skip(startIndex).limit(itemsPerPage)
      .populate('user', 'profilePhoto name email')
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "succesfully fetched store survey response details.",
          response: data,
          page: page,
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

module.exports = {
  postSurvey, getSurvey, removeSurvey, getSurveyList,
  addStoreSurveyResponse, getStoreSurveyResponse
}