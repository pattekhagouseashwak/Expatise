const { handleError } = require('../../middleware/utils')

const AdsFeature_db = require('../../models/adFeature_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const editFeaturedAd = async (req, res) => {
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

    await AdsFeature_db.findByIdAndUpdate({_id:req.body.id},
                                          {AdvertisementID,AuctionTitle,
                                          typeofAuction,State,featuredImage,Date,
                                          Time,StartsFrom,EndOn,
                                          })
                       .then(() => {
                                       res.status(200).send({ status: 200, message: "succesfully edited FeaturedAd" })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while editing FeaturedAd item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { editFeaturedAd }