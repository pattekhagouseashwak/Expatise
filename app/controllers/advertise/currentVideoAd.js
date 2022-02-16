const { handleError } = require('../../middleware/utils')

const AdsVideo_Db = require('../../models/adsVideo_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const currentVideoAd = async (req, res) => {
  try {console.log(" s s")

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var currentDate = (yyyy + "-" + mm + "-" + dd);

    await AdsVideo_Db.find({ StartsFrom: { $eq: currentDate } })
                       .then(() => {
                                       res.status(200).send({ status: 200, message: "succesfully fetched currentVideoAd" })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while fetching currentVideoAd item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { currentVideoAd }