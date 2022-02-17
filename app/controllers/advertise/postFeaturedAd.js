const { handleError } = require('../../middleware/utils')

const AdsFeature_db = require('../../models/adFeature_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const postFeaturedAd = async (req, res) => {
  try {console.log(" s s")

    const AdvertisementID = req.body.AdvertisementID;
    const AuctionTitle = req.body.AuctionTitle;
    const typeofAuction = req.body.typeofAuction;
    const State = req.body.State;
    const featuredImage = req.body.featuredImage;
    const Date = req.body.Date; 
    const Time = req.body.Time;
    const StartsFrom = req.body.StartsFrom;
    const EndOn = req.body.EndOn;

    await AdsFeature_db.create({AdvertisementID,AuctionTitle,
                                typeofAuction,State,featuredImage,
                                Date,Time,StartsFrom,EndOn
                              })
                       .then(() => {
                                       res.status(200).send({ status: 200, message: "succesfully created postFeaturedAd" })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while postFeaturedAd item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { postFeaturedAd }