const { contactUs } = require('./contactUs')
const { gotATip } = require('./gotATip')
const { advertiseWithUs } = require('./advertiseWithUs')
const {getRecommendedVideo} = require('./RecommendedVideo')
const { requestACallback } = require('./requestACallback')
const { getRequestACallbackDetails } = require('./requestACallback')
const { writeToUs, getWriteToUsDetails } = require('./writeToUs')
const {dashboardAdvert} = require('./dashboardAdvert')
const {hostingServices} = require('./hostingServices')
const {webDevServices} = require('./webDevServices')
const {gotQuestionRelatedToAuctionLaw} = require('./gotQuestionRelatedToAuctionLaw')
const {replyComment} = require('./replyComment')

module.exports = {contactUs, gotATip, advertiseWithUs,
                 getRecommendedVideo,requestACallback,getRequestACallbackDetails,
                 writeToUs, getWriteToUsDetails,dashboardAdvert,hostingServices,
                 gotQuestionRelatedToAuctionLaw,webDevServices,replyComment}