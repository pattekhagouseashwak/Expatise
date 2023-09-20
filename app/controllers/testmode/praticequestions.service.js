const { handleError } = require('../../middleware/utils')
const drivingmaterial = require('../../models/drivingMaterial')
const commonmistakes = require('../../models/commonmistakes')

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
          image: 1,
          correctanswers:1
        }
      }
    ])
      .then(async (data) => {
        let obj = await commonMistakeFunction(data);
        // console.log('-----',obj);
        res.status(200).send({
          status: 200,
          message: "fetched details.",
          response: obj//data
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

const commonMistakeFunction = async (payload) => {
  const questionIdsToFind = payload.map((x) => x._id);
  let limitPerQuestion = 3;
  let response;
  await commonmistakes.aggregate([
    {
      $match: {
        questionId: { $in: questionIdsToFind }, // Match documents with matching questionIds
      },
    },
    {
      $sort: { timestamp: -1 }, // Sort by timestamp in descending order (latest first)
    },
    {
      $group: { _id: "$questionId", testset: { $push: "$$ROOT" } }
    },
    {
      $project: {
        testset: {
          $slice: ['$testset', limitPerQuestion], // Take the latest 'limitPerQuestion' responses per group
        },
      },
    },
  ]).exec()
    .then(async (data) => { response = data }).catch(Err => { throw Err});
  
  let colorcode = 0;
  for (let i = 0; i < payload.length; i++) {
    let conditionToSkip = 0;
    for (let j = 0; j< response.length; j++) {
      // Check the condition you want to skip
      if (conditionToSkip) {
        continue;
      }
      if(String(payload[i]._id) == String(response[j]._id)){
      colorcode = response[j].testset.map((x) => x.status);
      payload[i].colorcode = colorcode;
      conditionToSkip = 1;
      }
    }

    if(conditionToSkip == 0){
    payload[i].colorcode = "###";
    }
  }
  return payload;
}

module.exports = {getTestQuestionsToPratices}