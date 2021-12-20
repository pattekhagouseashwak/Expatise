const { contactUs } = require('./contactUs')
const { gotATip } = require('./gotATip')
const { advertiseWithUs } = require('./advertiseWithUs')
const {createRecommandVideo} = require('./createRecommandVideo')
const {recommendedVideo} = require('./recommendedVideo')
const { requestACallback } = require('./requestACallback')
const { getRequestACallbackDetails } = require('./requestACallback')
const { writeToUs, getWriteToUsDetails } = require('./writeToUs')

module.exports = {contactUs, gotATip, advertiseWithUs,createRecommandVideo,
                 recommendedVideo,requestACallback,getRequestACallbackDetails,
                 writeToUs, getWriteToUsDetails}