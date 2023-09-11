const { postTestQuestions, getTestQuestions,
    removeTestQuestion, searchTestQuestion } = require('./drivingmaterial.service')

const { postbookmarkQuestions, getbookmarkQuestions,
    removebookmarkQuestion } = require('./bookmark.service')

module.exports = {
    postTestQuestions, getTestQuestions, removeTestQuestion, searchTestQuestion,
    postbookmarkQuestions, getbookmarkQuestions, removebookmarkQuestion
}