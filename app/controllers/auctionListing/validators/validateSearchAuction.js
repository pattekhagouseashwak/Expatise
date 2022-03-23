const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateSearchAuction = [

    check('AuctionType')
    .exists()
    .withMessage('AuctionType MISSING'),

    check('State')
    .exists()
    .withMessage('State MISSING'),

    check('City')
    .exists()
    .withMessage('City MISSING'),

    check('Zip')
    .exists()
    .withMessage('Zip MISSING'),

    check('Miles')
    .exists()
    .withMessage('Miles MISSING'),

    check('Category')
    .exists()
    .withMessage('Category MISSING'),

    check('Keywords')
    .exists()
    .withMessage('Keywords MISSING'),
    
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateSearchAuction }