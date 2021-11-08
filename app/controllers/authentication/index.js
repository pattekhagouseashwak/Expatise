const { mobileOTP } = require('./mobileOTP')
const {verifyOtp} =require('./verifyOtp')
const {registerBidder} =require('./register')
const {registerAuctioneer} =require('./register')
const {verifyEmailAuctioneer, verifyEmailBidder} = require('./verifyEmail')

module.exports = {mobileOTP,verifyOtp,registerBidder,registerAuctioneer,verifyEmailAuctioneer, verifyEmailBidder}
