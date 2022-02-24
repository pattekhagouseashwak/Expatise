const { handleError } = require('../../middleware/utils')

const AdsFeature_db = require('../../models/adFeature_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const pastFeaturedAd = async (req, res) => {
  try {console.log(" s s")

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var currentDate = (yyyy + "-" + mm + "-" + dd);

    await AdsFeature_db.find({EndOn: { $lt: currentDate } })
                       .then((data) => {
                                       res.status(200).send({ status: 200, message: "succesfully fetched pastFeaturedAd",data })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while pastFeaturedAd item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { pastFeaturedAd }