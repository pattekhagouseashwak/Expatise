const { handleError } = require('../../middleware/utils')
const storeTestResponse = require('../../models/storeTestResponse');

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// fetch store Test Response.....
const getTestResponse = async (req, res) => {
  try {
    await storeTestResponse.findById({_id:req.params.id})
    .populate({
      path:'testResponse.questionId',
      select:'type question image options'
    })
    .select('-createdAt -updatedAt')
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

// fetch store Test Response.....
const addTestResponse = async (req, res) => {
  try {
    const user = req.body.user;
    const testResponse = req.body.testResponse;
    const examType = req.body.examType;
    const testCompleted = req.body.testCompleted;
    await storeTestResponse.create({user,examType,testCompleted,testResponse})
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "Sucesfully Added Details.",
          testId:data?._id
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

module.exports = {getTestResponse,addTestResponse};