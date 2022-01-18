const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateData = [

       check('First_Name')
       .not()
       .isEmpty()
       .withMessage('First_Name IS_EMPTY'),

       check('Last_Name')
        .not()
        .isEmpty()
        .withMessage('Last_Name IS_EMPTY'),

    check('Phone_Number')
    .not()
    .isEmpty()
    .withMessage('Phone_Number IS_EMPTY'),

    check('Email')
    .not()
    .isEmpty()
    .withMessage('Email IS_EMPTY'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateData }
