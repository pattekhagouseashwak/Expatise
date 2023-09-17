const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const adminlogins = require('../../models/adminlogins')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const logout = async (req, res) => {
  try {
    let userid = req.user[0]?._id;
    await adminlogins.findByIdAndUpdate({ _id: userid }, { token: null })
      .then(() => {
        res.status(200).send({
          status: 200,
          message: "successfully logged out",
        })
      }).catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Internal Error."
        });
      });
  } catch (error) {
    handleError(res, error)
  }
}
module.exports = { logout }