const {getTestQuestionsToPratices} = require('./praticequestions.service')
const {addTestResponse,getTestResponse} = require('./storeTestResponce.service')
const {evaluteTestResponse,mistakeTest,fetchCommonTest,removemistakequestion,
      reviewMistakeTest} = require('./evaluteTestResponse.service')

module.exports ={getTestQuestionsToPratices,getTestResponse,removemistakequestion,
                 addTestResponse,evaluteTestResponse,mistakeTest,fetchCommonTest,reviewMistakeTest}