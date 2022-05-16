const { handleError } = require('../../middleware/utils')

const boostPackageDetails = require('../../models/BoostPackageDetails')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchBoostPackages = async (req, res) => {
  try {

    await boostPackageDetails.find({})
                            .select("PackageName priceDetails")
      .then((data) => {
        const packageDetails = data.reduce((group, product) => {
          const { PackageName } = product;
          group[PackageName] = group[PackageName] ?? [];
          group[PackageName].push(product);
          return group;
        }, {});

        res.status(200).send({ status: 200, message: "succesfully fetched boostPackageDetails", packageDetails })
      })
      .catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Some error occurred while fetching Boost packageDetails item."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { fetchBoostPackages }