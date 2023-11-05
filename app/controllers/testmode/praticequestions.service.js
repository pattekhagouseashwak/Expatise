const { handleError } = require('../../middleware/utils')
const drivingmaterial = require('../../models/drivingMaterial')
const commonmistakes = require('../../models/commonmistakes')
const mongoose = require('mongoose');

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// To fetch pratices question.....
const getTestQuestionsToPratices = async (req, res) => {
  try {
    if (!req.query.userid || req.query.userid.length < 0) {
      return res.status(400).send({ status: 400, message: "InValid Payload: userid missing" })
    }
    const objectId = mongoose.Types.ObjectId(req.query.userid);
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
        let obj = await commonMistakeFunction(data,objectId);
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

const commonMistakeFunction = async (payload,userid) => {
  const questionIdsToFind = payload.map((x) => x._id); console.log('--------',userid)
  let limitPerQuestion = 3;
  let response;
  await commonmistakes.aggregate([
    {
      $match: {
        questionId: { $in: questionIdsToFind },
        userId: userid // Match documents with matching questionIds
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
      payload[i].colorcode = String(colorcode);
      conditionToSkip = 1;
      }
    }
    if(conditionToSkip == 0){
    payload[i].colorcode = "###";
    }
  }
  return payload;
}

const testStatistics = async (req, res) => {
  try {
    if (!req.query.userid || req.query.userid.length < 0) {
      return res.status(400).send({ status: 400, message: "InValid Payload: userid missing" })
    }
    const objectId = mongoose.Types.ObjectId(req.query.userid);
    await drivingmaterial.aggregate([
      {
        $project: {
          _id: 1,
          question: 1,
          options: 1,
          image: 1,
          correctanswers: 1
        }
      }
    ])
      .then(async (data) => {
        let obj = await questionPercentageCalculation(data, objectId);
        // console.log('-----',obj);
        res.status(200).send({
          status: 200,
          message: "fetched statistics details.",
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

const questionPercentageCalculation = async (payload,userid) => {
  const questionIdsToFind = payload.map((x) => x._id); console.log('--------',userid)
  let limitPerQuestion = 3;
  let response;
  await commonmistakes.aggregate([
    {
      $match: {
        questionId: { $in: questionIdsToFind },
        userId: userid // Match documents with matching questionIds
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
  let red = ["0","0,0","0,1","1,0","0,0,0","0,0,1","0,1,0","1,0,0","1,1,0"];
  let grey= "###";
  let green= ["1","1,1","1,1,1"];
  let yellow = ["0,1,1"];
  let totalCount;
  let redCount  = 0;
  let greenCount = 0;
  let greyCount = 0;
  let yellowCount = 0;

  for (let i = 0; i < payload.length; i++) {
    let conditionToSkip = 0;
    for (let j = 0; j< response.length; j++) {
      // Check the condition you want to skip
      if (conditionToSkip) {
        continue;
      }
      if(String(payload[i]._id) == String(response[j]._id)){
      colorcode = response[j].testset.map((x) => x.status);
      payload[i].colorcode = String(colorcode);
      conditionToSkip = 1;
      }
    }
    if(conditionToSkip == 0){
    payload[i].colorcode = "###";
    }
    console.log('--------',payload[i].colorcode)
    if (red.includes(payload[i].colorcode)) {
      redCount = redCount+1;
    } else if (green.includes(payload[i].colorcode)) {
      greenCount = greenCount+1;
    } else if (yellow.includes(payload[i].colorcode)) {
      yellowCount = yellowCount+1;
    } else if(grey.includes(payload[i].colorcode)) {
      greyCount = greyCount+1
    }
  }
  totalCount = redCount+greenCount+yellowCount+greyCount;
  //console.log(redCount,greenCount,yellowCount,greyCount,totalCount);
  let redPercentage = ((redCount/totalCount)*100).toFixed(1);
  let greenPercentage = ((greenCount/totalCount)*100).toFixed(1);
  let yellowPercentage = ((yellowCount/totalCount)*100).toFixed(1);
  let greyPercentage = ((greyCount/totalCount)*100).toFixed(1);
  return {redPercentage,greenPercentage,yellowPercentage,greyPercentage};
}

module.exports = {getTestQuestionsToPratices,testStatistics}