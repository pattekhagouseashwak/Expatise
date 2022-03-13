const { handleError } = require('../../middleware/utils')
const AdsBanner_db = require('../../models/adsBanner_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchBanner = async (req, res) => {
  try {
      
       await AdsBanner_db.find({})
                        .select("BannerImage")
                        .then((Banners) => {
                                       res.status(200).send({ status: 200, message: "succesfully fetchd Banners ",Banners});
                                   })
                       .catch(Err => {
                                        res.status(500).send({status: 500,message:Err.message || "Some error occurred while fetching Banners."});
                                     });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { fetchBanner }