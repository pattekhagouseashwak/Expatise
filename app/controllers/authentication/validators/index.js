const { validateMobileNumber } = require('./validateMobileNumber')
const {validateVerifyOTP} = require('./validateVerifyOTP')
const {validateRegister} = require('./validateRegister')
const {validateBidderRegister} = require('./validateBidderRegister')
const {validateLogin} = require('./validateLogin')
module.exports = {validateMobileNumber,validateVerifyOTP,validateRegister,validateBidderRegister,validateLogin}
