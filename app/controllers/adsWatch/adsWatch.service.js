const { handleError } = require('../../middleware/utils');
const adsWatch = require('../../models/adsWatch');
const appInfo = require('./../../../settings.json');

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const getStartDateAndEndDate = async () => {
  // Get the current date
  const date = new Date();
  let currentDay = String(date.getDate()).padStart(2, '0');
  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  let currentYear = date.getFullYear();
  let currentDate = `${currentYear}-${currentMonth}-${currentDay}T`;

  let intialHours = currentDate + '00:00:00:000Z';
  let endHours = currentDate + '23:59:59.999Z';
  return { intialHours, endHours };
}

// add adsWatch details.....
const addAdsWatch = async (req, res) => {
  try {
    const userid = req.body.userid;
    const realTest = req.body.realTest;
    const statistics = req.body.statistics;
    const mockTest = req.body.mockTest;
    const allTestQuestions = req.body.allTestQuestions;

    let getDateResponse = await getStartDateAndEndDate();
    const startDateTime = getDateResponse.intialHours;
    const endDateTime = getDateResponse.endHours;

    await adsWatch.create({
      userid,
      realTest,
      statistics,
      mockTest,
      allTestQuestions,
      startDateTime,
      endDateTime
    })
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "Succesfully Stored adsWatch Details.",
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

// To update adsWatch.....
const updateAdsWatch = async (req, res) => {
  try {
    const id = req.body._id;
    const realTest = req.body.realTest;
    const statistics = req.body.statistics;
    const mockTest = req.body.mockTest;
    const allTestQuestions = req.body.allTestQuestions;

    await adsWatch.findByIdAndUpdate({ _id: id },
      {
        realTest, statistics, mockTest,
        allTestQuestions
      }, { new: true })
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "succesfully Update adsWatch.",
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

// To fetch adsWatch.....
const getAdsWatch = async (req, res) => {
  try {
    let searchValue = [];

    if (req.body.userid && req.body.userid.length != 0) {
      searchValue.push({ userid: req.body.userid });
    }
    if ((req.body.startDate && req.body.endDate) && 
        req.body.startDate.length != 0 && req.body.endDate.length != 0) {
      searchValue.push({
        startDateTime: {
          $gte: req.body.startDate, // Greater than or equal to the start date
          $lte: req.body.endDate,   // Less than or equal to the end date
        }
      });
      searchValue.push({
        endDateTime: {
          $gte: req.body.startDate, // Greater than or equal to the start date
          $lte: req.body.endDate,   // Less than or equal to the end date
        }
      });
    }else{
      return res.status(400).send({
        status: 400,
        message: "startDate or endDate is missing"
      })
    }
    //-------------------------------------------------------------
    const page = parseInt(req.query.page) || appInfo.DefaultPage;
    const itemsPerPage = appInfo.AdsWatch_itemsPerPage;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalItems = await adsWatch.find({ $and: searchValue }).countDocuments();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    //-------------------------------------------------------------

    await adsWatch.find({ $and: searchValue })
      .select('-createdAt -updatedAt')
      .then((data) => {
        res.status(200).send({
          status: 200,
          message: "Please Find List Of adsWatch",
          response: data,
          page,
          totalPages
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

// To fetch by id adsWatch.....
const getAdsWatchById = async (req, res) => {
  try {
    const userid = req.params.userid;
    let getDateResponse = await getStartDateAndEndDate();
    const startdatetime = getDateResponse.intialHours;
    const enddatetime = getDateResponse.endHours;
    await adsWatch.find({ userid: userid, startDateTime: startdatetime, endDateTime: enddatetime })
      .then((data) => {
        let adWatchDetails;
        if (data.length > 0) {
          adWatchDetails = data[0];
        } else {
          adWatchDetails = {
            "userid": userid,
            "realTest": 0,
            "statistics": 0,
            "mockTest": 0,
            "allTestQuestions": 0
          }
        }
        res.status(200).send({
          status: 200,
          message: "Please Find AdsWatch Details.",
          response: adWatchDetails
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

// To remove adsWatch.....
const removeAdsWatch = async (req, res) => {
  try {
    const id = req.params.id;
    await adsWatch.findByIdAndDelete({ _id: id })
      .then(() => {
        res.status(200).send({
          status: 200,
          message: "Removed adsWatch."
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

module.exports = { addAdsWatch, updateAdsWatch, removeAdsWatch, getAdsWatch, getAdsWatchById }