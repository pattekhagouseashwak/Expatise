const { handleError } = require('../../middleware/utils');
const storeTestResponse = require('../../models/storeTestResponse');
const drivingmaterial = require('../../models/drivingMaterial');

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// fetch store Test Response.....
const evaluteTestResponse = async (req, res) => {
  try {
    const id = req.body.id;
    const user = req.body.user;
    let testResponse = req.body.testResponse;
    const examType = req.body.examType;
    const testCompleted = req.body.testCompleted;
    let modelSchema;
    if (testResponse && testResponse.length < 0) {
      return res.status(200).send({
        status: 400,
        message: "testResponse is empty."
      })
    }
    const evaluteTestResponse = await evaluteTest(testResponse);

    testResponse = evaluteTestResponse.result;
    let score = evaluteTestResponse.correct;
    if (id && id !== null) {
      modelSchema = storeTestResponse.findByIdAndUpdate({ _id: id }, 
                                                        { user, examType, testResponse, testCompleted, score})
    } else {
      modelSchema = storeTestResponse.create({ user, examType, testResponse, testCompleted, score})
    }
   await modelSchema
        .then(() => {
          res.status(200).send({
            status: 200,
            message: "Sucesfully Evaluated Test.",
            response: evaluteTestResponse
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

const evaluteTest = async (testResponse) => {
let index;
let test_index;
let result = [];
let correct = 0;
let wrong = 0;
const questionsIds = testResponse.map(obj => obj.questionId);
const allTestQuestion = await drivingmaterial.find({ _id: { $in: questionsIds } })
                                             .select('correctanswers');
  for (test_index = 0; test_index < testResponse.length; test_index++) {
    for (index = 0; index < allTestQuestion.length; index++) {
      if (testResponse[test_index].questionId == allTestQuestion[index]._id) {
        if (testResponse[test_index].selectedOption == allTestQuestion[index].correctanswers) {
          result.push({
            questionId: testResponse[test_index].questionId,
            selectedOption: testResponse[test_index].selectedOption,
            correctAnswer: allTestQuestion[index].correctanswers,
            status: 1
          });
          correct++;
        } else {
          result.push({
            questionId: testResponse[test_index].questionId,
            selectedOption: testResponse[test_index].selectedOption,
            correctAnswer: allTestQuestion[index].correctanswers,
            status: 0
          });
          wrong++;
        }
      }
    }
  }

  return {result,correct,wrong};
}
module.exports = {evaluteTestResponse}