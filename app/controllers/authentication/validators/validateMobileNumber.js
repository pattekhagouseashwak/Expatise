const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateMobileNumber = [
  check('Phone')
    .exists()
    .withMessage('Phone no missing')
    .not()
    .isEmpty()
    .withMessage('Phone no is empty')
    .isLength({
      min: 12, max: 14
    })
    .withMessage('Phone Number length should be 12 including country code +1'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateMobileNumber }
