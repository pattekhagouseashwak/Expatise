const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateBidderRegister = [

    check('id')
    .exists()
    .withMessage('id MISSING')
    .not()
    .isEmpty()
    .withMessage('id IS_EMPTY'),

    check('firstName')
    .exists()
    .withMessage('firstName MISSING')
    .not()
    .isEmpty()
    .withMessage('firstName IS_EMPTY'),

    check('lastName')
    .exists()
    .withMessage('lastName MISSING')
    .not()
    .isEmpty()
    .withMessage('lastName IS_EMPTY'),

    check('streetAddress')
    .exists()
    .withMessage('streetAddress MISSING')
    .not()
    .isEmpty()
    .withMessage('streetAddress IS_EMPTY'),

    check('city')
    .exists()
    .withMessage('city MISSING')
    .not()
    .isEmpty()
    .withMessage('city IS_EMPTY'),

    check('state')
    .exists()
    .withMessage('state MISSING')
    .not()
    .isEmpty()
    .withMessage('state IS_EMPTY'),

    check('country')
    .exists()
    .withMessage('country MISSING')
    .not()
    .isEmpty()
    .withMessage('country IS_EMPTY'),

    check('zip')
    .exists()
    .withMessage('zip MISSING')
    .not()
    .isEmpty()
    .withMessage('zip IS_EMPTY')
    .isLength({
      max: 5
    })
    .withMessage('zipCode maximum length is 5'),

    check('Email')
    .isEmail()
    .withMessage('Email is invalid')
    .exists()
    .withMessage('Email MISSING')
    .not()
    .isEmpty()
    .withMessage('Email IS_EMPTY'),

    check('DrivingLicenseNo')
    .exists()
    .withMessage('DrivingLicenseNo MISSING')
    .not()
    .isEmpty()
    .withMessage('DrivingLicenseNo IS_EMPTY'),

    check('DrivingLicensePhoto')
    .exists()
    .withMessage('DrivingLicensePhoto MISSING')
    .not()
    .isEmpty()
    .withMessage('DrivingLicensePhoto IS_EMPTY')
    .isURL()
    .withMessage('DrivingLicensePhoto link is not in url fomrat'),

    check('password')
    .exists()
    .withMessage('password missing')
    .not()
    .isEmpty()
    .withMessage('password IS_EMPTY')
    .isLength({
      min: 8
    })
    .withMessage('password should be minimum 8 characters'),

    check('password').custom(password => {
      if(password && password.match(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s)(?=.*\W).*$/)) {
        return true;
      }
    }).withMessage("Password should be of  minimum 8 characters and must have atleast 1 number, 1 uppercase, lowercase letter and 1 special character."),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateBidderRegister }