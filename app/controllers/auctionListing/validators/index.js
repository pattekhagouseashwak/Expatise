const { validateCreateListing } = require('./validateCreateListing')
const {validateSearchAuction} = require('./validateSearchAuction')
const {validateAuctionTypeAndState} = require('./validateAuctionTypeAndState')
const {validateFeaturedAuction} = require('./validateFeaturedAuction')

module.exports = {validateCreateListing,validateSearchAuction,
                  validateAuctionTypeAndState,validateFeaturedAuction}
