const { handleError } = require('../../middleware/utils')

const AdsBlog_Db = require('../../models/adsBlog_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchCategoryBasedBlog = async (req, res) => {
  try {

    if(req.body.Category.length == 0){
      return  res.status(400).send({ status: 400, message: "Category cannot be empty"});
    }
   
   await AdsBlog_Db.find({Category : req.body.Category})
                   .select('-is_published')
                   .then((Blogs) => {
                                       res.status(200).send({ status: 200, message: "succesfully fetched fetchBlog",Blogs })
                                   })
                       .catch(Err => {
                                        res.status(500).send({
                                        status: 500,
                                        message:Err.message || "Some error occurred while fetching Blogs item."
                                        });
                                    }); 
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}
module.exports = { fetchCategoryBasedBlog }