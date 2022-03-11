const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateData_gotQuestion = [

    check('comment')
    .not()
    .isEmpty()
    .withMessage('comment IS_EMPTY'),

    check('email')
    .not()
    .isEmpty()
    .withMessage('email IS_EMPTY'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateData_gotQuestion }
