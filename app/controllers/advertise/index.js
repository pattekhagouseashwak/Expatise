const { postPrintAd } = require('./postPrintAd')
const { postBlogAd } = require('./postBlogAd')
const { postVideoAd } = require('./postVideoAd')
const { postFeaturedAd } = require('./postFeaturedAd')

const { pastBlogAd } = require('./pastBlogAd')
const { pastPrintAd } = require('./pastPrintAd')
const { pastVideoAd } = require('./pastVideoAd')
const { pastFeaturedAd } = require('./pastFeaturedAd')

const { currentBlogAd } = require('./currentBlogAd')
const { currentPrintAd } = require('./currentPrintAd')
const { currentVideoAd } = require('./currentVideoAd')
const { currentFeaturedAd } = require('./currentFeaturedAd')

const {deleteAd} = require('./deleteAd')

const { editBlogAd } = require('./editBlogAd')
const { editPrintAd } = require('./editPrintAd')
const { editVideoAd } = require('./editVideoAd')
const {editFeaturedAd} = require('./editFeaturedAd')

module.exports = {
                  postPrintAd,
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
                  editBlogAd,
                  editFeaturedAd,
                  postFeaturedAd,
                  pastFeaturedAd,
                  currentFeaturedAd
                }