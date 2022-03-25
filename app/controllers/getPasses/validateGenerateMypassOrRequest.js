const { validateResult } = require('../../middleware/utils');
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateGenerateMypassOrRequest = [

    check('auctionId')
    .exists()
    .withMessage('auctionId MISSING')
    .not()
    .isEmpty()
    .withMessage('auctionId IS_EMPTY'),

    check('category')
    .exists()
    .withMessage('category MISSING')
    .not()
    .isEmpty()
    .withMessage('category IS_EMPTY'),

    check('auctioneerCompanyName')
    .exists()
    .withMessage('auctioneerCompanyName MISSING')
    .not()
    .isEmpty()
    .withMessage('auctioneerCompanyName IS_EMPTY'),

    check('productName')
    .exists()
    .withMessage('productName MISSING')
    .not()
    .isEmpty()
    .withMessage('productName IS_EMPTY'),

    check('address')
    .exists()
    .withMessage('address MISSING')
    .not()
    .isEmpty()
    .withMessage('address IS_EMPTY'),

   check('date')
    .exists()
    .withMessage('date MISSING')
    .not()
    .isEmpty()
    .withMessage('date IS_EMPTY'),

    check('time')
    .exists()
    .withMessage('time MISSING')
    .not()
    .isEmpty()
    .withMessage('time IS_EMPTY'),

    check('BidderName')
    .exists()
    .withMessage('BidderName MISSING')
    .not()
    .isEmpty()
    .withMessage('BidderName IS_EMPTY'),

    check('BidderEmail')
    .exists()
    .withMessage('BidderEmail MISSING')
    .not()
    .isEmpty()
    .withMessage('BidderEmail IS_EMPTY'),

   check('BidderContact')
    .exists()
    .withMessage('BidderContact MISSING')
    .not()
    .isEmpty()
    .withMessage('BidderContact IS_EMPTY'),
    
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateGenerateMypassOrRequest }
