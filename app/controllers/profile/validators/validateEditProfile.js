const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateEditProfile = [

    check('companyName')
    .optional()
    .not()
    .isEmpty()
    .withMessage('companyName IS_EMPTY'),

    check('firstName')
    .optional()
    .not()
    .isEmpty()
    .withMessage('firstName IS_EMPTY'),

    check('lastName')
    .optional()
    .not()
    .isEmpty()
    .withMessage('lastName IS_EMPTY'),

    check('Email')
    .optional()
    .isEmail()
    .withMessage('Email is invalid')
    .not()
    .isEmpty()
    .withMessage('Email IS_EMPTY'),

    check('Phone')
    .optional()
    .not()
    .isEmpty()
    .withMessage('Phone no is empty')
    .isLength({
      min: 12, max: 14
    })
    .withMessage('Phone Number length should be 12 including country code +1'),

    check('AlternateContact')
    .optional()
    .not()
    .isEmpty()
    .withMessage('AlternateContact no is empty')
    .isLength({
      min: 12, max: 14
    })
    .withMessage('AlternateContact Number length should be 12 including country code +1'),

    check('photo')
    .optional()
    .not()
    .isEmpty()
    .withMessage('photo IS_EMPTY')
    .isURL()
    .withMessage('photo is not in url fomrat'),

    check('AuctioneerBio')
    .optional()
    .not()
    .isEmpty()
    .withMessage('AuctioneerBio IS_EMPTY'),

    check('website')
    .optional()
    .isURL()
    .withMessage('website link is not in url fomrat'),

    check('facebook')
    .optional()
    .isURL()
    .withMessage('facebook link is not in url fomrat'),

    check('youtube')
    .optional()
    .isURL()
    .withMessage('youtube link is not in url fomrat'),

    check('instagram')
    .optional()
    .isURL()
    .withMessage('instagram link is not in url fomrat'),

    check('linkedin')
    .optional()
    .isURL()
    .withMessage('linkedin link is not in url fomrat'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateEditProfile }