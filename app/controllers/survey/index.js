const { postSurvey, getSurvey, removeSurvey, getSurveyList, 
        addStoreSurveyResponse,getStoreSurveyResponse,getStoreSurveyResponseByID} = require('./survey.service')

module.exports = { postSurvey, getSurvey, removeSurvey, getStoreSurveyResponseByID,
                   getSurveyList, addStoreSurveyResponse, getStoreSurveyResponse}