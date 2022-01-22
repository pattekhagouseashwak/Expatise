const { validateMobileNumber } = require('./validateMobileNumber')
const {validateVerifyOTP} = require('./validateVerifyOTP')
const {validateRegister} = require('./validateRegister')
const {validateBidderRegister} = require('./validateBidderRegister')
const {validateLogin} = require('./validateLogin')
const {validateSetPassword} = require('./validateSetPassword')
module.exports = {validateMobileNumber,validateVerifyOTP,validateRegister,validateBidderRegister,validateLogin,validateSetPassword}
