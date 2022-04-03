const { handleError } = require('../../middleware/utils')


const RecommendedVideo = require('../../models/recommendedVideo')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */


const getRecommendedVideo = async (req, res) => {
    try {
      await RecommendedVideo.find()
                            .sort("position")
                            .then((data) => {
                                            if (data.length != 0) {        
                                                                   return res.status(200).send({ status: 200, message: "successfully fetched!!", data });
                                                                   }
                                            else if (data.length == 0) {
                                                                   return res.status(200).send({ status: 200, message: "No data Found!!" })
                                                                   }
                             }).catch(Err => {
                                              res.status(500).send({status: 500,message:Err.message || "Some err occurred while fetching."});
                                              });
  
    } catch (error) {
      console.log(error)
      handleError(res, error)
    }
  }


module.exports = { getRecommendedVideo }
