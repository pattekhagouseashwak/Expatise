const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const logout = async (req, res) => {

  try {
    const data = matchedData(req)
    res
      // .clearCookie("access_token")
      .status(200)
      .send({ status: 200, message: "Successfully logged out" });
  } catch (error) {
    handleError(res, error)
  }
}
module.exports = { logout }