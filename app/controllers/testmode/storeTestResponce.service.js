const { handleError } = require('../../middleware/utils')
const storeTestResponse = require('../../models/storeTestResponse');
const mongoose = require('mongoose');
const appInfo = require('./../../../settings.json');
const profile = require('../../models/profile');
const commonmistakes = require('../../models/commonmistakes');
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

// fetch store Test Response.....
const getTestResponse = async (req, res) => {
  try {
    await storeTestResponse.findById({ _id: req.params.id })
      .populate({
        path: 'testResponse.questionId',
        select: 'type question image options'
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
    await storeTestResponse.create({ user, examType, testCompleted, testResponse })
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "Sucesfully Added Details.",
          testId: data?._id
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

// fetch personal statistics test Response.....
const personalstatistics = async (req, res) => {
  try {
    let objectId;
    let startDate;
    let endDate;
    if (req.body.userid && req.body.userid.length != 0) {
      objectId = mongoose.Types.ObjectId(req.body.userid);
    } else {
      return res.status(400).send({
        status: 400,
        message: "userid is missing"
      })
    }

    if ((req.body.startDate && req.body.endDate) &&
      req.body.startDate.length != 0 && req.body.endDate.length != 0) {
      startDate = new Date(req.body.startDate);
      endDate = new Date(req.body.endDate);
    } else {
      return res.status(400).send({
        status: 400,
        message: "startDate or endDate is missing"
      })
    }
    
    let bestData = await storeTestResponse.aggregate([
      {
        $match: {
          user: objectId, // Match documents with the specified userId
          createdAt: {
            $gte: startDate, // Match documents with createdAt greater than or equal to startDate
            $lte: endDate,   // Match documents with createdAt less than or equal to endDate
          },
        },
      },
      {
        $group: {
          _id: null, // Group all documents together
          totaltestCompleted: { $sum: 1 }, // Count of all documents
          totaltesttime: { $sum: '$testCompleted' }, // Count of testCompleted
          bestScore: { $max: '$score' }, // Maximum score
          bestTime: { $min: '$testCompleted' }, // Minimum testCompleted score
          totalScore: { $sum: '$score' }
        },
      },
    ]).exec();

    // const scoreData = await storeTestResponse.find({ score: { $gte: appInfo.PASS_PERCENTAGE } })
    //                                          .select('-_id score');
    
    const userScreenTime = await profile.find({_id:objectId}).select('screenTime');

    let scoreData = bestData[0]?.totalScore ? bestData[0]?.totalScore : 0;
    
    let totaltestCompleted = bestData[0]?.totaltestCompleted?bestData[0]?.totaltestCompleted:0;

    let passrate = (scoreData/totaltestCompleted).toFixed(1);

    let screentime = userScreenTime[0]?.screenTime?userScreenTime[0]?.screenTime:0;

    console.log('------------',scoreData.length,totaltestCompleted,bestData,passrate,
                appInfo.PASS_PERCENTAGE,userScreenTime);

    if(bestData.length != 0){
    bestData[0].passrate = isNaN(passrate) ?0:passrate;
    bestData[0].screentime = screentime
    delete bestData[0]._id;
    }
    else{
      let data = [{
        "totaltestCompleted": 0,
        "totaltesttime": 0,
        "bestScore": 0,
        "bestTime": 0,
        "passrate": 0,
        "screentime": 0
      }];

      data[0].passrate = isNaN(passrate) ?0:passrate;
      data[0].screentime = screentime;
      bestData = data;
    }
    res.status(200).send({
      status: 200,
      message: "personal statistics details.",
      response: bestData[0]
    })
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}


// Reset personal statistics test.....
const resetPersonalstatistics = async (req, res) => {
  try {
    if (req.query.userid && req.query.userid.length != 0) {
      objectId = mongoose.Types.ObjectId(req.query.userid);
    } else {
      return res.status(400).send({
        status: 400,
        message: "userid is missing"
      })
    }
    
    await profile.findByIdAndUpdate({_id:objectId},{screenTime:0});
    await commonmistakes.deleteMany({userId:objectId});
    await storeTestResponse.deleteMany({ user: objectId})
      .then(() => {
        res.status(200)
          .send({
            status: 200,
            message: "successfully reset test details!!"
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

module.exports = { getTestResponse, addTestResponse, personalstatistics, resetPersonalstatistics};