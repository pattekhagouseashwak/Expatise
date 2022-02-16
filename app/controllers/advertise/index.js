const { postPrintAd } = require('./postPrintAd')
const { postBlogAd } = require('./postBlogAd')
const { postVideoAd } = require('./postVideoAd')

const { pastBlogAd } = require('./pastBlogAd')
const { pastPrintAd } = require('./pastPrintAd')
const { pastVideoAd } = require('./pastVideoAd')

const { currentBlogAd } = require('./currentBlogAd')
const { currentPrintAd } = require('./currentPrintAd')
const { currentVideoAd } = require('./currentVideoAd')

const {deleteAd} = require('./deleteAd')

const { editBlogAd } = require('./editBlogAd')
const { editPrintAd } = require('./editPrintAd')
const { editVideoAd } = require('./editVideoAd')

module.exports = {postPrintAd,
                  postBlogAd,
                  postVideoAd,
                  pastBlogAd,
                  pastPrintAd,
                  pastVideoAd,
                  currentBlogAd,
                  currentPrintAd,
                  currentVideoAd,
                  deleteAd,
                  editPrintAd,
                  editVideoAd,
                  editBlogAd
                }