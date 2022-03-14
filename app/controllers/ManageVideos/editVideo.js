const { handleError } = require('../../middleware/utils')

const AdsVideo_Db = require('../../models/adsVideo_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const editVideo = async (req, res) => {
  try {
    const VideoTitle = req.body.VideoTitle;
    const VideoLink = req.body.VideoLink;
    const PostedBy = req.body.PostedBy;
    const is_published = req.body.is_published;

    await AdsVideo_Db.findByIdAndUpdate({_id:req.body.id},
                                       {VideoTitle,VideoLink,PostedBy,is_published},{new:true})
                       .then((data) => {
                                       res.status(200).send({ status: 200, message: "succesfully edited VideoAd",data })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while editing Video item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { editVideo }