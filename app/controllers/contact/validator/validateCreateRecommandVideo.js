const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateCreateRecommandVideo = [

    check('name')
    .exists()
    .withMessage('name MISSING')
    .not()
    .isEmpty()
    .withMessage('name IS_EMPTY'),

    check('title')
    .exists()
    .withMessage('title MISSING')
    .not()
    .isEmpty()
    .withMessage('title IS_EMPTY'),

    check('youtubeVideoURL')
    .exists()
    .withMessage('youtubeVideoURL MISSING')
    .not()
    .isEmpty()
    .withMessage('youtubeVideoURL IS_EMPTY')
    .isURL()
    .withMessage('youtubeVideoURL is not in url fomrat'),

    check('activationDate')
    .exists()
    .withMessage('activationDate MISSING')
    .not()
    .isEmpty()
    .withMessage('activationDate IS_EMPTY'),

    check('expireDate')
    .exists()
    .withMessage('expireDate MISSING')
    .not()
    .isEmpty()
    .withMessage('expireDate IS_EMPTY'),

   check('display')
    .exists()
    .withMessage('display MISSING')
    .not()
    .isEmpty()
    .withMessage('display IS_EMPTY'),
    
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateRecommandVideo }
