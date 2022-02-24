const { handleError } = require('../../middleware/utils')

const AdsBlog_Db = require('../../models/adsBlog_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const editBlogAd = async (req, res) => {
  try {console.log(" s s")

    const AdvertisementID = req.body.AdvertisementID;
    const BlogTitle = req.body.BlogTitle;
    const BlogLink = req.body.BlogLink;
    const State = req.body.State;
    const featuredImage = req.body.featuredImage;
    const Date = req.body.Date; 
    const Time = req.body.Time;
    const StartsFrom = req.body.StartsFrom;
    const EndOn = req.body.EndOn;

    await AdsBlog_Db.findByIdAndUpdate({_id:req.body.id},
                             {AdvertisementID,BlogTitle,State,
                             BlogLink,featuredImage,Date,
                             Time,StartsFrom,EndOn,
                            })
                       .then((data) => {
                                       res.status(200).send({ status: 200, message: "succesfully edited BlogAd",data })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while editing BlogAd item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { editBlogAd }