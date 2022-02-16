const { handleError } = require('../../middleware/utils')

const AdsVideo_Db = require('../../models/adsVideo_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const postVideoAd = async (req, res) => {
  try {console.log(" s s")

    const AdvertisementID = req.body.AdvertisementID;
    const VideoTitle = req.body.VideoTitle;
    const VideoLink = req.body.VideoLink;
    const State = req.body.State;
    const CoverImage = req.body.CoverImage;
    const Date = req.body.Date;
    const Time = req.body.Time;
    const StartsFrom = req.body.StartsFrom;
    const EndOn = req.body.EndOn;

    await AdsVideo_Db.create({AdvertisementID,VideoTitle,State,
                              VideoLink,CoverImage,Date,
                              Time,StartsFrom,EndOn,
                            })
                       .then(() => {
                                       res.status(200).send({ status: 200, message: "succesfully created postVideoAd" })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while postVideoAd item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { postVideoAd }