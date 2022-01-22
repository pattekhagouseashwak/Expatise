const { mobileOTP } = require('./mobileOTP')
const {verifyOtp} =require('./verifyOtp')
const {registerBidder} =require('./register')
const {registerAuctioneer} =require('./register')
const {verifyEmailAuctioneer, verifyEmailBidder} = require('./verifyEmail')
const {loginBidder, loginAuctioneer} = require('./login')
const {logout} = require('./logout')
const {forgotPasswordBidder} =require('./forgetPassword')
const {forgotPasswordAuctioneer} =require('./forgetPassword')
const {verifyForgetPasswordBidder} =require('./verifyForgetPassword')
const {verifyForgetPasswordAuctioneer} =require('./verifyForgetPassword')
const {setNewPassword} = require("./setNewPassword")

module.exports = {mobileOTP,verifyOtp,registerBidder,registerAuctioneer,
                    verifyEmailAuctioneer, verifyEmailBidder,loginBidder,
                    loginAuctioneer,logout,
                    forgotPasswordAuctioneer,forgotPasswordBidder,
                    verifyForgetPasswordAuctioneer,verifyForgetPasswordBidder,
                    setNewPassword}
