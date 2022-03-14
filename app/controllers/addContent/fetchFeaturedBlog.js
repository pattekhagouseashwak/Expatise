const { handleError } = require('../../middleware/utils')

const AdsFeatureBlog = require('../../models/adsFeatureBlog_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchFeaturedBlog = async (req, res) => {
  try {
    
    await AdsFeatureBlog.find({ })
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
module.exports = { fetchFeaturedBlog }