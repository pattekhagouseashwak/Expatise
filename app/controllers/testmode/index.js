const {getTestQuestionsToPratices,testStatistics} = require('./praticequestions.service')
const {addTestResponse,getTestResponse,personalstatistics,
       resetPersonalstatistics} = require('./storeTestResponce.service')
const {evaluteTestResponse,mistakeTest,fetchCommonTest,removemistakequestion,
      reviewMistakeTest,removeReviewMistakeQuestions} = require('./evaluteTestResponse.service')

module.exports ={getTestQuestionsToPratices,getTestResponse,removemistakequestion,
                 addTestResponse,evaluteTestResponse,mistakeTest,fetchCommonTest,
                 reviewMistakeTest,personalstatistics,testStatistics,removeReviewMistakeQuestions,resetPersonalstatistics}