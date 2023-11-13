const { handleError } = require('../../middleware/utils');
const storeTestResponse = require('../../models/storeTestResponse');
const commonmistakes = require('../../models/commonmistakes');
const mongoose = require('mongoose');

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
    const evaluteTestResponse = await evaluteTest(testResponse,user,examType);

    let score = evaluteTestResponse.correct;
    if (id && id !== null) {
      modelSchema = storeTestResponse.findByIdAndUpdate({ _id: id }, 
                                                        { user, examType, testResponse, testCompleted, score})
    } else {
      modelSchema = storeTestResponse.create({ user, examType, testResponse, testCompleted, score})
    }
   await modelSchema
        .then((data) => {
          res.status(200).send({
            status: 200,
            message: "Sucesfully Evaluated Test.",
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

const evaluteTest = async (testResponse,user,examType) => {
  let test_index;
  let correct = 0;
  let wrong = 0;
  let filterResponse = [];
  for (test_index = 0; test_index < testResponse.length; test_index++) {
    if (testResponse[test_index].status == 1) {
      correct++;
      filterResponse.push({
        userId: user,
        questionId: testResponse[test_index].questionId,
        status: 1
      });
    } else if (testResponse[test_index].status == 0) {
      wrong++;
      filterResponse.push({
        userId: user,
        examType:examType,
        questionId: testResponse[test_index].questionId,
        status: 0
      });
    }
  }
  // to store what mistake question response
  insertquerymistakes(filterResponse);
  return {correct, wrong };
}

// fetch mistake Test.....
const mistakeTest = async (req, res) => {
  try {
    if (!req.query.userid || req.query.userid.length < 0) {
      return res.status(400).send({ status: 400, message: "InValid Payload: userid missing" })
    }
    const objectId = mongoose.Types.ObjectId(req.query.userid);
    let response;
    let limitPerQuestion = 3;
    console.log(req.query.userid);
    await commonmistakes.aggregate([
      {
        $match: {
          'userId': objectId, // req.query.userid
        },
      },
      //{ $sample: { size: 100 } },
      {
        $sort: { timestamp: -1 }, // Sort by timestamp in descending order (latest first)
      },
      {
        $group: { _id: "$questionId", testset: { $push: "$$ROOT" } }
      },
      {
        $lookup: {
          from: 'drivingmaterials', // Replace with the name of the collection you're populating from
          localField: '_id',
          foreignField: '_id',
          as: 'questionobject', // The name of the field where the populated data will be stored
        },
      },
      {
        $project: {
          testset: {
            $slice: ['$testset', limitPerQuestion], // Take the latest 'limitPerQuestion' responses per group
          },
          questionobject: 1
        },
      },
    ]).exec()
      .then(async (data) => { response = data }).catch(Err => { throw Err });

    let colorcode = 0;
    let filterobject = [];
    for (let j = 0; j < response.length; j++) {
      colorcode = response[j].testset.map((x) => x.status);
      response[j].questionobject[0].colorcode = colorcode.join(',');
      delete response[j].testset;
      delete response[j]._id;
      if (response[j].questionobject[0].colorcode === "1,1,1"|| 
          response[j].questionobject[0].colorcode === "1,1" || 
          response[j].questionobject[0].colorcode === '1') 
      {
        delete response[j];
      }else{
      filterobject.push(response[j].questionobject[0]);
      }
    }
    let Status;
    let Message;
    let Response = [];
    if (filterobject.length == 0) {
      Status = 400,
      Message = "mistake questions are empty."
    }
    else if (filterobject.length > 0) {
      Status = 200;
      Message = "fetched details.";
      Response = filterobject;
    }
    return res.status(200).send({
      status: Status,
      message: Message,
      response: Response
    })
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

// insert query for mistakes query....
const insertquerymistakes = async(payload)=>{
  commonmistakes.insertMany(payload, (error, insertedDocuments) => {
    if (error) {
      console.error('Error inserting documents:', error);
    } else {
      console.log('insertquerymistakes Documents inserted:');
    }
  });
}

// To remove mistake question.....
const removemistakequestion = async (req, res) => {
  try {
    if (!req.query.id || req.query.id.length < 0) {
      return res.status(400).send({ status: 400, message: "InValid Payload: id missing" })
    }
    const objectId = mongoose.Types.ObjectId(req.query.id);
    await commonmistakes.deleteMany({questionId:objectId})
      .then(async () => {
        res.status(200).send({
          status: 200,
          message: "succesfully deleted details."
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

// fetch mistake Test.....
const fetchCommonTest = async (req, res) => {
  try {
    let response;
    let limitPerQuestion = 3;
    await commonmistakes.aggregate([
      {
        $match: {
          'examType': 'realtest',
        },
      },
      { $sample: { size: 100 } },
      {
        $sort: { timestamp: -1 }, // Sort by timestamp in descending order (latest first)
      },
      {
        $group: { _id: "$questionId", testset: { $push: "$$ROOT" } }
      },
      {
        $lookup: {
          from: 'drivingmaterials', // Replace with the name of the collection you're populating from
          localField: '_id',
          foreignField: '_id',
          as: 'questionobject', // The name of the field where the populated data will be stored
        },
      },
      {
        $project: {
          testset: {
            $slice: ['$testset', limitPerQuestion], // Take the latest 'limitPerQuestion' responses per group
          },
          questionobject: 1
        },
      },
    ]).exec()
      .then(async (data) => { response = data }).catch(Err => { throw Err });
    let colorcode = 0;
    let filterobject = [];
    for (let j = 0; j < response.length; j++) {
      colorcode = response[j].testset.map((x) => x.status);
      response[j].questionobject[0].colorcode = colorcode.join(',');
      conditionToSkip = 1;
      delete response[j].testset;
      delete response[j]._id;
      if (response[j].questionobject[0].colorcode === "1,1,1"|| 
          response[j].questionobject[0].colorcode === "1,1" || 
          response[j].questionobject[0].colorcode === '1') 
      {
        delete response[j];
      }else
      {
      filterobject.push(response[j].questionobject[0]);
      }
    }
    let Status;
    let Message;
    let Response = [];
    if (filterobject.length == 0) {
      Status = 400,
      Message = "Common mistake questions are empty."
    }
    else{
      Status = 200;
      Message = "fetched Common mistake details.";
      Response = filterobject;
    }
    
    return res.status(Status).send({
      status: Status,
      message: Message,
      response: Response
    })
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

// remove common Test to review..... dublicate code
const reviewMistakeTest = async (req, res) => {
  try {
    if (!req.query.id || req.query.id.length < 0) {
      return res.status(400).send({ status: 400, message: "InValid Payload: userid missing" })
    }
    const objectId = mongoose.Types.ObjectId(req.query.id);
    let response;
    let limitPerQuestion = 3;
    await commonmistakes.aggregate([
      {
        $match: {
          'userId': objectId, // req.query.userid
        },
      },
      //{ $sample: { size: 100 } },
      {
        $sort: { timestamp: -1 }, // Sort by timestamp in descending order (latest first)
      },
      {
        $group: { _id: "$questionId", testset: { $push: "$$ROOT" } }
      },
      {
        $lookup: {
          from: 'drivingmaterials', // Replace with the name of the collection you're populating from
          localField: '_id',
          foreignField: '_id',
          as: 'questionobject', // The name of the field where the populated data will be stored
        },
      },
      {
        $project: {
          testset: {
            $slice: ['$testset', limitPerQuestion], // Take the latest 'limitPerQuestion' responses per group
          },
          questionobject: 1
        },
      },
    ]).exec()
      .then(async (data) => { response = data }).catch(Err => { throw Err });

    let colorcode = 0;
    let filterobject = [];
    for (let j = 0; j < response.length; j++) {
      //console.log('-------',response[j]);
      colorcode = response[j].testset.map((x) => x.status);
      response[j].questionobject[0].colorcode = colorcode.join(',');
      delete response[j].testset;
      delete response[j]._id;
      if (response[j].questionobject[0].colorcode === "1,1,1"|| 
          response[j].questionobject[0].colorcode === "1,1" || 
          response[j].questionobject[0].colorcode === '1') 
      {
        delete response[j];
      }else
      {
      filterobject.push(response[j].questionobject[0]);
      }
    }
   
    return res.status(200).send({
      status: 200,
      message: 'succesfully fetched review mistakes data',
      response: filterobject
    })
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

// fetch mistake Test to review.....
const removeReviewMistakeQuestions = async (req, res) => {
  try {
    if (!req.query.questionid || req.query.questionid.length < 0) {
      return res.status(400).send({ status: 400, message: "Invalid Payload: questionid missing" })
    }

    if (!req.query.userid || req.query.userid.length < 0) {
      return res.status(400).send({ status: 400, message: "Invalid Payload: userid missing" })
    }
    
    const objectId = mongoose.Types.ObjectId(req.query.questionid);
    const userid = mongoose.Types.ObjectId(req.query.userid);

    await commonmistakes.deleteMany({questionId:objectId,userId:userid}).
      then(() => {
        res.status(200)
          .send({
            status: 200,
            message: "successfully deleted question!!"
          })
      })
      .catch(Err => {
        res.status(500)
          .send({
            status: 500,
            message: Err.message || "Internal Error."
          });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = {evaluteTestResponse,mistakeTest,fetchCommonTest,
                  removemistakequestion,reviewMistakeTest,removeReviewMistakeQuestions}