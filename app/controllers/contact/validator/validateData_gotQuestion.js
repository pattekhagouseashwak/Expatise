const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateData_gotQuestion = [

    check('Your_Question')
    .not()
    .isEmpty()
    .withMessage('Your_Question IS_EMPTY'),

    check('Email')
    .not()
    .isEmpty()
    .withMessage('Email IS_EMPTY'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateData_gotQuestion }
