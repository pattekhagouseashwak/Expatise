const { validateResult } = require('../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateGroupByState = [

    check('State')
    .exists()
    .withMessage('State MISSING')
    .not()
    .isEmpty()
    .withMessage('State Is EMPTY'),
    
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateGroupByState }