const { handleError } = require('../../middleware/utils')
const profile = require('./../../models/profile')
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const getProfile = async (req, res) => {
  try {
    //const id = req.user._id;
    let id = req.query.id;
    await profile.find({profile:id})
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

module.exports = { getProfile, editProfile, createProfile }