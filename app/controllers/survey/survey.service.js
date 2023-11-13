const { handleError } = require('../../middleware/utils')
const surveys = require('../../models/survey')
const appInfo = require('../../../settings.json')
const storeSurveyResponses = require('../../models/storeSurveyResponse')

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

    if (!req.body.user || req.body.user.length < 0) {
      res.status(400).send({ status: 400, message: "user is missing" });
    }

    let response = await surveys.find({ _id: survey, isActive: true }).select('_id');
    console.log('------ response', response);
    if (response.length == 0) {
      return res.status(400).send({
        status: 400,
        message: "survey is currently not availabile"
      })
    }

    let responseSurvey = await storeSurveyResponses.find({ survey: survey, user: user }).select('_id');
    console.log('------ responseSurvey', responseSurvey);
    if (responseSurvey.length != 0) {
      return res.status(400).send({
        status: 400,
        message: "survey already submitted"
      })
    }

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

// fetch store response user details database.....
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
      .select('user')
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

// fetch store response by survey response by id database.....
const getStoreSurveyResponseByID = async (req, res) => {
  try {
    const surveyresponseid = req.query.surveyresponseid

    await storeSurveyResponses.findById({ _id: surveyresponseid })
      .populate('user', 'profilePhoto name email')
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "succesfully fetched store survey response by id.",
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

// fetch indiviaual survey yes-no response in percentage by id database.....
const getYesNoPercentageInSurvey = async (req, res) => {
  try {
    const surveyId = req.query.surveyId
    const typeValue = 'yes-no';
    await storeSurveyResponses.find({
      survey: surveyId,
      responses: {
        $elemMatch: {
          type: typeValue,
        },
      },
    })
      .select('responses.$')
      .then((data) => {

        if (data.length > 0) {
          let count = data.length;
          //===================================================
          // Initialize counters
          let yesCount = 0;
          let noCount = 0;

          // Iterate through the dataset and count "YES" and "NO"
          data.forEach(object => {
            object.responses.forEach(response => {
              if (response.answer.includes("YES") || response.answer.includes("NO")) {
                response.answer.forEach(answer => {
                  if (answer === "YES") {
                    yesCount++;
                  } else if (answer === "NO") {
                    noCount++;
                  }
                });
              }
            });
          });

          console.log('Count of YES:', yesCount);
          console.log('Count of NO:', noCount);
          console.log('Total of Count:', count);

          // Calculate the percentage of "NO"
          const percentageOfYes = (yesCount / count) * 100;
          const percentageOfNo = (noCount / count) * 100;
          data = {survey:surveyId,YES:percentageOfYes, NO:percentageOfNo};
          //===================================================
        } else {
          data = { survey:surveyId, YES: 0, NO: 0 };
        }
        res.status(200).send({
          status: 200,
          message: "succesfully fetched Yes-No Percentage Survey id.",
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

module.exports = {
  postSurvey, getSurvey, removeSurvey, getSurveyList,
  addStoreSurveyResponse, getStoreSurveyResponse, getStoreSurveyResponseByID,
  getYesNoPercentageInSurvey
}