const { handleError } = require('../../middleware/utils')

const Ticker = require('../../models/Ticker')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchTickers = async (req, res) => {
  try {
           await Ticker.find({startDate: {"$lte": Date.now()}})
                       .then((Tickers) => {
                                       res.status(200).send({ status: 200, message: "succesfully fetched Tickers",Tickers })
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