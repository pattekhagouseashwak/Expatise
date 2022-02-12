const { handleError } = require('../../middleware/utils')

const ListingPolicy = require('../../models/listingPolicy')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const createListingPolicy = async (req, res) => {
  try {console.log(" s s")
    const policy = req.body.policy;
    await ListingPolicy.create({policy})
                       .then(() => {
                                       res.status(200).send({ status: 200, AuctioneerFAQ: "ListingPolicy succesfully added" })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        AuctioneerFAQ:Err.AuctioneerFAQ || "Some error occurred while adding item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }


}

module.exports = { createListingPolicy }