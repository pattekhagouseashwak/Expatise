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

    check('phoneNumber')
    .not()
    .isEmpty()
    .withMessage('phoneNumber IS_EMPTY'),

    check('email')
    .not()
    .isEmpty()
    .withMessage('email IS_EMPTY'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateData }
