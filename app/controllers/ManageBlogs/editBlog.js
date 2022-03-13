const { handleError } = require('../../middleware/utils')

const AdsBlog_Db = require('../../models/adsBlog_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const editBlog = async (req, res) => {
  try {
    const BlogTitle = req.body.BlogTitle;
    const AuthorName = req.body.AuthorName;
    const Type = req.body.Type;
    const Category = req.body.Category;
    const BlogContent = req.body.BlogContent; 
    const uploadBlogImage = req.body.uploadBlogImage;
    const is_published = req.body.is_published;

    await AdsBlog_Db.findByIdAndUpdate({_id:req.body.id},
                                       {BlogTitle,AuthorName,Type,Category,BlogContent,uploadBlogImage,is_published},{new:true})
                       .then((data) => {
                                       res.status(200).send({ status: 200, message: "succesfully edited BlogAd",data })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while editing Blog item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { editBlog }