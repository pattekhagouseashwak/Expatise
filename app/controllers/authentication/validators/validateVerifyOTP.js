const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateVerifyOTP = [
  check('Phone')
    .exists()
    .withMessage('Phone MISSING')
    .not()
    .isEmpty()
    .withMessage('Phone IS_EMPTY'),

    check('otp')
    .exists()
    .withMessage('otp MISSING')
    .not()
    .isEmpty()
    .withMessage('otp IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateVerifyOTP }
