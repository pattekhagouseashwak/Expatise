const { handleError } = require('../../middleware/utils')

const ListingPolicy = require('../../models/listingPolicy')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchListingPolicy = async (req, res) => {
  try {

    await ListingPolicy.find({})
                       .then((policy) => {
                                    res.status(200).send({ status: 200, message: "AuctioneerFAQ succesfully fetched",policy })
                                    })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while fetching policy item."
                                        });
                                    });


  } catch (error) {
    console.log(error)
    handleError(res, error)
  }

}

module.exports = { fetchListingPolicy }