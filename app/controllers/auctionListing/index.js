const { createListing } = require('./createListing')
const {fetchListing} = require('./fetchListing')
const {featureAuction} = require('./featureAuction')
const {downladBidRequest} = require('./downladBidRequest')
const {uploadAuctionImage} = require('./uploadAuctionImage')
const {editAuctionListing} = require('./editAuctionListing')
const {searchAuction} = require('./searchAuction')
const {fetchAuctionByTypeAndState} = require('./fetchAuctionByTypeAndState')
const {displayListingOverMap} = require('./displayListingOverMap')
const {fetchSingleAuction} = require('./fetchSingleAuction')

module.exports = {createListing,fetchListing,featureAuction,downladBidRequest,uploadAuctionImage,
                  editAuctionListing,searchAuction,fetchAuctionByTypeAndState,displayListingOverMap,fetchSingleAuction}