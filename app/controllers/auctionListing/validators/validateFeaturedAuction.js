const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateFeaturedAuction = [

    check('AuctionType')
    .exists()
    .withMessage('AuctionType MISSING')
    .not()
    .isEmpty()
    .withMessage('AuctionType IS_EMPTY'),
        
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateFeaturedAuction }