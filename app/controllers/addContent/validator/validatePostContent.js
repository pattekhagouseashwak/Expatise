const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validatePostContent = [

    check('reqType')
    .exists()
    .withMessage('reqType MISSING')
    .not()
    .isEmpty()
    .withMessage('reqType IS_EMPTY'),

    check('Title')
    .exists()
    .withMessage('Title MISSING')
    .not()
    .isEmpty()
    .withMessage('Title IS_EMPTY'),

    check('Title')
    .exists()
    .withMessage('Title MISSING')
    .not()
    .isEmpty()
    .withMessage('Title IS_EMPTY'),

    check('videoUrl')
    .optional()
    .isURL()
    .withMessage('videoUrl link is not in url fomrat'),

    check('AddDescribtion')
    .optional()
    .not()
    .isEmpty()
    .withMessage('AddDescribtion IS_EMPTY'),

    check('BlogContent')
    .optional()
    .not()
    .isEmpty()
    .withMessage('BlogContent IS_EMPTY'),

    check('UploadPhoto')
    .optional()
    .not()
    .isEmpty()
    .withMessage('UploadPhoto IS_EMPTY'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validatePostContent }
