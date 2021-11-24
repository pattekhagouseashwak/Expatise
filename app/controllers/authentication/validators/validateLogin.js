const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateLogin = [

    check('Email')
    .isEmail()
    .withMessage('Email is invalid')
    .exists()
    .withMessage('Email MISSING')
    .not()
    .isEmpty()
    .withMessage('Email IS_EMPTY'),

    
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

module.exports = {validateLogin}
