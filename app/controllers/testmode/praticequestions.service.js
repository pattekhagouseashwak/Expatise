const { handleError } = require('../../middleware/utils')
const drivingmaterial = require('../../models/drivingMaterial')
const appInfo = require('../../../settings.json')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// To fetch pratices question.....
const getTestQuestionsToPratices = async (req, res) => {
  try {
    await drivingmaterial.aggregate([
      { $sample: { size: 100 } },
      {
        $project: {
          _id: 1,
          question: 1,
          options: 1,
          image: 1
        }
      }
    ])
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "fetched details.",
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

module.exports = {getTestQuestionsToPratices}