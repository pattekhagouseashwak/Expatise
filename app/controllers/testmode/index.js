const {getTestQuestionsToPratices} = require('./praticequestions.service')
const {getTestResponse} = require('./storeTestResponce.service')
const {addTestResponse} = require('./storeTestResponce.service')
const {evaluteTestResponse} = require('./evaluteTestResponse.service')

module.exports ={getTestQuestionsToPratices,getTestResponse,addTestResponse,evaluteTestResponse}