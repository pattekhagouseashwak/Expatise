const {auctioneerProfile, bidderProfile} = require('./myProfile')
const {editAuctioneerProfile, editBidderProfile} = require('./editProfile')
const {uploadAuctioneerProfile} = require('./uploadPhoto')
const {uploadBidderProfile} = require('./uploadPhoto')
const {removeProfilePhoto} = require('./removeProfilePhoto')

module.exports ={bidderProfile, auctioneerProfile,editAuctioneerProfile,
                editBidderProfile,uploadAuctioneerProfile,removeProfilePhoto,
                uploadBidderProfile}