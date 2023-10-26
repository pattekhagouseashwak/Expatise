const { handleError } = require('../../middleware/utils')
const profile = require('./../../models/profile')
const appInfo = require('./../../../settings.json')
const mongoose = require('mongoose');

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

    await profile.findOneAndUpdate({ _id: id },
      {
        profilePhoto,
        name,
        email,
        phoneNumber,
        city,
        country,
        dateOfBrith,
        gender
      }, { new: true })
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

    await profile.create({
      profilePhoto,
      name,
      email,
      phoneNumber,
      city,
      country,
      dateOfBrith,
      gender
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

module.exports = { getProfile, editProfile, createProfile, getProfileList,getProfileCountByDate}