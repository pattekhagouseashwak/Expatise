const { handleError } = require('../../middleware/utils')

const AdsFeatureBlog = require('../../models/adsFeatureBlog_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const singleFeaturedBlog = async (req, res) => {
  try {

    if(req.body.FeatureBlogID && req.body.FeatureBlogID!=0){
      var FeatureBlogID = req.body.FeatureBlogID
    }
    else{
        return  res.status(400).send({ status: 400, message: "FeatureBlogID cannot be empty"});
      }
    
    await AdsFeatureBlog.find({FeatureBlogID:FeatureBlogID})
                       .then((FeaturedBlogs) => {
                                       res.status(200).send({ status: 200, message: "succesfully fetched FeaturedBlog",FeaturedBlogs })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while fetching FeaturedBlogs item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { singleFeaturedBlog }