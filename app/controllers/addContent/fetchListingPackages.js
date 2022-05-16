const { handleError } = require('../../middleware/utils')

const listingPackage = require('../../models/ListingPackages')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchListingPackages  = async (req, res) => {
  try {

    await listingPackage .find({})
                         .select("PackageName priceDetails")
      .then((packageDetails) => {
        res.status(200).send({ status: 200, message: "succesfully fetched fetchListingPackage", packageDetails })
      })
      .catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Some error occurred while fetching fetchListingPackage item."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { fetchListingPackages }