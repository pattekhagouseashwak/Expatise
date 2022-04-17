const { handleError } = require('../../middleware/utils')

const UnPublished = require('../../models/unPublished')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchunPublishedListing = async (req, res) => {
  try {
    
    const id = req.user._id
   
    await UnPublished.find({Auctioneer:id})
              .then((listing)=>{
                            res.status(200).send({ status: 200, message: "successfully fetch UnpublishedLisintg Details!!",listing})
                            }
                                        ).catch(Err => {
                                            res.status(500).send({
                                            status: 500,    
                                            message:
                                                Err.message || "Some error occurred while fetching UnpublishedLisintg."
                                            });
                                        });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { fetchunPublishedListing }