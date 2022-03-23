const { validateResult } = require('../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateGroupByState = [

    check('ZipCode')
    .exists()
    .withMessage('ZipCode MISSING'),

    check('State')
    .exists()
    .withMessage('State MISSING'),
    
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateGroupByState }