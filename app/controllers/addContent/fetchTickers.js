const { handleError } = require('../../middleware/utils')

const AdsVideo_Db = require('../../models/adsVideo_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchTickers = async (req, res) => {
  try {
    
             await AdsVideo_Db.find({ })
                       .then((Tickers) => {
                                       res.status(200).send({ status: 200, message: "succesfully fetched Video",Tickers })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while fetching Tickers item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { fetchTickers }