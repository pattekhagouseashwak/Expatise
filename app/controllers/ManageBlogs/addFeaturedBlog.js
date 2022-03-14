const { handleError } = require('../../middleware/utils')

const AdsFeatureBlog = require('../../models/adsFeatureBlog_Db')


const AdsBlog_Db = require('../../models/adsBlog_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const addFeaturedBlog = async (req, res) => {
  try {
    //console.log(" s s", req.body)

    if (req.body.BlogID.length == 0) {
      return res.status(400).send({ status: 400, message: "BlogID cannot be empty" });
    }

    const checkFeatureBlog = await AdsFeatureBlog.findOne({ BlogID: req.body.BlogID });

    //console.log(checkFeatureBlog);

    if (checkFeatureBlog == null) {
      const checkBlog_Db = await AdsBlog_Db.findOne({ BlogID: req.body.BlogID }); 
      //console.log(checkBlog_Db)
      if (checkBlog_Db != null) {
        var FeatureBlogID = 'FeatureBlogID_' + (new Date()).getTime();
        var BlogID = req.body.BlogID;
        var BlogTitle = checkBlog_Db.BlogTitle;
        var AuthorName = checkBlog_Db.AuthorName;
        var Type = checkBlog_Db.Type;
        var Category = checkBlog_Db.Category;
        var BlogContent = checkBlog_Db.BlogContent;
        var uploadBlogImage = checkBlog_Db.uploadBlogImage;
      }
      else {
        return res.status(400).send({ status: 400, message: "BlogId doesn't exist anymore" });
      }
    }
    else {
      return res.status(400).send({ status: 400, message: "BlogId already exist" });
    }
    await AdsFeatureBlog.create({ FeatureBlogID, BlogID, BlogTitle, AuthorName, Type, Category, BlogContent, uploadBlogImage })
      .then(() => {
        res.status(200).send({ status: 200, message: "succesfully added FeaturedBlog" })
      })
      .catch(Err => {
        res.status(500).send({
          status: 500,
          message: Err.message || "Some error occurred while adding featuredBlog item."
        });
      });
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { addFeaturedBlog }