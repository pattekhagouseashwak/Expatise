const { handleError } = require('../../middleware/utils')

const AdsVideo_Db = require('../../models/adsVideo_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchVideosRequest = async (req, res) => {
  try {
    let searchValue = [];
  
    searchValue.push({is_published:false});
    console.log(searchValue)
 
    
await AdsVideo_Db.find({ $and: searchValue })
                       .then((Videos) => {
                                       res.status(200).send({ status: 200, message: "succesfully fetched fetchVideo",Videos })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while fetching Videos item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { fetchVideosRequest }