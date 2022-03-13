const { handleError } = require('../../middleware/utils')

const AdsBlog_Db = require('../../models/adsBlog_Db')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

const fetchBlog = async (req, res) => {
  try {
    let searchValue = [];
    let model;
    if(req.body.BlogId.length !=0 ){
      searchValue.push({BlogID:req.body.BlogId});
      //console.log(searchValue)
    }
    if(req.body.AuthorName.length !=0){
      searchValue.push({AuthorName : req.body.AuthorName});
      //console.log(searchValue)
    }

    if(req.body.Type.length !=0 ){
      searchValue.push({Type:req.body.Type});
      //console.log(searchValue)
    }
    if(req.body.Category.length !=0){
      searchValue.push({Category : req.body.Category});
      //console.log(searchValue)
    }
   
    console.log(searchValue)
    if(searchValue.length == 0){
     model = AdsBlog_Db.find({ })
    }
    else{
      model = AdsBlog_Db.find({ $and: searchValue })
    }

             await model
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
module.exports = { fetchBlog }