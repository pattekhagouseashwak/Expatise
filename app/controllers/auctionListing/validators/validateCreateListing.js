const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateCreateListing = [

    check('AuctionType')
    .exists()
    .withMessage('AuctionType MISSING')
    .not()
    .isEmpty()
    .withMessage('AuctionType IS_EMPTY'),

    check('AuctionTitle')
    .exists()
    .withMessage('AuctionTitle MISSING')
    .not()
    .isEmpty()
    .withMessage('AuctionTitle IS_EMPTY'),

    check('AuctionDate')
    .exists()
    .withMessage('AuctionDate MISSING')
    .not()
    .isEmpty()
    .withMessage('AuctionDate IS_EMPTY'),

    check('AuctionTime')
    .exists()
    .withMessage('AuctionTime MISSING')
    .not()
    .isEmpty()
    .withMessage('AuctionTime IS_EMPTY'),

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

    check('Address1')
    .exists()
    .withMessage('Address1 MISSING')
    .not()
    .isEmpty()
    .withMessage('Address1 IS_EMPTY'),

    check('Address2')
    .exists()
    .withMessage('Address2 MISSING')
    .not()
    .isEmpty()
    .withMessage('Address2 IS_EMPTY'),

    check('AuctionCategory')
    .exists()
    .withMessage('AuctionCategory MISSING')
    .not()
    .isEmpty()
    .withMessage('AuctionCategory IS_EMPTY'),

    check('CategoryDetails')
    .exists()
    .withMessage('CategoryDetails MISSING')
    .not()
    .isEmpty()
    .withMessage('CategoryDetails IS_EMPTY'),

    check('NameOfProduct')
    .exists()
    .withMessage('NameOfProduct MISSING')
    .not()
    .isEmpty()
    .withMessage('NameOfProduct IS_EMPTY'),

    check('ProductDescription')
    .exists()
    .withMessage('ProductDescription missing')
    .not()
    .isEmpty()
    .withMessage('ProductDescription IS_EMPTY'),

    check('BiddingNotice')
    .exists()
    .withMessage('BiddingNotice missing')
    .not()
    .isEmpty()
    .withMessage('BiddingNotice IS_EMPTY'),

    check('AuctionNotice')
    .exists()
    .withMessage('AuctionNotice missing')
    .not()
    .isEmpty()
    .withMessage('AuctionNotice IS_EMPTY'),

    check("TermsAndCondition")
    .exists()
    .withMessage('AuctionNotice missing')
    .not()
    .isEmpty()
    .withMessage('AuctionNotice IS_EMPTY'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateListing }
