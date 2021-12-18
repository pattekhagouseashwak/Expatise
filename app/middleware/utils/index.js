const { handleError } = require('./handleError')
const { removeExtensionFromFile } = require('./removeExtensionFromFile')
const { buildErrObject } = require('./buildErrObject')
const { validateResult } = require('./validateResult')
const {fetchLatitudeLongitude} = require('./fetchLatitudeLongitude')

module.exports = {
  handleError,
  removeExtensionFromFile,
  buildErrObject,
  validateResult,
  fetchLatitudeLongitude
}
