const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validatePostContent = [

    check('name')
    .isEmpty()
    .withMessage('name IS_EMPTY'),

    check('phoneNumber')
    .not()
    .isEmpty()
    .withMessage('phoneNumber IS_EMPTY'),

    check('email')
    .not()
    .isEmpty()
    .withMessage('email IS_EMPTY'),

    check('message')
    .not()
    .isEmpty()
    .withMessage('message IS_EMPTY'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validatePostContent }
