const {auctioneerProfile, bidderProfile} = require('./myProfile')
const {editAuctioneerProfile, editBidderProfile} = require('./editProfile')
const {bidHistory} = require('./bidHistory')
const {uploadAuctioneerProfile} = require('./uploadPhoto')
const {removeProfilePhoto} = require('./removeProfilePhoto')

module.exports ={bidderProfile, auctioneerProfile,editAuctioneerProfile, editBidderProfile, bidHistory,uploadAuctioneerProfile,removeProfilePhoto}