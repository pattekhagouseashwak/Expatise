const { handleError } = require('../../middleware/utils')

const AdsVideo_Db = require('../../models/adsVideo_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const createVideo = async (req, res) => {
  try {
    //console.log(" s s",req.body)

    const VideoID = 'VideoID_' + (new Date()).getTime();
    const VideoTitle = req.body.VideoTitle;
    const VideoLink = req.body.VideoLink;
    const PostedBy = req.body.PostedBy;
    // const is_published = true;

    await AdsVideo_Db.create({VideoID,VideoTitle,VideoLink,PostedBy})
                       .then(() => {
                                       res.status(200).send({ status: 200, message: "succesfully created createVideo" })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while creating Video item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { createVideo }