const {registerBidder} =require('./register')
const {registerAuctioneer} =require('./register')
const {loginBidder, loginAuctioneer} = require('./login')
const {logout} = require('./logout')

module.exports = {registerBidder,registerAuctioneer,
                    loginBidder,loginAuctioneer,logout,
                    }
