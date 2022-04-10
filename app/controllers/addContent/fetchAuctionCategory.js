const { handleError } = require('../../middleware/utils')

const AuctionCategory = require('../../models/AuctionCategory')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchAuctionCategory = async (req, res) => {
  try {
    
    await AuctionCategory.find({})
                         .then((data) => {
                                       res.status(200).send({ status: 200, message: "succesfully fetched AuctionCategory",data })
                                     })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while creating AuctionCategory item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { fetchAuctionCategory }