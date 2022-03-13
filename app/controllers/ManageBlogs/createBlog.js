const { handleError } = require('../../middleware/utils')

const AdsBlog_Db = require('../../models/adsBlog_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const createBlog = async (req, res) => {
  try {
    //console.log(" s s",req.body)

    const BlogID = 'BlogID_' + (new Date()).getTime();
    const BlogTitle = req.body.BlogTitle;
    const AuthorName = req.body.AuthorName;
    const Type = req.body.Type;
    const Category = req.body.Category;
    const BlogContent = req.body.BlogContent; 
    const uploadBlogImage = req.body.uploadBlogImage;
    const is_published = true;

    await AdsBlog_Db.create({BlogID,BlogTitle,AuthorName,Type,Category,BlogContent,uploadBlogImage,is_published})
                       .then(() => {
                                       res.status(200).send({ status: 200, message: "succesfully created createBlog" })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while createBlog item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { createBlog }