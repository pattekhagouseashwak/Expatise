const { postSurvey, getSurvey, removeSurvey, getSurveyList, 
        addStoreSurveyResponse,getStoreSurveyResponse,
        getStoreSurveyResponseByID,getYesNoPercentageInSurvey} = require('./survey.service')

module.exports = { postSurvey, getSurvey, removeSurvey, getStoreSurveyResponseByID,
                   getSurveyList, addStoreSurveyResponse, getStoreSurveyResponse,getYesNoPercentageInSurvey}