const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateRegister = [

    // check('id')
    // .exists()
    // .withMessage('id MISSING')
    // .not()
    // .isEmpty()
    // .withMessage('id IS_EMPTY'),

    check('companyName')
    .exists()
    .withMessage('Name MISSING')
    .not()
    .isEmpty()
    .withMessage('Name IS_EMPTY'),

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

    check('city')
    .exists()
    .withMessage('city MISSING')
    .not()
    .isEmpty()
    .withMessage('city IS_EMPTY'),

    check('Phone')
    .exists()
    .withMessage('Phone no missing')
    .not()
    .isEmpty()
    .withMessage('Phone no is empty')
    .isLength({
      min: 12, max: 14
    })
    .withMessage('Phone Number length should be 12 including country code +1'),

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

    check('photo')
    .exists()
    .withMessage('photo MISSING')
    .not()
    .isEmpty()
    .withMessage('photo IS_EMPTY')
    .isURL()
    .withMessage('photo is not in url fomrat'),

    check('auctioneerLicensceNo')
    .exists()
    .withMessage('auctioneerLicensceNo MISSING')
    .not()
    .isEmpty()
    .withMessage('auctioneerLicensceNo IS_EMPTY'),

    check('auctioneerLicenscePhoto')
    .exists()
    .withMessage('auctioneerLicenscePhoto MISSING')
    .not()
    .isEmpty()
    .withMessage('auctioneerLicenscePhoto IS_EMPTY')
    .isURL()
    .withMessage('auctioneerLicenscePhoto link is not in url fomrat'),

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

    check('website')
    .optional()
    .isURL()
    .withMessage('website link is not in url fomrat'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateRegister }
