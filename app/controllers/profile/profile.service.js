const { handleError } = require('../../middleware/utils')
const profile = require('./../../models/profile')
const appInfo = require('./../../../settings.json')
const mongoose = require('mongoose');
const drivingmaterial = require('./../../models/drivingMaterial')
const surveys = require('./../../models/survey')
const transaction = require('./../../models/transaction')
const storeTestResponse = require('../../models/storeTestResponse');

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const getProfile = async (req, res) => {
  try {
    //const id = req.user._id;
    if (!req.body.idoremail || req.body.idoremail.length < 0) {
      res.status(400).send({ status: 400, message: "idoremail is missing" });
    }
    let idOrEmail = req.body.idoremail;
    let Profile;
    if (mongoose.Types.ObjectId.isValid(idOrEmail)) {
      Profile = profile.findById(idOrEmail);
    }
    else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(idOrEmail)) {
      Profile = profile.find({ email: idOrEmail });
    }
    else {
      return res.status(400)
          .send({
            status: 400,
            message: "Invalid input: Not a valid ObjectId or email address.",
            })
    }

    await Profile
      .then((data) => {
        res.status(200)
          .send({
            status: 200,
            message: "successfully fetched profile details!!",
            response: data
          })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

const editProfile = async (req, res) => {
  try {

    //const id = req.user._id;
    const id = req.body.id
    const profilePhoto = req.body.profilePhoto;
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const city = req.body.city;
    const country = req.body.country;
    const dateOfBrith = req.body.dateOfBrith;
    const gender = req.body.gender;
    const weChat =  req.body.weChat;

    await profile.findByIdAndUpdate({ _id: id },
      {
        profilePhoto:profilePhoto,
        name:name,
        email:email,
        phoneNumber:phoneNumber,
        city:city,
        country:country,
        dateOfBrith:dateOfBrith,
        gender:gender,
        weChat:weChat
      },{new:true})
      .select("-createdAt -updatedAt")
      .then((data) => {
        res.status(200).send({ status: 200, message: "successfully updated profile!!", response: data })
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

const createProfile = async (req, res) => {
  try {
    const profilePhoto = req.body.profilePhoto;
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const city = req.body.city;
    const country = req.body.country;
    const dateOfBrith = req.body.dateOfBrith;
    const gender = req.body.gender;
    const weChat = req.body.weChat;

    await profile.create({
      profilePhoto,
      name,
      email,
      phoneNumber,
      city,
      country,
      dateOfBrith,
      gender,
      weChat
    }).then((data) => {
      res.status(200).send({ status: 200, message: "successfully created profile Details has updated!!", data })
    }
    ).catch(Err => {
      res.status(500).send({
        status: 500,
        message:
          Err.message || "Internal Error."
      });
    });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

const getProfileList = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || appInfo.DEFAULTPAGE;
    const itemsPerPage = appInfo.PROFILE_LISTING_ITEMSPERPAGE;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalItems = await profile.find().countDocuments();
    const totalpages = Math.ceil(totalItems / itemsPerPage);

    await profile.find({}).skip(startIndex).limit(itemsPerPage)
      .then((data) => {
        res.status(200)
          .send({
            status: 200,
            message: "successfully fetched profile details!!",
            response: data,
            page:page,
            totalpages:totalpages
          })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

const getProfileGraph = async (req, res) => {
  try {
    if (req.body.startDate.length == 0) {
      return res.status(400).send({
        status: 400,
        message: "startDate is missing"
      })
    }

    if (req.body.endDate.length == 0) {
      return res.status(400).send({
        status: 400,
        message: "endDate is missing."
      })
    }

    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    
    await profile.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate), // Start date
            $lt: new Date(endDate) // End date
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          monthYear: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              { $cond: { if: { $lt: ['$_id.month', 10] }, then: '0', else: '' } },
              { $toString: '$_id.month' }
            ]
          },
          count: 1
        }
      }
    ])
      .then((data) => {
        res.status(200)
          .send({
            status: 200,
            message: "successfully fetched profile details!!",
            response: data
          })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

const getProfileCountByDate = async (req, res) => {
  try {
    if (req.body.startDate.length == 0) {
      return res.status(400).send({
        status: 400,
        message: "startDate is missing"
      })
    }

    if (req.body.endDate.length == 0) {
      return res.status(400).send({
        status: 400,
        message: "endDate is missing."
      })
    }

    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    
    await profile.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate), // Start date
            $lt: new Date(endDate) // End date
          }
        }
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 1,
          count: 1,
          guest: {
            $cond: [{ $eq: ["$_id", "guest"] }, "$count", 0]
          },
          nonpremium: {
            $cond: [{ $eq: ["$_id", "non-premium"] }, "$count", 0]
          },
          premium: {
            $cond: [{ $eq: ["$_id", "premium"] }, "$count", 0]
          }
        }
      },
      {
        $group: {
          _id: null,
          guest: { $sum: "$guest" },
          nonpremium: { $sum: "$nonpremium" },
          premium: { $sum: "$premium" }
        }
      } 
    ])
      .then((data) => {
        res.status(200)
          .send({
            status: 200,
            message: "successfully fetched profile details!!",
            response: data
          })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message:
            Err.message || "Internal Error."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

const deleteProfileById = async (req, res) => {
  try {
    const id = req.query.id
    await profile.findByIdAndDelete({ _id: id })
      .then((data) => {
        res.status(200)
          .send({
            status: 200,
            message: "successfully deleted profile!!"
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

const adminDashboardApi = async (req, res) => {
  try {
    const usersCount = await profile.find().count();

    const surveyCount = await drivingmaterial.find().count();

    const questionsCount = await surveys.find().count();

    const transactionData = await transaction.find({});

    let transactionCount = 0;
    await transactionData.forEach(document => {
      const amount = parseFloat(document.amount.replace('$', ''));
      transactionCount += amount;
    });

    res.status(200)
      .send({
        status: 200,
        message: "successfully fetched  dashboard api!!",
        response: {
          usersCount: usersCount,
          surveyCount: surveyCount,
          questionsCount: questionsCount,
          transactionCount: transactionCount
        }
      })
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

const lastseenUpdate = async (req, res) => {
  try {

    //const id = req.user._id;

    if (!req.body.id || req.body.id.length <= 0) {
      return res.status(400).send({ status: 400, message: "id missing" });
    }

    const id = req.body.id

    const userInfo = await profile.find({_id:id}).select('screenTime');

    let screentime = (userInfo?.screenTime? userInfo?.screenTime : 0)+req.body.screenTime;

    let lastseen = new Date();
    
    await profile.findOneAndUpdate({ _id: id },
      {
        $inc: { screenTime: 1 }, // Increment screentime by 1 in future if 
        $set: { lastSeen:lastseen}, // Set lastseen given value
      },
      { new: true }).select('lastSeen screenTime')
      .then((data) => {
        res.status(200).send({ status: 200, message: "successfully updated lastseen!!", response: data })
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

const userDashboard = async (req, res) => {
  try {

    if (!req.query.id || req.query.id.length <= 0) {
      return res.status(400).send({ status: 400, message: "id missing" });
    }

    let id = req.query.id;

    let oneMinuteAgo = new Date();
    oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 5);

    const lastSeenInfo    = await profile.findById({ _id: id }).select('lastSeen');

    const usersOnlineInfo = await profile.countDocuments({ lastSeen: { $gt: oneMinuteAgo } });

    const lastTestInfo = await storeTestResponse.findOne({user: id,
                                                      examType: 'realtest',
                                                      testResponse: { $exists: true, $size: 100 },  // replace at production to 100 questions count
                                                    })
                                                .sort({ createdAt: -1 }).select("score");

    let usersOnline = usersOnlineInfo;
    console.log("-------",lastSeenInfo,lastTestInfo,usersOnline,oneMinuteAgo);
    let lastseen = lastSeenInfo?.lastSeen? lastSeenInfo?.lastSeen : '0000-00-00T00:00:00.000Z';
    let lasttestinfo = lastTestInfo?.score? lastTestInfo?.score: 0;
    
    res.status(200)
      .send({
        status: 200,
        message: "successfully fetched  dashboard api!!",
        response: {
          usersOnline: usersOnline,
          lastSeen: lastseen,
          lastTest: lasttestinfo+"%"
        }
      })
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { getProfile, editProfile, createProfile, getProfileList,lastseenUpdate,userDashboard,getProfileGraph,getProfileCountByDate, deleteProfileById, adminDashboardApi}