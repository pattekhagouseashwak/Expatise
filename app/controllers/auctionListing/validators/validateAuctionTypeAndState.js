const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateAuctionTypeAndState = [

    check('AuctionType')
    .exists()
    .withMessage('AuctionType MISSING'),

    check('State')
    .exists()
    .withMessage('State MISSING'),
    
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateAuctionTypeAndState }