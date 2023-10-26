const {getTestQuestionsToPratices,testStatistics} = require('./praticequestions.service')
const {addTestResponse,getTestResponse,personalstatistics} = require('./storeTestResponce.service')
const {evaluteTestResponse,mistakeTest,fetchCommonTest,removemistakequestion,
      reviewMistakeTest} = require('./evaluteTestResponse.service')

module.exports ={getTestQuestionsToPratices,getTestResponse,removemistakequestion,
                 addTestResponse,evaluteTestResponse,mistakeTest,fetchCommonTest,
                 reviewMistakeTest,personalstatistics,testStatistics}