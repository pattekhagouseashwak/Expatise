const { fetchAuctionTickets } = require('./fetchAuctionTickets')
const {fetchBidderTickets} = require ('./fetchBidderTickets')
const {statusUpdate} = require('./statusUpdate')
const {fetchComments} = require('./fetchComments')
const {replyComment} = require('./replyComment')

const {createAuctioneerAndBidderFAQ} = require('./createAuctioneerAndBidderFAQ')
const {fetchAuctioneerAndBidderFAQ} = require('./fetchAuctioneerAndBidderFAQ')
const {editAuctioneerAndBidderFAQ} = require('./editAuctioneerAndBidderFAQ')
const {deleteAuctioneerAndBidderFAQ} = require('./deleteAuctioneerAndBidderFAQ')

const {createListingPolicy} = require('./createListingPolicy')
const {fetchListingPolicy} = require('./fetchListingPolicy')
const {editListingPolicy} = require('./editListingPolicy')
const {deleteListingPolicy} = require('./deleteListingPolicy')

const {inquery} = require('./inquery')

module.exports = {
                  fetchAuctionTickets,fetchBidderTickets,statusUpdate,
                  fetchAuctioneerAndBidderFAQ,fetchComments,replyComment,
                  editAuctioneerAndBidderFAQ,createAuctioneerAndBidderFAQ,
                  editListingPolicy,createListingPolicy,fetchListingPolicy,
                  inquery,deleteAuctioneerAndBidderFAQ,
                  deleteListingPolicy
                 }