const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateuploadPhoto = [

    check('Photo')
    .exists()
    .withMessage('Photo MISSING')
    .not()
    .isEmpty()
    .withMessage('Photo IS_EMPTY')
    .isURL()
    .withMessage('Photo is not in url fomrat'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateuploadPhoto }