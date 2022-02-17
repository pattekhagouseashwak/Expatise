const {validatePostContent } = require('./validatePostContent')
const {validateCreateRecommandVideo} = require('./validateCreateRecommandVideo')
const {validateData} = require('./validateData')
const {validateData_gotQuestion} = require('./validateData_gotQuestion')
const {generateId} = require('./generateId')

module.exports = {validatePostContent,validateCreateRecommandVideo,validateData,validateData_gotQuestion,generateId}
