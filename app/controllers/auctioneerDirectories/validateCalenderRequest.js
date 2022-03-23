const { validateResult } = require('../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateCalenderRequest = [

    check('year_month')
    .exists()
    .withMessage('year_month Key MISSING')
    .not()
    .isEmpty()
    .withMessage('year_month Is EMPTY'),
    
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCalenderRequest }