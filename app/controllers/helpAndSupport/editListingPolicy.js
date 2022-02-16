const { handleError } = require('../../middleware/utils')

const ListingPolicy = require('../../models/listingPolicy')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const editListingPolicy = async (req, res) => {
  try {

    await ListingPolicy.findByIdAndUpdate({_id:req.body.id},{policy:req.body.policy},{new:true})
                       .then((policy) => {
                                    res.status(200).send({ status: 200, message: "AuctioneerFAQ succesfully updated",policy })
                                    })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while updating item."
                                        });
                                    });

  } catch (error) {
    console.log(error)
    handleError(res, error)
  }

}

module.exports = { editListingPolicy }