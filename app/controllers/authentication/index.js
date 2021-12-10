const { mobileOTP } = require('./mobileOTP')
const {verifyOtp} =require('./verifyOtp')
const {registerBidder} =require('./register')
const {registerAuctioneer} =require('./register')
const {verifyEmailAuctioneer, verifyEmailBidder} = require('./verifyEmail')
const {loginBidder, loginAuctioneer} = require('./login')
const {logout} = require('./logout')

module.exports = {mobileOTP,verifyOtp,registerBidder,registerAuctioneer,verifyEmailAuctioneer, verifyEmailBidder,loginBidder,loginAuctioneer,logout}
